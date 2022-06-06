/**
 * checks if a string has special character
 * @param {string} string : string to be checked
 * @returns boolean : true if it contains special character, false if it doesnt contain special character
 */
const hasSpecialChars = function(string){
    let result = false;
    specialCharsArray = specialChars.split('');
    for (char of specialCharsArray){
        if(string.includes(char)){
            return true;
        }
    }    
    return result;   
}

const specialChars = `\`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~ `;

//load event
window.addEventListener('load', ()=>{
    const usernameBox = document.querySelector('input[name="username"]');
    const form = document.querySelector('form');
    const errorSpan = document.querySelector('#error_text');

    usernameBox.addEventListener('keypress', function(event){
        //if a number is pressed or a special character
        if(!isNaN(parseInt(event.key)) || hasSpecialChars(event.key)){
            //show error message
            errorSpan.innerText = 'must contain letters only';
            errorSpan.style.color = 'red';
            //prevent event
            event.preventDefault();
        } else if (this.value.length >= 10){
            // console.log(this.value);
            event.preventDefault();
            errorSpan.innerText = 'must be less than 10 letters';
            errorSpan.style.color = 'red';
        }
    });

    /* on submit */
    form.addEventListener('submit', function (event) {
        let username = usernameBox.value;
        //if username is empty
        if(username == ''){
            errorSpan.innerText = 'enter username';
            event.preventDefault();
        } 
        else {
            errorSpan.innerText = '';
        }
    });
});//end of load event