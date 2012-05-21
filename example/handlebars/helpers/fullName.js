// Only export one function containing all the code.
// The code will be copied in template.js via require('./helpers/fullName').toString()
module.exports = function(person) {
  return person.firstName + " " + person.lastName + " " + foo();

  function foo(){
    return 'foo';
  }
};

// Nothing outside module.exports
