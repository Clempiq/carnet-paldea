import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { freshState, encounterErrors, levelCap, automaticCap, nextBoss, normalize, duplicateFamily, validateImport, serialize, usesZone, ruleWarnings } from './core.js';
import { BOSSES, FINALS } from './data.js';
import { zoneLocked, zoneUsed } from './core.js';
import { PROLOGUE, ROUTE_GUIDE, STORY_IDS } from './story.js';
import { ZONES } from './data.js';
const catalog=JSON.parse((await readFile(new URL('./pokemon.json',import.meta.url),'utf8')).replace(/^\uFEFF/,''));
const entry=(overrides={})=>({id:'p1',speciesId:906,nickname:'Feuille',zone:'Cuchalaga',level:5,status:'team',types:[12],notes:'Premier compagnon',shiny:false,...overrides});

test('Les anciennes sauvegardes gardent leurs rencontres et reçoivent les nouveaux champs',()=>{
 const old=freshState();delete old.storyCompleted;delete old.currentZone;old.encounters=[entry()];
 const migrated=validateImport(old,catalog);assert.equal(migrated.encounters[0].nickname,'Feuille');assert.deepEqual(migrated.storyCompleted,[]);assert.equal(migrated.currentZone,null);
 migrated.storyCompleted=[PROLOGUE[0].id];migrated.currentZone='Cuchalaga';
 const restored=validateImport(JSON.parse(serialize(migrated)),catalog);assert.deepEqual(restored.storyCompleted,migrated.storyCompleted);assert.equal(restored.currentZone,'Cuchalaga');
 assert.throws(()=>validateImport({...migrated,currentZone:'Fausse zone'},catalog));assert.throws(()=>validateImport({...migrated,storyCompleted:['inconnu']},catalog));
});
test('Verrouillage des zones : captures, morts, fuites, édition et exception chromatique',()=>{
 for(const status of ['team','box','dead','missed']){const s=freshState(),e=entry({status});s.encounters=[e];assert.equal(zoneUsed(s,'Cuchalaga'),true);assert.equal(zoneLocked(s,'Cuchalaga'),true);assert.equal(zoneLocked(s,'Cuchalaga',false,e),false);assert.equal(zoneLocked(s,'Cuchalaga',true),false);s.rules.shiny=false;assert.equal(zoneLocked(s,'Cuchalaga',true),true);s.rules.onePerZone=false;assert.equal(zoneLocked(s,'Cuchalaga'),false);}
 const s=freshState();s.encounters=[entry({shiny:true})];assert.equal(zoneLocked(s,'Cuchalaga'),false);
});
test('Les lieux du parcours existent et chaque étape possède un guide',()=>{
 assert.equal(new Set(STORY_IDS).size,STORY_IDS.length);
 for(const b of BOSSES){assert.ok(ROUTE_GUIDE[b.id]);for(const z of ROUTE_GUIDE[b.id].zones)assert.ok(ZONES.includes(z),z);}
});
test('Guide Écarlate : couverture des zones, espèces valides et exclusivités',async()=>{
 const habitats=JSON.parse(await readFile(new URL('./habitats.json',import.meta.url),'utf8'));
 assert.deepEqual(Object.keys(habitats),ZONES);
 for(const [zone,data] of Object.entries(habitats)){
   assert.ok(data.source.startsWith('https://www.pokebip.com/'));
   assert.equal(new Set(data.pokemon.map(p=>p.id)).size,data.pokemon.length);
   for(const p of data.pokemon){assert.ok(catalog.some(c=>c.id===p.id),`${zone}: ${p.id}`);assert.ok(![200,429,316,317,371,372,373,885,886,887,692,693,875,320,990,991,992,993,994,995,1006,1008,10252].includes(p.id),`Exclusif Violet inattendu: ${zone} ${p.id}`);}
 }
 assert.ok(habitats['Zone Sud n°1'].pokemon.some(p=>p.id===10253));
 assert.ok(habitats['Zone Est n°2'].pokemon.some(p=>p.id===10251));
 assert.ok(habitats['Zone Zéro'].pokemon.some(p=>p.id===984));
});
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
