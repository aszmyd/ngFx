angular.module('fx.animations.fades.factory', ['fx.animations.assist'])
    .factory('FadeAnimation', ['$timeout', '$window', 'Assist', function ($timeout, $window, Assist) {
        return function (eventsEffects) {

            var effectForEvents = {
                enter: false,
                leave: false,
                move: false
            };

            if (eventsEffects.hasOwnProperty('enter')) {
                effectForEvents.enter = eventsEffects.enter;
            }

            if (eventsEffects.hasOwnProperty('leave')) {
                effectForEvents.leave = eventsEffects.leave;
            }

            if (eventsEffects.hasOwnProperty('move')) {
                effectForEvents.move = eventsEffects.move;
            }

            if (!effectForEvents.enter && !effectForEvents.leave && !effectForEvents.move) {
                effectForEvents.enter = eventsEffects;
                effectForEvents.leave = eventsEffects;
                effectForEvents.move = eventsEffects;
            }

            if (effectForEvents.enter) {

                this.enter = function (element, done) {
                    var options = Assist.parseClassList(element);
                    options.motion = 'enter';
                    options.animation = effectForEvents.enter.animation;
                    options.timeoutKey = Assist.timeoutKey;
                    Assist.addTimer(options, element, done);
                    effectForEvents.enter.in.ease = options.ease.easeOut;
                    TweenMax.set(element, effectForEvents.enter.out);
                    TweenMax.to(element, options.duration, effectForEvents.enter.in);
                    return function (canceled) {
                        var timer = element.data(timeoutKey);
                        if (canceled) {
                            if (timer) {
                                Assist.removeTimer(element, Assist.timeoutKey, timer);
                            }
                        }
                    };
                };
            }

            if (effectForEvents.leave) {

                var outEffectLeave = effectForEvents.leave.inverse || effectForEvents.leave.out;

                this.leave = function (element, done) {
                    var options = Assist.parseClassList(element);
                    options.motion = 'leave';
                    options.animation = effectForEvents.leave.animation;
                    options.timeoutKey = Assist.timeoutKey;
                    Assist.addTimer(options, element, done);
                    outEffectLeave.ease = options.ease.easeIn;
                    TweenMax.set(element, effectForEvents.leave.in);
                    TweenMax.to(element, options.duration, outEffectLeave);
                    return function (canceled) {
                        var timer = element.data(Assist.timeoutKey);
                        if (canceled) {
                            if (timer) {
                                Assist.removeTimer(element, Assist.timeoutKey, timer);
                            }
                        }
                    };
                };
            }

            if (effectForEvents.move) {

                this.move = function (element, done) {
                    var options = Assist.parseClassList(element);
                    options.motion = 'move';
                    options.animation = effectForEvents.move.animation;
                    options.timeoutKey = Assist.timeoutKey;
                    Assist.addTimer(options, element, done);
                    effectForEvents.move.in.ease = options.ease.easeOut;
                    TweenMax.set(element, effectForEvents.move.out);
                    TweenMax.to(element, options.duration, effectForEvents.move.in);
                    return function (canceled) {
                        var timer = element.data(timeoutKey);
                        if (canceled) {
                            if (timer) {
                                Assist.removeTimer(element, Assist.timeoutKey, timer);
                            }
                        }
                    };
                };

            }

            if (effectForEvents.enter) {

                var outEffectLeave = effectForEvents.enter.inverse || effectForEvents.enter.out;

                this.beforeAddClass = function (element, className, done) {
                    if (className) {
                        var options = Assist.parseClassList(element);
                        options.motion = 'enter';
                        options.animation = effectForEvents.enter.animation;
                        options.timeoutKey = Assist.timeoutKey;
                        Assist.addTimer(options, element, done);
                        TweenMax.to(element, options.duration, outEffectLeave);
                        return function (canceled) {
                            if (canceled) {
                                var timer = element.data(timeoutKey);
                                if (timer) {
                                    Assist.removeTimer(element, Assist.timeoutKey, timer);
                                }
                            }
                        };
                    } else {
                        done();
                    }
                };
            }

            if (effectForEvents.leave) {

                this.removeClass = function (element, className, done) {
                    if (className) {
                        var options = Assist.parseClassList(element);
                        options.motion = 'leave';
                        options.animation = effectForEvents.leave.animation;
                        options.timeoutKey = Assist.timeoutKey;
                        TweenMax.set(element, effectForEvents.leave.out);
                        TweenMax.to(element, options.duration, effectForEvents.leave.in);
                        return function (canceled) {
                            if (canceled) {
                                var timer = element.data(timeoutKey);
                                if (timer) {
                                    Assist.removeTimer(element, Assist.timeoutKey, timer);
                                }
                            }
                        };
                    } else {
                        done();
                    }
                };
            }
        };
    }]);
