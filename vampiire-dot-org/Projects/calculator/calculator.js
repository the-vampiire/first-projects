/**
 * Created by Vampiire on 5/8/17.
 */


var output = $('#output'), screen = $('#screen'), num, func, input = '',
    last_command, regex;

$(function(){
    output.css('font-size', '1.8em').text('Vampiire Calculator');
});

$('button').click(function(){

    screen.addClass('glow');

    if($(this).attr('id').slice(3).match(/[0-9]/g)){

    // determines if the last command was an evaluation and
    // latest command is NOT a mathematical operator
    // reset calculator output for new calculation
        if(typeof last_command === 'number'){
            clear();
        }

    // slice 3 to remove prefix 'num' of button ID
        num = $(this).attr('id').slice(3);

        last_command = num;
        input += num;
        showOnScreen(input);

    } else {


        func = $(this).attr('id');

        if(func === 'equals'){
            input = Number(equals(input));
            last_command = input;
        }

        else if(func === 'clear'){
            clear();
            screen.removeClass('glow');
        }

        else {

            switch (func) {
                case 'plus':
                    func = '+';
                    break;
                case 'minus':
                    func = '-';
                    break;
                case 'multiply':
                    func = '*';
                    break;
                case 'divide':
                    func = '/';
                    break;
                case 'decimal':
                    func = '.';
                    break;
                case 'modulus':
                    func = '%';
                    break;
            }

            if (last_command !== func) {
                last_command = func;
                input += func;
            }
        }



    }

// if screen size is fully populated throw error:
    if(input.length > 13){
        showOnScreen('MAX CHAR LIMIT');
        setTimeout(clear, 1500);
    }

    else{
        showOnScreen(input);
    }

});

// display input on screen
    function showOnScreen(input){
        output.html(input);
    }


// evaluate input expressions
    function equals(input){
        if(!input.match(/[A-Za-z]+/g)){
            var res = eval(input);
            if(res % 1 === 0){
                return res;
            }else{
                return res.toFixed(4);
            }
        }
        return 'no hax allowed';
    }

// clear screen
    function clear(){
        input = '';
        showOnScreen(input);
    }

