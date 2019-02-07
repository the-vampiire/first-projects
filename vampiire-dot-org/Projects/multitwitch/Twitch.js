// jQuery shortcuts

    var online = $('#jumbotron_online'),
        channel_names = ['freecodecamp', 'ESL_SC2'];

// Hide Modal Instructions
    $('.modal').click(function(){
        $(this).toggle();
    });

// Twitch Connect Button

    $('.twitch-connect').click(function() {
        Twitch.login({
            scope: ['user_read']
        });
    });


// Convert username to ID using OAuth (for logged in user)

    function convert_username_OAuth(token){
        $.ajax({

            type: "GET",
            url: "https://api.twitch.tv/kraken/user",
            headers: {
                "Client-ID": "vaiynh6nnd2nxpf6wshnj4v4zxxqz2",
                "Accept": "application/vnd.twitchtv.v5+json",
                "Authorization": "OAuth "+ token
            },

            success: function(data){

            // call get_user_channels passing the ID gained in this request
                get_user_channels(data._id);
            }
        });
    }

// Get user channels

    function get_user_channels(id){
        $.ajax({

            type: "GET",
            url: "https://api.twitch.tv/kraken/users/"+id+"/follows/channels",
            headers: {
                "Client-ID": "vaiynh6nnd2nxpf6wshnj4v4zxxqz2",
                "Accept": "application/vnd.twitchtv.v5+json"
            },

            success: function(data){

            // empty the default channels

                channel_names = [];

                var i = 0;

            // push user's followed channels into channel_names array

                for(i; i < data.follows.length; i++){
                    channel_names.push(data.follows[i].channel.name);
                }

            // call convert_channels passing the now populated array of channel names

                convert_channels(channel_names);
            }

        });

    }


// Converts channel names into IDs and creates channel banners for each channel

    function convert_channels(arr){

        var i = 0;

        for(i; i < arr.length; i++){
            $.ajax({

                type: "GET",
                url: "https://api.twitch.tv/kraken/users?login="+arr[i],
                headers: {
                    "Client-ID": "vaiynh6nnd2nxpf6wshnj4v4zxxqz2",
                    "Accept": "application/vnd.twitchtv.v5+json"
                },

                success: function(data){

                // shortcuts

                    var user = data.users[0],
                        id = user._id,
                        name = user.display_name,
                        logo = user.logo;

                // append the channel banner div for each channel that is called
                // add logo and channel name here
                // defaults to OFFLINE state (red box-shadow)

                    online.append(

                    '<a href="#content_'+id+'" data-toggle="collapse"> \
                        <div class="channel_banner offline" id="banner_'+id+'" name="'+name+'"> \
                        <div class="channel_logo"> \
                        <img class="channel_logo_img img-responsive" src="" id="logo_'+id+'"> \
                        </div> \
                        <div class="channel_name text-center">' +
                        name +
                        '</div> \
                        </div> \
                        </a>' +
                        '<div class="collapse channel_content" id="content_'+id+'">'+
                        '</div> \
                         <div class="channel_status offline" id="status_'+id+'">' +
                         'Offline' +
                         '</div>'
                    );

                // apply the channel logo

                    var channel_logo = $('#logo_'+id);
                    channel_logo.attr('src', logo);

                // call stream status and details function, passing ID attribute

                    status_details(id);
                }
            });
        }
    }


// Using passed ID gather the stream status and details

    function status_details(id) {
        $.ajax({

            type: "GET",
            url: "https://api.twitch.tv/kraken/streams/" + id,
            headers: {
                "Client-ID": "vaiynh6nnd2nxpf6wshnj4v4zxxqz2",
                "Accept": "application/vnd.twitchtv.v5+json"
            },

            success: function (data) {

            // shortcut variables

                var stream = data.stream;


            // if stream is online (null is offline)

                if (stream !== null) {
                    var channel = stream.channel,
                        name = channel.display_name,
                        id = channel._id,
                        game = channel.game,
                        channel_banner = channel.profile_banner,
                        banner = $('#banner_'+id),
                        status = $('#status_'+id),
                        i_frame = $('#content_'+id);

                // update status (game being played)

                    status.html(game);

                // add the online class (green box-shadow)

                    banner.removeClass('offline').addClass('online');
                    status.removeClass('offline').addClass('online');


                // Clicking on the channel expands the accordion and populates it with the respective channels' iFrames for
                // video stream and chat

                    banner.on('click', function(){

                    // if the content is currently expanded the class 'in' is added by jQUI
                    // this means the user click is intended to close the accordion
                    // empty the iFrame (clear the stream and chat to reduce resource load / audio overlap)
                    // empty the background image to return back default

                        if($('#content_'+id).hasClass('in')){
                            i_frame.empty();
                            i_frame.removeClass('online');
                            online.css('background-image', 'url("")');
                        }

                    // if class 'in' is not found it means user click is intended to display the accordion content
                    // load the background image of the current channel (using the profile banner of that channel)
                    // populate the accordion content with iFrames

                        else{

                        // if the channel has a profile banner then set the 'online jumbotron' background image to that banner

                            if(channel_banner){
                                online.css('background-image', 'url("'+channel_banner+'")');
                            }

                        // set the iFrame sources using the clicked banner's name (channel name)

                            i_frame.addClass('online');

                            i_frame.append(
                                '<div> \
                                 <div> \
                                    <iframe \
                                        name = "stream" \
                                        src="https://player.twitch.tv/?volume=1&channel=' + $(this).attr('name') + '"' +
                                        'height="300" \
                                         width="100%" \
                                         frameborder="0" \
                                         scrolling="no" \
                                         allowfullscreen="true"> \
                                    </iframe> \
                                </div> \
                               \
                                <div> \
                                    <iframe \
                                        name="chat" \
                                        frameborder="0" \
                                        scrolling="yes" \
                                        id="chat_embed" \
                                        src="https://twitch.tv/' + $(this).attr('name') + '/chat"' +
                                        'height="500" \
                                        width="100%"> \
                                    </iframe> \
                               </div>'
                            );
                        }
                    });
                }
            }
        });
    }



// Document Ready (execute on page load completion)

    $( function(){

        // Twitch JS SDK looks for authenticated login status

            Twitch.init({clientId: 'vaiynh6nnd2nxpf6wshnj4v4zxxqz2'}, function(error, status) {

                if (status.authenticated) {

                    // Already logged in, hide button
                    $('.twitch-connect').hide();

                    // call logged in user conversion
                    convert_username_OAuth(status.token);
                }


            // On page load without authenticated login - display default channels
            // FCC for project requirement, ESL_SC2 for 24/7 streams to display functionality
            // Display modal to show instructions to user

                if(!status.authenticated){
                    convert_channels(channel_names);
                    $('.modal').toggle();
                }
            });
    });