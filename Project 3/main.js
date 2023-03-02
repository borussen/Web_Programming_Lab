/**
 * Javascript code for midterm project
 * @author KIM HO JIN (2016314786)
 */

// Hard-coded account information
let accountNumber = "1234567890123456";
let pinNumber = "1234";
let initBalance = 2000;

let input = "";  // Variable for storing user-entered value
let tryNumber = 5;  // Variable that measures the number of password attempts remaining (used in enterPIN())
let withdrawInfo = 0;  // Variables for containing real-time withdrawal information (used in arrowButton())
const date = new Date();  // object for storing the date time when the event occurs



/* List of functions used throughout the program */

// Function that enter number through buttons
function operate(i) {
  let text = document.getElementById("inputbox");  // Load entered value so far
  input = input + i;  // Add input value to existing value
  text.value = input;
}

// Function to enter decimal point(.)
function decimalPoint() {
  let text = document.getElementById("inputbox");  // Load entered value so far

  // Exception handling for invalid inputs
  if (input.length == 0 || input.includes(".")) {
    alert("Invalid Input! Try Again.");
  }
  else {
    // Disable the button when entering the decimal point.
    const target = document.getElementById("decimalButton");
    target.disabled = true;
    target.style.backgroundColor = "lightgray";

    input = input + ".";  // Add input value to existing value
    text.value = input;
  }
}

// Function that performs the delete action
function deleteButton() {
  let text = document.getElementById("inputbox");  // Load entered value so far
  input = input.slice(0, -1);  // Delete last input
  text.value = input;

  // Reactivate the button when decimal point is cleared
  if (input.includes(".") == false) {
    const target = document.getElementById("decimalButton");
    target.disabled = false;
    target.style.backgroundColor = "#EAEAEA";
  }
}

// Function that returns to the previous page
function backButton() {
  window.location.href = "./mainPage.html";
}

// Function that returns to the start page(login page)
function returnCard() {
  window.location.href = "./loginPage.html";
}



/* List of functions used on login page */

// Function that acts as enter button to move to password page
function enterAccount() {
  let text = document.getElementById("inputbox");  // Get the entered value

  // If the input value and account number are correct, go to next page
  if (text.value == accountNumber) {
    window.location.href = "./passwordPage.html";
  }
  // If not, generate an error message
  else {
    input = "";
    text.value = "";
    alert("That account number does not exist!");
  }
}



/* List of functions used on password page */

// Function that acts as enter button to move to main page
function enterPIN() {
  let text = document.getElementById("inputbox");  // Get the entered value

  // If the input value and password are correct, go to next page
  if (text.value == pinNumber) {
    // If login is successful, store initial balance information in local storage
    const setBalance = JSON.stringify(initBalance);
    localStorage.setItem("currentBalance", setBalance);

    // Store the arrays related to the contents to be reflected in the information page in local storage
    let dateArray = [date.toString()];
    const setDate = JSON.stringify(dateArray);
    localStorage.setItem("dateInformation", setDate);

    let fundOutArray = [0];
    const setFundOut = JSON.stringify(fundOutArray);
    localStorage.setItem("fundOutInformation", setFundOut);

    let fundInArray = [0];
    const setFundIn = JSON.stringify(fundInArray);
    localStorage.setItem("fundInInformation", setFundIn);

    let balanceArray = [initBalance];
    const setRunningBalance = JSON.stringify(balanceArray);
    localStorage.setItem("balanceInformation", setRunningBalance);

    window.location.href = "./mainPage.html";
  }
  // If not, generate an error message and subtract the number of possible attempts
  else {
    input = "";
    text.value = "";
    tryNumber = tryNumber - 1;

    // If all attempts are exhausted, return to login page
    if (tryNumber == 0) {
      tryNumber = 5;
      window.location.href = "./loginPage.html";
    }
    else {
      alert("Incorrect PIN. You have " + tryNumber + " attempts left");
    }
  }
}

// Function that acts as Return Card button to move to start page
function returnPIN() {
  window.location.href = "./loginPage.html";
}



/* List of functions used on main page */

function moveInformationPage() {
  window.location.href = "./informationPage.html";
}
function moveWithdrawPage() {
  window.location.href = "./withdrawPage1.html";
}
function moveDepositPage() {
  window.location.href = "./depositPage1.html";
}
function moveTransferPage() {
  window.location.href = "./transferPage1.html";
}



/* List of functions used on information page */

// Function to get information about the current balance and displays it on web page
function getBalance() {
  let amount = JSON.parse(localStorage.getItem("currentBalance"));

  // Round to second decimal place to avoid floating point problem
  document.getElementById("currentBalance").innerHTML = "Current Balance: $" + parseFloat(amount).toFixed(2);
}

//  Function that adds table row that provides information about all activities in the account
function addRow() {
  let tbody = document.getElementById("tablebody");

  // Get all relevant arrays from the local storage
  let dateArray = JSON.parse(localStorage.getItem("dateInformation"));
  let fundOutArray = JSON.parse(localStorage.getItem("fundOutInformation"));
  let fundInArray = JSON.parse(localStorage.getItem("fundInInformation"));
  let balanceArray = JSON.parse(localStorage.getItem("balanceInformation"));

  // Display events in chronological order on web page
  for (i = 0; i < balanceArray.length; i++) {
    let row = tbody.insertRow(tbody.rows.length);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    cell1.innerHTML = dateArray[i];
    cell2.innerHTML = fundOutArray[i];
    cell3.innerHTML = fundInArray[i];
    cell4.innerHTML = parseFloat(balanceArray[i]).toFixed(2);  // Round to second decimal place to avoid floating point problems
  }
}



/* List of functions used on deposit page */

// Function that acts as enter button to move to next page (used on deposit page 1)
function enterDeposit() {
  // Exception handling for invalid inputs
  if ((input.charAt(input.length - 1) == ".") || (input.length == 0) || (parseFloat(input) == 0)) {
    alert("Invalid Input! Try Again.");
  }
  else {
    // Store deposit information in local storage
    const setDeposit = JSON.stringify(input);
    localStorage.setItem("deposit", setDeposit);

    window.location.href = "./depositPage2.html";
  }
}

// Function to get deposit information stored in local storage and displays it on web page (used on deposit page 2)
function getDeposit() {
  let amount = JSON.parse(localStorage.getItem("deposit"));
  document.getElementById("depositBalance").innerHTML = "$" + amount + "?";
}

// Function that acts as yes button to move to next page (used on deposit page 2)
function yesDeposit() {
  window.location.href = "./depositPage3.html";
}

// Function that acts as no button to move to previous page (used on deposit page 2)
function noDeposit() {
  window.location.href = "./depositPage1.html";
}

// Function that acts as ok button to move to next page (used on deposit page 3)
function okDeposit() {
  // Update the amount of current balance stored within local storage by reflecting the deposit information
  let currentAmount = JSON.parse(localStorage.getItem("currentBalance"));
  let depositAmount = JSON.parse(localStorage.getItem("deposit"));
  let updateAmount = parseFloat(currentAmount) + parseFloat(depositAmount);
  const updateBalance = JSON.stringify(updateAmount);
  localStorage.setItem("currentBalance", updateBalance);

  // Update the arrays containing all transaction information and store again in the local storage
  let dateArray = JSON.parse(localStorage.getItem("dateInformation"));
  dateArray.push(date.toString());
  const setDate = JSON.stringify(dateArray);
  localStorage.setItem("dateInformation", setDate);

  let fundOutArray = JSON.parse(localStorage.getItem("fundOutInformation"));
  fundOutArray.push(0);
  const setFundOut = JSON.stringify(fundOutArray);
  localStorage.setItem("fundOutInformation", setFundOut);

  let fundInArray = JSON.parse(localStorage.getItem("fundInInformation"));
  fundInArray.push(parseFloat(depositAmount));
  const setFundIn = JSON.stringify(fundInArray);
  localStorage.setItem("fundInInformation", setFundIn);

  let balanceArray = JSON.parse(localStorage.getItem("balanceInformation"));
  balanceArray.push(parseFloat(updateAmount));
  const setRunningBalance = JSON.stringify(balanceArray);
  localStorage.setItem("balanceInformation", setRunningBalance);

  window.location.href = "./depositPage4.html";
}

// Function that acts as home button to move to main page (used on deposit page 4 and withdraw page 3)
function moveMainPage() {
  window.location.href = "./mainPage.html";
}

// Function that proceeds with the deposit once more (used on deposit page 4)
function againDeposit() {
  window.location.href = "./depositPage1.html";
}



/* List of functions used on withdraw page */

// Function that acts as a quick link button (used on withdraw page 1)
function quickLink(n) {
  // Store withdraw information in local storage
  const setWithdraw = JSON.stringify(n);
  localStorage.setItem("withdraw", setWithdraw);

  window.location.href = "./withdrawPage2.html";
}

// Function responsible for the action of arrow-shaped buttons (used on withdraw page 1)
function arrowButton(n) {
  withdrawInfo = withdrawInfo + n;

  // Prevent values below zero from appearing
  if (withdrawInfo < 0) {
    withdrawInfo = 0;
  }

  // The value entered by the user is reflected and displayed on the web page
  let text = document.getElementById("inputbox");
  text.value = withdrawInfo;
}

// Function that acts as enter button to move to next page (used on withdraw page 1)
function enterWithdraw() {
  let text = document.getElementById("inputbox");

  // Exception handling for invalid inputs
  if (parseFloat(text.value) == 0) {
    alert("Invalid Input! Try Again.");
  }
  else {
    let currentAmount = JSON.parse(localStorage.getItem("currentBalance"));

    // Exception handling for withdrawal exceeding the current balance
    if (parseFloat(currentAmount) < parseFloat(text.value)) {
      alert("You cannot withdraw money that exceeds your balance!");
    }
    else {
      // Store withdraw information in local storage
      const setWithdraw = JSON.stringify(text.value);
      localStorage.setItem("withdraw", setWithdraw);

      window.location.href = "./withdrawPage2.html";
    }
  }
}

// Function to get withdraw information stored in local storage and displays it on web page (used on withdraw page 2)
function getWithdraw() {
  let amount = JSON.parse(localStorage.getItem("withdraw"));
  document.getElementById("withdrawBalance").innerHTML = "$" + amount + "?";
}

// Function that acts as yes button to move to next page (used on withdraw page 2)
function yesWithdraw() {
  // Update the amount of current balance stored within local storage by reflecting the withdraw information
  let currentAmount = JSON.parse(localStorage.getItem("currentBalance"));
  let withdrawAmount = JSON.parse(localStorage.getItem("withdraw"));
  let updateAmount = parseFloat(currentAmount) - parseFloat(withdrawAmount);
  const updateBalance = JSON.stringify(updateAmount);
  localStorage.setItem("currentBalance", updateBalance);

  // Update the arrays containing all transaction information and store again in the local storage
  let dateArray = JSON.parse(localStorage.getItem("dateInformation"));
  dateArray.push(date.toString());
  const setDate = JSON.stringify(dateArray);
  localStorage.setItem("dateInformation", setDate);

  let fundOutArray = JSON.parse(localStorage.getItem("fundOutInformation"));
  fundOutArray.push(parseFloat(withdrawAmount));
  const setFundOut = JSON.stringify(fundOutArray);
  localStorage.setItem("fundOutInformation", setFundOut);

  let fundInArray = JSON.parse(localStorage.getItem("fundInInformation"));
  fundInArray.push(0);
  const setFundIn = JSON.stringify(fundInArray);
  localStorage.setItem("fundInInformation", setFundIn);

  let balanceArray = JSON.parse(localStorage.getItem("balanceInformation"));
  balanceArray.push(parseFloat(updateAmount));
  const setRunningBalance = JSON.stringify(balanceArray);
  localStorage.setItem("balanceInformation", setRunningBalance);

  window.location.href = "./withdrawPage3.html";
}

// Function that acts as no button to move to previous page (used on withdraw page 2)
function noWithdraw() {
  window.location.href = "./withdrawPage1.html";
}

// Function that proceeds with the withdraw once more (used on withdraw page 3)
function againWithdraw() {
  window.location.href = "./withdrawPage1.html";
}



/* List of functions used on transfer page */

// Function that acts as enter button to move to next page (used on transfer page 1)
function enterTransfer() {
  // Exception handling for invalid inputs
  if ((input.charAt(input.length - 1) == ".") || (input.length == 0) || (parseFloat(input) == 0)) {
    alert("Invalid Input! Try Again.");
  }
  else {
    let fromBox = document.getElementById("fromBox");
    let fromValue = (fromBox.options[fromBox.selectedIndex].value);
    let toBox = document.getElementById("toBox");
    let toValue = (toBox.options[toBox.selectedIndex].value);

    // If account information is not selected for the transaction, provide error message
    if ((fromValue != "1234567890123456") || (toValue != "0002016314786000")) {
      alert("Please choose an account!");
    }
    else {
      let currentAmount = JSON.parse(localStorage.getItem("currentBalance"));

      // Exception handling for transaction exceeding the current balance
      if (parseFloat(currentAmount) < parseFloat(input)) {
        alert("You cannot transfer money that exceeds your balance!");
      }
      else {
        // Store transfer information in local storage
        const setTransfer = JSON.stringify(input);
        localStorage.setItem("transfer", setTransfer);

        window.location.href = "./transferPage2.html";
      }
    }
  }
}

// Function to get transfer information stored in local storage and displays it on web page (used on tramsfer page 2)
function getTransfer() {
  let amount = JSON.parse(localStorage.getItem("transfer"));
  document.getElementById("transferBalance").innerHTML = "$" + amount;
}

// Function that acts as yes button to move to next page (used on transfer page 2)
function yesTransfer() {
  // Update the amount of current balance stored within local storage by reflecting the transfer information
  let currentAmount = JSON.parse(localStorage.getItem("currentBalance"));
  let transferAmount = JSON.parse(localStorage.getItem("transfer"));
  let updateAmount = parseFloat(currentAmount) - parseFloat(transferAmount);
  const updateBalance = JSON.stringify(updateAmount);
  localStorage.setItem("currentBalance", updateBalance);

  // Update the arrays containing all transaction information and store again in the local storage
  let dateArray = JSON.parse(localStorage.getItem("dateInformation"));
  dateArray.push(date.toString());
  const setDate = JSON.stringify(dateArray);
  localStorage.setItem("dateInformation", setDate);

  let fundOutArray = JSON.parse(localStorage.getItem("fundOutInformation"));
  fundOutArray.push(parseFloat(transferAmount));
  const setFundOut = JSON.stringify(fundOutArray);
  localStorage.setItem("fundOutInformation", setFundOut);

  let fundInArray = JSON.parse(localStorage.getItem("fundInInformation"));
  fundInArray.push(0);
  const setFundIn = JSON.stringify(fundInArray);
  localStorage.setItem("fundInInformation", setFundIn);

  let balanceArray = JSON.parse(localStorage.getItem("balanceInformation"));
  balanceArray.push(parseFloat(updateAmount));
  const setRunningBalance = JSON.stringify(balanceArray);
  localStorage.setItem("balanceInformation", setRunningBalance);

  window.location.href = "./transferPage3.html";
}

// Function that acts as no button to move to previous page (used on transfer page 2)
function noTransfer() {
  window.location.href = "./transferPage1.html";
}
// Function that proceeds with the transfer once more (used on transfer page 3)
function againTransaction() {
  window.location.href = "./transferPage1.html";
}
