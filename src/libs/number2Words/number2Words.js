
/*
** This class provide a translation engine for numbers in decimal format to numbers in word format.
*/

class Number2Words {

  constructor() {

    /*
    ** Support data
    */

    this.first_twenty_numbers = [
	    'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
	    'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
	  ];

	   this.tenths = [
	    'zero', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
	   ];

     this.minus = 'negative';
     this.point = 'point';
     this.infinity = 'infinity';
     this.and = 'and';

     this.hundred_str = 'hundred';
     this.thousand_str = 'thousand';
     this.million_str = 'million';
     this.billion_str = 'billion';
     this.trillion_str = 'trillion';
     this.quadrillion_str = 'quadrillion';

     this.zero = 0;
     this.ten = 10;
     this.twenty = 20;
     this.hundred = 100;
     this.thousand = 1000;
     this.million = 1000000;
     this.billion = 1000000000;
     this.trillion = 1000000000000;
     this.quadrillion = 1000000000000000;
     this.ceiling = 10000000000000000;
  }

  /**
  * It translates a number to english words.
  * @param  {String | Number} num  number as numeric or string format to be translated to words.
  * @return {String}               English words equivalent of num.
  */
  numberToEnglish(num) {

    try {
      //Check if num is a valid number

      if( isNaN(num) ) {
        throw Error ('This is not a valid number!');
      }

      //Let's Separate integer part from decimal part.

      let num_parts = num.toString().split('.')

      //Translate integer part.

      let res = this.translateInteger(num_parts[0]);

      //Translate decimal part.

      if(num_parts.length == 2) {
        res.push(this.point);
        res = res.concat(this.translateDecimal(num_parts[1]));
      }

      res = res.join(' ').replace(/  +/g, ' ');

      return res;
    }
    catch(error) {

      if(error) {
        //Thrown error is not managed here, rethrow it!
        throw error;
      }
    }
  }

  /**
  * It translates the decimal number to english words by single digits.
  * @param  {String | Number} num  number as numeric or string format to be translated to words.
  * @return {String}               English words equivalent of num for each digit.
  */
  translateDecimal(num) {

    let numStr = num.toString();
    let words = new Array();

    for (let i = 0; i < numStr.length ; i ++) {
      words.push(this.first_twenty_numbers[numStr[i]]);
    }

    return words;
  }

  /**
  * It translates the integer number to english words.
  * @param  {String | Number} num  number as numeric or string format to be translated to words.
  * @return {String}               English words equivalent.
  */
  translateInteger(num, words) {

    //Zero
    if(num === this.zero) {
      return !words ? this.first_twenty_numbers[0] : words;
    }

    if (words === undefined) {
        words = new Array();
    }

    let remainder = 0;
    let word = '';

    //Negative number - Add minus and use abs value

    if(num < this.zero ) {
      words.push(this.minus);
      num = Math.abs(num);
    }

    if(num == Number.POSITIVE_INFINITY) {
      words.push(this.infinity);
      return words;
    }

    //The first twenty decimal has their own syntax

    if(num < this.twenty) {
      words.push(this.first_twenty_numbers[num]);
      return words;
    }
    else if (num < this.hundred) {

      //Let's separate units from tenth using module operand.
      remainder = num % this.ten;
      let tenths = Math.floor(num / this.ten);

  	  word = this.tenths[tenths];

  	  // If we have a reminder we need to add '-'
  	  if (remainder) {
  	    word += '-' + this.first_twenty_numbers[remainder];
  	    remainder = 0;
  	  }
    }
    else {
      if (num < this.thousand) {
        remainder = num % this.hundred;
        word = this.translateInteger(Math.floor(num / this.hundred));
        word.push(this.hundred_str);
      }
      else if (num < this.million) {
        remainder = num % this.thousand;
        word = this.translateInteger(Math.floor(num / this.thousand));
        word.push(this.thousand_str);
      }
      else if (num < this.billion) {
        remainder = num % this.million;
        word = this.translateInteger(Math.floor(num / this.million));
        word.push(this.million_str);
      }
      else if (num < this.trillion) {
        remainder = num % this.billion;
        word = this.translateInteger(Math.floor(num / this.billion));
        word.push(this.billion_str);
      }
      else if (num < this.quadrillion) {
        remainder = num % this.trillion;
        word = this.translateInteger(Math.floor(num / this.trillion));
        word.push(this.trillion_str);
      }
      else if (num <= this.ceiling) {
    	  remainder = num % this.quadrillion;
    	  word = this.translateInteger(Math.floor(num / this.quadrillion));
    	  word.push(this.quadrillion_str);
      }

      //Adding and if remainder is less than one hundred
      if(remainder < this.hundred  && remainder > 0) word.push(this.and);
    }
    words = words.concat(word);
    return this.translateInteger(remainder, words);
  }
}

module.exports = new Number2Words();
