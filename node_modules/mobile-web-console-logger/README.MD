# mobile web console logger

## Overview
Display console.log() output in a div at the bottom of a web page for debugging mobile devices.

NOTE: If you have an 'Uncaught SyntaxError' on the page, then all javascript will stop running, including the console logger library.
eg. 
	Uncaught SyntaxError: Unexpected identifier

## Purpose

The mobile web console logger library helps you debug mobile web pages. If you only have Windows, and you want to quickly check the console on an iOS device, or you are using OSX and you want to check an Android device, you can simply add this library to your webpage.

## Benefits

* Debug web pages on Android and iOS devices without any setup
* No usb cables
* No drivers to install
* Logs:
 * console.log(), console.info(), console.warn(), console.error(), console.debug()
 * uncaught exceptions
 * divide by zero errors (result=Infinity)
 * result is not a number (NaN)
 * nulls
 * undefined values
 * reference errors where property or function "is not defined"
 * empty strings

## Screenshots

![Screen showing console.log() statements displayed on the web page](/docs/img/screen1.png?raw=true "Screen showing console.log() statements displayed on the web page")

## Demo

[Click here for a demo.](https://erspark2002.github.io/mobile-web-console-logger/)

## Dependencies

* jQuery is currently used to build the dynamic list of logging statements.

## Server-side Logging

* As the library captures all console error logging and page errors as text, it could be forked to send this information to the server via ajax.