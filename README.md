# knockout-quicksand
A custom KnockoutJS binding handler to support jQuery Quicksand.

## Demo

See the [jsfiddle](http://jsfiddle.net/wimpyprogrammer/r3hkwp3b/) based on Knockout's [animated transitions example](http://knockoutjs.com/examples/animatedTransitions.html).

## Dependencies

This plugin depends on:
- jQuery
- jQuery Quicksand from http://razorjack.net/quicksand/
- KnockoutJS

If you're using jQuery 1.9+, be sure you upgrade to jQuery Quicksand 1.4+.

## Usage

The Quicksand custom bindings aim to support the same syntax as Knockout's `foreach` and `template` bindings.

**Basic**
```html
<ul data-bind="quicksand: arrayName">
    <li data-bind="text: elementPropertyName"></li>
</ul>
```
**Foreach syntax**
```html
<ul data-bind="quicksand: { data: arrayName }">
    <li data-bind="text: elementPropertyName"></li>
</ul>
```
**Foreach with Quicksand options**

The optional options attribute can specify Quicksand parameters.
```html
<ul data-bind="quicksand: { data: arrayName, options: { quicksandOption: value } }">
    <li data-bind="text: elementPropertyName"></li>
</ul>
```
**Template syntax**
```html
<ul data-bind="quicksandTemplate: { foreach: arrayName, options: { quicksandOption: value } }">
    <li data-bind="text: elementPropertyName"></li>
</ul>
```
**Template with Quicksand options**
```html
<ul data-bind="quicksandTemplate: { foreach: arrayName, name: 'template-id', options: { quicksandOption: value } }"></ul>
<script type="text/html" id="template-id">
    <li data-bind="text: elementPropertyName"></li>
</script>
```
