var $ = require('jquery');
//var Person = require('./modules/Person');
import Person from './modules/Person';

class Adult extends Person {

    payTaxes() {
        console.log(this.name + " now owes no taxes.");
    }
}

var john = new Person("Jon Doe XXX", "blue");
var jane = new Adult("Jane Doe YYY", "orange");

john.greet();  
jane.greet();
jane.payTaxes();
  
$("h1").remove();
  