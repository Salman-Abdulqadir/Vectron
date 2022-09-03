const auth_key2 = "563492ad6f91700001000001d837048d333844568d8eee3fe142afec";
const auth_key = "563492ad6f91700001000001e07a0df41d484207ba02b6e2699cb036";
const api_link = "https://api.pexels.com/v1/curated?per_page=15&page=1";
let input = "";
let page_nbr = 1;
// elements
const select_list = document.querySelectorAll(".select-list");
const gallery = document.querySelector(".img-gallery");
const search_input = document.querySelector(".search-input");
const search_btn = document.querySelector(".search-btn");
const more_btn = document.querySelector(".more-btn");

// EVENT LISTENERS
window.addEventListener("load", fetchCurrated);

select_list.forEach((select) => {
  select.addEventListener("click", (event) => {
    event.target.classList.toggle("active");
  });
});

search_btn.addEventListener("click", async () => {
  gallery.innerHTML = "";
  input = search_input.value;
  page_nbr = 1;
  searchPhoto(page_nbr);
});
more_btn.addEventListener("click", async () => {
  page_nbr++;
  console.log(page_nbr);
  searchPhoto(page_nbr);
});

// async fetch funcitons
async function getData(url) {
  const setting = {
    method: "Get",
    headers: {
      Accept: "Application/json",
      Authorization: auth_key,
    },
  };
  const fetch_result = await fetch(url, setting);
  const fetch_data = await fetch_result.json();
  return fetch_data;
}

async function generatePics(data) {
  data.photos.forEach((pic) => {
    let img_container = document.createElement("div");
    img_container.classList.add("gallery-img");
    img_container.innerHTML = ` 
    <div class="gallery-info">
        <p> ${pic.photographer}</p> 
        <a href = ${pic.src.original} target="_blank"> download</a> 
    </div>
    <img src = ${pic.src.medium}></img>`;
    gallery.appendChild(img_container);
  });
}
async function fetchCurrated() {
  const fetch_data = await getData(api_link);
  gallery.innerHTML = "";
  generatePics(fetch_data);
}
async function searchPhoto(page) {
  const data = await getData(
    `https://api.pexels.com/v1/search?query=${input}+per_page=${page}5&page=1`
  );
  generatePics(data);
}
