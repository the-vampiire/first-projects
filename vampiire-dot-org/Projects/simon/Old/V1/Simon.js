/**
 * Created by Vampiire on 5/14/17.
 */


// jQuery shorcuts
    var touch1 = $('#touch1'), touch2 = $('#touch2'), touch3 = $('#touch3'), touch4 = $('#touch4'), screen = $('#screen');

// global variables

var options = ["touch1", "touch2", "touch3", "touch4"], strict = false, pick, rand, mistake = 0, count = -1,
    moves = [], playerMoves = [], clicks = 0, timeoutFlash, timeOut;


// move map to trigger icon display and sound play

var moveMap = {
    "touch1" : {
        "sound" : $('#bat_screech'),
        "icon"  : $('#bat_icon')
    },

    "touch2" : {
        "sound" : $('#bubbling_sound'),
        "icon"  : $('#cauldron_icon')
    },

    "touch3" : {
        "sound" : $('#ghost_moan'),
        "icon"  : $('#ghost_icon')
    },

    "touch4" : {
        "sound" : $('#zombie_groan'),
        "icon"  : $('#zombie_icon')
    }
};

$('#power').on('click', pickMove);

$('.touch').on('click', function(){

    pick = $(this).attr('id');
    playerPick(pick);
    clicks++;

    if(clicks === moves.length){
        if(checkMoves()){
            pickMove();
        }
    }

});


function playerPick(move){
    flashIcon(move);
    playSound(move);
    playerMoves.push(move);
}


function pickMove(){

    if(checkMoves() && mistake < 1){
        randomPick();
        count++;
        screen.html(count);
        playBackMoves();
        playerMoves = [];
    }
    else if(mistake === 0){
        randomPick()
        playBackMoves();
        mistake++;
    }

    else{

        resetGame();
    }
}

function randomPick(){
    rand = Math.floor(Math.random()*options.length);
    moves.push(options[rand]);
}

function playBackMoves(){

    for(var i in moves){
        flashIcon(moves[i]);
        playSound(moves[i]);
    }
}

function playSound(move){
    var sound = moveMap[move].sound;
    sound.trigger("play");
}

function flashIcon(move){
    var icon = moveMap[move].icon;
    touchID = $('#'+move);
    touchID.addClass(move+"glow");
    icon.css("display", "block");
    timeoutFlash = setTimeout(function(){
        touchID.removeClass(move+"glow");
        icon.css("display", "none");
    }, 2000);
}

function checkMoves(){
    var pass = playerMoves.join('') === moves.join('');
    clicks = 0;
    return pass;
}