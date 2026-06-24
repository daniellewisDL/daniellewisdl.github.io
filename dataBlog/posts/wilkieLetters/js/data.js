// Data loading + shared scales/helpers
export const state = { letters: [], network: null, chronology: [], byId: new Map() };

export async function loadAll() {
  const [letters, network, chronology] = await Promise.all([
    fetch('data/letters.json').then(r => r.json()),
    fetch('data/network.json').then(r => r.json()),
    fetch('data/chronology.json').then(r => r.json()),
  ]);
  state.letters = letters;
  state.network = network;
  state.chronology = chronology;
  state.byId = new Map(letters.map(d => [d.id, d]));
  return state;
}

// muted, parchment-harmonious category palette
export const CAT_COLORS = {
  'Family':'#7b2e2e','Friend':'#4a6b5a','Publisher':'#2f4858',
  'Publisher/Business':'#6a8196','Literary agent':'#a8843f','Theatre':'#9a5b3f',
  'Artist':'#6b5b95','Press':'#41607a','Legal':'#6a663f','Medical':'#7a4a52',
  'Writer':'#46685b','Translator':'#8a7a4a','Society/Institution':'#6e6256',
  'Unidentified':'#b8a98c','Other':'#a89a7c'
};
export const catColor = c => CAT_COLORS[c] || '#a89a7c';

// 6 biographical periods -> warm sequential ramp
export const PERIODS = [
  'Childhood & schooling (1824–40)','Apprentice & first books (1841–50)',
  'Dickens circle & early novels (1851–59)','Sensation novelist & fame (1860–69)',
  'Illness & mission novels (1870–79)','Final decade (1880–89)'
];
export const PERIOD_COLORS = ['#cdb892','#bd9c66','#a87c44','#8c5f33','#6d4828','#4e321d'];
export const periodColor = n => PERIOD_COLORS[(n || 1) - 1] || '#b8a98c';

export const TOPIC_COLORS = {
  'money/business':'#8a6d3b','health':'#7a4a52','writing/work':'#46685b',
  'theatre':'#9a5b3f','travel':'#3f5e57','social':'#6b5b95'
};

export const fmtInt = d3.format(',');
export const ORDINALS = {1:'st',2:'nd',3:'rd'};

const MONTHS = ['','January','February','March','April','May','June','July',
  'August','September','October','November','December'];
export function prettyDate(l){
  if(!l.y) return l.date || '—';
  let s = '';
  if(l.wd) s += l.wd + ', ';
  if(l.m && l['m']) {
    // day from iso
    const day = l.iso && l.iso.length===10 ? +l.iso.slice(8,10) : null;
    if(day) s += day + (ORDINALS[day%100>10&&day%100<14?0:day%10]||'th') + ' ';
    s += MONTHS[l.m] + ' ';
  }
  return (s + l.y).trim();
}

export function debounce(fn, ms){ let t; return (...a)=>{clearTimeout(t);t=setTimeout(()=>fn(...a),ms);}; }
