/**
 * Created by Vampiire on 5/8/17.
 */


var output = $('#output'), screen = $('#screen'), power = $('#power'), num, func, input = '';

$(function(){
    output.css('font-size', '1.8em').text('Vampiire Calculator');
});

$('button').click(function(){

    screen.addClass('glow');

    if($(this).attr('id').slice(3).match(/[0-9]/g)){

        // slice 3 to remove prefix 'num' of button ID
        num = $(this).attr('id').slice(3);
        input += num;

    } else {

        func = $(this).attr('id');

        switch (func) {
            case 'plus':
                input += '+';
                break;
            case 'minus':
                input += '-';
                break;
            case 'multiply':
                input += '*';
                break;
            case 'divide':
                input += '/';
                break;
            case 'equals':
                input = equals(input);
                break;
            case 'modulus':
                input += '%';
                break;
            case 'clear':
                clear();
                break;
        }
    }

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
                return res.toFixed(2);
            }
        }
        return 'no hax allowed';
    }

// clear screen
    function clear(){
        input = '';
        showOnScreen(input);
    }

