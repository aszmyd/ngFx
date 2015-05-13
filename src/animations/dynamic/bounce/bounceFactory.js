angular.module('fx.animations.bounces.factory', ['fx.animations.assist'])
    .factory('BounceAnimation', ['$timeout', '$window', 'Assist', function ($timeout, $window, Assist) {
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

            var startTime = 0.1;

            if (effectForEvents.enter) {

                this.enter = function (element, done) {
                    var options = Assist.parseClassList(element);
                    options.motion = 'enter';
                    options.animation = effectForEvents.enter.animation;
                    options.timeoutKey = Assist.timeoutKey;
                    options.stagger = true;
                    Assist.addTimer(options, element, done);
                    var enter = new TimelineMax();
                    enter.to(element, 0.01, effectForEvents.enter.first);
                    enter.to(element, options.duration, effectForEvents.enter.mid);
                    enter.to(element, options.duration, effectForEvents.enter.third);
                    enter.to(element, options.duration, effectForEvents.enter.end);
                    return function (canceled) {
                        if (canceled) {
                            var timer = element.data(Assist.timeoutKey);
                            if (timer) {
                                Assist.removeTimer(element, Assist.timeoutKey, timer);
                            }
                        }
                    };
                };


            }

            if (effectForEvents.leave) {

                this.leave = function (element, done) {
                    var options = Assist.parseClassList(element);
                    options.motion = 'leave';
                    options.animation = effectForEvents.leave.animation;
                    options.timeoutKey = Assist.timeoutKey;
                    options.stagger = true;
                    Assist.addTimer(options, element, done);
                    var leave = new TimelineMax();
                    leave.to(element, startTime, effectForEvents.leave.end);
                    leave.to(element, options.duration, effectForEvents.leave.third);
                    leave.to(element, options.duration, effectForEvents.leave.mid);
                    leave.to(element, options.duration, effectForEvents.leave.first);
                    return function (canceled) {
                        if (canceled) {
                            var timer = element.data(timeoutKey);
                            if (timer) {
                                Assist.removeTimer(element, Assist.timeoutKey, timer);
                            }
                        }
                    };
                };
            }

            if (effectForEvents.move) {

                this.move = this.enter;
            }

            if (effectForEvents.enter) {

                this.beforeAddClass = function (element, className, done) {
                    if (className) {
                        var options = Assist.parseClassList(element);
                        options.motion = 'enter';
                        options.animation = effectForEvents.enter.animation;
                        options.timeoutKey = Assist.timeoutKey;
                        options.stagger = true;
                        Assist.addTimer(options, element, done);
                        var bac = new TimelineMax();
                        bac.to(element, startTime, effectForEvents.enter.end);
                        bac.to(element, options.duration, effectForEvents.enter.third);
                        bac.to(element, options.duration, effectForEvents.enter.mid);
                        bac.to(element, options.duration, effectForEvents.enter.first);
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
                        options.stagger = true;
                        var rc = new TimelineMax();
                        rc.to(element, startTime, effectForEvents.leave.first);
                        rc.to(element, options.duration, effectForEvents.leave.mid);
                        rc.to(element, options.duration, effectForEvents.leave.third);
                        rc.to(element, options.duration, effectForEvents.leave.end);
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

