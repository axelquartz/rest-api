const catImage = document.getElementById("cat-image-1");
const catImage2 = document.getElementById("cat-image-2");
const catImage3 = document.getElementById("cat-image-3");
const catButton = document.getElementById("generate-cats-button");
const saveFavoreCatsButton = document.querySelector(".save-favorite-cats-button");
const errorDisplay = document.getElementById("error-display");
const API_KEY = "api_key=live_KLPbsvkAcNRHqVoNHvclFCYyDUu0KxlF1AaDr3mXckeJCWQivtx2uO7wdUX259E4";
const URL_RANDOM = `https://api.thecatapi.com/v1/images/search?limit=2&breed_ids=rblu&${API_KEY}`;
const URL_FAVORITES = `https://api.thecatapi.com/v1/favourites?${API_KEY}`;

async function fetchRandomCats() {
  const response = await fetch(URL_RANDOM, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status !== 200) {
    errorDisplay.textContent = `${data.message}: in fetchRandomCats`;
    return;
  }
  const data = await response.json();
  console.log(data);
  catImage.src = data[0].url;
  catImage2.src = data[1].url;
  console.log(`Status: ${response.status}`);
}

async function fetchFavorites() {
  const response = await fetch(URL_FAVORITES, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  catImage3.src = data[0].image.url;
  console.log(data);
  // console.log(response);

  if (response.status !== 200) {
    errorDisplay.textContent = `${data.message}: in fetchFavorites`;
    return;
  } else {
    console.log(`Status: ${response.status}`);
  }
}

async function saveToFavorites() {
  const response = await fetch(URL_FAVORITES, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
    body: JSON.stringify({
      image_id: "bgp",
    }),
  });
  const data = await response.json();
  console.log(response);
  // console.log(data);
  if (response.status !== 200) {
    errorDisplay.textContent = `${response.status}, ${data.message}: in fetchFavorites`;
  }
  // console.log(response);
  // console.log(response.json());
}

catButton.addEventListener("click", fetchRandomCats);
saveFavoreCatsButton.addEventListener("click", saveToFavorites);

fetchRandomCats();
// fetchFavorites();
// saveToFavorites();
