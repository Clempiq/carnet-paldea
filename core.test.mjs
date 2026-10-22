import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { freshState, encounterErrors, levelCap, automaticCap, nextBoss, normalize, duplicateFamily, validateImport, serialize, usesZone, ruleWarnings } from './core.js';
import { BOSSES, FINALS } from './data.js';
const catalog=JSON.parse((await readFile(new URL('./pokemon.json',import.meta.url),'utf8')).replace(/^\uFEFF/,''));
const entry=(overrides={})=>({id:'p1',speciesId:906,nickname:'Feuille',zone:'Cuchalaga',level:5,status:'team',types:[12],notes:'Premier compagnon',shiny:false,...overrides});
test('Le catalogue contient les starters français, les évolutions et Axoloto de Paldea',()=>{
  assert.equal(catalog.find(p=>p.id===906).name,'Poussacha');
  assert.equal(catalog.find(p=>p.id===908).name,'Miascarade');
  assert.deepEqual(catalog.find(p=>p.id===10253).types,[4,5]);
  assert.equal(normalize('Évoli'),normalize('evoli'));
});
test('Aucune donnée factice au démarrage',()=>{const s=freshState();assert.deepEqual(s.encounters,[]);assert.deepEqual(s.completed,[]);assert.equal(levelCap(s),15);});
test('18 badges avec les niveaux des adversaires réels',()=>{
  assert.equal(BOSSES.filter(b=>b.kind==='Arène').length,8);
  assert.equal(BOSSES.filter(b=>b.kind==='Team Star').length,5);
  assert.deepEqual(BOSSES.filter(b=>b.kind==='Dominant').map(b=>b.level),[16,20,29,45,57]);
});
test('Ajout, modification et évolution sans perdre les notes',()=>{
  const s=freshState();const e=entry();assert.deepEqual(encounterErrors(s,e),[]);s.encounters.push(e);
  const evolved={...e,speciesId:907,level:16};assert.deepEqual(encounterErrors(s,evolved,e),[]);
  s.encounters[0]=evolved;const restored=validateImport(JSON.parse(serialize(s)),catalog);
  assert.equal(restored.encounters[0].speciesId,907);assert.equal(restored.encounters[0].notes,e.notes);
});
test('Une rencontre par zone, y compris manquée ; édition de la même fiche autorisée',()=>{
  const s=freshState();s.encounters.push(entry({status:'missed'}));
  assert.match(encounterErrors(s,entry({id:'p2'})).join(' '),/zone a déjà/);
  assert.deepEqual(encounterErrors(s,s.encounters[0],s.encounters[0]),[]);
});
test('L’exception chromatique libère la zone et permet une capture supplémentaire',()=>{
  const s=freshState();s.encounters.push(entry());const shiny=entry({id:'shiny',shiny:true});
  assert.deepEqual(encounterErrors(s,shiny),[]);assert.equal(usesZone(shiny,s.rules),false);
  s.rules.shiny=false;assert.match(encounterErrors(s,shiny).join(' '),/zone a déjà/);
});
test('Équipe limitée à six dans les ajouts, transferts et imports',()=>{
  const s=freshState();s.rules.onePerZone=false;s.encounters=Array.from({length:6},(_,i)=>entry({id:`p${i}`}));
  assert.match(encounterErrors(s,entry({id:'seventh'})).join(' '),/6 Pokémon/);
  const boxed=entry({id:'seventh',status:'box'});assert.deepEqual(encounterErrors(s,boxed),[]);
  assert.match(encounterErrors(s,{...boxed,status:'team'},boxed).join(' '),/6 Pokémon/);
  s.encounters.push(entry({id:'seventh'}));assert.throws(()=>validateImport(s,catalog),/plus de 6/);
});
test('La mort définitive interdit le retour, mais permet une correction avec la règle désactivée',()=>{
  const s=freshState(),dead=entry({status:'dead'});s.encounters.push(dead);
  assert.match(encounterErrors(s,{...dead,status:'team'},dead).join(' '),/mort définitive/);
  s.rules.permadeath=false;assert.deepEqual(encounterErrors(s,{...dead,status:'box'},dead),[]);
});
test('Surnoms exigés pour les captures, pas pour les rencontres manquées',()=>{
  const s=freshState();assert.match(encounterErrors(s,entry({nickname:''})).join(' '),/surnom/);
  assert.deepEqual(encounterErrors(s,entry({nickname:'',status:'missed'})),[]);
});
test('Doublons reconnus à travers une évolution et même après un décès',()=>{
  const s=freshState();s.encounters.push(entry({speciesId:908,status:'dead'}));assert.equal(duplicateFamily(s,entry({id:'second',speciesId:906}),catalog),true);
});
test('Plafond : première étape non cochée, même si les victoires sont dans le désordre',()=>{
  const s=freshState();s.completed=['colza'];assert.equal(levelCap(s),15);s.completed.push('era');assert.equal(levelCap(s),16);s.cap=12;assert.equal(levelCap(s),12);s.cap=null;assert.equal(levelCap(s),16);
});
test('Plafond de la Ligue constant, finale scénarisée exclue',()=>{
  const s=freshState();s.completed=BOSSES.map(b=>b.id);assert.equal(nextBoss(s).id,'clavel');s.completed.push('clavel');assert.equal(automaticCap(s),61);
  s.completed.push('cayenn','popi','okuba-ligue','hassa');assert.equal(automaticCap(s),62);
  s.completed=[...BOSSES,...FINALS.filter(b=>!b.noCap)].map(b=>b.id);assert.equal(automaticCap(s),null);
});
test('Aller-retour JSON : statut, zones personnalisées, règles, notes et progression conservés',()=>{
  const s=freshState();s.customZones=['Starter offert'];s.encounters=[entry({status:'box',zone:'Starter offert',notes:'<script> & accents éà'})];s.cap=20;s.completed=['era'];s.rules.noItems=false;
  assert.deepEqual(validateImport(JSON.parse(serialize(s)),catalog),s);
});
test('Imports invalides refusés : version, zone, espèce, IDs, niveau et types',()=>{
  for(const mutate of [s=>s.version=2,s=>s.encounters=[entry({zone:'Inconnue'})],s=>s.encounters=[entry({speciesId:999999})],s=>s.encounters=[entry(),entry()],s=>s.encounters=[entry({level:101})],s=>s.encounters=[entry({types:[999]})]]){
    const s=freshState();mutate(s);assert.throws(()=>validateImport(s,catalog));
  }
});
test('Les exceptions historiques restent visibles après un changement de règles',()=>{
  const s=freshState();s.encounters=[entry(),entry({id:'second',status:'box'})];assert.equal(ruleWarnings(s).length,1);assert.equal(validateImport(s,catalog).encounters.length,2);
});
