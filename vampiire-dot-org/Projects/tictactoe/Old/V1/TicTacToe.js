/**
 * Created by Vampiire on 5/12/17.
 */

// jQuery shortcuts
    var i = 0, rand = 0, square = $('.square'), reset = $('#reset');

// squares
    var center = $('#square_5');


// Let user pick to be 'x' or 'o'
    var userSelect, compSelect;

    $('#o').on('click', function(){
        userSelect = $(this).attr('id');
        compSelect = 'x';
        $('.modal').fadeToggle(1000);
    });

    $('#x').on('click', function(){
        userSelect = $(this).attr('id');
        compSelect = 'o';
        $('.modal').fadeToggle(1000);
    });


// on user selecting a square trigger AI selection (on delay to allow DOM update)
    square.on('click', function(){
        $(this).addClass(userSelect);
        setTimeout(checker, 1000);
        setTimeout(select_square, 1000);
    });

// AI select square function

function select_square(){

    switch(true){

    // middle square approach
        case (!center.hasClass(userSelect) && !center.hasClass(compSelect)):
            center.addClass(compSelect);
            break;
        default:
            random_pick();

    }

    setTimeout(checker, 1000);
}

function random_pick(){
    var rand = Math.floor(Math.random()*10);

    if(rand!== 0 && !$('#square_'+rand).hasClass(userSelect) && !$('#square_'+rand).hasClass(compSelect)){
        $('#square_'+rand).toggleClass(compSelect);
    }
    else{
        random_pick();
    }

}

reset.on('click', resetGame);

function resetGame(){
    console.log('called');
    for(i = 1; i < 10; i++){
        $('#square_'+i).removeClass(userSelect);
        $('#square_'+i).removeClass(compSelect);
    }

    $('.modal').fadeToggle(1000);

}

function checker(){

    var path_user = [], path_comp = [];

    for(i = 1; i < 10; i++){
        if($('#square_'+i).hasClass(userSelect)){
            path_user.push(i);
        }
        else if($('#square_'+i).hasClass(compSelect)){
            path_comp.push(i);
        }
    }


    var solutions = {'row 1' :  "1,2,3", 'row 2' :  "4,5,6", 'row 3' :  "7,8,9",
        'column 1' :  "1,4,7", 'column 2' :  "2,5,8", 'column 3' :  "3,6,9",
        'diagonal left' :  "1,5,9", 'diagonal right' :  "3,5,7"};

    var win_path = Object.keys(solutions);

    for(k in win_path){

        var solution_match = new RegExp(solutions[win_path[k]], 'g');

        if(path_user.join(',').match(solution_match)){
            console.log(win_path[k]);
            alert('winner user via: '+win_path[k]);
            resetGame();
        }
        else if(path_comp.join(',').match(solution_match)){
            console.log(win_path[k]);
            alert('winner computer via: '+win_path[k]);
            resetGame();
        }
    }

}

/*

Winning solutions:

r1 = 6
r2 = 15
r3 = 24

c1 = 12
c2 = 15
c3 = 18

d1 = 14
d3 = 15

solution_set = [6, 12, 15, 14, 18, 24];

checker should push the value of each x or o square to a checker array
when checker array has 3 values check if solution is met,
    if it is end game,
    if it is not empty the checker array and continue

 */


