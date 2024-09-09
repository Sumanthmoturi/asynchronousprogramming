
//Asynchronous programming Chapter

//1.Synchronous programming concept
//2.Asynchronous programming concept
//3.Multi-threaded synnhonous programming concept



//4.CallBack Function
//setTimeout() function
setTimeout(() => console.log("Tick"), 1000);

//Asynchronous file reading
/*readTextFile("shopping_list.txt", content => {
    console.log(`Shopping List:\n${content}`);
  });   */

  //multi async actions-involves nested callbacks
/*function compareFiles(fileA, fileB, callback) {
    readTextFile(fileA, contentA => {
      readTextFile(fileB, contentB => {
        callback(contentA == contentB); // Check if content matches
      });
    });
  }   */
   


//5.Promises
/* It can be of 3 states- 1.Pending 2.Resolve 3.Rejected.
Promise methods-then and catch. */
//creating a promise
let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Done!"), 1000);
  });
promise.then(result => console.log(result)); 
  
//Chaining a promise-You can use .then() calls to process values step by step.Each then return a new promise
/*function randomFile(listFile) {
    return textFile(listFile)
      .then(content => content.split("\n"))   
      .then(lines => lines[Math.random() * lines.length]) 
      .then(filename => textFile(filename));  
  } */

//Handling JSON with promises
/*function jsonFile(filename) {
    return textFile(filename).then(JSON.parse);
  }
  
  jsonFile("data.json").then(console.log);  //Reads and parses JSON file */




//6.Failure Handlings  
//Error handling in callbacks -Error is passed as an argument to the callback
/*someAsyncFunction((error, value) => {
    if (error) handleError(error);
    else processValue(value);       
  });  */

//Error handlings in promises- By using .then
textFile("file.txt")
  .then(content => console.log(content)) // Handles success
  .catch(error => console.error(error));  // Handles failure

//then and catch handler function-Promise Rejection 
new Promise((_, reject) => reject(new Error("Fail")))
  .then(value => console.log("Handler 1:", value))
  .catch(reason => {
    console.log("Caught failure " + reason);
    return "nothing";
  })
  .then(value => console.log("Handler 2:", value));

//Rejecting promise manually -By using reject() 
function textFile(filename) {
    return new Promise((resolve, reject) => {
      readTextFile(filename, (error, content) => {
        if (error) reject(error); 
        else resolve(content);     
      });
    });
  }



//7.Async function-allows you to wtite asynchronous code that looks and behave like regular,synchronous code
//Async concepts- 1.async keyword   2.await keyword     3.try...catch block
async function crackPasscode(networkID) {
    for (let code = "";;) {
      for (let digit = 0;; digit++) {
        let newCode = code + digit;
        try {
          await withTimeout(joinWifi(networkID, newCode), 50); // Wait for the promise
          return newCode;  // Return the passcode once it's found
        } catch (failure) {
          if (failure == "Timed out") {  // If we timed out, it means the digit was correct
            code = newCode;  // Add this digit to the passcode
            break;  // Move to the next digit
          } else if (digit == 9) {  // If no digit worked, throw the error
            throw failure;
          }
        }
      }
    }
  }

  


//8.Generator function- when you define a function with function*,It becomes a generator function.When you call the generator,it return iterator
function* powers(n) {
    for (let current = n;; current *= n) {
      yield current;            //yield keyword Pauses and returns the current value
    }
  }
  for (let power of powers(3)) {
    if (power > 50) break;
    console.log(power); 
  }
//Using generator for iterators
class Group {
    constructor() {
      this.members = [];
    }
    add(member) {
        this.members.push(member);
    }
  }
  Group.prototype[Symbol.iterator] = function*() {
    for (let i = 0; i < this.members.length; i++) {
      yield this.members[i];   //Automatically handles iteration
    }
  };
  let group = new Group();
  group.add("Alice");
  group.add("Bob");
  group.add("Charlie");
  for (let member of group) {
    console.log(member);
  }

  


  //9.Event loop

//Example of event loop and delayed timeout
let start = Date.now();
setTimeout(() => {
  console.log("Timeout ran at", Date.now() - start);          

}, 20);
while (Date.now() < start + 50) {}
console.log("Wasted time until", Date.now() - start);    
// → Wasted time until 50
// → Timeout ran at 55    

//Promises and order execution
Promise.resolve("Done").then(console.log);
console.log("Me first!");
// → Me first!
// → Done



