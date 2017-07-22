var Tutor = function(){
  this.steps = [];
  this.currentStep = 0;
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

  //options:
  //on: `string` a jQuery event, i.e 'click'
  //class: `string` a CSS classname to be attached to current step element
  //start: `function` a function to be run when the step is initiated, called with the current step object
  //complete: `function` a function to be run when the step is completed, called with the current step object
  //eventHandler: `function` a function to be called with current step's event (helps to capture keypresses, etc.)
  //wait: `boolean` wait: true will mean the Tutor won't automatically go to the next step when the event is fired. Use this if you are capturing a specific key. See Tutor.next()

  var placeholder = {on: options.on || 'click', class: options.class || 'tutor--current'};

  this.steps.push({el: $(el), options: options || placeholder});


  return this;
};

//x.start Starts tutorial.
//args: start[fn], end[fn]
//start: a callback function that runs at the start of the tutorial and is fed (this)
//end: a callback function that runs at the end of the tutorial and is fed (this) and the last step of the tutorial

Tutor.prototype.start = function(start = null, end = null){
  this.start = start;
  this.end = end;
  if (!this.steps.length > 0) {
    throw 'TutorJS Error: x Must contain atleast one step. See x.addStep()';
    return false;
  }
  if (typeof start === "function") {
    start();
  }
  this.next(false);
  return this;
}


// NEXT.

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
        if (typeof _this.end === "function") {
          _this.end(_this, step)
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


//PREVIOUS.


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
