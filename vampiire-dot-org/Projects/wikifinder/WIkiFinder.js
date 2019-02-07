// jQuery Shortcuts
    var search_bar = $('#search_bar');
    var search_button = $('#search_button');
    var search_query = $('[name=search_query]')[0];
    var links = $('#links');
    var random = $('#random_button');


// Animations
    // activate search on click
        search_button.click(show_and_hide);

    // reset screen on random click
        random.click(hide_and_show);


    // activate results window on keypress
        search_bar.keypress(function() {
            random.fadeOut(500, 'linear', function(){
                links.slideDown(100, 'linear');
            });

        });


    // if search bar is empty (from deleting) revert back to search icon
        search_bar.keyup(function(){
            if(search_bar.val().length === 0){
                links.slideUp(500, 'linear', hide_and_show());
                $(this).blur();
            }
        });

    // function to show the random button and search bar while hiding search icon
        function show_and_hide(){
            search_button.fadeOut(500, 'linear', function () {
                random.fadeIn(500, 'linear');
                search_bar.slideDown(500, 'linear');
                search_bar.focus();
            });
        }


    // hide search bar and display search button
        function hide_and_show(){
            search_bar.slideUp(500, 'linear', function(){
                random.fadeOut(500, 'linear', function(){
                    search_button.fadeIn(500, 'linear');
                });
            });


        }

// Link generator function for results window
    function link_generator(data){

        var i = 0,
            title = data[1],
            description = data[2],
            link = data[3];

        for(i; i < data[3].length; i++){
            var  list_link = '<a href="'+link[i]+'">'+title[i]+'</a><br/>';
            list_description = list_link+description[i]+'<hr>';
            links.append(list_description);
        }
    }

// Wiki Auto-complete

    search_bar.autocomplete({
        source: function(query, result) {
            $.ajax({
                url: "https://en.wikipedia.org/w/api.php",
                dataType: "jsonp",
                data: {
                    'action': "opensearch",
                    'format': "json",
                    'search': query.term
                },

                success: function (data) {
                    links.empty();
                    link_generator(data);
                }

            });
        }

    });