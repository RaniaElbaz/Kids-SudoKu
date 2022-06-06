//Global Variables
let data = {}; //object -> username, level(1/2), group(1/2), state('fail'/'success')
//image groups
let setOfImages = ['ben', 'pokemon', 'sponge', 'avengers'];
//selected images
let images = []; //array of strings: images source
let toBeSent = {}; //holds board 9x9 to be encoded and posted to the API 
let solution = null; //holds solution of 4x4 or 9x9 board

//load event
window.addEventListener('load', ()=>{
    //timer variables
    let minutes = ""; //timer - minutes
    let seconds = ""; //timer - seconds
    let timerID = 0; // returned value from setInterval

    //DOM Selectors
    const usernameSpan = document.querySelector('#username_span');
    const startButton = document.querySelector('#start_button');
    const smallGrid = document.querySelector('.small_grid');
    const bigGrid = document.querySelector('.big_grid');

    /*************************Collect Data */
    //Get query string
    let queryString = location.search;
    let pairs = queryString.substring(1).split("&");  //[username=ray, level=level1]
    //parse the string
    for(let i = 0; i < pairs.length; i++) {
        //Look for "key=value" pairs
        let pos = pairs[i].indexOf('=');  
        if (pos == -1) continue;  //not found
        //Extract the key
        let key = pairs[i].substring(0,pos);  
        //Extract the value
        let value = pairs[i].substring(pos+1);  
        value = decodeURIComponent(value);  //Decode the value
        data[key] = value//data.group = 1 or 2
    }
    //get username from storage
    data.username = localStorage.getItem('username');
    //get level from storage
    data.level = localStorage.getItem('level');

    //show welcome + username
    usernameSpan.innerText = data.username;
    
    if(data.level == 1){
        minutes = '01'; //seconds
        seconds = '00';
        showTimer(minutes, seconds); //show timer
        //show selected set of Images
        showImages(4, data.group); //show images to be selected
        //show small grid only
        smallGrid.classList.replace('d-none', 'd-block'); 

    } else if(data.level == 2){
        minutes = '02'; //minutes
        seconds = '00';
        showTimer(minutes, seconds);//show timer
        //show selected set of Images
        showImages(9, data.group);
        //show big grid only
        bigGrid.classList.replace('d-none', 'd-block'); 
    }

    /************start timer => start game */
    startButton.addEventListener('click',()=>{
        timerID = startGame(timerID, minutes, seconds);
    });// end of timer

    // console.log(data); //holds player details
}); //end of load

