const fs = require('fs');
const path = require('path');

const replacements = [
  { regex: /bg-slate-950/g, replacement: 'bg-background' },
  { regex: /bg-slate-900/g, replacement: 'bg-card' },
  { regex: /bg-slate-800/g, replacement: 'bg-muted' },
  { regex: /border-slate-800/g, replacement: 'border-border' },
  { regex: /border-slate-700/g, replacement: 'border-border' },
  { regex: /text-slate-200/g, replacement: 'text-card-foreground' },
  { regex: /text-slate-300/g, replacement: 'text-muted-foreground' },
  { regex: /text-slate-400/g, replacement: 'text-muted-foreground' },
  { regex: /text-slate-500/g, replacement: 'text-muted-foreground' },
  { regex: /text-white/g, replacement: 'text-foreground' }
];

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      for (const { regex, replacement } of replacements) {
        content = content.replace(regex, replacement);
      }
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDirectory('./app');
processDirectory('./components');
console.log("Done replacing colors!");
