const isPalindrome = (word: string): boolean => {
  const reversedString = word.toLowerCase().split('').reverse().join('');
  return word === reversedString;
}

const word = process.argv[2];

if (word) {
  console.log(`Is ${word} a palindrome?`, isPalindrome(word));
} else {
  console.log('Please provide a word to check.');
}
