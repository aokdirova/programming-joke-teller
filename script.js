const button = document.getElementById("button");
const audioElement = document.getElementById("audio");



//disable/enable button

function toggleButton() {
  button.disabled = !button.disabled;
}

//Passing joke to the voice api
function tellMe(joke) {
  VoiceRSS.speech({
    key: "c7648164e2624df0b393a7b50dd2a9bc",
    src: `${joke}`,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

//Get Jokes from Joke API

async function getJokes() {
  let joke = "";
  const apiURL =
    "https://sv443.net/jokeapi/v2/joke/Programming,Miscellaneous?blacklistFlags=nsfw,religious,political,racist,sexist";
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
  } catch (error) {
    console.log("whoops", error);
  }
  tellMe(joke);
  toggleButton();
}

button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
