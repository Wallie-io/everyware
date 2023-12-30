import * as fs from 'fs';

const filePath = './600cpu.png';
const buffer = fs.readFileSync(filePath);
const base64String = buffer.toString('base64');
// Save the base64 string to an HTML file
fs.writeFileSync(
  './out.html',
  `<img src="data:image/jpeg;base64,${base64String}" />`
);
