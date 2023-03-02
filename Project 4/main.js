/**
 * Javascript code for Assignment 3
 * @author KIM HO JIN (2016314786)
 */


/* Function used on start page and result page */

// Function that move to the problem page
function moveProblemPage() {
  window.location.href = "./problemPage.html";
}


/* List of functions used on problem page */

// Object Constructor Function (Problem)
function Problem(description, candidates, answer) {
  this.description = description;  // Problem description
  this.candidates = candidates;  // Multiple-choice list
  this.answer = answer;  // Answer of problem
}

// Object Constructor Function (Quiz)
function Quiz(problems) {
  this.problems = problems;  // List of questions within the quiz
  this.index = 0;  // Problem number in progress
  this.score = 0;  // The number of correct answers
}

// Create the problem object list
var problems = [
  new Problem("Which one is NOT a legal variable name?", ["_myvar", "Myvar", "my_var", "my-var"], "my-var"),
  new Problem("What is a correct syntax to output \"Hello World\" in Python?", ["print(\"Hello World\")", "p(\"Hello World\")", "echo(\"Hello World\");", "echo \"Hello World\""], "print(\"Hello World\")"),
  new Problem("How do you insert COMMENTS in Python code?", ["/*This is a comment*/", "#This is a comment", "//This is a comment", "None of the above"], "#This is a comment"),
  new Problem("What is the correct syntax to output the type of a variable or object in Python?", ["print(typeof(x))", "print(typeof x)", "print(typeOf(X))", "print(type(x))"], "print(type(x))"),
  new Problem("What is the correct file extension for Python files?", [".pt", "pyt", ".pyth", ".py"], ".py"),
  new Problem("Which one is NOT a programming language?", ["Java", "Python", "English", "C++"], "English")
]

// Shuffle function for random questions in the quiz
function shuffleProblems(problems) {
  problems.sort(() => Math.random() - 0.5);
}
// Shuffle the problem list randomly
shuffleProblems(problems);

// Create the quiz object
var quiz = new Quiz(problems);

// Function that outputs problem information to the problem page
function updateProblem() {
  // Output the problem number in progress
  document.getElementById("question").innerHTML = "Question " + (quiz.index + 1) + "/4";

  // Output description of the problem
  document.getElementById("problem").innerHTML = quiz.problems[quiz.index].description;

  // Output multiple choice options for the problem
  document.getElementById("answer1").innerHTML = quiz.problems[quiz.index].candidates[0];
  document.getElementById("answer2").innerHTML = quiz.problems[quiz.index].candidates[1];
  document.getElementById("answer3").innerHTML = quiz.problems[quiz.index].candidates[2];
  document.getElementById("answer4").innerHTML = quiz.problems[quiz.index].candidates[3];
}

// Function to check the correct answer
function checkAnswer(i) {
  // Case where the user selected option 1(A)
  if (i == 1) {
    // If the selected option is correct
    if (document.getElementById("answer1").innerText == quiz.problems[quiz.index].answer) {
      // Reflect the quiz score
      quiz.score++;
      document.getElementById("scoreNumber").innerHTML = quiz.score;
      // Display the background color of the selected option in green
      $("#answer1").css("background-color","green");
    }
    // If the selected option is incorrect
    else {
      // Display the background color of the selected option in red
      $("#answer1").css("background-color","red");
    }
  }
  // Case where the user selected option 2(B)
  else if (i == 2) {
    // If the selected option is correct
    if (document.getElementById("answer2").innerText == quiz.problems[quiz.index].answer) {
      // Reflect the quiz score
      quiz.score++;
      document.getElementById("scoreNumber").innerHTML = quiz.score;
      // Display the background color of the selected option in green
      $("#answer2").css("background-color","green");
    }
    else {
      // Display the background color of the selected option in red
      $("#answer2").css("background-color","red");
    }
  }
  // Case where the user selected option 3(C)
  else if (i == 3) {
    // If the selected option is correct
    if (document.getElementById("answer3").innerText == quiz.problems[quiz.index].answer) {
      // Reflect the quiz score
      quiz.score++;
      document.getElementById("scoreNumber").innerHTML = quiz.score;
      // Display the background color of the selected option in green
      $("#answer3").css("background-color","green");
    }
    else {
      $("#answer3").css("background-color","red");
      // Display the background color of the selected option in red
    }
  }
  // Case where the user selected option 4(D)
  else {
    // If the selected option is correct
    if (document.getElementById("answer4").innerText == quiz.problems[quiz.index].answer) {
      // Reflect the quiz score
      quiz.score++;
      document.getElementById("scoreNumber").innerHTML = quiz.score;
      // Display the background color of the selected option in green
      $("#answer4").css("background-color","green");
    }
    else {
      // Display the background color of the selected option in red
      $("#answer4").css("background-color","red");
    }
  }

  // Functions for progressing to the next problem (use delay function)
  setTimeout(function() {
    // Initialize the changed background color for the selected option
    $('#answer1').css('background-color','white');
    $('#answer2').css('background-color','white');
    $('#answer3').css('background-color','white');
    $('#answer4').css('background-color','white');

    // If this is not the last problem in the quiz
    if (quiz.index < 3) {
      quiz.index++;
      // Reflect progress in the progress bar
      document.getElementById("progressBar").value = 25 * (quiz.index + 1);
      // Reflect progress in question number
      document.getElementById("question").innerHTML = "Question " + (quiz.index + 1) + "/4";
      // Proceed to the next problem
      updateProblem();
    }
    // If this is the last problem in the quiz
    else {
      // Store the total score information in local storage
      const setScore = JSON.stringify(quiz.score);
      localStorage.setItem("score", setScore);

      // move to the result page
      window.location.href = "./resultPage.html";
    }
  }, 1000);
}


/* Function used on result page */

// Function to get total score information stored in local storage and display it on the webpage
function getScore() {
  let score = JSON.parse(localStorage.getItem("score"));
  document.getElementById("score").innerHTML = "Total score: " + score;
}
