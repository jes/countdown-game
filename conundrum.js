/* assume conundrum-data.js provides:
 *  - conundrum_words[n] maps a number n (for n = 4 or 5) to a list of words of that length
 *  - conundrum_have9[s] maps a sorted list of 9 letters to a list of words made of those letters
 */
function generate_conundrum() {
    while (true) {
        let w1 = conundrum_words[4][Math.floor(Math.random() * conundrum_words[4].length)];
        let w2 = conundrum_words[5][Math.floor(Math.random() * conundrum_words[5].length)];

        if (word_in_dictionary(w1+w2) || word_in_dictionary(w2+w1))
            continue;

        let w = w1+w2;
        let letters = (w1+w2).split('').sort().join('');
        if (conundrum_have9[letters]) {
            let words = [];
            for (let i = 0; i < conundrum_have9[letters].length; i++) {
                let word = conundrum_have9[letters][i];
                if (levenshtein(word, w1+w2) > 4 && levenshtein(word, w2+w1) > 4)
                    words.push(word);
            }

            if (words.length == 1) {
                if (Math.random() < 0.5) {
                    return w1+w2;
                } else {
                    return w2+w1;
                }
            }
        }
    }
}

/*
The Levenshtein distance function is:
Copyright (c) 2011 Andrei Mackenzie
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

// Compute the edit distance between the two given strings
function levenshtein(a,b) {
  if(a.length == 0) return b.length; 
  if(b.length == 0) return a.length; 

  var matrix = [];

  // increment along the first column of each row
  var i;
  for(i = 0; i <= b.length; i++){
    matrix[i] = [i];
  }

  // increment each column in the first row
  var j;
  for(j = 0; j <= a.length; j++){
    matrix[0][j] = j;
  }

  // Fill in the rest of the matrix
  for(i = 1; i <= b.length; i++){
    for(j = 1; j <= a.length; j++){
      if(b.charAt(i-1) == a.charAt(j-1)){
        matrix[i][j] = matrix[i-1][j-1];
      } else {
        matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                Math.min(matrix[i][j-1] + 1, // insertion
                                         matrix[i-1][j] + 1)); // deletion
      }
    }
  }

  return matrix[b.length][a.length];
};
