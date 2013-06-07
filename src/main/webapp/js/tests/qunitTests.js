/*global asyncTest, test, testData, $, equal, start, ui, channel*/
asyncTest( "does marker blob move correctly?", function() {
    var halfWindowWidth = Math.floor($(window).width() / 2 );

    equal(ui.xpos, 0, "x pos is 0");
    equal(ui.ypos, 0, "y pos is 0");

    ui.hover(testData.hover1.xpos, testData.hover1.ypos);

    setTimeout(function() {
        var expectedXval = halfWindowWidth + (testData.hover1.xpos * ui.xfactor),
            expectedYval = testData.hover1.ypos + ui.yOffset;
        //have to wait for animation to complete
        equal($('#marker-blob').css('left') , expectedXval + 'px', "x pos is " + expectedXval);
        equal($('#marker-blob').css('bottom'),  expectedYval + 'px', "y pos is " + expectedYval);

        start();
    }, 500);

});

test("open method", function () {
    ui.open(-27, 45);
})

/*asyncTest("does call from socket make it to ui", function() {
    var halfWindowWidth = Math.floor($(window).width() / 2 );

    Pusher.instances[0].connection.state = 'connected';
    Pusher.instances[0].connection.emit('hover', [34, 56]);

    setTimeout(function() {
        var expectedXval = halfWindowWidth + (testData.hover1.xpos * ui.xfactor),
            expectedYval = testData.hover1.ypos + ui.yOffset;
        //have to wait for animation to complete
        equal($('#marker-blob').css('left') , expectedXval + 'px', "x pos is " + expectedXval);
        equal($('#marker-blob').css('bottom'),  expectedYval + 'px', "y pos is " + expectedYval);

        start();
    }, 500);
});*/