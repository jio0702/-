import { readFileSync, existsSync } from 'node:fs';
import vm from 'node:vm';
const html = readFileSync(new URL('../www/index.html', import.meta.url), 'utf8');
const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)];
if (!html.includes('<canvas id="c"')) throw new Error('Game canvas missing');
if (!html.includes('id="joy"')) throw new Error('Mobile joystick missing');
for (const [i, match] of scripts.entries()) new vm.Script(match[1], {filename: `inline-script-${i+1}.js`});
if (!existsSync(new URL('../capacitor.config.json', import.meta.url))) throw new Error('Capacitor config missing');
console.log(`PASS: ${scripts.length} inline JavaScript blocks parse; game canvas and mobile controls present.`);
