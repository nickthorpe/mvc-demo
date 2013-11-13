
//initialize Parse library with our application and JavaScript library keys
Parse.initialize("ud3352qynMwoehHUJiEUyNvk1BSk4Dz0j6vdrhKl", "peuU1U0ObOXERQZcmdeDWz1ZBBbHgvUU3EORpFDY");

//various utility functions

function htmlEncode(s) {
    //create an in-memory div element
    var div = document.createElement('div');
    //append the string to encode as a text node
    div.appendChild(document.createTextNode(s));
    //return the innerHTML property (which will be encoded)
    return div.innerHTML;
} //htmlEncode()

function apply(source, target) {
    for (prop in source) {
        target[prop] = source[prop];
    }
} //apply()


function wrapSuper(superFn, context) {
    return function() {
        return superFn.apply(context, arguments);
    }    
} //wrapSuper()

