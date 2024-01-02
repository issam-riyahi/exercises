let num = 13;

function isPrime(number) {
   for (let i = 2; i < number; i++) {
      if (number % i == 0) {
         return false;
      }
   }

   return true;
}
function spinWords(string) {
   //TODO Have fun :)
   let newString = string
      .split(" ")
      .map((word) => {
         if (word.length > 4) return word.split("").reverse().join("");
         return word;
      })
      .join(" ");

   return newString;
}
// console.log(spinWords("welcome"));

function bouncingBall(h, bounce, window) {
   if (h <= 0 || bounce <= 0 || bounce >= 1 || window >= h) {
      return -1;
   }

   var newHeight = h * bounce;
   return bouncingBall(newHeight, bounce, window) + 2;
}

console.log(bouncingBall(30.0, 0.66, 1.5));

function removeSmallest(numbers) {
   return numbers.filter(
      (number, i) => i != numbers.indexOf(Math.min(...numbers))
   );
}

console.log(removeSmallest([5, 3, 2, 1, 4]));

//return the total number of smiling faces in the array
function countSmileys(arr) {
   let smileysNum = 0;
   let valideSmileys = [":)" ,":D" ,";-D" ,":~)"];
   arr.forEach(item => {
      if (item.match(/^[:|;][-|~]{0,1}[)|D]/g)) {
         smileysNum++;
      }
   });
   return smileysNum;
}
