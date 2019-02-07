$(document).ready(function() {
    
  // point tracker
    var point = 0;
   
  // movement functions
    $(document).keydown(function(key) {
        switch(parseInt(key.which,10)) {
			// Left arrow key pressed - move left
			case 37:
                if($('#character').position().left > 0){
                    $('#character').animate({left: "-=10px"}, 'fast'); 
                    collision();
                }
                              
                else{
                    $('#character').clearQueue();
                }
				break;
			// Right Arrow Pressed - move right
            case 39:
               
                // condition to keep in bounds of bg div
                
                if($('#character').position().left < 720){
                    $('#character').animate({left: '+=10px'}, 'fast');
                    collision();
                }
                
                // clear animate request if cndtn fails
                else{
                    $('#character').clearQueue();
                }
				break;
                
            // Space key pressed - (jump animation)
			case 32:
                if($('#character').position().left < 720){
			    $('#character').animate({top: '-=50px'}, 'fast').animate({left: '+=10px'}, 'fast').animate({top: '+=50px'}, 'fast');
                collision();
                }
                else{
                    $('#character').clearQueue();
                }
			    break;
		}
	});
    
  // hide rules once keys are pressed
	$(document).on('keydown', function(){
	    $('#rules').fadeOut(1000);
        $('#res').fadeOut(100);
	    });
    
  // character select button
    $('#charSelect').click(function(){
       
       var input = prompt("paste image link here");
       $('#character').css('background-image','url('+input+')');
       $('#res').show();
       
       
    
   }); 
    
  // background select button
    $('#bgSelect').click(function(){
     var input = prompt("paste image link here");
        $('#bg').css('background-image', 'url('+input+')');
        $('#res').show();
        
    });
    
  // reset button 
    $('#reset').click(function(){
       $('#character').css('background-image','url(Character.jpg)').css('left','0px').css('top','0px');
       $('#bg').css('background-image','url("Background.jpg")');
       $('#block').clearQueue().stop().css('left','748px'); 
       $('#rules').show();
       $('#res').show();    
    
    });
    
  // position button
     var i = 0; // alert count tracker
    $('#position').click(function(){
        var positionX = 
            ($('#character').offset().left - $('#bg').offset().left)-5;
        var positionY = 
            ($('#bg').offset().top - $('#character').offset().top)+255;
        var blockX =
            ($('#block').offset().left - $('#bg').offset().left)-3;
        var diffX = blockX - positionX;
       
        
        if(i == 0){
            alert("Open console log to view position coordinates");
            console.log('x coord: '+positionX+' y coord: '+positionY);
            console.log('block x coord: '+blockX);
            console.log('difference is: '+diffX);
        }
        else{
           console.log('x coord: '+positionX+' y coord: '+positionY);
           console.log('block x coord: '+blockX);
           console.log('difference is: '+diffX);
        } 
        i++;
        });
    
  // begin block animation on any key press    
    $(document).keydown(function(){
        blockLoop();
    }); 

  // block animation function    
    function blockLoop(){   
        $('#block').css('left','748px');    
        $('#block').animate({left: '0px'}, 10000, blockLoop);
        };

  // collision detection function
    function collision(){
            var positionX = 
                ($('#character').offset().left - $('#bg').offset().left)-5;
            var positionY = 
                ($('#bg').offset().top - $('#character').offset().top)+255;
            var blockX = 
                ($('#block').offset().left - $('#bg').offset().left)-3;
            var diff = blockX-positionX;
        if(Math.abs(diff) < 80){
            alert('collision!');
        };


    };    

    
});