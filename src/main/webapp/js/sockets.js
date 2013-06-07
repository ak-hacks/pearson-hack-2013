/*global Pusher, console, UserInterface*/
// Enable pusher logging - don't include this in production
Pusher.log = function(message) {
    if (window.console && window.console.log) window.console.log(message);
};

var pusher = new Pusher('f17a457dad3779afdba1');
var channel = pusher.subscribe('leap_pearson');

var ui = new UserInterface(3, 2.6);

channel.bind('swipe', function(data) {
    // console.log('swipe received', data);
    ui.swipe(data.segment, data.direction);
});

channel.bind('open', function(data) {
    // console.log('open received', data);
    ui.open(data.x, data.y);
});

channel.bind('close', function() {
    // console.log('close received');
    ui.close();
});


channel.bind('hover', function(data) {
    // console.log('hover received', data);
    ui.hover(data[0], data[1]);
});