angular.module('starter.controllers', ['ionic', 'ionic.contrib.ui.tinderCards'])
.directive('noScroll', function() {
    return {
        restrict: 'A',
        link: function($scope, $element, $attr) {
            $element.on('touchmove', function(e) {
                e.preventDefault();
            });
        }
    }
})


function secondsToTime(secs)
{
    secs = Math.round(secs);
    var hours = Math.floor(secs / (60 * 60));

    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);

    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);

    if(hours < 10)
      hours = "0" + hours
    if(minutes < 10)
      minutes = "0" + minutes
    if(seconds < 10)
      seconds = "0" + seconds      

    var obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
    };
    return obj;
}
