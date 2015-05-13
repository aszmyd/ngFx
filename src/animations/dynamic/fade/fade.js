/*
 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 Using Angular's '.animate', all fade animations are created with javaScript.

 @FadeAnimation
 Constructor function that returns a new animation object that has all
 required methods for ngAnimate ex: this.enter(), this.leave(), etc

 @effect
 The actual animation that will be applied to the element
 enter: style to be applied when angular triggers the enter event
 leave: style to be applied when angular triggers the leave event
 inverse: style to be appiled to offset the enter event
 animation: the name of the animtion for the eventing system
 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

 */


(function () {

    var effects = {
        'fade-normal': {
            in: {opacity: 1},
            out: {opacity: 0},
            animation: 'fade-normal'
        },
        'fade-down': {
            in: {opacity: 1, transform: 'translateY(0)'},
            out: {opacity: 0, transform: 'translateY(-20px)'},
            inverse: {opacity: 0, transform: 'translateY(20px)'},
            animation: 'fade-down'
        },
        'fade-down-big': {
            in: {opacity: 1, transform: 'translateY(0)'},
            out: {opacity: 0, transform: 'translateY(-2000px)'},
            inverse: {opacity: 0, transform: 'translateY(2000px)'},
            animation: 'fade-down-big'
        },
        'fade-left': {
            in: {opacity: 1, transform: 'translateX(0)'},
            out: {opacity: 0, transform: 'translateX(-20px)'},
            inverse: {opacity: 0, transform: 'translateX(20px)'},
            animation: 'fade-left'
        },
        'fade-left-big': {
            in: {opacity: 1, transform: 'translateX(0)'},
            out: {opacity: 0, transform: 'translateX(-2000px)'},
            inverse: {opacity: 0, transform: 'translateX(2000px)'},
            animation: 'fade-left-big'
        },
        'fade-right': {
            in: {opacity: 1, transform: 'translateX(0)'},
            out: {opacity: 0, transform: 'translateX(20px)'},
            inverse: {opacity: 0, transform: 'translateX(-20px)'},
            animation: 'fade-right'
        },
        'fade-right-big': {
            in: {opacity: 1, transform: 'translateX(0)'},
            out: {opacity: 0, transform: 'translateX(2000px)'},
            inverse: {opacity: 0, transform: 'translateX(-2000px)'},
            animation: 'fade-right-big'
        },
        'fade-up': {
            in: {opacity: 1, transform: 'translateY(0)'},
            out: {opacity: 0, transform: 'translateY(20px)'},
            inverse: {opacity: 0, transform: 'translateY(-20px)'},
            animation: 'fade-up'
        },
        'fade-up-big': {
            in: {opacity: 1, transform: 'translateY(0)'},
            out: {opacity: 0, transform: 'translateY(2000px)'},
            inverse: {opacity: 0, transform: 'translateY(-2000px)'},
            animation: 'fade-up-big'
        },
        'fade-overlay': {
            in: {opacity: 0.7},
            out: {opacity: 0},
            inverse: {opacity: 0},
            animation: 'fade-overlay'
        }
    };

    var module = angular.module('fx.animations.fades', ['fx.animations.fades.factory']);

    for (var effect in effects) {

        addAnimationToModule(effect);
        addAnimationToModule(effect, 'enter');
        addAnimationToModule(effect, 'leave');
        addAnimationToModule(effect, 'move');

    }

    function addAnimationToModule(effect, event) {

        var effectClass = '.fx' + (typeof event !== 'undefined' ? '-' + event : '') + '-' + effect;

        module.animation(effectClass, ['FadeAnimation', function (FadeAnimation) {

            var eventsEffects = {};

            if (typeof event !== 'undefined') {
                eventsEffects[event] = effects[effect];
            } else {
                eventsEffects = effects[effect];
            }

            return new FadeAnimation(eventsEffects);

        }]);

    }

})();