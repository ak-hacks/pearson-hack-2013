/*global $, alert, console*/
//react to the events
var UserInterface = function (yOffsetVal, xfactorVal) {
    var yOffset = yOffsetVal,
        xfactor = xfactorVal,
        xposition = 0,
        yposition = 0,
        halfWindowWidth = Math.floor($(window).width() / 2 ),
        currentElem;

    $('body').append('<img src="/leap-pearson/img/blob.png" alt="location indicator" id="marker-blob">');

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
        var xlocation = halfWindowWidth + parseInt(xpos, 10),
            ylocation = $(window).height() - parseInt(ypos, 10); //we're sent y from the bottom up, method expects y from top left corner
        if (xlocation > 0 && ylocation > 0) {
            currentElem = document.elementFromPoint(xlocation, ylocation);
            // console.log('xlocation: ', xlocation, ' ylocation: ', ylocation, ' elem is', elem);
            //alert('success \n received: [' + xpos+','+ ypos+ '] translated to: ['+xlocation+','+ylocation+']');
            currentElem .click();
        } else {
            console.log('fail \n received: [' + xpos+','+ ypos+ '] translated to: ['+xlocation+','+ylocation+']');
        }
    }

    function close() {
        $('div#overlay').click();
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
        xfactor: xfactor,
        yOffset: yOffset,
        hover: hover,
        open: open,
        close: close,
        swipe: swipe,
        xpos: xposition,
        ypos: yposition
    };

};