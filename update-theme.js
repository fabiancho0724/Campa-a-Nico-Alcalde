import fs from 'fs';
import path from 'path';

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

const gradientRegex = /(linear|radial)-gradient\((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*\)/g;

walk('./src', function(filePath) {
  if (filePath.endsWith('.jsx') || filePath.endsWith('.tsx') || filePath.endsWith('.js')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace all gradients
    content = content.replace(gradientRegex, 'var(--gradient-main)');
    
    // Replace hardcoded hsl and rgba backgrounds/colors
    content = content.replace(/hsl\(28[0-9], \d+%, \d+%\)/g, 'var(--bg-primary-hsl)');
    content = content.replace(/hsl\(27[0-9], \d+%, \d+%\)/g, 'var(--primary)');
    content = content.replace(/hsl\(355, \d+%, \d+%\)/g, 'var(--accent-red)');
    content = content.replace(/hsl\(42, \d+%, \d+%\)/g, 'var(--secondary)');
    content = content.replace(/rgba\(15, 23, 42, [\d.]+\)/g, 'var(--bg-secondary)');
    content = content.replace(/rgba\(10, 10, 20, [\d.]+\)/g, 'var(--bg-overlay)');
    content = content.replace(/rgba\(10, 15, 28, [\d.]+\)/g, 'var(--bg-primary-hsl)');
    
    // Colors
    content = content.replace(/color: 'white'/g, "color: 'var(--text-primary)'");
    content = content.replace(/color: '#fff'/g, "color: 'var(--text-primary)'");
    
    // Box shadows that have purple/yellow colors
    content = content.replace(/boxShadow: '[^']+'/g, "boxShadow: 'var(--shadow-custom)'");

    // Replace textShadow
    content = content.replace(/textShadow: '[^']+'/g, "textShadow: 'none'");
    
    // Replace any remaining rgba(138, 43, 226...) with a variable
    content = content.replace(/rgba\(138, 43, 226, [\d.]+\)/g, 'var(--primary-glow)');
    content = content.replace(/rgba\(244, 180, 0, [\d.]+\)/g, 'var(--secondary-glow)');
    
    fs.writeFileSync(filePath, content, 'utf8');
  }
});
console.log('Update complete');
