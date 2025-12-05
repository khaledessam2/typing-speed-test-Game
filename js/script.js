/* Steps To Create The Project
    [01] Add Words
    [02] Add Levels
    [03] Show Level And Seconds
    [04] Add Array Of Words
    [05] ِAdd Start Game Button
    [06] Generate Upcoming Words
    [07] Disable Copy Word And Paste Event + Focus On Input
    [08] Start Play Function
    [09] Start The Time And Count Score
    [10] Add The Error And Success Messages
  Your Trainings To Add Features
    [01] Save Score To Local Storage With Date
    [02] Choose Levels From Select Box
    [03] Break The Logic To More Functions
    [04] Choose Array Of Words For Every Level
    [05] Write Game Instruction With Dynamic Values
    [06] Add 3 Seconds For The First Word
*/

// Array Of Words
const words = [
  "Hello", "Code", "Town", "Country", "Testing", "Youtube", "Linkedin", "Twitter", "Github",
  "Leetcode", "Internet", "Python", "Scala", "Paradigm", "Styling", "Cascade", "Coding",
  "Funny", "Working", "Task", "Runner", "Roles", "Test", "Rust", "Playing"
];

// Setting Levels
const lvls = {
  "Easy": 10,
  "Normal": 5,
  "Hard": 2
};

// Default Level
let defaultLevelName = "Normal"; // Change Level From Here
let defaultLevelSeconds = lvls[defaultLevelName];


// Catch Selectors
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let remainWords = document.querySelector(".remain")
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let list = document.querySelectorAll('ul li')

// Setting Level Name + Seconds + Score  (default)
lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = words.length;

// choose Level
for (let i = 0; i < list.length; i++) {
  list[i].addEventListener('click', () => {
    // Remove active from all items
    list.forEach(li => li.classList.remove('active'));
    // Add active to selected item
    list[i].classList.add('active');
    // Update Values
    defaultLevelName = list[i].innerHTML;
    defaultLevelSeconds = lvls[defaultLevelName];
    lvlNameSpan.innerHTML = defaultLevelName;
    secondsSpan.innerHTML = defaultLevelSeconds;
    timeLeftSpan.innerHTML = defaultLevelSeconds;
  });
}

// Disable Paste Event
input.onpaste = function () {
  return false;
}

// Start Game
startButton.addEventListener('click', () => {
  console.log("start game");
  remainWords.innerHTML = "remain Words :"
  startButton.remove();
  input.focus();
  // Generate Word Function
  genWords();
})

function genWords() {
  // Get Random Word From Array
  let randomWord = words[Math.floor(Math.random() * words.length)];
  console.log(randomWord)
  // Get Word Index
  let wordIndex = words.indexOf(randomWord);
  console.log(wordIndex)
  // Remove Word From Array
  words.splice(wordIndex, 1);
  // Show The Random Word
  theWord.innerHTML = randomWord;
  // Empty Upcoming Words
  upcomingWords.innerHTML = '';
  // Generate Words
  for (let i = 0; i < words.length; i++) {
    // Create Div Element
    let div = document.createElement("div");
    let txt = document.createTextNode(words[i]);
    div.appendChild(txt);
    upcomingWords.appendChild(div);
  }
  // call start play function
  startPlay(randomWord)
}


function startPlay(randomWord){
  timeLeftSpan.innerHTML = defaultLevelSeconds
  let start = setInterval(()=>{
    timeLeftSpan.innerHTML --
    if(timeLeftSpan.innerHTML === '0'){
      clearInterval(start);
      // Compare words 
      if(randomWord.toUpperCase() === input.value.toUpperCase()){
        // Empty Input field 
        input.value = ''
        // increase  score
        scoreGot.innerHTML++ ;
        if (words.length > 0) {
          // Call Generate Word Function
          genWords();
        } else {
          let span = document.createElement("span");
          span.className = 'good';
          let spanText = document.createTextNode("Congratulation !");
          span.appendChild(spanText);
          finishMessage.appendChild(span);
          // Remove Upcoming Words Box
          upcomingWords.remove();
        }
      }else{
        let span = document.createElement("span");
        span.className = 'bad';
        let spanText = document.createTextNode("Game Over");
        span.appendChild(spanText);
        finishMessage.appendChild(span);
      }
    }
  } , 1000 )
}
