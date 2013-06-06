/*global Pusher, console, UserInterface*/
// Enable pusher logging - don't include this in production
Pusher.log = function(message) {
    if (window.console && window.console.log) window.console.log(message);
};

var pusher = new Pusher('f17a457dad3779afdba1');
var channel = pusher.subscribe('test_channel');
channel.bind('swipe', function(data) {
    console.log('swipe received', data);
    UserInterface.swipe(data.segment, data.direction);
});

channel.bind('click', function(data) {
    console.log('click received', data);
    UserInterface.click(data);
});

channel.bind('hover', function(data) {
    console.log('hover received', data);
    UserInterface.hover(data.xposition, data.yposition);
});