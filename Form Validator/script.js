const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

//show error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

//show success
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

// Solution 1 of checkrequired funtion if your using this function then comment the second solution of listener function
//Check required fields
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

//Solution2 of checkrequired function if your using this function then comment the solution 1 of event listener function
// function checkRequired(input) {
//   const value = input.value.trim();
//   if (value === "") {
//     showError(input, `${getFieldName(input)} is required`);
//   } else {
//     showSuccess(input);
//   }
// }

//Check email is valid
function checkEmail(input) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
}

//check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

//Check password match
function checkPasswordMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input1, "Passwords do not match");
  }
}

//Get field name
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}


//Solution 1 of Event Listener use solution 1 of checkRequired
//Event Listener
form.addEventListener("submit", function (e) {
  e.preventDefault();

  //checking required fields
  checkLength(username, 3, 15);
  checkLength(password, 6, 10);
  checkEmail(email);
  checkPasswordMatch(password, password2);

  checkRequired([username, email, password, password2]);

  // If required fields are filled, then check other validations
  if (username.parentElement.classList.contains("success")) {
    checkLength(username, 3, 15);
  }
  if (password.parentElement.classList.contains("success")) {
    checkLength(password);
  }
  if (email.parentElement.classList.contains("success")) {
    checkEmail(email);
  }
  if (
    password.parentElement.classList.contains("success") &&
    password2.parentElement.classList.contains("success")
  ) {
    checkPasswordMatch(password2, password);
  }
});


//Solution 2 of Event Listener use solution 2 of checkRequired
//Event Listener

// form.addEventListener("submit", function (e) {
//   e.preventDefault();

//   const validations = [
//     { input: username, functions: [checkRequired, checkLength], args: [3, 15] },

//     { input: email, functions: [checkRequired, checkEmail] },

//     {
//       input: password,
//       functions: [checkRequired],
//     },

//     {
//       input: password2,
//       functions: [checkRequired, checkPasswordMatch],
//       args: [password],
//     },
//   ];

//   validations.forEach(({ input, functions, args }) => {
//     const parentClassList = input.parentElement.classList;

//     // Check required first
//     checkRequired(input);

//     // If required field is filled, then check other validations
//     if (parentClassList.contains("success")) {
//       functions.forEach((func) => func(input, ...(args || [])));
//     }
//   });
// });
