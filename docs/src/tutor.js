var Tutor = function(){
  this.steps = [];
  this.currentStep = 0;
  this.options = {};
  (function() {
    if ( typeof Tutor.prototype.uniqueid == "undefined" ) {
        var id = 0;
        Tutor.prototype.uniqueid = function() {
            if ( typeof this.__uniqueId == "undefined" ) {
                this.__uniqueId = ++id;
            }
            return this.__uniqueId;
        };
    }
  }());
  this.uniqueid();
}


Tutor.prototype.addStep = function (el, options = undefined) {
  if (typeof el === 'undefined') {
    throw 'TutorJS Error: No jQuery element specified';
    return false;
  }

  var placeholder = {on: options.on || 'click', class: options.class || 'tutor--current'};

  this.steps.push({el: $(el), options: options || placeholder});


  return this;
};

Tutor.prototype.start = function(s = null, e = null){
  this.currentStep = 0;
  this.options.start = s;
  this.options.end = e;
  if (!this.steps.length > 0) {
    throw 'TutorJS Error: x Must contain atleast one step. See x.addStep()';
    return false;
  }
  if (typeof s === "function") {
    s();
  }
  this.next(false);
  return this;
}

Tutor.prototype.next = function(skip = true){
    var step = this.steps[this.currentStep];
    step.el.addClass(step.options.class);
    if (typeof step.options.start === "function") {
      step.options.start(step);
    }

    var _this = this;

    var go = function(){
      step.el.removeClass(step.options.class);
      if (typeof step.options.complete === "function") {
        step.options.complete(step);
      }
      if ((_this.currentStep + 1) < _this.steps.length) {
        _this.currentStep += 1;
        _this.next(false);
      } else {
        if (typeof _this.options.end === "function") {
          _this.options.end(_this, step)
        }
        return true;
      }
    }

    if (skip === false) {
      step.el.on(step.options.on + '.tutorjs.' + _this.__uniqueId, function(e){
        if (typeof step.options.eventHandler === 'function' && step.options.wait === true){
          step.options.eventHandler(e);
        } else if (typeof step.options.eventHandler === 'function'){
          step.options.eventHandler(e);
          step.el.off(step.options.on + '.tutorjs.' + _this.__uniqueId);
          go();
        } else if (step.options.wait === true) {
          throw 'TutorJS Error: options.wait[bool] must be used with an eventHandler[fn]'
        } else {
          step.el.off(step.options.on + '.tutorjs.' + _this.__uniqueId);
          go();
        }
      });
    } else {
      go();
    }
    return this;
}

Tutor.prototype.prev = function(){

  if (this.currentStep - 1 >= 0) {

    this.currentStep -= 1;

    var step = this.steps[this.currentStep];
    step.el.addClass(step.options.class);
    if (typeof step.options.start === "function") {
      step.options.start(step);
    }

    var _this = this;

    var nS = _this.steps[_this.currentStep + 1];

    if (_this.currentStep + 1 <= _this.steps.length){
      nS.el.off(nS.options.on + '.tutorjs.' + _this.__uniqueId);
      nS.el.removeClass(nS.options.class);
    };

    var go = function(){
      if (typeof step.options.complete === "function") {
        step.options.complete(step);
      }
    }
      step.el.on(step.options.on + '.tutorjs.' + _this.__uniqueId, function(e){
        if (typeof step.options.eventHandler === 'function' && step.options.wait === true){
          step.options.eventHandler(e);
        } else if (typeof step.options.eventHandler === 'function'){
          step.options.eventHandler(e);
          step.el.off(step.options.on + '.tutorjs.' + _this.__uniqueId);
          go();
        } else if (step.options.wait === true) {
          throw 'TutorJS Error: options.wait[bool] must be used with an eventHandler[fn]'
        } else {
          step.el.off(step.options.on + '.tutorjs.' + _this.__uniqueId);
          go();
        }
      });

  } else {
    throw 'TutorJS Error: x.prev[fn] cannot go back past 0'
  }
  return this;

}
