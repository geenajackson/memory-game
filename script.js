const gameContainer = document.getElementById("game");

const COLORS = [
  "#E15554",
  "#4D9DE0",
  "#3BB273",
  "#E1BC29",
  "#7768AE",
  "#E15554",
  "#4D9DE0",
  "#3BB273",
  "#E1BC29",
  "#7768AE"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}


//Below is new code written by myself

//stores the target and colors of the card for comparisons
let color1 = null;
let color2 = null;
let target1 = null;
let target2 = null;
let counter = 0;
const score = document.getElementById("score");
const divs = document.querySelectorAll("div");
const again = document.querySelector("button");

again.addEventListener("click", function () {
  location.reload();
})

function matchCheck() {
  //checks if there are two colors stored first
  if (color1 && color2) {
    //if the colors do not match
    if (color1 !== color2) {
      for (let div of divs) {
        //prevent the user from clicking on the divs with pointerEvents
        div.style.pointerEvents = "none";
      }
      setTimeout(function () {
        //clear the saved targets and colors and reset the background color
        target1.style.backgroundColor = null;
        color1 = null;
        target1 = null;
        target2.style.backgroundColor = null;
        color2 = null;
        target2 = null;
        for (let div of divs) {
          //allows the user to click again
          div.style.pointerEvents = "auto";
        }
      }, 1000)
      //checks if they user clicked the same target
    } else if (target1 === target2) {
      target2 = null;
      color2 = null;
    } else {
      //add a class to show the card is now paired and reset the colors and targets
      target1.classList.add("paired")
      target2.classList.add("paired")
      color1 = null;
      target1 = null;
      color2 = null;
      target2 = null;
    }
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  //prevents an already paired card from being clicked again
  if (event.target.classList[1] != "paired") {
    //if one card has already been flipped over
    if (color1) {
      color2 = event.target.classList[0];
      event.target.style.backgroundColor = color2;
      target2 = event.target;
      counter++;
      score.innerText = counter;
      matchCheck();
    } else {
      color1 = event.target.classList[0];
      event.target.style.backgroundColor = color1;
      target1 = event.target;
    }
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);

/* */