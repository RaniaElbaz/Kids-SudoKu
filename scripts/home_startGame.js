/**
 * Starts the game 
 * handles finishing the game (before and after timer ends)
 * @param {int} timerID : interval ID retuned from setInterval
 * @param {string} minutes : initial value for minutes "01"
 * @param {string} seconds : initial value for seconds "20"
 * @returns timer ID from the setInterval
 */
const startGame = (timerID, minutes, seconds) => {
    if(!timerID){ //check if an interval has already started
        /********************************************************************Start game */
        if(data.level == 1){
            loadBoard4(); //load 4x4 for level 1
        } else if(data.level == 2) {
            loadBoard9(); //load 9x9 for level 2
        }
        //key down event
        window.addEventListener('keydown', getKeyAction);//end of key down

        const finishButton = document.querySelector('#finish_button');
        // if finished before timer ends -> set timer to 0
        finishButton.addEventListener('click', ()=>{ 
            minutes = '00';
            seconds = '00';
        });
        //**********************************************start timer
        timerID = setInterval(function(){
            //if solution loaded -> check if player solved the game
            if(solution) solveBoard();
            if(data.state == 'success') { //in case of beating the game
                showSuccessResult(); //pop up confirm dialog
                clearInterval(timerID); //stop the timer
            }
            seconds = parseInt(seconds); //cast string to numbers
            if(seconds == 0){ 
                minutes = parseInt(minutes);
                if(minutes > 0){ // 1:00
                    minutes--;
                    minutes = '0' + minutes;
                    seconds = 59; 
                    //update Timer on screen
                    showTimer(minutes, seconds);
                } else if(minutes == 0){ //00:00
                    minutes = '00';
                    seconds = '00';
                    /************************************************************End game */
                    clearInterval(timerID); //stop timer
                    solveBoard();
                    window.removeEventListener('keydown', getKeyAction); //remove key down accessibility
                    //show result
                    if(data.state == 'fail'){//in case of failing the game
                        showFailResult();
                    } else { //in case of beating the game
                        showSuccessResult();
                    }
                }
            } else if(seconds > 0){ 
                seconds--;
                if(seconds < 10){
                    seconds = '0' + seconds;
                }
                //update Timer on screen
                showTimer(minutes, seconds);
            }
            //update Timer on screen
            showTimer(minutes, seconds);
        },1000);//end of setInterval
    }
    return timerID;
}