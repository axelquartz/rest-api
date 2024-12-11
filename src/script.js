const catImage = document.getElementById("cat-image-1");
const catImage2 = document.getElementById("cat-image-2");
const catButton = document.getElementById("generate-cats-button");
const errorDisplay = document.getElementById("error-display");
const API_KEY = "api_key=live_KLPbsvkAcNRHqVoNHvclFCYyDUu0KxlF1AaDr3mXckeJCWQivtx2uO7wdUX259E4";
const URL_RANDOM = `https://api.thecatapi.com/v1/images/search?limit=2&breed_ids=siam&${API_KEY}`;
const URL_FAVORITES = `https://api.thecatapi.com/v1/favourites?&`;

async function fetchRandomCats() {
  try {
    const response = await fetch(URL_RANDOM, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    catImage.src = data[0].url;
    catImage2.src = data[1].url;
  } catch (error) {
    console.log(error);
    errorDisplay.textContent = error.message;
  }
}

async function fetchFavorites() {
  try {
    const response = await fetch(URL_FAVORITES, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
    errorDisplay.textContent = error.message;
  }
}

catButton.addEventListener("click", fetchRandomCats);

fetchRandomCats();
fetchFavorites();
