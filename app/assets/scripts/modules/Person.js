
class Person {
    constructor(iname, icolor){
        this.name = iname;
        this.color = icolor;
    }

    greet() {
        console.log ("Hi. My name is " + this.name + " and fab color is " + this.color);
    }
}


/* This is javascript ES5 standard where there is no class
function Person (iname, icolor) {
    this.name = iname;
    this.color = icolor;
    this.greet = function() {
        console.log ("The name is " + this.name + " and color is " + this.color);
    }
}
*/

// module.exports = Person;   ES5 ways of exporting via node

export default Person; 
