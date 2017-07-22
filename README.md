# TutorJS
##### A simple and extensible jQuery walkthrough & tutorial library
#
###### Why?
Ever wanted to create a tutorial for your new spunky application? Me too. I couldn't find any out there that suited my needs, so I made one.

Usage
---------------

**1. Include**
``` js
    <script src="./tutor.js"/>
```

**2. Create a Tutor**
``` js
    var tutorial = new Tutor;
```
API Reference
------------
### `Tutor`
An object containing all Tutor functions & data

**Usage**
``` js
    var walkthrough = new Tutor;
```
#### `Tutor.addStep(element, [options])`
The start of any tutorial

**Usage**
``` js
    walkthrough.addStep($('.example'), {on:'click', class:'highlight-step'});
```
#
| Name | Type | Description |
|------------------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `element` | Object | a jQuery Element, i.e `$('.example')` |
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
Here is another example, this time the step is completed by pressing the 'p' key.
``` js
    checkKey = function(e){
        if(e.key === 'p'){
            tutorial.next() // ...manually complete the step when the pressed key is 'p'
        }
    }
    var tutorial = new Tutor;
    tutorial.addStep($('.input-1'), {
        on: 'keypress', // ...capture the 'keypress' event
        eventHandler: checkKey, // ...make our event handler (checkKey) capture any events
        wait: true // ...stop auto-completion of the step so we can manually complete it with tutorial.next()
    });
    tutorial.start();
```

#### `Tutor.next()`

**Usage**
``` js

```

Collection Functions
--------------------

The \_.walk module provides versions of most of the
[Underscore collection functions](http://underscorejs.org/#collections), with
some small differences that make them better suited for operating on trees.
-----------

A _parse tree_ is tree that represents the syntactic structure of a formal
language. For example, the arithmetic expression `1 + (4 + 2) * 7` might have 
