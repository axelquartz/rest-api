// const { default: axios } = require("axios");

const container = document.querySelector(".container");
const createFavorites = document.createElement("section");
createFavorites.id = "favorites";
const catImage = document.getElementById("cat-image-1");
const catImage2 = document.getElementById("cat-image-2");
const favoriteCatImage = document.getElementById("favorite-cat-image-1");
const favoriteCatImage2 = document.getElementById("favorite-cat-image-2");
const favoriteCatImage3 = document.getElementById("favorite-cat-image-3");
const catButton = document.getElementById("generate-cats-button");
const saveFavorteCatsButton1 = document.getElementById("save-favorite-cats-button-1");
const saveFavoriteCatsButton2 = document.getElementById("save-favorite-cats-button-2");
const errorDisplay = document.getElementById("error-display");
const API_KEY = "live_KLPbsvkAcNRHqVoNHvclFCYyDUu0KxlF1AaDr3mXckeJCWQivtx2uO7wdUX259E4";
const URL_RANDOM = `https://api.thecatapi.com/v1/images/search?limit=2&breed_ids=rblu&`;
const URL_FAVORITES = `https://api.thecatapi.com/v1/favourites`;
const URL_FAVORITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}`;
const URL_UPLOAD_IMAGES = "https://api.thecatapi.com/v1/images/upload";
let data;
const api = axios.create({
  baseURL: "https://api.thecatapi.com/v1/",
});

api.defaults.headers.common["x-api-key"] = API_KEY;

async function uploadFile() {
  const form = document.getElementById("upload-form");
  const formData = new FormData(form);
  console.log(formData.get("file").name);

  const response = await fetch(URL_UPLOAD_IMAGES, {
    method: "POST",
    headers: {
      // "Content-Type": "multipart/form-data",
      "x-api-key": API_KEY,
    },
    body: formData,
  });
  data = await response.json();
  console.log(data);

  saveToFavorites(data.id);
}

async function fetchRandomCats() {
  const response = await fetch(URL_RANDOM, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
  });

  if (response.status !== 200) {
    errorDisplay.textContent = `${data.message}: in fetchRandomCats`;
  } else {
    console.log(`Status: ${response.status}`);
  }
  data = await response.json();
  console.log(data);
  catImage.src = data[0].url;
  catImage2.src = data[1].url;
  console.log(`Status: ${response.status}`);
}

saveFavorteCatsButton1.addEventListener("click", () => {
  saveToFavorites(data[0].id);
});
saveFavoriteCatsButton2.addEventListener("click", () => {
  saveToFavorites(data[1].id);
});

async function fetchFavorites() {
  const response = await fetch(URL_FAVORITES, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
  });
  data = await response.json();
  console.log(data);

  if (response.status !== 200) {
    errorDisplay.textContent = `${data.message}: in fetchFavorites`;
  } else {
    console.log(`Status: ${response.status}`);
    data.forEach((cat) => {
      container.appendChild(createFavorites);
      const createCard = document.createElement("article");
      createCard.classList.add("cat-card");
      const createImage = document.createElement("img");
      createImage.src = cat.image.url;
      const createButton = document.createElement("button");
      createButton.textContent = "Remove from favoritesX";
      createCard.appendChild(createImage);
      createCard.append(createButton);
      createFavorites.appendChild(createCard);
      createButton.addEventListener("click", () => {
        deleteFromFavorites(cat.id);
      });
    });
  }
}

async function saveToFavorites(id) {
  // const response = await fetch(URL_FAVORITES, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "X-API-KEY": API_KEY,
  //   },
  //   body: JSON.stringify({
  //     image_id: id,
  //   }),
  // });

  const response = await api.post("/favourites", {
    image_id: id,
  });

  console.log(response.data);
  if (response.status !== 200) {
    errorDisplay.textContent = `${response.status}, ${response.data.message}: in fetchFavorites`;
  } else {
    console.log(`Status: ${response.status}`);
    console.log("saved to favorites");
  }
  createFavorites.innerHTML = "";
  await fetchFavorites();
}

async function deleteFromFavorites(id) {
  const response = await fetch(URL_FAVORITES_DELETE(id), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
  });
  data = await response.json();
  console.log("data", data);
  console.log("response", response);
  console.log(id);

  if (response.status !== 200) {
    errorDisplay.textContent = `${response.status}, ${data.message}: in fetchFavorites`;
  } else {
    console.log(`Status: ${response.status}`);
    console.log("Deleted from favorites");
    createFavorites.innerHTML = "";
    fetchFavorites();
  }
}

catButton.addEventListener("click", fetchRandomCats);

fetchRandomCats();
fetchFavorites();
