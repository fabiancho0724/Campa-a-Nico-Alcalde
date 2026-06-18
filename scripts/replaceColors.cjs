const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../src', 'components');

const replaceColors = (content) => {
    let newContent = content;

    // Backgrounds & Surfaces
    newContent = newContent.replace(/background:\s*['"]#F8FAFC['"]/gi, "background: 'var(--bg-primary)'");
    newContent = newContent.replace(/background:\s*['"]#f8fafc['"]/gi, "background: 'var(--bg-primary)'");
    
    newContent = newContent.replace(/background:\s*['"]#0[fF]172[aA]['"]/gi, "background: 'var(--bg-card)'");
    newContent = newContent.replace(/backgroundColor:\s*['"]#0[fF]172[aA]['"]/gi, "backgroundColor: 'var(--bg-card)'");
    
    newContent = newContent.replace(/background:\s*['"]rgba\(15,\s*23,\s*42,\s*0\.03\)['"]/gi, "background: 'var(--bg-overlay)'");
    newContent = newContent.replace(/background:\s*['"]rgba\(15,\s*23,\s*42,\s*0\.05\)['"]/gi, "background: 'var(--bg-overlay)'");

    // Transparencies
    newContent = newContent.replace(/rgba\(255,\s*255,\s*255,\s*0\.8\)/gi, 'var(--bg-glass)');
    newContent = newContent.replace(/rgba\(255,\s*255,\s*255,\s*0\.9\)/gi, 'var(--bg-glass)');

    newContent = newContent.replace(/rgba\(248,\s*250,\s*252,\s*0\.96\)/gi, 'var(--bg-hero)');
    newContent = newContent.replace(/rgba\(226,\s*232,\s*240,\s*0\.7\)/gi, 'var(--bg-hero-fade)');
    newContent = newContent.replace(/rgba\(248,\s*250,\s*252,\s*1\)/gi, 'var(--hero-fade-solid)');

    // Text Primary
    newContent = newContent.replace(/color:\s*['"]#0[fF]172[aA]['"]/gi, "color: 'var(--text-primary)'");
    newContent = newContent.replace(/color:\s*['"]#171717['"]/gi, "color: 'var(--text-primary)'");
    newContent = newContent.replace(/color:\s*['"]#334155['"]/gi, "color: 'var(--text-primary)'");
    
    // Text Secondary
    newContent = newContent.replace(/color:\s*['"]#475569['"]/gi, "color: 'var(--text-secondary)'");
    newContent = newContent.replace(/color:\s*['"]#52525[bB]['"]/gi, "color: 'var(--text-secondary)'");
    
    // Text Muted
    newContent = newContent.replace(/color:\s*['"]#94[aA]3[bB]8['"]/gi, "color: 'var(--text-muted)'");
    newContent = newContent.replace(/color:\s*['"]#64748[bB]['"]/gi, "color: 'var(--text-muted)'");
    newContent = newContent.replace(/color:\s*['"]#71717[aA]['"]/gi, "color: 'var(--text-muted)'");

    // Borders
    newContent = newContent.replace(/border:\s*['"]1px solid #E4E4E7['"]/gi, "border: '1px solid var(--border-color)'");
    newContent = newContent.replace(/border:\s*['"]1px solid #e4e4e7['"]/gi, "border: '1px solid var(--border-color)'");
    newContent = newContent.replace(/border:\s*['"]1px solid #F4F4F5['"]/gi, "border: '1px solid var(--border-color)'");
    newContent = newContent.replace(/border:\s*['"]1px solid #f4f4f5['"]/gi, "border: '1px solid var(--border-color)'");
    newContent = newContent.replace(/border:\s*['"]1px solid rgba\(0,\s*0,\s*0,\s*0\.05\)['"]/gi, "border: '1px solid var(--border-color)'");
    newContent = newContent.replace(/border:\s*['"]1px solid rgba\(0,\s*0,\s*0,\s*0\.1\)['"]/gi, "border: '1px solid var(--border-color)'");

    newContent = newContent.replace(/borderColor:\s*['"]rgba\(0,0,0,0\.06\)['"]/g, "borderColor: 'var(--border-color)'");
    newContent = newContent.replace(/borderColor:\s*['"]rgba\(0,0,0,0\.05\)['"]/g, "borderColor: 'var(--border-color)'");

    return newContent;
};

// Process all JSX files in the components directory
const processDirectory = (dir) => {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            const newContent = replaceColors(content);
            if (content !== newContent) {
                fs.writeFileSync(fullPath, newContent, 'utf8');
                console.log(`Updated ${fullPath}`);
            }
        }
    });
};

processDirectory(targetDir);

// Also do App.jsx
const appPath = path.join(__dirname, '../src', 'App.jsx');
const appContent = fs.readFileSync(appPath, 'utf8');
const newAppContent = replaceColors(appContent);
if (appContent !== newAppContent) {
    fs.writeFileSync(appPath, newAppContent, 'utf8');
    console.log(`Updated ${appPath}`);
}
