/*
 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 Using Angular's '.animate', all fade animations are created with javaScript.

 @BounceAnimation
 Constructor function that returns a new animation object that has all
 required methods for ngAnimate ex: this.enter(), this.leave(), etc

 @effect
 The actual animation that will be applied to the element, staggered
 first: the style to applied to the element 1/4 through the animtion
 mid: style to be applied to to the element 2/4 through the animation
 third: style to be applied to the element 3/4 through the animation
 end: style to be applied to the element when it's complete
 animation: the name of the animtion for the eventing system
 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

 */

(function () {

    var effects = {
        'bounce-normal': {
            first: {opacity: 0, transform: 'scale(.3)'},
            mid: {opacity: 1, transform: 'scale(1.05)'},
            third: {transform: 'scale(.9)'},
            end: {opacity: 1, transform: 'scale(1)'},
            animation: 'bounce-normal'
        },
        'bounce-left': {
            first: {opacity: 0, transform: 'translateX(-2000px)'},
            mid: {opacity: 1, transform: 'translateX(30px)'},
            third: {transform: 'translateX(-10px)'},
            end: {transform: 'translateX(0)'},
            animation: 'bounce-left'
        },
        'bounce-up': {
            first: {opacity: 0, transform: 'translateY(2000px)'},
            mid: {opacity: 1, transform: 'translateY(-30px)'},
            third: {transform: 'translateY(10px)'},
            end: {transform: 'translateY(0)'},
            animation: 'bounce-up'
        },
        'bounce-right': {
            first: {opacity: 0, transform: 'translateX(2000px)'},
            mid: {opacity: 1, transform: 'translateX(-30px)'},
            third: {transform: 'translateX(10px)'},
            end: {transform: 'translateX(0)'},
            animation: 'bounce-right'
        },
        'bounce-down': {
            first: {opacity: 0, transform: 'translateY(-2000px)'},
            mid: {opacity: 1, transform: 'translateY(30px)'},
            third: {transform: 'translateY(-10px)'},
            end: {transform: 'translateY(0)'},
            animation: 'bounce-down'
        }
    };

    var module = angular.module('fx.animations.bounces', ['fx.animations.bounces.factory']);

    for (var effect in effects) {

        addAnimationToModule(effect);
        addAnimationToModule(effect, 'enter');
        addAnimationToModule(effect, 'leave');
        addAnimationToModule(effect, 'move');

    }

    function addAnimationToModule(effect, event) {

        var effectClass = '.fx' + (typeof event !== 'undefined' ? '-' + event : '') + '-' + effect;

        module.animation(effectClass, ['BounceAnimation', function (BounceAnimation) {

            var eventsEffects = {};

            if(typeof event !== 'undefined') {
                eventsEffects[event] = effects[effect];
            } else {
                eventsEffects = effects[effect];
            }

            return new BounceAnimation(eventsEffects);

        }]);

    }

})();
