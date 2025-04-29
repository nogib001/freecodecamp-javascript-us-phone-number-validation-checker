const phoneNumberInput = document.getElementById("user-input");
const resultsDiv = document.getElementById("results-div");
const checkButton = document.getElementById("check-btn");
const clearButton = document.getElementById("clear-btn");

// takes the user input #user-input and returns an alert if empty, otherwise it runs the rest of the logic
const validUSNumberCheck = input => {
  if (input === "") {
    alert("Please provide a phone number");
    return;
  }

  const trimmedInput = input.trim();

  // declares different parts of the phone number and combines then into a new function regexPattern
  const countryCode = '^(1\\s?)?';
  const areaCode = '(\\([0-9]{3}\\)|[0-9]{3})';
  const spacesDashes = '[\\s\\-]?';
  const phoneNumber = '[0-9]{3}[\\s\\-]?[0-9]{4}$';
  const regexPattern = new RegExp(
    `${countryCode}${areaCode}${spacesDashes}${phoneNumber}`
  );

  // tests the input on the function regexPattern, which in turn matches the input in the different regex patterns
  const isRegexValid = regexPattern.test(trimmedInput);

  // logging for debugging the input
  console.log("Is this number valid?", isRegexValid);

  // creates a new paragraph elements when the user submits multiple values
  const nextResult = document.createElement("p");

  // displays the input result and if the input is valid or not
  if (isRegexValid) {
    nextResult.textContent = "Valid US number: " + input;
    nextResult.style.color = "var(--valid-color)";
  } else {
    nextResult.textContent = "Invalid US number: " + input;
    nextResult.style.color = "var(--error-color)";
  }

  // using prepend on the #resultsDiv in the case of the user submitting more than one input value
  resultsDiv.prepend(nextResult);
  resultsDiv.style.display = "block";

// sliding window logic for the results, I only want 5 results viewable at a time

const slidingWindowMax = 4;
const allResults = resultsDiv.querySelectorAll("p");

if (allResults.length > slidingWindowMax) {
  resultsDiv.removeChild(allResults[allResults.length -1])
  }
};

// event listeners for the buttons

checkButton.addEventListener("click", () => {
  validUSNumberCheck(phoneNumberInput.value);
  phoneNumberInput.value = "";
});

clearButton.addEventListener("click", () => {
  resultsDiv.style.display = "none";
  resultsDiv.textContent = "";
});

// Execute a function when the user presses a key on the keyboard
phoneNumberInput.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
  // runs the same function as with the event listener for checkButton
    validUSNumberCheck(phoneNumberInput.value);
    phoneNumberInput.value = "";
  }
}); 