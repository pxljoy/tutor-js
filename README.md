# TutorJS
##### A simple and extensible jQuery walkthrough & tutorial library

## [Demo](https://pxljoy.github.io/tutor-js/basic.html)

Usage
===============  

**0. Add [jQuery](https://jquery.com/)**
``` html
<script src="./jquery.js"/>
```
**1. Include**

``` html
<script src="./tutor.js"/>
```

**2. Create a Tutor**

``` js
var tutorial = new Tutor;
```

**3. Add a step**

``` js
tutorial.addStep('.element');
```

**4. Start**

``` js
tutorial.start();
```

API Reference
===============  

>Note, UI and such currently is your job. TutorJS just provides a good backbone for dealing with that stuff.

### `Tutor`  

An object containing all Tutor functions & data

**Usage**

``` js
var walkthrough = new Tutor;
```  

### `Tutor.addStep(element, [options])`
The start of any tutorial

**Usage**

``` js
walkthrough.addStep('.example', {on:'click', class:'highlight-step'});
```
**Parameters**

| Name | Type | Description |
|------------------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `element` | Object | a jQuery CSS Selected Element, i.e `'.example'` |
| `options` (optional) | Object | See below for possible options. |
| `options.on` | String | a jQuery event, i.e 'click' or 'keypress'. This is the event that needs to be fulfilled to automatically go to the next step. Defaults to 'click'. |
| `options.class` | String | a CSS classname to be attached to current step element. Defaults to 'tutor--current'. |
| `options.start` | Function | a function to be run when the step is initiated, called with the current step object |
| `options.complete` | Function | a function to be run when the step is completed, called with the current step object |
| `options.eventHandler` | Function | a function to be called with current step's event (helps to capture keypresses, etc.) |
| `options.wait` | Boolean | `wait: true` will mean the Tutor won't automatically go to the next step when the event is fired. Use this if you are capturing more specific events, like a specific key. See *`options.eventHandler`* and *`Tutor.next()`* |  

If `options` is not provided, it uses a placeholder:
``` js
    //Default placeholder
    {
        on: 'click',
        class: 'tutor--current'
    }
```  

#### Examples  

This is a step that is completed by mousing over the element and calls an alert when completed.

``` js
    var tutorial = new Tutor;
    tutorial.addStep('.touch-me', {
        on:'mouseover',
        complete: function() {
            alert('Touched!');
            }
    }).start();
```

This is a step that is completed by pressing the 'p' key.

``` js
    checkKey = function(e){
        if(e.key === 'p'){
            tutorial.next() // ...manually complete the step when the pressed key is 'p'
        };
    };
    var tutorial = new Tutor;
    tutorial.addStep('.input-1', {
        on: 'keypress', // ...capture the 'keypress' event
        eventHandler: checkKey, // ...make our event handler (checkKey) capture any events
        wait: true // ...stop auto-completion of the step so we can manually complete it with tutorial.next()
    }).start();
```  

### `Tutor.next()`
Manually skip to the next step

**Usage**

``` js
walkthrough.next();
```  

>Note, `Tutor.next()` fires the `complete` function of the previous step, and the `start` function of the (now) next step.  

### `Tutor.prev()`
Manually go to previous step

**Usage**

``` js
walkthrough.prev();
```

>Note, `Tutor.prev()` fires the `start` function of the (before) previous step.  

### `Tutor.start([start], [end])`
Begin the tutorial

**Usage**

``` js
walkthrough.start();
```

**Parameters**

| Name | Type | Description |
|---------|----------|---------------------------------------------------------|
| `start` (optional) | Function | a function that is called when starting |
| `end` (optional) | Function | a function that is called after all steps are completed |  

#### Examples

Alert on start and end of walkthrough.

``` js
var walkthrough = new Tutor;
walkthrough
    .addStep('.element')
    .addStep('.element-2')
    .start(function(){
        alert('Started!')
    }, function(){
        alert('Finished!')
    });
```  

That's all there is to it!

Contributing
--------

For more info on how to contribute please see the [contribution guidelines.](https://github.com/pxljoy/tutor-js/blob/master/CONTRIBUTING.md)

Caught a mistake or want to contribute to the documentation? [Edit this page on Github](https://github.com/pxljoy/tutor-js/blob/master/README.md)

License
--------

TutorJS is licensed under the [MIT License](https://github.com/pxljoy/tutor-js/blob/master/LICENSE).
