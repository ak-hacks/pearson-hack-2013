/*global $*/
//react to the events
var UserInterface = function () {
    var animationDelay = 500,
        xposition = 0,
        yposition = 0,
        halfWindowWidth = Math.floor($(window).width() / 2 ),
        winHeight = Math.floor($(window).height());

    $('body').append('<img src="/img/blob.png" alt="location indicator" id="marker-blob">');

    function swipe(segment, direction) {

    }

    function select(data) {

    }

    function hover(xpos, ypos) {
        xposition = xpos;
        yposition = ypos;
        updateBlob();
    }

    function updateBlob() {
        var newX = halfWindowWidth + xposition,
            newY = winHeight - yposition;
        $('#marker-blob').css({left: newX, top: newY});
    }

    return {
        hover: hover,
        select: select,
        swipe: swipe,
        xpos: xposition,
        ypos: yposition
    };

};