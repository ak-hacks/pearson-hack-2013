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
        var section = $("ribbon-" + segment),
            segPosition = section.position(),
            newPosition;
        if (direction === 'left') {
            //need to put in check for whether there's additional content to the right
            newPosition = segPosition.left - halfWindowWidth;
            if (section.width() > newPosition) {
                $(section).css('left', newPosition);
            }
        } else {
            newPosition = segPosition.left + halfWindowWidth;
            if (newPosition > 0) {
                $(section).css('left', newPosition);
            }

        }
    }

    function select(xpos, ypos) {
        var elem = document.elementByPoint(xpos, ypos);
        elem.click();
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