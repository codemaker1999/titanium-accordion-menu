Titanium Accordion Menu
========================

Implementation of an accordion menu for Titanium apps. Currently only tested on Android. This repo is a demo app, the only file you need to paste into your project is "app/lib/accordion.js".

Usage
------

1. Create a container view for the menu items, and set the attribute "accordion" to "true":

	```xml
	<View id="myView" accordion="true"> ... </View>
	```

	OR...

	```js
	var view = Titanium.UI.createView( {accordion: "true", id: "myView"} );
	```

2. Add elements to the container. The first child element will be assigned the click event handler, and the rest of the children will be hidden when the accordion is collapsed.

3. Import the module:

	```js
	var accordion = require("accordion");
	```

4. Run the module:

	```js
	var depth          = -1;   // no max tree search depth
	var startCollapsed = true; // initial accordion state is collapsed   
	function callback (containerView) {}; // called when an accordion menu is toggled
	accordion.setup($.myView, depth, startCollapsed, callback);
	```