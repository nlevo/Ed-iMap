//$(document).ready(function(){
    var usStates = [
        'ALABAMA',
        'ALASKA',
        'ARIZONA',
        'ARKANSAS',
        'CALIFORNIA',
        'COLORADO',
        'CONNECTICUT',
        'DELAWARE',
        'FLORIDA',
        'GEORGIA',
        'HAWAII',
        'IDAHO',
        'ILLINOIS',
        'INDIANA',
        'IOWA',
        'KANSAS',
        'KENTUCKY',
        'LOUISIANA',
        'MAINE',
        'MARYLAND',
        'MASSACHUSETTS',
        'MICHIGAN',
        'MINNESOTA',
        'MISSISSIPPI',
        'MISSOURI',
        'MONTANA',
        'NEBRASKA',
        'NEVADA',
        'NEW HAMPSHIRE',
        'NEW JERSEY',
        'NEW MEXICO',
        'NEW YORK',
        'NORTH CAROLINA',
        'NORTH DAKOTA',
        'OHIO',
        'OKLAHOMA',
        'OREGON',
        'PENNSYLVANIA',
        'RHODE ISLAND',
        'SOUTH CAROLINA',
        'SOUTH DAKOTA',
        'TENNESSEE',
        'TEXAS',
        'UTAH',
        'VERMONT',
        'VIRGINIA',
        'WASHINGTON',
        'WEST VIRGINIA',
        'WISCONSIN',
        'WYOMING'
    ]
//enabling confirmation in javascript

///Rules button
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//SKIP QUESTION
$('#skip').click(function(e){
    createQuestion();
    game.skippedQuestions++;
    game.questionCounter--;
})



//updates button based on user selection (works for Choose DIFFUCULTY, Choose MODE and Choose MAP buttons ONLY)
$('.dropdown-menu').click(function(e){
    e.currentTarget.parentNode.getElementsByClassName('btn')[0].innerText = e.target.innerText;
})

//random button
$('#btn-random').click(function(e){
    //pulling number of item choices from dropdown menu
    var chooseModeRandom = e.target.parentNode.childNodes[7].childNodes[3].getElementsByClassName('dropdown-item').length
    var chooseMapRandom = e.target.parentNode.childNodes[9].childNodes[3].getElementsByClassName('dropdown-item').length
    //creating a random index
    chooseModeRandom = Math.floor(Math.random() * chooseModeRandom);
    chooseMapRandom = Math.floor(Math.random() * chooseMapRandom);
    //assign random mode and map
    var chooseMode = document.getElementById('top-start').childNodes[7].getElementsByClassName('btn')[0];
    chooseMode.textContent = document.getElementById('top-start').childNodes[7].getElementsByClassName('dropdown-menu')[0].childNodes[(1+2*chooseModeRandom)].textContent;
    var chooseMap = document.getElementById('top-start').childNodes[9].getElementsByClassName('btn')[0];
    chooseMap.textContent = document.getElementById('top-start').childNodes[9].getElementsByClassName('dropdown-menu')[0].childNodes[(1+2*chooseMapRandom)].textContent;
})

function confirmQuit() {
    var result = confirm("Are you sure?");
    if(result === true)
        quitGame();
}

// START button event
$('#btn-start').click(function(e){
    //map.areasSettings.selectable = true;
    //map.validateNow();
    
    //set progresss bar - default
    
    if(($('#diff').text().includes('Choose DIFFICULTY'))){
        alert('Please choose the game DIFFICULTY!');
        return;
    }
    else if(($('#mode').text().includes('Choose MODE'))){
        alert('Please choose the game MODE!');
        return;
    }
    else if(($('#map').text().includes('Choose MAP'))){
        alert('Please choose the game MAP!');
        return;
    }

    $('#progress-bar-initial').text("0%");
    $('#progress-bar-initial').attr("style", "width:3%");
    $('#questions-stat').text("Correct: " + game.correctAnswer + "\/" + game.maxQuestions);
    $('.game-stats').hide();
    $('#question').removeClass('d-none');
    
    game.gameOn = true;
    $('#top-start').hide();
    $('#top-info').removeClass("d-none");
    $('#progress-bar').removeClass("d-none");
    $('#top-menu').removeClass("d-none");
    //console.log(document.getElementById('top-start').childNodes[7].getElementsByClassName('btn')[0].textContent)
    //display current game MODE in the question box
    $('#question h3').text(document.getElementById('top-start').childNodes[7].getElementsByClassName('btn')[0].textContent);    
    createQuestion();
    setStartBtn();
    
})
// QUIT button event
function quitGame(){
    $('#top-start').show();
    $('#top-info').addClass("d-none"); 
    $('#progress-bar').addClass("d-none");
    $('#top-menu').addClass("d-none");
    $('#question p').remove();
    $('#question img').remove();
    game = new Game (usStates);
    $('#question').addClass('d-none');
    //map.areasSettings.selectable = false;
    //map.validateNow();
}

//CREATE A QUESTION
function Game(array) {
    this.answer = '';
    this.maxQuestions = 20;
    this.questionCounter = 0;
    this.correctAnswer = 0;
    this.incorrectAnswer = 0;
    this.points = 0;
    this.dataArray = [];
    this.gameOn = false;
    this.skippedQuestions = 0;
    this.intervalId = 0;
    this.currentTime = 0;

    if (array) {
        this.dataArray = array.slice(0);
    }
    this.removeItem = function(index){
        this.dataArray.splice(index, 1);
    };
}


//update 

var game = new Game(usStates);
var onOff;

function createQuestion(){
    var ratio = Math.floor(100/game.maxQuestions);
    game.questionCounter++;
    $('#progress-bar-initial').text((ratio*(game.questionCounter)) + "%");
    $('#progress-bar-initial').attr("style", "width:" + (ratio*game.questionCounter) + "%");
    
    if(checkIfGameOver())
        return;
    restartMap();
    $('#question p').remove();
    $('#question img').remove();
    var randomIndex = Math.floor(Math.random() * game.dataArray.length);
    game.answer = game.dataArray[randomIndex];
    $('#question').append("<p>Click on: <br>" + game.answer + "</p>");
    $('#question').append("<img src=\"images/" + game.answer + ".jpg\" class=\"img-fluid\" alt=\"Responsive image\">");
    game.removeItem(randomIndex);
    
}

function checkIfGameOver(){
    if(game.maxQuestions <= game.questionCounter-1 || game.dataArray.length === 0 ){
        $('.game-stats').show();
        var ratio = (100/(game.maxQuestions+game.skippedQuestions)).toFixed(2);
        game.stopClick();
        setStopBtn();
        //update final stats bars
        $('#correct').text("Correct " + (ratio*(game.correctAnswer)).toFixed(2) + "%");
        $('#correct').attr("style", "width:" + (ratio*game.correctAnswer).toFixed(2) + "%");
        $('#skipped').text("Skipped " + (ratio*(game.skippedQuestions)).toFixed(2) + "%");
        $('#skipped').attr("style", "width:" + (ratio*game.skippedQuestions).toFixed(2) + "%");
        $('#incorrect').text("Incorrect " + (ratio*(game.incorrectAnswer)).toFixed(2) + "%");
        $('#incorrect').attr("style", "width:" + (ratio*game.incorrectAnswer).toFixed(2) + "%");
        
        //hide progress bar
        $('#progress-bar-initial').hide();

        $('#question p').remove();
        restartMap();
        //quitGame();
        //alert("Game is over");
    }
}

// Constructor prototype

Game.prototype.startClick = function () {
    var that = this;
    this.intervalId = setInterval(function () {
        that.currentTime ++;
      }, 1000);
};

Game.prototype.setMinutes = function () {
    return Math.floor(this.currentTime / 60);
};

Game.prototype.setSeconds = function () {
    return this.currentTime - (this.setMinutes() * 60)
};

Game.prototype.twoDigitsNumber = function (value) {
    if(value < 10)
        return ('0' + value.toString());
    else
        return value.toString();
};

Game.prototype.setTime = function () {
    var minutes = this.twoDigitsNumber(this.setMinutes());
    var seconds = this.twoDigitsNumber(this.setSeconds());
    return (minutes).toString() + ":" + (seconds).toString();
};

Game.prototype.stopClick = function () {
    clearInterval(this.intervalId);
};

Game.prototype.resetClick = function () {
    this.currentTime = 0;
};


function printTime(selector) {
    $('#time').text("Time: " + game.setTime() + " sec");
}

function setStopBtn() {
    game.stopClick();
    clearInterval(onOff);
}

function setStartBtn() {
    game.startClick();
    onOff = setInterval(function () {
        printTime();
      }, 10);
};