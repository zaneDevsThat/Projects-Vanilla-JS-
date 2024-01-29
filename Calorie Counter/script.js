// import "normalize.css";
const calorieCounter = document.getElementById('calorie-counter');
const budgetNumberInput = document.getElementById('budget');
const entryDropdown = document.getElementById('entry-dropdown');
//addEntryButton #add-entry clearButton #clear output #output
const addEntryButton = document.getElementById('add-entry');
const clearButton = document.getElementById('clear');
const output = document.getElementById('output');
let isError = false;



function cleanInputString(str)
{
    const strArray = str.split('');
    const cleanStrArray = [];

  /*for (let i = 0; i < strArray.length; i++)
    {
        if (!['+', '-', ' '].includes(strArray[i]))
        {
            cleanStrArray.push(strArray[i]);
        }
    }*/
//as much as possible, in cases like this, we want to avoid loops to push characters creating an array for optimization purposes. Instead, we use regex.

    const regex = /[+-\s]/g;
    return str.replace(regex, '');
}

function isInvalidInput(str)
{
    const regex = /[0-9]+e[0-9]+/i;
    return str.match(regex);
}

function addEntry() {
    //const targetId = '#' + entryDropdown.value;
    //const targetInputContainer = document.querySelector(targetId + ' .input-container');
    const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`); // same as above but we used template literals
    const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length + 1; //this is +1 because we don't want to start the label to match with the index 0. we want to start the count with 1 
    // querySelectorAll returns an array-like NodeList of all elements that match the selector
    // hence, targetInputContainer.querySelectorAll('input[type="text"]') will return a NodeList of all the text inputs in the form and .length will then access the length property of the NodeList to get the number of entries
    const HTMLString = `
    <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
    <input type="text" id="${entryDropdown.value}-${entryNumber}-name" placeholder="Name" />
    <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
    <input
        type="number"
        min="0"
        id="${entryDropdown.value}-${entryNumber}-calories"
        placeholder="Calories"
    />`;
    //targetInputContainer.innerHTML += HTMLString; // This will cause the values inside your input to reset whenever you click the add entry button. It is because it is being replaced directly in this way. To fix that, we'll be using insertAdjacentHTML()
    targetInputContainer.insertAdjacentHTML('beforeend', HTMLString); //takes 2 parameters, position to which you want to append it
    //Same as onclick on the 1st project(RPG), we can call the .addEventListener() method of the addEntryButton. It takes two arguments. The first is the event to listen to – you should pass the string click. The second is the callback function, or the function that runs when the event is triggered. Pass the addEntry function as the second argument. Note that you should not call addEntry, but pass the variable (or function reference) directly.
}

function getCaloriesFromInputs(list) {
    let calories = 0;
  
    for (let i = 0; i < list.length; i++) {
      const currVal = cleanInputString(list[i].value);
      const invalidInputMatch = isInvalidInput(currVal);
  
      if (invalidInputMatch) {
        alert(`Invalid Input: ${invalidInputMatch[0]}`);
        isError = true;
        return null;
      }
      calories += Number(currVal); //Number constructor which converts strings into numbers
    }
    return calories;
  }

addEntryButton.addEventListener('click', addEntry);