/*global $*/
//react to the events
var UserInterface = function () {
    var xposition = 0,
        yposition = 0;

    $('body').append('<img src="/img/blob.png" alt="location indicator" id="marker-blob">');

    function swipe(direction) {

    }

    function select(data) {

    }

    function hover(xpos, ypos) {
        xposition = xpos;
        yposition = ypos;
        updatePage();
    }

    function updatePage() {
        $("#marker-blob").animate({
            left: "344",
            top: "544"
        }, 500);
    }

    return {
        hover: hover,
        select: select,
        swipe: swipe,
        xpos: xposition,
        ypos: yposition
    };

};