

let num = 13;

function isPrime(number) {
   for(let i = 2; i < number ; i++){
      if(number % i == 0 ) {
         return false
      }
   }

   return true;
} 

console.log(isPrime(num));