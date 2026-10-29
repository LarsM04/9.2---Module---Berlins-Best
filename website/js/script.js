
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#main-nav");

// Hamburgermenu
if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Menu sluiten" : "Menu openen"
    );
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Menu openen");
    });
  });
}


// Slideshow Markthalle Neun
const photos = [
  {
    src: "img/markthalle-1.jpg",
    alt: "De ingang van Markthalle Neun in Berlijn",
    caption: "De ingang"
  },
  {
    src: "img/markthalle-2.jpg",
    alt: "De sfeer in Markthalle Neun",
    caption: "De sfeer in de markthal"
  },
  {
    src: "img/markthalle-3.jpg",
    alt: "Uitzicht van bovenaf in Markthalle Neun",
    caption: "Uitzicht van bovenaf"
  },
  {
    src: "img/markthalle-4.jpg",
    alt: "De eetkraampjes in Markthalle Neun",
    caption: "De eetkraampjes"
  },
  {
    src: "img/markthalle-5.jpg",
    alt: "Streetfood bij Markthalle Neun",
    caption: "Streetfood en eten"
  },
  {
    src: "img/markthalle-6.jpg",
    alt: "Bezoekers in Markthalle Neun",
    caption: "De markt met bezoekers"
  }
];

const galleryImage = document.querySelector("#gallery-image");
const galleryCaption = document.querySelector("#gallery-caption");
const photoNumber = document.querySelector("#photo-number");
const previousButton = document.querySelector("#gallery-prev");
const nextButton = document.querySelector("#gallery-next");
const progressBars = document.querySelectorAll(".progress span");

let currentPhoto = 0;

function showPhoto(index) {
  if (!galleryImage || !galleryCaption) return;

  currentPhoto = (index + photos.length) % photos.length;

  const photo = photos[currentPhoto];

  galleryImage.src = photo.src;
  galleryImage.alt = photo.alt;
  galleryCaption.textContent = photo.caption;

  if (photoNumber) {
    photoNumber.textContent = String(currentPhoto + 1).padStart(2, "0");
  }

  progressBars.forEach((bar, i) => {
    bar.classList.toggle("active", i === currentPhoto);
  });
}

// Vorige foto
previousButton?.addEventListener("click", () => {
  showPhoto(currentPhoto - 1);
});

// Volgende foto
nextButton?.addEventListener("click", () => {
  showPhoto(currentPhoto + 1);
});

// Toon de ingang meteen bij het laden van de pagina
showPhoto(0);
