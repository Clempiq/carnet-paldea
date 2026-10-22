import { BOSSES, FINALS, ZONES, TYPES, STATUS, RULES } from './data.js';
export const STORAGE_KEY = 'carnet-paldea:v1';
export const normalize = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[’']/g,'');
export function freshState() { return {version:1,encounters:[],customZones:[],completed:[],cap:null,rules:Object.fromEntries(RULES.map(([key])=>[key,true])),updatedAt:null}; }
export const allZones = state => [...ZONES,...state.customZones];
export const nextBoss = state => [...BOSSES,...FINALS].find(b=>!state.completed.includes(b.id));
export function automaticCap(state) {
  const next = nextBoss(state);
  if (!next || next.noCap) return null;
  return ['cayenn','popi','okuba-ligue','hassa'].includes(next.id) ? 61 : next.level;
}
export const levelCap = state => state.cap ?? automaticCap(state);
export const usesZone = (e,rules) => !(e.shiny && rules.shiny);
export function encounterErrors(state, e, previous) {
  const errors=[];
  if (!Object.hasOwn(STATUS,e.status)) errors.push('Choisissez un statut valide.');
  if (!Number.isInteger(e.level)||e.level<1||e.level>100) errors.push('Le niveau doit être un entier entre 1 et 100.');
  if (!allZones(state).includes(e.zone)) errors.push('Choisissez une zone du carnet.');
  if (state.rules.nicknames && e.status!=='missed' && !e.nickname.trim()) errors.push('Un surnom est obligatoire avec vos règles actuelles.');
  const others=state.encounters.filter(p=>p.id!==e.id);
  if(e.status==='team' && others.filter(p=>p.status==='team').length>=6) errors.push('L’équipe contient déjà 6 Pokémon. Placez un compagnon dans la boîte.');
  if(state.rules.permadeath && previous?.status==='dead' && e.status!=='dead') errors.push('La mort définitive est activée. Corrigez cette règle avant de changer ce statut.');
  // Existing records stay editable when rules change; new zone claims are validated.
  const newClaim=!previous || previous.zone!==e.zone || !usesZone(previous,state.rules);
  if(state.rules.onePerZone && newClaim && usesZone(e,state.rules) && others.some(p=>p.zone===e.zone && usesZone(p,state.rules))) errors.push('Cette zone a déjà été utilisée. Choisissez une autre zone ou adaptez vos règles.');
  return errors;
}
export function duplicateFamily(state,e,catalog) {
  const family=catalog.find(p=>p.id===e.speciesId)?.family;
  return !!family && state.encounters.some(p=>p.id!==e.id && p.status!=='missed' && catalog.find(s=>s.id===p.speciesId)?.family===family);
}
export function validateImport(raw,catalog) {
  const fail=message=>{throw new Error(message);};
  if(!raw || typeof raw!=='object' || raw.version!==1) fail('Format incompatible : une sauvegarde Carnet Paldea version 1 est attendue.');
  const s=freshState();
  if(!Array.isArray(raw.encounters)||raw.encounters.length>5000) fail('Liste des rencontres invalide (5 000 maximum).');
  if(!Array.isArray(raw.customZones)||raw.customZones.length>500) fail('Liste des zones personnalisées invalide.');
  if(!raw.rules || RULES.some(([key])=>typeof raw.rules[key]!=='boolean')) fail('Règles absentes ou invalides.');
  s.rules=Object.fromEntries(RULES.map(([key])=>[key,raw.rules[key]]));
  const text=(value,max,label)=> { if(typeof value!=='string'||value.length>max) fail(`${label} invalide.`); return value.trim(); };
  s.customZones=raw.customZones.map(z=>text(z,80,'Nom de zone'));
  if(s.customZones.some(z=>!z)||new Set(allZones(s).map(normalize)).size!==allZones(s).length) fail('Zones vides ou en double.');
  if(raw.cap!==null && (!Number.isInteger(raw.cap)||raw.cap<1||raw.cap>100)) fail('Plafond invalide.');
  s.cap=raw.cap;
  const knownBosses=[...BOSSES,...FINALS].map(b=>b.id);
  if(!Array.isArray(raw.completed)||raw.completed.some(id=>!knownBosses.includes(id))||new Set(raw.completed).size!==raw.completed.length) fail('Progression invalide.');
  s.completed=[...raw.completed];
  const ids=new Set(), knownSpecies=new Set(catalog.map(p=>p.id));
  s.encounters=raw.encounters.map(e=>{
    if(!e || typeof e!=='object') fail('Rencontre invalide.');
    const id=text(e.id,80,'Identifiant');
    if(!id || ids.has(id)) fail('Identifiant vide ou en double.');
    ids.add(id);
    if(!knownSpecies.has(e.speciesId)) fail('Espèce inconnue dans le catalogue.');
    if(!Number.isInteger(e.level)||e.level<1||e.level>100) fail('Niveau invalide.');
    if(!Object.hasOwn(STATUS,e.status)) fail('Statut invalide.');
    if(!allZones(s).includes(e.zone)) fail('Une rencontre utilise une zone inconnue.');
    if(typeof e.shiny!=='boolean') fail('Indicateur chromatique invalide.');
    if(!Array.isArray(e.types)||e.types.length<1||e.types.length>2||e.types.some(t=>!Object.hasOwn(TYPES,t))||new Set(e.types).size!==e.types.length) fail('Types invalides.');
    return {id,speciesId:e.speciesId,nickname:text(e.nickname,40,'Surnom'),zone:e.zone,level:e.level,status:e.status,types:[...e.types],notes:text(e.notes,2000,'Notes'),shiny:e.shiny};
  });
  if(s.encounters.filter(e=>e.status==='team').length>6) fail('La sauvegarde contient plus de 6 Pokémon dans l’équipe.');
  // Rule changes may legitimately leave historical exceptions. Never discard those records.
  s.updatedAt=null;
  return s;
}
export function serialize(state) { return JSON.stringify({...state,app:'carnet-paldea',exportedAt:new Date().toISOString()},null,2); }
export function ruleWarnings(state) {
  const warnings=[];
  if(state.rules.onePerZone) {
    const counts=new Map();
    for(const e of state.encounters.filter(e=>usesZone(e,state.rules))) counts.set(e.zone,(counts.get(e.zone)||0)+1);
    if([...counts.values()].some(n=>n>1)) warnings.push('Certaines zones ont plusieurs rencontres. Les données sont conservées ; vérifiez vos exceptions.');
  }
  if(state.rules.nicknames && state.encounters.some(e=>e.status!=='missed' && !e.nickname)) warnings.push('Certains Pokémon capturés n’ont pas encore de surnom.');
  return warnings;
}
