/*global $*/
//react to the events
var UserInterface = function (yOffsetVal, xfactorVal) {
    var yOffset = yOffsetVal,
        xfactor = xfactorVal,
        xposition = 0,
        yposition = 0,
        halfWindowWidth = Math.floor($(window).width() / 2 );

    $('body').append('<img src="/img/blob.png" alt="location indicator" id="marker-blob">');

    function swipe(segment, direction) {
        var section = $("#ribbon-" + segment),
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
            if (newPosition > (-$(section).width())) {
                $(section).css('left', newPosition);
            }

        }
    }

    function open(xpos, ypos) {
        var elem = document.elementByPoint(xpos, ypos);
        elem.click();
    }

    function close() {

    }

    function hover(xpos, ypos) {
        xposition = xpos;
        yposition = ypos;
        updateBlob();
    }

    function updateBlob() {
        var multipliedx = xposition * xfactor,
            newX = halfWindowWidth + (xposition * xfactor),
            newY = yposition + yOffset;

            console.log('multipliedx', multipliedx, 'x is', newX, 'y is', newY);
        $('#marker-blob').css({left: newX, bottom: newY});
    }

    return {
        hover: hover,
        open: open,
        close: close,
        swipe: swipe,
        xpos: xposition,
        ypos: yposition
    };

};