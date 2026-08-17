// Verifies every text position in the antiphonal sections meets WCAG 2.1 AA.
// Run: node scripts/check-contrast.mjs
const lum = (hex) => {
  const c = [1, 3, 5].map(i => parseInt(hex.substr(i, 2), 16) / 255)
    .map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a, b) => {
  const x = lum(a), y = lum(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
};

const DARK = '#18181B', LIGHT = '#FAFAFA', INK = '#09090B';
const GREY = '#999999', GREY_LIGHT = '#BBBBBB', CTA = '#2563EB';

const cases = [
  ['body on dark',        LIGHT, DARK, 4.5],
  ['body on light',       INK,   LIGHT, 4.5],
  ['label grey on dark',  GREY,  DARK, 4.5],
  ['label grey on light', '#666666', LIGHT, 4.5],
  ['numeral on light',    '#666666', LIGHT, 3.0],
  ['CTA fill on dark',    CTA,   DARK, 3.0],
  ['CTA text on fill',    LIGHT, CTA, 4.5],
];

let failed = 0;
for (const [name, fg, bg, min] of cases) {
  const r = ratio(fg, bg);
  const ok = r >= min;
  if (!ok) failed++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name.padEnd(22)} ${r.toFixed(2)}:1  (min ${min})`);
}
console.log(failed ? `\n${failed} failure(s)` : '\nAll contrast checks pass');
process.exit(failed ? 1 : 0);
