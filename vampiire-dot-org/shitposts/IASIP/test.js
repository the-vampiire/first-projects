/**
 * Created by Home on 4/4/17.
 */



$('button').click(function(){
    get_quotes();
});

function get_quotes(){
    $.getJSON('http://sunnyquotes.net/q.php?random&cb=?', function(data) {
        var who = data.sqWho;
        var quote = data.sqQuote;

        if(who === 'Mac' || who === 'Dennis Reynolds' || who === 'Frank Reynolds' || who === 'Dee Reynolds' || who === 'Charlie Kelly'){

            switch(who){
                case 'Dennis Reynolds':
                    who = 'Dennis';
                    break;
                case 'Frank Reynolds':
                    who = 'Frank';
                    break;
                case 'Dee Reynolds':
                    who = 'Dee';
                    break;
                case 'Charlie Kelly':
                    who = 'Charlie';
                    break;
            }

            chatter(who, quote);
        }

        else{
            console.log('who failed: ', who);
            get_quotes();
        }
        


        

    });
}


function chatter(name, quote){

    /*

     Absurdly janky workaround to getting margin-top.
     I tried jquery position() and offset() but they did not work as intended so I had to work some magic

     .css('margin-top') is returned as a string '###px' so slice to remove the px at the end then convert to int
     I'm sorry... :(

     */

    var who = $('#'+name);


    var top = parseInt(who.css('margin-top').slice(0,3));
    var left = parseInt(who.css('margin-left').slice(0,3));
    var down = top + 3;

    function flappy_jaws(){
        who.animate({
            marginTop: down
        }, 300);
        $('#Quote').text(quote);
        $('#Message').css('display', 'block').animate({
            marginTop:top,
            marginLeft: left - 100
        });
        who.animate({
            marginTop: top
        }, 300);
        who.animate({
            marginTop: down
        }, 300);
        who.animate({
            marginTop: top
        }, 300);
        who.animate({
            marginTop: down
        }, 300);
        who.animate({
            marginTop: top
        }, 300);
        who.animate({
            marginTop: down
        }, 300);
        who.animate({
            marginTop: top
        }, 300);
    }


    for(var i = 0; i < 2 ; i++){
        flappy_jaws();
    }


}

