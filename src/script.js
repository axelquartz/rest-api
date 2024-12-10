const catImage = document.getElementById("cat-image");
const catImage2 = document.getElementById("cat-image2");
const catImage3 = document.getElementById("cat-image3");
const catButton = document.getElementById("cat-button");
const URL = "https://api.thecatapi.com/v1/images/search?limit=3&breed_ids=siam";

async function fetchCats() {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);
    catImage.src = data[0].url;
    catImage2.src = data[1].url;
    catImage3.src = data[2].url;
  } catch (error) {
    console.log(error);
  }
}

catButton.addEventListener("click", fetchCats);

// catButton.addEventListener("click", fetchCats);

// function fetchCats() {
//   fetch(URL)
//     .then((response) => response.json())
//     .then((data) => (catImage.src = data[0].url))
//     .catch((err) => console.log(err));
// }

fetchCats();
