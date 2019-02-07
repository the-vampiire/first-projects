$(document).ready(function(){


    // ------ About Section Effects ------ //

    $('#about-text').hover(function(){
        $('#Vampiire').toggle();
        $('#Patrick').toggle();
        $('#creature').toggle();
        $('#programmer').toggle();
        $('#BW').toggle();
        $('#Color').toggle();
    });

    // ---- Overview Hover Over Captions ----- //
    $('#Overview1').hover(function(){
        $('#Overview1Caption1').toggle();

    });

    $('#Overview2').hover(function(){
        $('#Overview1Caption2').toggle();

    });

    $('#Overview3').hover(function(){
        $('#Overview1Caption3').toggle();

    });

    // ----- Bring Tab Content Into View ----- //

    // Overview Tab Section



    $('#Overview-Tab').on('shown.bs.tab', function(){
        $('#Project-Overview')[0].scrollIntoView(false);

    });

    // Tribute Tab Section
    $('#Tribute-Tab').on('shown.bs.tab', function(){
        $('#Project1-Accordion')[0].scrollIntoView(false);

    });

    // Project2 Tab Section
    $('#Quote-Tab').on('shown.bs.tab', function(){
        $('#Project2-Accordion')[0].scrollIntoView(false);

    });

    // Project3 Tab Section
    $('#Weather-Tab').on('shown.bs.tab', function(){
        $('#Project3-Accordion')[0].scrollIntoView(false);

    });

    // ----- Click on Accordions to Show Project Details ----- //

// Project 1
    $('#Project1-Description').on('shown.bs.collapse', function(){
        $(this)[0].scrollIntoView(false);
        $('.down-arrow').removeClass("fa fa-arrow-circle-o-down fa-2x down-arrow").addClass("fa fa-arrow-circle-o-up fa-2x up-arrow")
    });

    $('#Project1-Description').on('hidden.bs.collapse', function(){
        $('#Project1-Accordion')[0].scrollIntoView(false);
        $('.up-arrow').removeClass("fa fa-arrow-circle-o-up fa-2x up-arrow").addClass("fa fa-arrow-circle-o-down fa-2x down-arrow")
    });

// Project 2
    $('#Project2-Description').on('shown.bs.collapse', function(){
        $(this)[0].scrollIntoView(false);
        $('.down-arrow').removeClass("fa fa-arrow-circle-o-down fa-2x down-arrow").addClass("fa fa-arrow-circle-o-up fa-2x up-arrow")
    });

    $('#Project2-Description').on('hidden.bs.collapse', function(){
        $('#Project2-Accordion')[0].scrollIntoView(false);
        $('.up-arrow').removeClass("fa fa-arrow-circle-o-up fa-2x up-arrow").addClass("fa fa-arrow-circle-o-down fa-2x down-arrow")
    });

// Project 3
    $('#Project3-Description').on('shown.bs.collapse', function(){
        $(this)[0].scrollIntoView(false);
        $('.down-arrow').removeClass("fa fa-arrow-circle-o-down fa-2x down-arrow").addClass("fa fa-arrow-circle-o-up fa-2x up-arrow")
    });

    $('#Project3-Description').on('hidden.bs.collapse', function(){
        $('#Project3-Accordion')[0].scrollIntoView(false);
        $('.up-arrow').removeClass("fa fa-arrow-circle-o-up fa-2x up-arrow").addClass("fa fa-arrow-circle-o-down fa-2x down-arrow")
    });



    // ----- Tooltips for Social Media ----- //

    $('#Github').tooltip();
    $('#FCC').tooltip();
    $('#LinkedIn').tooltip();


});