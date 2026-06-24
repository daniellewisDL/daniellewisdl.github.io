// Hover preview card + full-letter reading panel (shared by every view)
import { state, catColor, prettyDate } from './data.js';

const tip = document.getElementById('tip');

export function showTip(l, ev) {
  tip.innerHTML = `
    <div class="t-to">${esc(l.to)}</div>
    <div class="t-meta">${prettyDate(l)}${l.place ? ' · ' + esc(l.place) : ''}</div>
    <div class="t-prev">${esc(l.preview)}</div>
    <div class="t-hint">click to read in full ❧</div>`;
  tip.hidden = false;
  moveTip(ev);
}
export function moveTip(ev) {
  const w = tip.offsetWidth, h = tip.offsetHeight, pad = 16;
  let x = ev.clientX + pad, y = ev.clientY + pad;
  if (x + w > innerWidth - 8) x = ev.clientX - w - pad;
  if (y + h > innerHeight - 8) y = ev.clientY - h - pad;
  tip.style.left = x + 'px'; tip.style.top = y + 'px';
}
export function hideTip() { tip.hidden = true; }

const panel = document.getElementById('letter-panel');
const scrim = document.getElementById('scrim');

export function openLetter(id) {
  const l = state.byId.get(id); if (!l) return;
  hideTip();
  const tags = [];
  tags.push(`<span class="tag cat" style="background:${catColor(l.cat)}">${esc(l.cat)}</span>`);
  if (l.rel) tags.push(`<span class="tag">${esc(l.rel)}</span>`);
  (l.topics || []).forEach(t => tags.push(`<span class="tag">${esc(t)}</span>`));

  const works = (l.works || []).length ? `<p><b>Works named:</b> <i>${l.works.map(esc).join('</i>, <i>')}</i></p>` : '';
  const ppl = (l.people || []).length
    ? `<p><b>People mentioned:</b> ${l.people.map(p => `<a class="lp-people" data-name="${esc(p)}">${esc(p)}</a>`).join(', ')}</p>` : '';
  const paras = l.body.split('\n\n');
  const structural = p =>
    /^(My dear|My dearest|Dear|Dearest|Sir|Madam|Gentlemen|My Lord|Monsieur|Madame|Ch[eè]re|Mon cher|Mesdames|Cher)\b/i.test(p)  // salutation
    || / · /.test(p)                                // dateline / address (was 'X | Y')
    || (p.length < 34 && /\d/.test(p));             // bare address or date line
  let fp = paras.findIndex(p => !structural(p));
  if (fp < 0) fp = 0;
  const bodyHtml = paras.map((p, i) =>
    `<p${i === fp ? ' class="lp-first"' : ''}>${esc(p)}</p>`).join('');
  const notesHtml = l.notes ? l.notes.split('\n\n').map(n => `<p>${esc(n)}</p>`).join('') : '';
  const notes = l.notes ? `<div class="lp-notes"><h4>Editorial notes</h4>${notesHtml}</div>` : '';

  panel.innerHTML = `
    <button class="close" title="close">×</button>
    <div class="lp-head">
      <div class="lp-orn">❦</div>
      <div class="lp-to">To ${esc(l.to)}</div>
      <div class="lp-date">${prettyDate(l)}</div>
      ${l.from ? `<div class="lp-place">${esc(l.from.replace(/\s*\|\s*/g, ' · '))}</div>` : ''}
      <div class="lp-tags">${tags.join('')}</div>
    </div>
    <div class="lp-body">${bodyHtml}</div>
    ${notes}
    <div class="lp-meta">
      <h4>Provenance &amp; particulars</h4>
      ${works}${ppl}
      <p><b>Manuscript:</b> ${esc(l.ms || '—')}${l.arch ? ' · <i>' + esc(l.arch) + '</i>' : ''}</p>
      ${l.pub ? `<p><b>Published:</b> ${esc(l.pub)}</p>` : ''}
      <p><b>Length:</b> ${l.wc} words · <b>Catalogue no.</b> ${esc(l.id)}${l.lang !== 'English' ? ' · ' + esc(l.lang) : ''}</p>
    </div>`;
  panel.hidden = false; scrim.hidden = false;
  panel.scrollTop = 0;
  panel.querySelector('.close').onclick = closeLetter;
  panel.querySelectorAll('.lp-people').forEach(a => a.onclick = () => {
    const name = a.dataset.name;
    closeLetter();
    location.hash = 'reading';
    setTimeout(() => window.__rrSearch && window.__rrSearch(name), 60);
  });
}
export function closeLetter() { panel.hidden = true; scrim.hidden = true; }
scrim.addEventListener('click', closeLetter);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLetter(); });

export function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"]/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}
