import fs from 'fs';

const c = fs.readFileSync('./src/data/quiz/apCalculusUnitsData.ts', 'utf8');

// Find all questions in apCalculusUnitsData
const questions = [];
const qRegex = /"stem":\s*"([^"]+)"/g;
let m;
while ((m = qRegex.exec(c)) !== null) {
  questions.push(m[1]);
}

console.log('Total questions in apCalculusUnitsData:', questions.length);
console.log('First 5 questions:');
questions.slice(0, 5).forEach((q, i) => console.log(`  ${i+1}: ${q}`));
console.log('Last 5 questions:');
questions.slice(-5).forEach((q, i) => console.log(`  ${i+1}: ${q}`));
