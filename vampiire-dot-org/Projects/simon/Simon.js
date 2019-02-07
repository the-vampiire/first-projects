/**
 * Created by Vampiire on 5/14/17.
 */


// jQuery shorcuts
    var touch = $('.touch'), screen = $('#screen'),
        door_creek = $('#door_creek'), power_button = $('#power'), power_icon = $('#power_icon'), strict_button = $("#strict");

// global variables

var options = ["touch1", "touch2", "touch3", "touch4"], strict = false, reset = false, pick, rand, mistake = 0, count = 0,
    moves = [], movesCount = 0, movesInterval, playerMoves = [], clicks = 0, timeoutFlash, timeOut;


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


function resetGame(){
    moves = [];
    strict = false;
    reset = false;
    playerMoves = [];
    movesCount = 0;
    mistake = 0;
    count = 0;
    clicks = 0;
    screen.html('');
    screen.removeClass('screenGlow');
    screen.removeClass('screenLose');
    power_button.html('start');
    strict_button.removeClass('strictGlow')
}

strict_button.on('click', function(){
    if(!strict){
        strict = true;
        strict_button.addClass('strictGlow');
        screen.css('font-size', '2em').html('\n strict');
    }
    else{
        strict = false;
        strict_button.removeClass('strictGlow');
        screen.html('');
    }
});

power_button.on('click', function(){
    if(!reset){
        resetGame();
        door_creek.trigger('play');
        screen.addClass('screenGlow');
        power_button.html('reset');
        setTimeout(pickMove, 1000);
        reset = true;
        if(!strict){
            screen.html(' \n easy');
        }
    }
    else{
        resetGame();
    }

});

touch.on('click', function(){

    pick = $(this).attr('id');
    playerPick(pick);
    clicks++;

    if(clicks === moves.length){
        setTimeout(function(){
            count++;
            pickMove();
        }, 1000);
    }
});


function playerPick(move){
    flashIcon(move);
    playSound(move);
    playerMoves.push(move);
}


function pickMove(){

    console.log(checkMoves() && count === 1);
    if(checkMoves() && count === 20){
        screen.html('WIN')
        setTimeout(resetGame, 1500);
    }

    else if(checkMoves() && mistake <= 1 && !strict){
        randomPick();
        screen.html(count);
        playBackMoves();
        playerMoves = [];
    }

    else if(mistake === 0 && !strict){
        screen.addClass('screenLose');
        screen.html('!!!');
        count--;
        playBackMoves();
        mistake++;
        playerMoves = [];
        setTimeout(function(){
            screen.html(count);
            screen.removeClass('screenLose');
        }, 1500)
    }

    else if(checkMoves() && strict){
        randomPick();
        screen.html(count);
        playBackMoves();
        playerMoves = [];
    }

    else{
        screen.addClass('screenLose');
        screen.html("LOSE");
        setTimeout(resetGame, 1000);
    }
}

function randomPick(){
    rand = Math.floor(Math.random()*options.length);
    moves.push(options[rand]);
}

function playBackMoves(){
    movesCount = 0;

    movesInterval = setInterval(function(){
        flashIcon(moves[movesCount]);
        playSound(moves[movesCount]);
        movesCount++;

        if(movesCount === moves.length){
            clearInterval(movesInterval);
        }

    }, 2200)
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

    return pass
}