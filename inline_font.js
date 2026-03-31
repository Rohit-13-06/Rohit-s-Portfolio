const fs = require('fs');
const path = require('path');

const fontPath = path.resolve(__dirname, 'font_base64.txt');
const htmlPath = path.resolve(__dirname, 'index.html');

const fontBase64 = fs.readFileSync(fontPath, 'utf8').trim();
let html = fs.readFileSync(htmlPath, 'utf8');

const styleTag = `
    <style>
      @font-face {
        font-family: 'RapidBrand';
        src: url(data:font/opentype;base64,${fontBase64}) format('opentype');
        font-weight: normal;
        font-style: normal;
      }
    </style>
`;

if (html.includes('</head>')) {
    html = html.replace('</head>', styleTag + '\n  </head>');
    fs.writeFileSync(htmlPath, html);
    console.log('Successfully inlined font into index.html');
} else {
    console.error('Could not find </head> tag in index.html');
}
