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
    game.gameOn = true;
    console.log(map.areasSettings.selectable);
    $('#top-start').hide();
    $('#top-info').removeClass("d-none");
    $('#progress-bar').removeClass("d-none");
    $('#top-menu').removeClass("d-none");
    //console.log(document.getElementById('top-start').childNodes[7].getElementsByClassName('btn')[0].textContent)
    //display current game MODE in the question box
    $('#question h3').text(document.getElementById('top-start').childNodes[7].getElementsByClassName('btn')[0].textContent);    
    createQuestion();
    
})
// QUIT button event
function quitGame(){
    $('#top-start').show();
    $('#top-info').addClass("d-none"); 
    $('#progress-bar').addClass("d-none");
    $('#top-menu').addClass("d-none");
    $('#question p').remove();
    game.gameOn = false;
    //map.areasSettings.selectable = false;
    //map.validateNow();
}

//CREATE A QUESTION
function Game(array) {
    console.log(array);
    this.answer = '';
    this.maxQuestions = 20;
    this.questionCounter = 14;
    this.dataArray = [];
    this.gameOn = false;
    this.points = 0;
    if (array) {
        this.dataArray = array.slice(0);
    }
    this.removeItem = function(index){
        this.dataArray.splice(index, 1);
    };
}

//update 

var game = new Game(usStates);

var answer = '';
var maxQuestions = 20;

function createQuestion(){
    if(checkIfGameOver())
        return;
    restartMap();
    $('#question p').remove();
    var randomIndex = Math.floor(Math.random() * game.dataArray.length);
    game.answer = game.dataArray[randomIndex];
    $('#question').append("<p>Click on: <br>" + game.answer + "</p>");
    game.removeItem(randomIndex);
    game.questionCounter++;
}

function checkIfGameOver(){
    if(game.maxQuestions <= game.questionCounter-1){
        $('#question p').remove();
        restartMap();
        quitGame();
        alert("Game is over");
    }
}


