//your code here
const images = [
  "https://picsum.photos/id/237/200/300",
  "https://picsum.photos/seed/picsum/200/300",
  "https://picsum.photos/200/300?grayscale",
  "https://picsum.photos/200/300/",
  "https://picsum.photos/200/300.jpg"
];

let selectedImages = [];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function init() {
  const duplicateIndex = Math.floor(Math.random() * images.length);
  let imageList = [...images, images[duplicateIndex]];
  imageList = shuffle(imageList);

  const container = document.getElementById("image-container");
  container.innerHTML = "";

  imageList.forEach((src) => {
    const img = document.createElement("img");
    img.src = src;
    img.addEventListener("click", handleClick);
    container.appendChild(img);
  });

  document.getElementById("h").textContent = "Please click on the identical tiles to verify that you are not a robot.";
  document.getElementById("para").textContent = "";
  document.getElementById("reset").style.display = "none";
  document.getElementById("verify").style.display = "none";
  selectedImages = [];
}

function handleClick(event) {
  const img = event.target;
  if (img.classList.contains("selected")) {
    img.classList.remove("selected");
    selectedImages = selectedImages.filter((src) => src !== img.src);
  } else {
    img.classList.add("selected");
    selectedImages.push(img.src);
  }
  updateUI();
}

function updateUI() {
  const numSelected = document.querySelectorAll(".selected").length;
  document.getElementById("para").textContent = "";

  if (numSelected > 0) {
    document.getElementById("reset").style.display = "inline";
  } else {
    document.getElementById("reset").style.display = "none";
  }

  if (numSelected === 2) {
    document.getElementById("verify").style.display = "inline";
  } else {
    document.getElementById("verify").style.display = "none";
  }
}

document.getElementById("reset").addEventListener("click", () => {
  document.querySelectorAll("img").forEach((img) => img.classList.remove("selected"));
  selectedImages = [];
  updateUI();
});

document.getElementById("verify").addEventListener("click", () => {
  document.getElementById("verify").style.display = "none";
  const selected = document.querySelectorAll(".selected");
  if (selected[0].src === selected[1].src) {
    document.getElementById("para").textContent = "You are a human. Congratulations!";
  } else {
    document.getElementById("para").textContent = "We can't verify you as a human. You selected the non-identical tiles.";
  }
});

window.addEventListener("load", init);
