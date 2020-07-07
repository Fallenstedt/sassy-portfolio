
initBurger();

getMyLatestTweet()


/*
 * Initializes burger functionality
 */

function initBurger() {
  function toggleMobileNavState() {
    const body = document.querySelector("body");
    body.classList.toggle("nav--active");
  }
  const burger = document.querySelector(".burger");
  burger.addEventListener("click", toggleMobileNavState);
}


/**
 * Fetches latest tweet
 */
async function getMyLatestTweet() {
  const resp = await window.fetch("https://yi6fgzh27l.execute-api.us-west-2.amazonaws.com/Prod/tweet");
  if (resp.ok) {
    const data = await resp.json()
    const tweetContainer = document.getElementById("latest_tweet");
    tweetContainer.innerText = data.message;
  }
}

