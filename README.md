# CSS Chrome extension

**This is a first attempt at a relatively simple chrome extension**

## What?
This exension inserts an element into the page you are on and allows you to inspect color / backgroundColor / fontFamily of every element below the cursor.
These inspected elements are presented as buttons within the injected element allowing you to copy values straight to the clipboard.

## How can I use it?
* Clone the repo
* Open up chrome
* Go to chrome extensions
* Select developer mode in the top right
* Select load unpacked
* You might get a couple of warning errors -- don't worry, they won't affect it
* Switch the extension on - pin it in the tool bar to see instructions
* Vist any website, hold down control while moving the mouse around and see what's what!
* The injected window can be moved around with the grabber at the top ':::::'
* The window can be closed with the cross

## To fix/finish
* The moveable window resets when you press ctrl again
* Add way to get different colour formats e.g. hex
* Fix general integration problems (because the element is injected into the page, is picks up some overriding CSS styles)
* Handle impossible to read contrast combinations
* Include a copyable path to the elements
