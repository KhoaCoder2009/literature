const fs = require('fs');

const ids = [
  'player-nick',
  'player-class',
  'user-dropdown-menu',
  'nav-user-pill-btn',
  'history-sync-badge-page',
  'stat-total-attempts',
  'stat-avg-accuracy',
  'stat-total-saved-short',
  'stat-total-time',
  'grade-general-feedback',
  'grade-total-score',
  'grade-rank-badge-wrap',
  'btn-toggle-reading-answers',
  'reading-timer-preset',
  'writing-timer-preset'
];

const jsFiles = fs.readdirSync('js').map(f => 'js/' + f);
const compFiles = fs.readdirSync('components').map(f => 'components/' + f);

ids.forEach(id => {
  console.log('=== ID:', id, '===');
  jsFiles.forEach(f => {
    const c = fs.readFileSync(f, 'utf8');
    if (c.includes(id)) {
      const lines = c.split('\n');
      lines.forEach((l, i) => {
        if (l.includes(id)) console.log(`  [JS] ${f}:${i+1}: ${l.trim()}`);
      });
    }
  });
  compFiles.forEach(f => {
    const c = fs.readFileSync(f, 'utf8');
    if (c.includes(id)) {
      const lines = c.split('\n');
      lines.forEach((l, i) => {
        if (l.includes(id)) console.log(`  [HTML] ${f}:${i+1}: ${l.trim()}`);
      });
    }
  });
});
