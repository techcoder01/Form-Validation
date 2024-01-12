const form = document.querySelector('#form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');


function showError(input, message){
    const formControl = input.parentElement;
    formControl.className = 'form-control error'

    const small = formControl.querySelector('small');
    small.innerText = message
}

function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success'
}
  
  function getFeildName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
  }

  
form.addEventListener('submit', (e) => {
    e.preventDefault();

    checkRequired([username, email, password, password2]);
    checkEmail(email);
    checkLength(username, 3, 15);
    checkPassword(password)
    checkPasswordsMatch(password, password2)
})

function checkRequired(inputArr){
    inputArr.forEach(input => {
        if(input.value.trim() === ''){
            showError(input, `${getFeildName(input)} is Required`)
        } else {
            showSuccess(input)
        }
    });
  }

  function checkEmail(input){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(input.value.trim() === ''){
        showError(input, `${getFeildName(input)} is Required`)
    } 
     else if(re.test(input.value)){
        showSuccess(input)
    } else {
        showError(input, "Email is not Valid")
    }
    
  }

  function checkPassword(input) {
    // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number, and one special character:
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,20}$/;

    const formControl = input.parentElement;
    formControl.className = "form-control error"
    const p = formControl.querySelector('p');

    if (input.value.trim() === '') {
        showError(input, `${getFeildName(input)} is Required`);
        p.innerText = '';
    } else if (re.test(input.value)) {
        showSuccess(input);
        // Clear any previous error message
        p.innerText = '';
    } else {
        showError(input, 'Password is not Valid');
        // Set the error message and class on the parent element
        p.innerText = 'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number, and one special character';
    }
}


  function checkLength(input , min , max){
    if(input.value.length < min){
        showError(input, `${getFeildName(input)} should be at least ${min}`)
    } 
    else if(input.value.length > max){
        showError(input, `${getFeildName(input)} should be less than ${max}`)
    }
    else {
        showSuccess(input)
    } 
  }


  function checkPasswordsMatch(input1, input2){
    if(input1.value !== input2.value) showError(input2, "Password do not match")
  }