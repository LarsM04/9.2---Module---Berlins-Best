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

let galleryImage = document.querySelector("#gallery-image");
const galleryCaption = document.querySelector("#gallery-caption");
const photoNumber = document.querySelector("#photo-number");
const previousButton = document.querySelector("#gallery-prev");
const nextButton = document.querySelector("#gallery-next");
const progressBars = document.querySelectorAll(".progress span");

let currentPhoto = 0;
let isAnimating = false;

const SLIDE_DURATION = 700; // moet gelijk zijn aan de transition in style.css

// Laad alle foto's alvast, zodat de slide niet hapert
photos.forEach((photo) => {
  new Image().src = photo.src;
});

// direction: 1 = nieuwe foto komt van rechts, -1 = van links
function showPhoto(index, direction = 1, animate = true) {
  if (!galleryImage || !galleryCaption || isAnimating) return;

  currentPhoto = (index + photos.length) % photos.length;

  const photo = photos[currentPhoto];

  galleryCaption.textContent = photo.caption;

  if (photoNumber) {
    photoNumber.textContent = String(currentPhoto + 1).padStart(2, "0");
  }

  progressBars.forEach((bar, i) => {
    bar.classList.toggle("active", i === currentPhoto);
  });

  // Zonder animatie (eerste keer laden of reduced motion)
  if (!animate || reduceMotion.matches) {
    galleryImage.src = photo.src;
    galleryImage.alt = photo.alt;
    return;
  }

  const oldImage = galleryImage;
  const newImage = document.createElement("img");

  newImage.src = photo.src;
  newImage.alt = photo.alt;
  newImage.style.transform = `translateX(${direction * 100}%)`;

  oldImage.removeAttribute("id");
  newImage.id = "gallery-image";
  oldImage.after(newImage);
  galleryImage = newImage;
  isAnimating = true;

  // Forceer een reflow zodat de transition start vanaf de beginpositie
  newImage.getBoundingClientRect();

  newImage.style.transform = "translateX(0)";
  oldImage.style.transform = `translateX(${-direction * 100}%)`;

  setTimeout(() => {
    oldImage.remove();
    isAnimating = false;
  }, SLIDE_DURATION + 50);
}

// Automatische slideshow
const AUTOPLAY_DELAY = 4000; // milliseconden per foto
const galleryFrame = document.querySelector(".gallery-frame");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let autoplayTimer = null;

function startAutoplay() {
  if (reduceMotion.matches) return;

  stopAutoplay();
  autoplayTimer = setInterval(() => {
    showPhoto(currentPhoto + 1);
  }, AUTOPLAY_DELAY);
}

function stopAutoplay() {
  clearInterval(autoplayTimer);
  autoplayTimer = null;
}

// Vorige foto (timer begint opnieuw na een handmatige klik)
previousButton?.addEventListener("click", () => {
  showPhoto(currentPhoto - 1, -1);
  startAutoplay();
});

// Volgende foto
nextButton?.addEventListener("click", () => {
  showPhoto(currentPhoto + 1);
  startAutoplay();
});

// Pauzeer als de bezoeker de muis op de galerij houdt of de knoppen gebruikt
galleryFrame?.addEventListener("mouseenter", stopAutoplay);
galleryFrame?.addEventListener("mouseleave", startAutoplay);
galleryFrame?.addEventListener("focusin", stopAutoplay);
galleryFrame?.addEventListener("focusout", startAutoplay);

// Pauzeer als het tabblad niet zichtbaar is
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopAutoplay();
  } else {
    startAutoplay();
  }
});

// Toon de ingang meteen bij het laden van de pagina en start de slideshow
showPhoto(0, 1, false);
startAutoplay();