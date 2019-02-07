$(function() {

// JQuery shortcuts

    // switches
    var wrapper = $('#wrapper'),
    sidebar_button = $('#sidebar_button'),
    celsius_switch = $('#Units_Switch'),
    feels_like_switch = $('#Feels_Like_Switch'),
    actual_switch = $('#Actual_Switch'),
    humidity_switch = $('#Humidity_Switch'),
    cloud_switch = $('#Cloud_Switch'),
    wind_switch = $('#Wind_Switch'),
    experimental_switch = $('#Experimental_Switch'),
    secure_switch = $('#Secure_Switch'),
    zip_switch = $('#Zip_Switch'),
    city_switch = $('#City_Switch'),
    insecure_switch = $('#Insecure_Switch'),
    zip_input = $('#zip_input'),
    city_input = $('#city_input'),

    // used for display
    body = $('body'),
    jumbotron = $('#jumbotron'),
    loading_div = $('#loading_div'),
    temperature_div = $('#temperature'),
    feels_like_temp_div = $('#feels_like_temperature'),
    clouds_div = $('#cloud_coverage'),
    condition_icon_div = $('#condition_icon'),
    condition_text_div = $('#condition_text'),
    humidity_div = $('#humidity'),
    wind_div = $('#wind'),
    divider = $('#divider'),
    img_link = $('#image_link'),
    img_title = $('#image_title'),
    location_div = $('#location'),

    // buttons
    forward = $('#forward'),
    backward = $('#backward'),

    // unused currently but available as needed in future
    time_div = $('#time'),
    date_div = $('#date'),
    temp_row = $('#temperature_row'),
    cond_row = $('#conditions_row'),
    location_options = $('#LocationOptions');

// toggles sidebar

    // function to open sidebar and translate the menu button icon

    var open = false;

    function control_sidebar(){
        if(open){
            open = false;
            sidebar_button.empty().html('<i id="button_icon" class="fa fa-bars fa-2x"></i>');

        }
        else if(!open){
            open = true;
            sidebar_button.empty().html('<i id="button_icon" class="fa fa-bars fa-rotate-270 fa-2x"></i>');
        }


        wrapper.toggleClass('toggled');
    }


    // call the function on click

    sidebar_button.click(control_sidebar);

// Weather Option Switches

    // Temperature Units (default: Fahrenheit)
    var Celsius = celsius_switch.prop('checked');

    celsius_switch.click(function(){
        Celsius = celsius_switch.prop('checked');
    });


    // Actual Temperature (default: On)
    var Actual = actual_switch.prop('checked');

    actual_switch.click(function(){
        Actual = actual_switch.prop('checked');

        if(Actual){
            feels_like_switch.prop('checked', false);
                Feels_Like = feels_like_switch.prop('checked');
        }
        else if(!Actual){
            feels_like_switch.prop('checked', true);
                Feels_Like = feels_like_switch.prop('checked');
        }
    });


    // Feels Like Temperature (default: Off)
    var Feels_Like = feels_like_switch.prop('checked');

    feels_like_switch.click(function(){
        Feels_Like = feels_like_switch.prop('checked');

        if(Feels_Like){
            actual_switch.prop('checked',false);
                Actual = actual_switch.prop('checked');
        }
        else if(!Feels_Like){
            actual_switch.prop('checked',true);
                Actual = actual_switch.prop('checked');
        }
    });


    // Humidity (default: On)
    var Humidity = humidity_switch.prop('checked');

    humidity_switch.click(function(){
        Humidity = humidity_switch.prop('checked');
    });


    // Cloud Coverage (default: On)
    var Cloud_Coverage = cloud_switch.prop('checked');

    cloud_switch.click(function(){
        Cloud_Coverage = cloud_switch.prop('checked');
    });

    // Wind Speed / Direction (default: Off)
    var Wind = wind_switch.prop('checked');

    wind_switch.click(function(){
        Wind = wind_switch.prop('checked');
    });


    // Experimental Feature (default: Off)
    // Experimental button feature for querying flickr to produce a background image local to the current location
    var experimental = experimental_switch.prop('checked');

    experimental_switch.click(function(){
        experimental = experimental_switch.prop('checked');
    });


// Location Switches

    // Secure Location
        var secure = secure_switch.prop('checked');
        secure_switch.click(function(){

            if(zip){
                zip_input.toggle();
            }
            if(city){
                city_input.toggle();
            }

            city_switch.prop('checked', false);
                city = city_switch.prop('checked');
            insecure_switch.prop('checked', false);
                insecure = insecure_switch.prop('checked');
            zip_switch.prop('checked', false);
                zip = zip_switch.prop('checked');

            secure = secure_switch.prop('checked');

            if(!secure){
                insecure_switch.prop('checked', true);
                insecure = insecure_switch.prop('checked');
            }

            control_sidebar();
            get_and_display();
        });

    // Zip Location
        var zip = zip_switch.prop('checked'),
        ZipCode;

        zip_switch.click(function(){

            if(city){
                city_input.toggle();
            }

            secure_switch.prop('checked', false);
                secure = secure_switch.prop('checked');
            city_switch.prop('checked', false);
                city = city_switch.prop('checked');
            insecure_switch.prop('checked', false);
                insecure = insecure_switch.prop('checked');

            zip = zip_switch.prop('checked');

            zip_input.toggle();


        });

        // function to read Zip
            $('#enter_zip').click(enter_zip);

                function enter_zip(){
                    ZipCode = document.getElementsByName('ZipCode')[0].value;
                    control_sidebar();
                    get_and_display();
                }

    // City Location
        var city = city_switch.prop('checked'),
        CityName;

        city_switch.click(function(){

            if(zip){
                zip_input.toggle();
            }


            secure_switch.prop('checked', false);
                secure = secure_switch.prop('checked');
            insecure_switch.prop('checked', false);
                insecure = insecure_switch.prop('checked');
            zip_switch.prop('checked', false);
                zip = zip_switch.prop('checked');

            city = city_switch.prop('checked');

            city_input.toggle();

        });

        // function to read city input
            $('#enter_city').click(enter_city);
                function enter_city(){
                    CityName = document.getElementsByName('CityName')[0].value;
                    control_sidebar();
                    get_and_display();

                }

    // Insecure Location
        var insecure = insecure_switch.prop('checked');

        insecure_switch.click(function(){

            if(zip){
                zip_input.toggle();
            }
            if(city){
                city_input.toggle();
            }

            city_switch.prop('checked', false);
                city = city_switch.prop('checked');
            secure_switch.prop('checked', false);
                secure = secure_switch.prop('checked');
            zip_switch.prop('checked', false);
                zip = zip_switch.prop('checked');

            insecure = insecure_switch.prop('checked');

            if(!insecure){
                secure_switch.prop('checked', true);
                secure = secure_switch.prop('checked');
            }

            alert('IP based location is insecure and may have accuracy issues');

            control_sidebar();
            get_and_display();

        });


    // Apply Settings Button

    $('#apply_settings').click(function(){
        control_sidebar();
        get_and_display();
    });


// Get and Display Weather Function
    function get_and_display(){
        clear_and_load();

        if(secure){
            get_location_secure();
        }
        if(zip){
            get_weather_zip(ZipCode);
        }
        if(city){
            get_weather_city(CityName);
        }
        if(insecure){
            get_weather_insecure();
        }
    }

// Clear jumbotron and display loading icon
    function clear_and_load(){
        loading_div.empty();
        loading_div.append('<i class="fa fa-spinner fa-pulse fa-5x"></i>');

        if(experimental){
            forward.fadeIn();
            backward.fadeIn();
        }
        else if(!experimental){
            forward.fadeOut();
            backward.fadeOut();
        }

        // clear jumbotron while loading
        divider.hide();
        temperature_div.empty();
        feels_like_temp_div.empty();
        clouds_div.empty();
        humidity_div.empty();
        wind_div.empty();
        condition_icon_div.hide();
        condition_text_div.empty();
        location_div.empty();
    }





// Page Load defaults to Secure Location
get_and_display();
body.css('background-color','black');



// Location function

    // https and user accepts location services

        function get_location_secure() {

            if (navigator.geolocation) {

                navigator.geolocation.getCurrentPosition(pass, fail);
            }


            function pass(position) {

                var lat = position.coords.latitude;
                var lon = position.coords.longitude;

                get_weather_secure(lat,lon);

            }

            function fail() {
                alert('Failed to retrieve secure location data\n' +
                    '\nEnsure that the browser you are using has location service permission enabled\n' +
                    'Defaulting to IP based location... \n' +
                    'IP based location is insecure and may have accuracy issues');
                secure_switch.prop('checked', false);
                    secure = secure_switch.prop('checked');
                insecure_switch.prop('checked', true);
                    insecure = insecure_switch.prop('checked');

                get_and_display();
            }


        }


// Get weather functions

    // Secure location based weather (called by secure location function)

        function get_weather_secure(lat, lon) {
            $.get('https://api.apixu.com/v1/current.json?key=74ee988657bd4d13bf2230737170904&q=' + lat + ',' + lon, display_weather);
        }

    // zip based location

        function get_weather_zip(zip) {
            $.get('https://api.apixu.com/v1/current.json?key=74ee988657bd4d13bf2230737170904&q='+zip, display_weather);
        }

    // City based

        function get_weather_city(city) {
            $.get('https://api.apixu.com/v1/current.json?key=74ee988657bd4d13bf2230737170904&q='+city, display_weather);
        }

    // Insecure / IP based

        function get_weather_insecure(){
            $.get('https://api.apixu.com/v1/current.json?key=74ee988657bd4d13bf2230737170904&q=auto:ip', display_weather);
        }



// Experimental Flickr Feature

    // gets Flickr background image based on location
    function get_flickr(lat, lon) {

        $.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=97d8e60e16e9237ae774020d6e8713a2&' +
            'format=json&lat=' + lat + '&lon=' + lon + '&accuracy=16&safe_search=1&content_type=1&per_page=10&' +
            'sort=interestingness-desc&text=downtown&text=city&text=skyline&media=photos&nojsoncallback=1', function (data) {

            var j = 0,
                length = data.photos.perpage,
                flickr_bg = [];

            // clears the array...??
            flickr_bg.length = 0;


            for(j; j < length; j++){

                var photo = data.photos.photo[j],
                    image_link = "https://farm" + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + "_b.jpg",
                    image_bg_link = "url("+image_link+")",
                    image_title;

                if(photo.title.indexOf('#') > 0){
                    image_title = photo.title.slice(0,photo.title.indexOf('#'));
                }
                else{
                    image_title = photo.title;
                }

                flickr_bg.push([image_bg_link, image_link, image_title]);
            }



            // if no photo is found for location turn set experimental switch and variable to false and stop loading
            if (photo === undefined || photo.farm === undefined) {
                alert('No Flickr image matching request criteria was found for your area, sorry.');
                experimental_switch.prop('checked', false);
                experimental = experimental_switch.prop('checked');
            }

            set_background(flickr_bg[0]);


        // remove event listeners so they don't compile on each call (in case of visiting multiple locations on one page load)
            forward.off('click');
            backward.off('click');


        // add event listeners for buttons
            $('#forward').on('click', (function(){
                cycle_forward(flickr_bg);
            }));

            $('#backward').on('click', (function(){
                cycle_backward(flickr_bg);
            }));


        });
    }



// set background function
    function set_background(arr){
        console.log('setting background', arr);
        body.css('background-image', arr[0]);
        img_link.attr('href', arr[1]);
        img_title.html(arr[2]);
    }

// cycle background functions

    var i = 0;


    function cycle_forward(arr){
        i++;
        if(i === arr.length){
            i = 0;
        }

        set_background(arr[i]);

    }

    function cycle_backward(arr){
        console.log('new 2');

        if(i === 0){
            i = arr.length-1;
            set_background(arr[i]);
        }else{
            i--;
            set_background(arr[i]);
        }
    }


    // var i;
    //
    // function cycle_forward(arr){
    //     if(experimental){
    //         i = 1;
    //     }
    //     if(!i && i !== 0){
    //         i = 0;
    //     } else{
    //         i++;
    //     }
    //
    //     if( i === arr.length){
    //         i = 0;
    //     }
    //
    //     set_background(arr[i]);
    // }
    //
    // function cycle_backward(arr){
    //     i--;
    //     if(i === 0){
    //         i = arr.length-1;
    //     }
    //     set_background(arr[i]);
    // }

// Display weather functions

    function display_weather(data) {

        // JSON data shortcuts
        var current = data.current,
            location = data.location;

    // Weather data

        // Fahrenheit
        var temp_f = current.temp_f, /* use for displaying *F <span>&#8457;</span> */
            feels_like_f = current.feelslike_f,
            wind_mph = current.wind_mph,

            // Celsius
            temp_c = current.temp_c, /* use for displaying *F <span>&#8451;</span> */
            feels_like_c = current.feelslike_c,
            wind_kph = current.wind_kph,

            // Shared
            humidity = current.humidity,
            cloud_coverage = current.cloud,
            wind_direction = current.wind_dir,
            is_day = current.is_day, /* day = 1, night = 0 */
            condition_icon = current.condition.icon, /*add 'https:' prefix to load icon securely*/
            condition_text = current.condition.text,
            condition_code = current.condition.code,
    // Location data
            name = location.name,
            lat = location.lat,
            lon = location.lon;
        // time_raw = location.localtime,
        // time = time_raw.slice(11),
        // date_split = time_raw.slice(0,10).split('-'),
        // date = date_split[1]+'-'+date_split[2]+'-'+date_split[0];

    // displays weather and location data

        // remove loading animation and show icon
        loading_div.empty();
        condition_icon_div.show();
        divider.show();

        // display date, time, location
        // time_div.append('<h3>'+time+'</h3>');
        location_div.append('<h2>'+name+'</h2>');
        // date_div.append('<h3>'+date+'</h3>');

        // display weather
        if(Celsius){
            if(Feels_Like){
                feels_like_temp_div.append('<h3>'+feels_like_c+'<span>&#8451;</span></h3>');
            }
            if(Actual){
                temperature_div.append('<h3>'+temp_c+'<span>&#8451;</span></h3>');
            }
            if(Wind){
                wind_div.append('<h3>Wind ('+wind_kph+'kph, '+wind_direction+')</h3>');
            }
        }

        if(!Celsius){
            if(Feels_Like){
                feels_like_temp_div.append('<h3>'+feels_like_f+'<span>&#8457;</span></h3>');
            }
            if(Actual){
                temperature_div.append('<h3>'+temp_f+'<span>&#8457;</span></h3>');
            }
            if(Wind){
                wind_div.append('<h3>Wind ('+wind_mph+'mph, '+wind_direction+')</h3>');
            }
        }

        if(Cloud_Coverage){
            clouds_div.append('<h3>Cloud Cover ('+cloud_coverage+'%)</h3>');
        }


        if(Humidity){
            humidity_div.append('<h3>Humidity ('+humidity+'%)</h3>');
        }



        condition_icon_div.attr('src', 'https://'+condition_icon).attr({width: 75});
        condition_text_div.append('<h4>'+condition_text+'</h4>');

        // Stock Background Arrays
            // format [ [URL, LINK, TITLE] ]

            var day_bg =
                [
                    ['url("Images/SUNNY_joseph-barrientos-7032_mini.jpg")', 'https://unsplash.com/@jbcreate_?photo=eyJdbBIk7lA', 'Joseph Barrientos'],
                    ['url("Images/PARTLY_CLOUDY_marcelo-quinan-78447_mini.jpg")', 'https://unsplash.com/@marceloquinan?photo=u0ZgqJD55pE', 'Marcelo Quinan'],
                    ['url("Images/OVERCAST_antoine-barres-224061_mini.jpg")','https://unsplash.com/@antoinebarres?photo=UoAWjCPpNSs', 'Antoine Barres' ],
                    ['url("Images/FOG_nicolas-cool-113893_mini.jpg")', 'https://unsplash.com/@shotz?photo=awftcSB__Jk', 'Nicolas Cool'],
                    ['url("Images/RAINY_gabriele-diwald-201135_mini.jpg")','https://unsplash.com/@gabrielediwald?photo=Kwi60PbAM9I',  'Gabriele DiWald'],
                    ['url("Images/SNOW_tim-trad-228282_mini.jpg")','https://unsplash.com/@timtrad?photo=K_RRD1twRFg', 'Tim Trad' ]
                ];

            var night_bg =
                [
                    ['url("Images/NIGHT_hoang-duy-le-149870_mini.jpg")','https://unsplash.com/@tytoalbatraoz?photo=lYwwPmsWdOg', 'Hoàng Duy Lê' ],
                    ['url("Images/NIGHT_CLOUDY_matthew-kane-162961_mini.jpg")', 'https://unsplash.com/@matthewkane?photo=g3QBQto9Jt0', 'Matthew Kane' ],
                    ['url("Images/NIGHT_FOG_aaron-lee-140096_mini.jpg")', 'https://unsplash.com/@aaronhjlee?photo=1CsReRMMviw', 'Aaron Lee'],
                    ['url("Images/NIGHT_RAIN_dominik-schroder-14532_mini.jpg")', 'https://unsplash.com/@wirhabenzeit?photo=6vdtubiccaA', 'Dominik Schröder'],
                    ['url("Images/NIGHT_SNOW_jason-strull-216097_mini.jpg")', 'https://unsplash.com/@jasonstrull?photo=kqBzDbiVV40', 'Jason Strull']
                ];

            var all_bg =
                [
                    ['url("Images/SUNNY_joseph-barrientos-7032_mini.jpg")', 'https://unsplash.com/@jbcreate_?photo=eyJdbBIk7lA', 'Joseph Barrientos'],
                    ['url("Images/PARTLY_CLOUDY_marcelo-quinan-78447_mini.jpg")', 'https://unsplash.com/@marceloquinan?photo=u0ZgqJD55pE', 'Marcelo Quinan'],
                    ['url("Images/OVERCAST_antoine-barres-224061_mini.jpg")','https://unsplash.com/@antoinebarres?photo=UoAWjCPpNSs', 'Antoine Barres' ],
                    ['url("Images/FOG_nicolas-cool-113893_mini.jpg")', 'https://unsplash.com/@shotz?photo=awftcSB__Jk', 'Nicolas Cool'],
                    ['url("Images/RAINY_gabriele-diwald-201135_mini.jpg")','https://unsplash.com/@gabrielediwald?photo=Kwi60PbAM9I',  'Gabriele DiWald'],
                    ['url("Images/SNOW_tim-trad-228282_mini.jpg")','https://unsplash.com/@timtrad?photo=K_RRD1twRFg', 'Tim Trad' ],
                    ['url("Images/NIGHT_hoang-duy-le-149870_mini.jpg")','https://unsplash.com/@tytoalbatraoz?photo=lYwwPmsWdOg', 'Hoàng Duy Lê' ],
                    ['url("Images/NIGHT_CLOUDY_matthew-kane-162961_mini.jpg")', 'https://unsplash.com/@matthewkane?photo=g3QBQto9Jt0', 'Matthew Kane' ],
                    ['url("Images/NIGHT_FOG_aaron-lee-140096_mini.jpg")', 'https://unsplash.com/@aaronhjlee?photo=1CsReRMMviw', 'Aaron Lee'],
                    ['url("Images/NIGHT_RAIN_dominik-schroder-14532_mini.jpg")', 'https://unsplash.com/@wirhabenzeit?photo=6vdtubiccaA', 'Dominik Schröder'],
                    ['url("Images/NIGHT_SNOW_jason-strull-216097_mini.jpg")', 'https://unsplash.com/@jasonstrull?photo=kqBzDbiVV40', 'Jason Strull']
                ];


        if(experimental){
           get_flickr(lat,lon);
        }


        else {

            // daytime
            if(is_day === 1){

                // $('#forward').click(function(){
                //     cycle_forward(day_bg);
                // });
                //
                // $('#backward').click(function(){
                //     cycle_backward(day_bg);
                // });

                switch(condition_code){
                    // sunny
                    case 1000:
                        body.css('background-image', day_bg[0][0]);
                        img_link.attr('href', day_bg[0][1]);
                        img_title.html(day_bg[0][2]);
                        break;
                    // partly cloudy
                    case (1003):
                    case (1006):
                        body.css('background-image', day_bg[1][0]);
                        img_link.attr('href', day_bg[1][1]);
                        img_title.html(day_bg[1][2]);
                        break;
                    // overcast
                    case (1009):
                        body.css('background-image', day_bg[2][0]);
                        img_link.attr('href', day_bg[2][1]);
                        img_title.html(day_bg[2][2]);
                        break;
                    // fog
                    case (1030):
                    case (1135):
                        body.css('background-image', day_bg[3][0]);
                        img_link.attr('href', day_bg[3][1]);
                        img_title.html(day_bg[3][2]);
                        break;
                    // rainy
                    case (1063):
                    case (1087):
                    case (1150):
                    case (1153):
                    case (1168):
                    case (1171):
                    case (1180):
                    case (1183):
                    case (1186):
                    case (1189):
                    case (1193):
                    case (1195):
                    case (1197):
                    case (1201):
                    case (1240):
                    case (1243):
                    case (1246):
                    case (1273):
                    case (1276):
                        body.css('background-image', day_bg[4][0]);
                        img_link.attr('href', day_bg[4][1]);
                        img_title.html(day_bg[4][2]);
                        break;
                    // snowy
                    case (1066):
                    case (1072):
                    case (1147):
                    case (1114):
                    case (1117):
                    case (1210):
                    case (1213):
                    case (1216):
                    case (1219):
                    case (1222):
                    case (1225):
                    case (1237):
                    case (1204):
                    case (1069):
                    case (1207):
                    case (1249):
                    case (1252):
                    case (1255):
                    case (1258):
                    case (1261):
                    case (1264):
                    case (1279):
                    case (1282):
                        body.css('background-image', day_bg[5][0]);
                        img_link.attr('href', day_bg[5][1]);
                        img_title.html(day_bg[5][2]);
                        break;
                    default:
                        body.css('background-image', day_bg[0][0]);
                        img_link.attr('href', day_bg[0][1]);
                        img_title.html(day_bg[0][2]);
                }
            }

            // night time
            else {

                // $('#forward').click(function(){
                //     cycle_forward(night_bg);
                // });
                //
                // $('#backward').click(function(){
                //     cycle_backward(night_bg);
                // });

                switch(condition_code){

                    // night sky
                    case 1000:
                        body.css('background-image', night_bg[0][0]);
                        img_link.attr('href', night_bg[0][1]);
                        img_title.html(night_bg[0][2]);
                        break;
                    // cloudy
                    case (1003):
                    case (1006):
                    case (1009):
                        body.css('background-image', night_bg[1][0]);
                        img_link.attr('href', night_bg[1][1]);
                        img_title.html(night_bg[1][2]);
                        break;
                    // fog
                    case (1030):
                    case (1135):
                        body.css('background-image', night_bg[2][0]);
                        img_link.attr('href', night_bg[2][1]);
                        img_title.html(night_bg[2][2]);
                        break;
                    // rainy
                    case (1063):
                    case (1087):
                    case (1150):
                    case (1153):
                    case (1168):
                    case (1171):
                    case (1180):
                    case (1183):
                    case (1186):
                    case (1189):
                    case (1193):
                    case (1195):
                    case (1197):
                    case (1201):
                    case (1240):
                    case (1243):
                    case (1246):
                    case (1273):
                    case (1276):
                        body.css('background-image', night_bg[3][0]);
                        img_link.attr('href', night_bg[3][1]);
                        img_title.html(night_bg[3][2]);
                        break;
                    // snowy
                    case (1066):
                    case (1072):
                    case (1147):
                    case (1114):
                    case (1117):
                    case (1210):
                    case (1213):
                    case (1216):
                    case (1219):
                    case (1222):
                    case (1225):
                    case (1237):
                    case (1204):
                    case (1069):
                    case (1207):
                    case (1249):
                    case (1252):
                    case (1255):
                    case (1258):
                    case (1261):
                    case (1264):
                    case (1279):
                    case (1282):
                        body.css('background-image', night_bg[4][0]);
                        img_link.attr('href', night_bg[4][1]);
                        img_title.html(night_bg[4][2]);
                        break;
                    default:
                        body.css('background-image', night_bg[0][0]);
                        img_link.attr('href', night_bg[0][1]);
                        img_title.html(night_bg[0][2]);

                }
            }
        }



    }


    // shake the options menu button on page load completion to notify user of its existence...
    // setTimeout(function(){$('#button_icon').effect('shake', {distance: 10},{times: 8});}, 5000);

});

