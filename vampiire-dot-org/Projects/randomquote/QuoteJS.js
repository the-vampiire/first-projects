$( function(){

    // ----- Ajax Request and DOM input ----- //

    $('#New_Quote').click(get_data);

    function get_data(){

        $.get("http://www.stands4.com/services/v2/quotes.php?uid=5663&tokenid=dvaVN4cQXhJcfkk9&searchtype=RANDOM", function(data) {
       
        
        var error = $(data).find("error").text()
       
        
         if(error){
               console.log(error);
               $('#quote').html(error);
               $('#author').html('sorry the free API was overloaded!'); 
               }
        
        $(data).find
            $(data).find('result').each(function(){
                var quote = $(this).find('quote').text();
                var author = $(this).find('author').text();
           
              
                $('#quote').html(quote);
                // optional add link to wikipedia for author...
                // $('#author-link').attr('href','https://en.wikipedia.org/wiki/'+author);
                $('#author').html(author);
                $('#Tweet-Link').attr('href', "https://twitter.com/intent/tweet?text="+quote);

            });
        });

    }

});

