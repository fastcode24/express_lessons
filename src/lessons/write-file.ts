import fs from 'fs';
import readline from 'readline';

const word = process.argv[2];
const filePath = process.argv[3] || 'text.txt';

function countLines(word: string) {
  return new Promise((resolve, reject) => {
    let count = 0;
    const rl = readline.createInterface({
      input: fs.createReadStream(filePath),
      crlfDelay: Infinity
    });

    rl.on('line', (line) => {
      if (line.includes(word)) {
        count++;
      }
    })

    rl.on('close', () => resolve(count));
    rl.on('error', reject);
  });
}

if (word) {
  countLines(word)
    .then(count => {
      console.log(`Word ${word} mentioned ${count} times in the text`);
    })
    .catch(error => {
      console.error('Error occured', error);
    });
} else {
  console.log('Please provide a word to check.');
}
