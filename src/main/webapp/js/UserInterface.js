/*global $*/
//react to the events
var UserInterface = function () {
    var animationDelay = 500,
        xposition = 0,
        yposition = 0,
        halfWindowWidth = Math.floor($(window).width() / 2 ),
        halfWindowHeight = Math.floor($(window).height() / 2);

    $('body').append('<img src="/img/blob.png" alt="location indicator" id="marker-blob">');

    function swipe(segment, direction) {

    }

    function select(data) {

    }

    function hover(xpos, ypos) {
        xposition = xpos;
        yposition = ypos;
        updatePage();
    }

    function updatePage() {
        var newX = halfWindowWidth + xposition,
            newY = halfWindowHeight + yposition;
        $("#marker-blob").animate({
            left: newX,
            top: newY
        }, animationDelay);
    }

    return {
        hover: hover,
        select: select,
        swipe: swipe,
        xpos: xposition,
        ypos: yposition
    };

};