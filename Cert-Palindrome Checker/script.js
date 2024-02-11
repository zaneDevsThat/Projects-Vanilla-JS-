const inputText = document.getElementById('text-input');
const checkBtn = document.getElementById('check-btn');
const result = document.getElementById('result');
let isPalindrome = true;

const checkIfPalindrome = (checkWord) => {
  result.classList.remove('not-palindrome');
  result.classList.remove('palindrome');
//place cleanInput and isInvalidInput here
  checkWord = inputText.value;
  
  if (checkWord === "") {
    result.innerHTML = `<p></p>`;
    alert("Please input a value");
    return null;
  }
  const sanitizedWord = cleanInput(checkWord);
  // const wordValidity = isInvalidInput(sanitizeWord);

  // if (wordValidity) {
  //   alert('Please enter a valid input. Avoid putting a <number>e<number> or <number>E<number> pattern.');
  // }

  const checkNow = sanitizedWord
  .split('')
  .reverse()
  .join('');

  if(sanitizedWord === checkNow) {
    // isPalindrome = false;
    result.innerHTML = `<p>${inputText.value} is a palindrome.</p>`;
    isPalindrome = true;
  } else {
    result.innerHTML = `<p>${inputText.value} is not a palindrome.</p>`;
    isPalindrome = false;
  }

  const outputColor = (isPalindrome)?"palindrome":"not-palindrome";
  result.classList.add(`${outputColor}`); 
  
}

const cleanInput = (str) => {
  const regex = /[^a-zA-Z0-9]/g
  return str.replace(regex, '').toLowerCase();
}

const isInvalidInput = (str) => {
  const regex = /\d+e\d+/i;
  return str.match(regex);
}

// const deleteInput = () => {

// }

checkBtn.addEventListener('click', checkIfPalindrome);