/**
 * Created by Vampiire on 5/12/17.
 */


// jQuery shortcuts
    var square = $('.square'), reset = $('#reset'), modal = $('.modal'), winnerOutput = $('#winnerOutput');

// global variables
    var userSelect, compSelect, row, column, board = [ ['1','2','3'], ['4','5','6'], ['7','8','9'] ], timeout, winner;



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
        $(this).addClass(userSelect);

    // pulls the column class number (0-2) and row ID number(0-2) for use in updating the board array
        // slices to remove class and ID prefix text
        column = $(this).attr('class').slice(7,8);
        row = $(this).parent().attr('id').slice(4);

    // update the board then check for a winner on each click
        updateBoard(row, column);
        checkWinner(board);
    });

// board updating function. accepts row and column from user click and updates the status of the board array
    function updateBoard(row, column){

        board[row][column] = userSelect;

        return board;
    }

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

    reset.on('click', resetBoard);

    function resetBoard(){
    // clear reset timer
        clearTimeout(timeout);
    // clear UI board
        for(var i = 1; i < 10; i++){
            $('#square_'+i).removeClass('o');
            $('#square_'+i).removeClass('x');
        }
    // reset board array, replace modal, clear winner text, clear winner variable
        board = [ ['1','2','3'], ['4','5','6'], ['7','8','9'] ];
        modal.fadeToggle(1000);
        winnerOutput.html('');
        winner = null;
    }
