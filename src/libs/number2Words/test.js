var assert = require('assert');

//Test class to assert a string is equal to another.

class Test {

  /**
  * Asserting if two strings are equal.
  * @param  {String} str1    First string to compare.
  * @param  {String} str2    Second string to compare.
  * @param  {String} message Message to be displayed as output.
  */
  assertEquals(str1, str2, message) {
    try {
      assert.equal(str1, str2);

      if (message === undefined) {
        message = 'Test passed';
      }

      console.log("\x1b[32m", message, "\x1b[37m");
    }
    catch(error) {

      if (message === undefined) {
        message = 'Test not passed';
      }

      console.log("\x1b[31m", message, "\x1b[37m");
    }
  }

  /**
  * It checks if a function throws an exception.
  * @param  {String}   message       Message to be displayed as output.
  * @param  {Function} test_function Function to test.
  */
  expectError(message, test_function) {
    try {
      test_function();
      console.log("\x1b[31m", message, "\x1b[37m");
    }
    catch(error){
      console.log("\x1b[32m", message, "\x1b[37m");
    }
  }

}

//Export as singleton
module.exports = new Test();
