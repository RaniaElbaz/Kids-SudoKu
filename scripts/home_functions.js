/***************** render elements functions */
/**
 * show timer on screen
 * @param {string} minutes : starting minutes value '01'
 * @param {string} seconds : starting seconds value '30'
 */
const showTimer = function(minutes = '', seconds = ''){
    const timerText = document.querySelector('#timer'); //<h2>
    timerText.innerText = `${minutes} : ${seconds}`;
}
/**
 * show selected set of images
 * @param {int} length : number of images to be shown
 * @param {int} groupNumber : number of the selected group
 */
const showImages = (length, groupNumber) => {
    let container = document.querySelector('.select_container');
    /********** loop on images */
    for(let index = 0; index < length; index++){
        //create figure > img > figcaption
        let figureElement = document.createElement('figure');
        let imageElement = document.createElement('img');
        let captionElement = document.createElement('figcaption');
        // figure style
        if(length == 4){
            figureElement.classList.add('image_small_container');
        } else if(length == 9){
            figureElement.classList.add('image_big_container');
        }
        // img style
        imageElement.src = `assets/${setOfImages[groupNumber-1]}/${index}.png`; //assign img src
        imageElement.alt = 'not found';
        // figcaption text
        captionElement.innerText = index+1;
        //save images urls
        images.push(imageElement.src);
        //append in HTML
        figureElement.appendChild(imageElement);
        figureElement.appendChild(captionElement);
        container.appendChild(figureElement);
    }
}
/**
 * mark selected cell 
 * @param {Element Node} previousElement : element before selection
 * @param {Element Node} currentElement : element after selection
 */
const markSelected = (previousElement, currentElement) => {
    //swap selected class
    previousElement.classList.remove('selected');
    currentElement.classList.add('selected');
}
/**
 * assign selected image to selected cell
 * @param {Element Node} cellElement : selected cell to change its backgrouund
 * @param {int} index : sepcifies which image in "images" array
 */
const setbackgroundImage = (cellElement, index) =>{
    //assign background image
    cellElement.style.backgroundImage = `url(${images[index]})`;
    //style background image
    cellElement.style.backgroundPosition = "center";
    cellElement.style.backgroundSize = "contain";
    cellElement.style.backgroundRepeat = "no-repeat";
}
/** 
 * assign key down actions 
 * @param {event} event : key down action
 */
const getKeyAction = (event) => {
    let currentCell = null;
    let selectedCell = null;
    let parent = null; //inner row
    let row = null; //outer row

    // console.log(event.key);
    //get which cell is pre-selected
    if(data.level == 1){
        currentCell = document.querySelector('.small_grid .selected');
    } else if(data.level == 2){
        currentCell = document.querySelector('.big_grid .selected');
    }

    switch(event.key){
        case 'ArrowLeft': //<<<
            selectedCell =  currentCell.previousElementSibling; //left cell
            if(!selectedCell){ //if not exists
                parent = currentCell.parentElement; // row
                selectedCell = parent.lastElementChild; //last left cell -> last cell again)
            }
            markSelected(currentCell, selectedCell); //mark new selected cell
            break;
        case 'ArrowRight'://>>>
            selectedCell =  currentCell.nextElementSibling; //right cell
            if(!selectedCell){ //if not exists
                parent = currentCell.parentElement; //row
                selectedCell = parent.firstElementChild; //last right cell -> first cell again
            }
            markSelected(currentCell, selectedCell);
            break;
        case 'ArrowUp':
            parent = currentCell.parentElement; // inner row
            if(parent){ //only if exists
                row = parent.previousElementSibling; // prv row
                if(row){
                    const index = findSelectedIndex(currentCell); // index of current cell in a row
                    selectedCell = row.children[index]; // select cell at the same index in prv row
                    markSelected(currentCell, selectedCell);
                } 
                else { // only in big grid
                    row = parent.parentElement; // outer row
                    if(row) row = row.previousElementSibling;
                    if(row){
                        row = row.lastElementChild;
                        const index = findSelectedIndex(currentCell); // index of current cell in a row
                        selectedCell = row.children[index]; // select cell at the same index in prv row
                        markSelected(currentCell, selectedCell);
                    }
                }
            }
            break;
        case 'ArrowDown':
            parent = currentCell.parentElement; //inner row
            if(parent){//only if exists
                row = parent.nextElementSibling; //next inner row
                if(row){ //if exists
                    const index = findSelectedIndex(currentCell); // index of current cell in a row
                    selectedCell = row.children[index]; // select cell at the same index in nnext row
                    markSelected(currentCell, selectedCell);
                }
                else {
                    row = parent.parentElement; //outer row
                    row = row.nextElementSibling;//next outer row
                    if(row){//
                        row = row.firstElementChild;
                        const index = findSelectedIndex(currentCell); // index of current cell in a row
                        selectedCell = row.children[index]; // select cell at the same index in prv row
                        markSelected(currentCell, selectedCell);
                    }
                }
            }
            break;
        case '1':
            //if selected cell wasnt preloaded
            if(!currentCell.classList.contains('preset')) setbackgroundImage(currentCell, 0);//assign selected image
            break;
        case '2':
            if(!currentCell.classList.contains('preset')) setbackgroundImage(currentCell, 1);
            break;
        case '3':
            if(!currentCell.classList.contains('preset')) setbackgroundImage(currentCell, 2);
            break;
        case '4':
            if(!currentCell.classList.contains('preset')) setbackgroundImage(currentCell, 3);
            break;
        case '5':
            //if selected cell wasnt preloaded and the board is 9x9
            if(!currentCell.classList.contains('preset') && data.level == 2) setbackgroundImage(currentCell, 4);//assign selected image
            break;
        case '6':
            if(!currentCell.classList.contains('preset') && data.level == 2) setbackgroundImage(currentCell, 5);
            break;
        case '7':
            if(!currentCell.classList.contains('preset') && data.level == 2) setbackgroundImage(currentCell, 6);
            break;
        case '8':
            if(!currentCell.classList.contains('preset') && data.level == 2) setbackgroundImage(currentCell, 7);
            break;
        case '9':
            if(!currentCell.classList.contains('preset') && data.level == 2) setbackgroundImage(currentCell, 8);
            break;
    }
}
/***************** other functions */
/**
 * find child cell index 
 * @param {Element Node} selectedCell 
 * @returns index of a selected cell in a row: -1 on error
 */
const findSelectedIndex = (selectedCell) => {
    let index = -1;
    const parentRow = selectedCell.parentElement; //get row
    let cellsArray = Array.prototype.slice.call(parentRow.children); //cast collection to array
    index = cellsArray.indexOf(selectedCell); //get the index
    return index;
}
/**
 * pop up a confirm dialog with a success result
 */
const showSuccessResult = () => {
    let result = 0;
    result = window.confirm('Hoorray!!! Play Again?');
    if(result) {
        location.reload(); //refresh page to play again
    }
    else {
        history.go(-2); //go back twice
    }
}
/**
 * pop up a confirm dialog with a fail result
 */
 const showFailResult = () => {
    let result = 0;
    result = window.confirm('Try Again Maybe??');
    if(result) {
        location.reload(); //refresh page to play again
    }
    else {
        history.go(-2); //go back twice
    }
}
//encode a board to post
const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '');
const encodeParams = (params) => Object.keys(params).map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`).join('&');
/****************** board generator */
/**
 * load board 4x4 into the grid and get its solution
 * API: https://sudoku-api.deta.dev/?type=4
 * return: {board:"" solution:""}
 * null entities in board = "."
 */
const loadBoard4 = async () =>{
    let boardObject = null; //api returned object
    //all rows
    let rows = document.querySelectorAll('.small_grid_row .grid_row'); //4 rows
    let stringIndex = 0; //index 
    try{
        const response = await fetch(`https://sudoku-api.deta.dev/?type=4`);
        boardObject =  await response.json();
        solution = boardObject.solution; //soultion grid 4x4
        console.log(solution);
        // console.log(boardObject.board);
        for(let index=0; index < rows.length; index++){
            let cells = rows[index].children; //cells in a row
            for(let cell of cells) {
                let boardNumber = boardObject.board[stringIndex];
                if(!isNaN(parseInt(boardNumber))){ //check if its a number after casting to Number
                    // console.log(boardNumber);
                    setbackgroundImage(cell, boardObject.board[stringIndex]-1);
                    cell.classList.add('preset'); //mark loaded cell to not be changed after
                }
                stringIndex++;
            }
        }
    } catch (error) {
        console.log('fetching 4x4 error');
        console.log(error);
    }
}
/**
 * load board 9x9 into the grid (GET)
 * API: https://sugoku.herokuapp.com/board?difficulty=easy
 * response.json: {board:[Array[9]..*9]}
 * null entities in board = 0
 * ***************************
 * Save solution of the loaded board (POST)
 * API: https://sugoku.herokuapp.com/solve
 * response.json: [Array[9]..*9]
 */
const loadBoard9 = async () =>{
    //all rows
    let rows = document.querySelectorAll('.big_grid_row .grid_row'); //9 rows
    try{
        let boardIndex=0;
        //GET Board values
        const boardResponse = await fetch('https://sugoku.herokuapp.com/board?difficulty=easy');
        const boards = await boardResponse.json();
        toBeSent.board = boards.board; //save board values
        try {
            //POST Board values to GET Solution values
            const solutionResponse = await fetch('https://sugoku.herokuapp.com/solve', {
                method: 'POST', //to get the solution of that board
                body: encodeParams(toBeSent), //encode the board to be sent
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            const solutions = await solutionResponse.json();        
            //save solution values (2D Array)
            solution = solutions.solution;
            console.log(solution);
        }
        catch (error){
            console.log('Posting board 9x9 error');
            console.log(error);
        }
        //load board with images
        const allNumbers = boards.board.flat(); // flat the 2D array to 1D array with all entities
        for(let index=0; index < rows.length; index++){
            let cells = rows[index].children; //all cells in a row
            for(let cell of cells) {
                if(allNumbers[boardIndex] != 0){ //loop on all entities
                    setbackgroundImage(cell, allNumbers[boardIndex]-1);
                    cell.classList.add('preset'); //mark loaded cell to not be changed after
                }
                boardIndex++;
            }
        }
    } catch (error){
        console.log('fetching 9x9 error');
        console.log(error);
    }
}
/****************** board Solver */
/**
 * solve board 4x4 or 9x9
 */
const solveBoard = () => {
    let rows = null;
    if(data.level == 1){
        rows = document.querySelectorAll('.small_grid_row .grid_row'); //4 rows
    }
    else if (data.level == 2){
        rows = document.querySelectorAll('.big_grid_row .grid_row');// 9 rows
        if(solution) solution = solution.flat(); //2D -> 1D
    }
    if(solution) solver(solution, rows); //solve the board
}
/**
 * Validates the solution
 * @param {Array} solutionArray : solution array 1D 
 * @param {HTMLCollection} rows : rows of the grid to be solved HTMLCollection(4/9)
 */
const solver = (solutionArray, rows) => {
    let solutionIndex=0; //solution index
    for(let index=0; index < rows.length; index++){
        let cells = rows[index].children; //all cells in a row
        //loops on all cells in a row and the solution
        for(let cell of cells) {
            //"url("desired url string")" --> desired url string
            let imageIndex = images.indexOf(cell.style.backgroundImage.slice(5,-2)); //gets index of the specified url
            if((imageIndex+1) != solutionArray[solutionIndex]){
                data.state = 'fail'; //assign a new property "state" for the player win state
                break;
            }
            else{
                data.state = 'success';
            }
            solutionIndex++;
        }
    }
}