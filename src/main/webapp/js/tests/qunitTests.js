/*global test, testData, $, UserInterface, equal, module, sinon*/
asyncTest( "hello test", function() {
    var ui = new UserInterface();

    equal(ui.xpos, 0, "x pos is 0");
    equal(ui.ypos, 0, "y pos is 0");

    ui.hover(testData.hover1.xpos, testData.hover1.ypos);

    setTimeout(function() {
        //have to wait for animation to complete
        equal($('#marker-blob').css('left') , (Math.floor($(window).width() / 2 ) + testData.hover1.xpos) + 'px', "x pos is 344");
        equal($('#marker-blob').css('top'), (Math.floor($(window).height() / 2 ) + testData.hover1.ypos) + 'px', "y pos is 544");

        start();
    }, 1000);


});