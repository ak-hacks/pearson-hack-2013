/*global $, console*/
//react to the events
var UserInterface = function (xfactorVal, yfactorVal) {
    var xfactor = xfactorVal,
        yfactor = yfactorVal,
        xposition = 0,
        yposition = 0,
        halfWindowWidth = Math.floor($(window).width() / 2 ),
        halfWindowHeight = Math.floor($(window).height() / 2),
        elemOpen = false,
        openEventInProgress = false,
        imgStr = '<img src="/leap-pearson/img/blob.png" ' +
                 'alt="location indicator" ' +
                 'id="marker-blob" ' +
                 'style="bottom:' + halfWindowHeight + 'px;left:' + halfWindowWidth + 'px">';

    $('body').append(imgStr);

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
        if (!openEventInProgress) {
            openEventInProgress = true;
            var xlocation = halfWindowWidth + (parseInt(xpos, 10) * xfactor),
                ylocation = $(window).height() - (parseInt(ypos, 10) * yfactor); //we're sent y from the bottom up, method expects y from top left corner
            if (xlocation > 0 && ylocation > 0) {
                var elem = document.elementFromPoint(xlocation, ylocation);
                console.log('xlocation: ', xlocation, ' ylocation: ', ylocation, ' elem is', elem);
                //alert('success \n received: [' + xpos+','+ ypos+ '] translated to: ['+xlocation+','+ylocation+']');
                if ($(elem).attr('id') !== "marker-blob") {
                    elem.click();
                    elemOpen = true;
                }
            } else {
                console.log('fail \n received: [' + xpos+','+ ypos+ '] translated to: ['+xlocation+','+ylocation+']');
            }
            setTimeout(function () {
                openEventInProgress = false;
            }, 2000);
        } else {
            console.log('open received whilst another open already in progress');
        }

    }

    function close() {
        if (elemOpen) {
            elemOpen = false;
            $('div#overlay').click();
        } else {
            console.log('close received with no open prior');
        }
    }

    function hover(xpos, ypos) {
        // console.log('received: xpos:', xpos, ' ypos:', ypos);
        xposition = xpos * xfactor;
        yposition = ypos * yfactor;
        updateBlob();
    }

    function updateBlob() {
        var newX = halfWindowWidth + xposition,
            newY = yposition;

        // console.log(' xpos:', xposition, ' ypos:', yposition, ' || x is', newX, 'y is', newY);
        $('#marker-blob').css({left: newX, bottom: newY});
    }

    return {
        xfactor: xfactor,
        yfactor: yfactor,
        hover: hover,
        open: open,
        close: close,
        swipe: swipe,
        xpos: xposition,
        ypos: yposition
    };

};