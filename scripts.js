document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  document.querySelectorAll(".year-gallery-thumbs img").forEach((img) => {
    img.addEventListener("click", () => {
      const full = img.dataset.full || img.src;
      lightboxImg.src = full;
      lightbox.style.display = "flex";
      document.body.style.overflow = "hidden"; // prevent background scroll
    });
  });

  // close handlers
  function closeLightbox() {
    lightbox.style.display = "none";
    lightboxImg.src = "";
    document.body.style.overflow = ""; // restore
  }

  // backdrop click
  document
    .querySelector(".lightbox-backdrop")
    ?.addEventListener("click", closeLightbox);
  // close button
  document
    .querySelector(".lightbox-close")
    ?.addEventListener("click", closeLightbox);
  // esc key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.style.display === "flex") {
      closeLightbox();
    }
  });
  const galleryModal = document.getElementById("gallery-modal");
  const galleryWrapper = galleryModal.querySelector(".gallery-images-wrapper");
  const galleryClose = galleryModal.querySelector(".gallery-close");
  const galleryBackdrop = galleryModal.querySelector(".gallery-backdrop");

  function openGallery(images) {
    galleryWrapper.innerHTML = "";
    images.forEach((src) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = "Achievement image";
      galleryWrapper.appendChild(img);
    });
    galleryModal.style.display = "flex";
    document.body.style.overflow = "hidden";
    galleryModal.setAttribute("aria-hidden", "false");
  }
  function closeGallery() {
    galleryModal.style.display = "none";
    document.body.style.overflow = "";
    galleryModal.setAttribute("aria-hidden", "true");
    galleryWrapper.innerHTML = "";
  }

  galleryClose?.addEventListener("click", closeGallery);
  galleryBackdrop?.addEventListener("click", closeGallery);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && galleryModal.style.display === "flex") {
      closeGallery();
    }
  });

  document.querySelectorAll(".year-achievement-card").forEach((card) => {
    const btn = card.querySelector(".gallery-all-button");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const imgs = Array.from(card.querySelectorAll(".year-gallery-thumbs img"))
        .map((img) => img.dataset.full || img.src)
        .filter(Boolean);
      if (imgs.length === 0) return;
      openGallery(imgs);
    });
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const scrollTargets = document.querySelectorAll(
    '[href="#about"], .scroll-indicator'
  );
  scrollTargets.forEach((el) => {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      const about = document.getElementById("about");
      if (about) {
        about.scrollIntoView({ behavior: "smooth" });
      }
    });
    // keyboard accessibility for indicator
    if (el.classList.contains("scroll-indicator")) {
      el.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          const about = document.getElementById("about");
          if (about) about.scrollIntoView({ behavior: "smooth" });
        }
      });
    }
  });
});
document.querySelectorAll('a[href^="mailto:"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    console.log("mailto clicked", e);
  });
});

const toggle = document.querySelector(".nav-toggle");
const navList = document.querySelector(".nav-list");

toggle?.addEventListener("click", (e) => {
  const expanded = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", String(!expanded));
  navList.classList.toggle("show");
});

// Close when clicking outside
document.addEventListener("click", (e) => {
  if (!navList.contains(e.target) && !toggle.contains(e.target)) {
    navList.classList.remove("show");
    toggle.setAttribute("aria-expanded", "false");
  }
});

// Optional: highlight active section link on scroll (simple)
const links = document.querySelectorAll(".nav-list a");
const sections = Array.from(links).map((l) =>
  document.querySelector(l.getAttribute("href"))
);
window.addEventListener("scroll", () => {
  const y = window.scrollY + 100;
  sections.forEach((sec, i) => {
    if (sec && y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight) {
      links.forEach((l) => l.classList.remove("active"));
      links[i].classList.add("active");
    }
  });
});

document.querySelectorAll(".certificate-card .preview-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".certificate-card");
    const src = card?.getAttribute("data-full");
    if (!src) return;
    const lightbox = document.getElementById("certificate-lightbox");
    const img = lightbox.querySelector("img");
    img.src = src;
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});

document
  .querySelectorAll(".lightbox-close, .lightbox-backdrop")
  .forEach((el) => {
    el.addEventListener("click", () => {
      const lightbox = document.getElementById("certificate-lightbox");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      lightbox.querySelector("img").src = "";
    });
  });

// Close on ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const lightbox = document.getElementById("certificate-lightbox");
    if (lightbox.getAttribute("aria-hidden") === "false") {
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      lightbox.querySelector("img").src = "";
    }
  }
});
