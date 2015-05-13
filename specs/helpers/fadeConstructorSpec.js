describe('FadeAnimation constructor', function(){
  var newAnimation,
      effect;
  beforeEach(module('fx.animations.fades.factory'));

  beforeEach(function(){
    inject(function(FadeAnimation){
      effect = {
        in: {opacity: 1},
        out: {opacity: 0},
        animation: 'fade-normal'
      };
      newAnimation = new FadeAnimation(effect);
    });
  });

  it('should return a new animation instance', function(){
    expect(newAnimation.enter).to.be.a('function');
    expect(newAnimation.leave).to.be.a('function');
    expect(newAnimation.move).to.be.a('function');
    expect(newAnimation.removeClass).to.be.a('function');
    expect(newAnimation.beforeAddClass).to.be.a('function');
  });
});
