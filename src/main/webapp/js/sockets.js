/*global Pusher, console, UserInterface*/
// Enable pusher logging - don't include this in production
Pusher.log = function(message) {
    if (window.console && window.console.log) window.console.log(message);
};

var pusher = new Pusher('f17a457dad3779afdba1');
var channel = pusher.subscribe('leap_pearson');

var ui = new UserInterface();

channel.bind('swipe', function(data) {
    console.log('swipe received', data);
    ui.swipe(data.segment, data.direction);
});

channel.bind('select', function(data) {
    console.log('select received', data);
    ui.select(data[0], data[1]);
});

channel.bind('hover', function(data) {
    console.log('hover received', data);
    ui.hover(data[0], data[1]);
});