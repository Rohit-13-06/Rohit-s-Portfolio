const fs = require('fs');
const path = require('path');

const fontPath = path.resolve(process.cwd(), 'font_base64.txt');
const htmlPath = path.resolve(process.cwd(), 'index.html');

const fontBase64 = fs.readFileSync(fontPath, 'utf8').trim();
let html = fs.readFileSync(htmlPath, 'utf8');

const styleTag = `
    <style>
      @font-face {
        font-family: 'RapidFinalForce';
        src: url(data:font/opentype;base64,${fontBase64}) format('opentype');
        font-weight: normal;
        font-style: auto;
      }
    </style>
`;

// Clean up any old attempts
html = html.replace(/<style>[\s\S]*?Rapid(Now|Brand|Final)[\s\S]*?<\/style>/gi, '');

if (html.includes('</head>')) {
    html = html.replace('</head>', styleTag + '\n  </head>');
    fs.writeFileSync(htmlPath, html);
    console.log('Successfully inlined font RapidFinalForce into index.html');
} else {
    console.error('Could not find </head> tag in index.html');
}
