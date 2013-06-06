/*global test, testData, UserInterface, equal*/
test( "hello test", function() {
    var ui = new UserInterface();

    equal(ui.xpos, 0, "x pos is 0");
    equal(ui.ypos, 0, "y pos is 0");

    ui.hover(testData.hover1);

    equal(ui.xpos, 344, "x pos is 344");
    equal(ui.ypos, 544, "y pos is 544");
});