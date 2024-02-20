// document.addEventListener('DOMContentLoaded', () => {
//     const basket = document.getElementById('basket');

//     // Function to move the basket left and right
//     function moveBasket(event) {
//         const basketLeft = parseInt(getComputedStyle(basket).left);
//         const basketWidth = basket.offsetWidth;
//         const windowWidth = window.innerWidth;

//         if (event.key === 'ArrowLeft' || event.key === 'a') {
//             if (basketLeft > 0) {
//                 basket.style.left = (basketLeft - 10) + 'px';
//             }
//         } else if (event.key === 'ArrowRight' || event.key === 'd') {
//             if (basketLeft < windowWidth - basketWidth) {
//                 basket.style.left = (basketLeft + 10) + 'px';
//             }
//         }
//     }

//     // Event listener for keyboard input
//     document.addEventListener('keydown', moveBasket);
// });

document.addEventListener("DOMContentLoaded", () => {

    var cookieDisplay = document.getElementById('cookieDisplay');

    // Function to get cookie by name
    function getCookie(name) {
        var cookieArray = document.cookie.split(';');
        for (var i = 0; i < cookieArray.length; i++) {
            var cookiePair = cookieArray[i].split('=');
            if (cookiePair[0].trim() === name) {
                return cookiePair[1];
            }
        }
        return null;
    }

    // Get the value of a specific cookie
    var username = getCookie('hscore');

    // Display the value of the cookie in the HTML
    if (username) {
        cookieDisplay.textContent = username;
    } else {
        cookieDisplay.textContent = 0;
    } 

  const frame = document.getElementById("frame");
  const basket = document.getElementById("basket");
  scoreValue = document.getElementById("scoreValue");

  let score = 0;

  // Function to create a new ball
  function createBall() {
    const ball = document.createElement("div");
    ball.classList.add("ball");
    ball.style.left = `${Math.random() * 100}%`;
    frame.appendChild(ball);

    // Animation for the ball
    const animation = ball.animate(
      [
        { top: "-10%" }, // Start position above the frame
        { top: "110%" }, // End position below the frame
      ],
      {
        duration: 3000,
        easing: "linear",
      }
    );

    animation.onfinish = () => {
      ball.remove();
    };

    // Select the audio element
    const collisionSound = document.getElementById("collisionSound");
    const scoreWin = document.getElementById("win");
    const scoreWinMore = document.getElementById("winMore");

    // Event listener for collision with basket
    // animation.onupdate = () => {
    //     const basketRect = basket.getBoundingClientRect();
    //     const ballRect = ball.getBoundingClientRect();

    //     console.log(basketRect)
    //     console.log(ballRect)
    //     console.log(score)
    //     console.log(score)

    //     if (basketRect.bottom >= ballRect.top &&
    //         basketRect.top <= ballRect.bottom &&
    //         basketRect.right >= ballRect.left &&
    //         basketRect.left <= ballRect.right) {
    //         score++;

    //         scoreValue.textContent = score;
    //         ball.remove();

    //         // Play collision sound
    //         collisionSound.play();
    //     }
    // };

    function updateGame() {
      const basketRect = basket.getBoundingClientRect();
      const ballRect = ball.getBoundingClientRect();

      if (
        basketRect.bottom >= ballRect.top &&
        basketRect.top <= ballRect.bottom &&
        basketRect.right >= ballRect.left &&
        basketRect.left <= ballRect.right
      ) {
        score++;
        if(score > getCookie('hscore')){
            document.cookie = "hscore="+ score.toString();
            cookieDisplay.textContent = score;
        }
            
        scoreValue.textContent = score;
        ball.remove();

        // Play collision sound
        collisionSound.play();
      }

      // Request next animation frame
      requestAnimationFrame(updateGame);
    }

    // Start the game loop
    requestAnimationFrame(updateGame);

    function playScoreWinSound() {
      scoreWin.play();
    }

    let scoreWinPlayed = false;
    let scoreWin1 = false;

    if (score % 10 === 0 && score !== 0 && !scoreWinPlayed) {
      scoreWin.play();
      scoreWinPlayed = true; // Set the flag to true after playing the sound
      if (score == 40 && !scoreWin1) {
        scoreWinMore.play();
        scoreWin1 = true;
      }
    }
  }

  // Create a new ball every second
  setInterval(createBall, 1000);

  // Move basket left and right
  document.addEventListener("keydown", (event) => {
    const basketLeft = parseInt(getComputedStyle(basket).left);
    const basketWidth = basket.offsetWidth;
    const frameWidth = frame.offsetWidth;

    if (event.key === "ArrowLeft" || event.key === "a") {
      if (basketLeft > 0) {
        basket.style.left = basketLeft - 10 + "px";
      }
    } else if (event.key === "ArrowRight" || event.key === "d") {
      if (basketLeft < frameWidth - basketWidth) {
        basket.style.left = basketLeft + 10 + "px";
      }
    }
  });

  // JavaScript functions for drag and drop functionality
});

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.src);
}

function drop(event) {
  console.log(event);
  event.preventDefault();
  var data = event.dataTransfer.getData("text");
  document.getElementById("basket").style.backgroundImage =
    "url('" + data + "')";
}
