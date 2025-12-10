const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".close-btn");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const filterBtns = document.querySelectorAll(".filter-btn");

let currentIndex = 0;
let visibleItems = [];

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter-btn.active").classList.remove("active");
    btn.classList.add("active");

    const filterValue = btn.getAttribute("data-filter");

    galleryItems.forEach((item) => {
      if (
        filterValue === "all" ||
        item.getAttribute("data-category") === filterValue
      ) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });

    updateVisibleItems();
  });
});

function updateVisibleItems() {
  visibleItems = Array.from(galleryItems).filter(
    (item) => item.style.display !== "none"
  );
}
updateVisibleItems();

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    const index = visibleItems.indexOf(item);
    if (index !== -1) {
      currentIndex = index;
      openLightbox(visibleItems[currentIndex].querySelector("img").src);
    }
  });
});

function openLightbox(src) {
  lightbox.classList.add("active");
  lightboxImg.src = src;
}

closeBtn.addEventListener("click", () => {
  lightbox.classList.remove("active");
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove("active");
  }
});

function showNextImage() {
  currentIndex++;
  if (currentIndex >= visibleItems.length) {
    currentIndex = 0;
  }
  const newSrc = visibleItems[currentIndex].querySelector("img").src;
  lightboxImg.src = newSrc;
}

function showPrevImage() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = visibleItems.length - 1;
  }
  const newSrc = visibleItems[currentIndex].querySelector("img").src;
  lightboxImg.src = newSrc;
}

nextBtn.addEventListener("click", showNextImage);
prevBtn.addEventListener("click", showPrevImage);

document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("active")) return;

  if (e.key === "Escape") lightbox.classList.remove("active");
  if (e.key === "ArrowRight") showNextImage();
  if (e.key === "ArrowLeft") showPrevImage();
});
