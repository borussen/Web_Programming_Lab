/**
 * Javascript code for Assignment 4
 * @author KIM HO JIN (2016314786)
 */

$(document).ready(function(){

  const id = document.getElementById("id");  // Variable that stores the user-entered ID(email) in the login form
  const pw = document.getElementById("pw");  // Variable that stores the user-entered password in the login form
  let idValidate = false;  // Variable that determine the validity of the user-entered ID(email) format in the login form
  let pwValidate = false;  // Variable that determine the validity of the user-entered password format in the login form

  const firstname = document.getElementById("firstname");  // Variable that stores the user-entered firstname in the sign-up form
  const lastname = document.getElementById("lastname");   // Variable that stores the user-entered lastname in the sign-up form
  const email = document.getElementById("email");   // Variable that stores the user-entered email in the sign-up form
  const password = document.getElementById("password");   // Variable that stores the user-entered password in the sign-up form
  const confirmPassword = document.getElementById("confirmpassword");  // Variable that stores the user-entered confirm password in the sign-up form
  let firstnameValidate = false;  // Variable that determine the validity of the user-entered firstname format in the sign-up form
  let lastnameValidate = false;  // Variable that determine the validity of the user-entered lastname format in the sign-up form
  let genderValidate = false;  // Variable that determine the validity of the user-entered gender format in the sign-up form
  let emailValidate = false;  // Variable that determine the validity of the user-entered email format in the sign-up form
  let passwordValidate = false;  // Variable that determine the validity of the user-entered password format in the sign-up form
  let confirmPasswordValidate = false;  // Variable that determine the validity of the user-entered confirm password format in the sign-up form

  // List of patterns used for format verification
  const digitPattern = /[0-9]/;
  const lowerPattern = /[a-z]/;
  const upperPattern = /[A-Z]/;
  const specialPattern = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/;


  // Set up the initial start screen
  $(".signup-form").hide();
  $(".signup-nextform").hide();
  $(".login-nextform").hide();
  $(".signup").css("background", "#BDBDBD");
  $(".signup").css("border-top", "8px solid #BDBDBD");
  $(".signup").css("color", "gray");

  // Click 'Login' at the top to switch to the login form
  $(".login").click(function() {
    $(".login-form").fadeIn(600);  // Use function 'fadeIn()' for smooth screen transition
    $(".signup-form").hide();
    $(".signup-nextform").hide();

    $(".login").css("background", "lightgray");
    $(".login").css("border-top", "8px solid #2F558E");
    $(".login").css("color", "black");
    $(".signup").css("background", "#BDBDBD");
    $(".signup").css("border-top", "8px solid #BDBDBD");
    $(".signup").css("color", "gray");
  });

  // Click 'Sign up' at the top to switch to the sign-up form
  $(".signup").click(function() {
    $(".login-form").hide();
    $(".signup-form").fadeIn(600);   // Use function 'fadeIn()' for smooth screen transition
    $(".signup-nextform").hide();

    $(".login").css("background", "#BDBDBD");
    $(".login").css("border-top", "8px solid #BDBDBD");
    $(".login").css("color", "gray");
    $(".signup").css("background", "lightgray");
    $(".signup").css("border-top", "8px solid #2F558E");
    $(".signup").css("color", "black");
  });

  // When the user enters ID(email) in the login form, the program checks the format in real-time
  $("#id").keyup(function(){
    checkID();  // Execute function that validates the entered ID(email) format in the login form
  });

  // When the user enters password in the login form, the program checks the format in real-time
  $("#pw").keyup(function(){
    checkPW();  // Execute function that validates the entered password format in the login form
  });

  // When the user enters something in the sign-up form, the program checks the entire format in real-time
  $(".checkSignup").keyup(function(){
    checkSignup();  // Execute function that validates the entire format in the sign-up form
  });

  // When the user selects gender in the sign-up form, the program checks the entire format in real-time
  $(".checkRadio").change(function(){
    checkSignup();  // Execute function that validates the entire format in the sign-up form
  });

  // When 'Login' button is clicked,
  $(".loginButton").click(function(){
    checkID();  // Execute function that validates the entered ID(email) format
    checkPW();  // Execute function that validates the entered password format

    // If the entered id(email) and password format is validate, proceed to the next step
    if (idValidate && pwValidate) {
      let inputID = id.value;
      let inputPW = pw.value;

      // If there is a data pair matching the entered id(email) and password in the session stage, the login-success screen is displayed
      if (inputPW == sessionStorage.getItem(inputID)) {
        $(".login").hide();
        $(".signup").hide();
        $(".login-form").hide();
        $(".login-nextform").fadeIn(600);
      }
      // Otherwise, output message that credentials do not match
      else {
        $(".login-form .explanation").html("<h3 class='explanation'> Credential do not match! </h3>");
        $(".login-form .explanation").css("color", "red");
      }
    }
  });

  //  When 'Sign Up' button is clicked,
  $(".signupButton").click(function(){
    checkSignup();  // Execute function that validates the entire format

    // If the entired format is validate, proceed to the next step
    if (firstnameValidate && lastnameValidate && genderValidate && emailValidate && passwordValidate && confirmPasswordValidate) {
      let userID = email.value;
      let userPW = password.value;
      sessionStorage.setItem(userID, userPW);  // Store user-entered id(email) and password in the session storage

      // Display sign-up success screen
      $(".signup-form").hide();
      $(".signup-nextform").fadeIn(600);
    }
  });


  // Function that validates the entered ID(email) format in the login form
  function checkID() {
    const idValue = id.value.trim();

    // The case that user do not enter ID(email)
    if (idValue == '') {
      setLoginFailure(id, "Please enter your email!");  // Execute the format error function
      idValidate = false;
    }

    // The case that user enter invalid ID(email) format
    else if (!validateEmail(idValue)) {
      setLoginFailure(id, "Your email address is invalid!");  // Execute the format error function
      idValidate = false;
    }

    // The case that user enter valid ID(email) format
    else {
      setLoginSuccess(id);  // Execute the format normal function
      idValidate = true;
    }
  }

  // Function that validates the entered password format in the login form
  function checkPW() {
    const pwValue = pw.value.trim();

    // The case that user do not enter password
    if (pwValue == '') {
      setLoginFailure(pw, "Please enter your password!");  // Execute the format error function
      pwValidate = false;
    }
    // The case that user enter invalid password format
    else if (!digitPattern.test(pwValue) || !lowerPattern.test(pwValue) || !upperPattern.test(pwValue) || !specialPattern.test(pwValue) || pwValue.length < 6) {
      setLoginFailure(pw, "Requirement: at least 6 characters, 1 capital letter,\n 1 lowercase letter, 1 digit and 1 special character!");  // Execute the format error function
      pwValidate = false;
    }
    // The case that user enter valid password format
    else {
      setLoginSuccess(pw);  // Execute the format normal function
      pwValidate = true;
    }
  }

  // Function that validates the entire format in the sign-up form
  function checkSignup() {
    const firstnameValue = firstname.value.trim();
    const lastnameValue = lastname.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const confirmPasswordValue = confirmPassword.value.trim();

    let startFirstName = firstnameValue.charAt(0);
    let startLastName = lastnameValue.charAt(0);

    // Validate the entered firstname format in the sign-up form
    // The case that user do not enter firstname
    if (firstnameValue == '') {
      setSignupFailure(firstname, "Please enter your first name!");  // Execute the format error function
      firstnameValidate = false;
    }
    // The case that user enter firstname that does not start with a capital letter
    else if (startFirstName != startFirstName.toUpperCase()) {
      setSignupFailure(firstname, "First name should start with a capital letter!");  // Execute the format error function
      firstnameValidate = false;
    }
    // The case that user enter firstname with numbers
    else if (digitPattern.test(firstnameValue)) {
      setSignupFailure(firstname, "First name cannot contain numbers!");  // Execute the format error function
      firstnameValidate = false;
    }
    // The case that user enter firstname with special characters
    else if (specialPattern.test(firstnameValue)) {
      setSignupFailure(firstname, "First name cannot contain special characters!");  // Execute the format error function
      firstnameValidate = false;
    }
    // The case that user enter valid firstname format
    else {
      setSignupSuccess(firstname);  // Execute the format normal function
      firstnameValidate = true;
    }

    // Validate the entered lastname format in the sign-up form
    // The case that user do not enter lastname
    setSignupFailure(lastname, "Please enter your last name!");  // Execute the format error function
    if (lastnameValue == '') {
      lastnameValidate = false;
    }
    // The case that user enter lastname that does not start with a capital letter
    else if (startLastName != startLastName.toUpperCase()) {
      setSignupFailure(lastname, "Last name should start with a capital letter!");  // Execute the format error function
      lastnameValidate = false;
    }
    // The case that user enter lastname with numbers
    else if (digitPattern.test(lastnameValue)) {
      setSignupFailure(lastname, "Last name cannot contain numbers!");  // Execute the format error function
      lastnameValidate = false;
    }
    // The case that user enter lastname with special characters
    else if (specialPattern.test(lastnameValue)) {
      setSignupFailure(lastname, "Last name cannot contain special characters!");  // Execute the format error function
      lastnameValidate = false;
    }
    // The case that user enter valid lastname format
    else {
      setSignupSuccess(lastname);  // Execute the format normal function
      lastnameValidate = true;
    }

    // Validate the entered gender format in the sign-up form
    // The case that gender is not selected
    if (!$("input:radio[name=gender]").is(":checked")) {
      $(".checkRadio i").css("visibility", "hidden");
      $(".checkRadio button").css("visibility", "visible");
      genderValidate = false;
    }
    // The case that gender is selected
    else {
      $(".checkRadio i").css("visibility", "visible");
      $(".checkRadio button").css("visibility", "hidden");
      genderValidate = true;
    }

    // Validate the entered email format in the sign-up form
    // The case that user do not enter email
    if (emailValue == '') {
      setSignupFailure(email, "Please enter your email!");  // Execute the format error function
      emailValidate = false;
    }
    // The case that user enter invalid email format
    else if (!validateEmail(emailValue)) {
      setSignupFailure(email, "Your email address is invalid!");  // Execute the format error function
      emailValidate = false;
    }
    // The case that user enter valid email format
    else {
      setSignupSuccess(email);  // Execute the format normal function
      emailValidate = true;
    }

    // Validate the entered password format in the sign-up form
    // The case that user do not enter password
    if (passwordValue == '') {
      setSignupFailure(password, "Please enter your password!");  // Execute the format error function
      passwordValidate = false;
    }
    // The case that user enter invalid password format
    else if (!digitPattern.test(passwordValue) || !lowerPattern.test(passwordValue) || !upperPattern.test(passwordValue) || !specialPattern.test(passwordValue) || passwordValue.length < 6) {
      setSignupFailure(password, "Requirement: at least 6 characters, 1 capital letter,\n 1 lowercase letter, 1 digit and 1 special character!");  // Execute the format error function
      passwordValidate = false;
    }
    // The case that user enter valid password format
    else {
      setSignupSuccess(password);  // Execute the format normal function
      passwordValidate = true;
    }

    // Validate the entered confirm password format in the sign-up form
    // The case that user do not enter confirm password
    if (confirmPasswordValue == '') {
      setSignupFailure(confirmPassword, "Please re-enter your password!");  // Execute the format error function
      confirmPasswordValidate = false;
    }
    // The case that entered confirm password does not match with password
    else if (confirmPasswordValue != passwordValue) {
      setSignupFailure(confirmPassword, "Password does not match!");  // Execute the format error function
      confirmPasswordValidate = false;
    }
    // The case that entered confirm password match with password
    else {
      setSignupSuccess(confirmPassword);  // Execute the format normal function
      confirmPasswordValidate = true;
    }
  }

  // Function that validate entered email format
  function validateEmail(input) {
    let format = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return format.test(input);
  }

  // Format error function (login form)
  function setLoginFailure(input, message) {
    // Indicate that the input is in the invalid format and display the error message
    const check = input.parentElement;
    const errorMessage = check.querySelector("button");
    check.className = "checkLogin failure";
    errorMessage.innerText = message;
  }

  // Format normal function (login form)
  function setLoginSuccess(input) {
    // Indicate that the input is in the valid format
    const check = input.parentElement;
    check.className = "checkLogin success";
  }

  // Format error function (sign-up form)
  function setSignupFailure(input, message) {
    // Indicate that the input is in the invalid format and display the error message
    const check = input.parentElement;
    const errorMessage = check.querySelector("button");
    check.className = "checkSignup failure";
    errorMessage.innerText = message;
  }

  // Format normal function (sign-up form)
  function setSignupSuccess(input) {
    // Indicate that the input is in the valid format
    const check = input.parentElement;
    check.className = "checkSignup success";
  }
});
