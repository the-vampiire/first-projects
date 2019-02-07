/**
 * Created by Vampiire on 5/12/17.
 */


// jQuery shortcuts
    var square = $('.square'), center = $('#square_5'), modal = $('.modal'), winnerOutput = $('#winnerOutput');

// global variables
    var userSelect, compSelect, row, column, board = [ ['1','2','3'], ['4','5','6'], ['7','8','9'] ],
        timeout, winner, rand, boardCount = 0;



// Let user pick to be 'x' or 'o'
    $('#o').on('click', function(){
        userSelect = $(this).attr('id');
        compSelect = 'x';
        modal.fadeToggle(1000);
    });

    $('#x').on('click', function(){
        userSelect = $(this).attr('id');
        compSelect = 'o';
        modal.fadeToggle(1000);
    });

// user select a square

    square.on('click', function(){

    // stop player from overlapping comp selection
        if(!$(this).hasClass(compSelect)){
            $(this).addClass(userSelect);

            // pulls the column class number (0-2) and row ID number(0-2) for use in updating the board array
            // slices to remove class and ID prefix text
            column = $(this).attr('class').slice(7,8);
            row = $(this).parent().attr('id').slice(4);

            // update the board then check for a winner on each click
            updateBoard(row, column, userSelect);
            checkWinner(board);


            if(!winner){
                // squareSelect();
                compPick();
            }
        }



    });

// board updating function. accepts row column and marker, updates board array on each call

    function updateBoard(row, column, marker){

        board[row][column] = marker;

        return board;
    }

// Comp selection function

    function squareSelect(choice){

        choice.addClass(compSelect);

        column = $(choice).attr('class').slice(7,8);
        row = $(choice).parent().attr('id').slice(4);

        console.log('comp choice: ', row, column);

        updateBoard(row, column, compSelect);

        checkWinner(board);
    }



// computer picker

function compPick(){

    switch(true){

        // pick center
        case !center.hasClass('o') && !center.hasClass('x'):
            squareSelect(center);
            break;

    // row 1
        // c1 === c2 --> block c0 [square_1]
        case board[0][1] === board[0][2] && board[0][1] === userSelect && board[0][0] !== compSelect:
            squareSelect($('#square_1'));
            break;
        // c0 === c2 --> block c1 [square_2]
        case board[0][0] === board[0][2] && board[0][0] === userSelect && board[0][1] !== compSelect:
            squareSelect($('#square_2'));
            break;
        // c0 === c2 --> block c3 [square_3]
        case board[0][0] === board[0][1] && board[0][0] === userSelect && board[0][2] !== compSelect:
            squareSelect($('#square_3'));
            break;

    // row 2
        // c1 === c2 --> block c0 [square_4]
        case board[1][1] === board[1][2] && board[1][1] === userSelect && board[1][0] !== compSelect:
            squareSelect($('#square_4'));
            break;
        // c0 === c2 --> block c1 [square_5]
        case board[1][0] === board[1][2] && board[1][0] === userSelect && board[1][1] !== compSelect:
            squareSelect($('#square_5'));
            break;
        // c0 === c2 --> block c3 [square_6]
        case board[1][0] === board[1][1] && board[1][0] === userSelect && board[1][2] !== compSelect:
            squareSelect($('#square_6'));
            break;

    // row 3
        // c1 === c2 --> block c0 [square_7]
        case board[2][1] === board[2][2] && board[2][1] === userSelect && board[2][0] !== compSelect:
            squareSelect($('#square_7'));
            break;
        // c0 === c2 --> block c1 [square_8]
        case board[2][0] === board[2][2] && board[2][0] === userSelect && board[2][1] !== compSelect:
            squareSelect($('#square_8'));
            break;
        // c0 === c2 --> block c3 [square_9]
        case board[2][0] === board[2][1] && board[2][0] === userSelect && board[2][2] !== compSelect:
            squareSelect($('#square_9'));
            break;

    // all else fails go random
        default:
            randomPick();
    }

}


// random picker
    function randomPick(){

        rand = Math.floor(Math.random()*10);

        if(rand !== 0 && !$('#square_'+rand).hasClass('x') && !$('#square_'+rand).hasClass('o')){
            console.log('random');
            squareSelect($('#square_'+rand));
        }
        else{
            randomPick();
        }
    }



// compare win lines with board state. if win line is available next move is to complete it. if unavailable pick new win line

// check for winner function. sees is a row, column, or diagonal has a matching triplet

    function checkWinner(board){

        for(var i in board){
            // rows check
            if(board[i][0] === board[i][1] && board[i][0] === board[i][2]){
                 winner = board[i][0];
            }
            // columns check
            else if(board[0][i] === board[1][i] && board[0][i] === board[2][i]){
                 winner = board[0][i];
            }

            // diagonals left check
            else if(board[0][0] === board[1][1] && board[0][0] === board[2][2]){
                 winner = board[0][0];
            }

            // diagonals right check
            else if(board[0][2] === board[1][1] && board[0][2] === board[2][0]){
                 winner = board[0][2];
            }

        }

    // checks for tie game
        for(var i = 1; i < 10; i++){
            if($('#square_'+i).hasClass('x') || $('#square_'+i).hasClass('o')){
                boardCount++;
            }
        }

        if(boardCount === 9 && !winner){
            winnerOutput.html('TIE GAME!');
            timeout = setTimeout(resetBoard, 1500);
        }
        else{
            boardCount = 0;
        }

    // otherwise declares winner

        if(winner){
            declareWinner(winner);
        }

    }

// declare winner

    function declareWinner(winner){
        if(userSelect === winner){
            winnerOutput.html('YOU WON!')
        }
        else{
            winnerOutput.html('YOU LOSE!')
        }

       timeout = setTimeout(resetBoard, 1500);
    }

// reset function

    function resetBoard(){
    // clear reset timer
        clearTimeout(timeout);
    // clear UI board
        for(var i = 1; i < 10; i++){
            $('#square_'+i).removeClass('o');
            $('#square_'+i).removeClass('x');
        }
    // reset board array and board count, replace modal, clear winner text and winner variable
        board = [ ['1','2','3'], ['4','5','6'], ['7','8','9'] ];
        modal.fadeToggle(1000);
        winnerOutput.html('');
        winner = null;
        boardCount = 0;
    }
