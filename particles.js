window.addEventListener("load", () => {
  tsParticles.load("particles-js", {
    fullScreen: { enable: false },
    background: { color: { value: "#ffffff" } },
    fpsLimit: 60,
    interactivity: {
      detectsOn: "window",
      events: {
        onClick: { enable: true, mode: ["push", "grab"] },
        resize: { enable: true, delay: 0.5 },
      },
      modes: {
        push: { quantity: 4 },
        bubble: {
          distance: 100,
          size: 12,
          duration: 0.4,
          color: "#667eea",
        },
      },
    },
    particles: {
      size: { value: { min: 8, max: 14 }, animation: { enable: false } },
      number: { value: 60, density: { enable: true, area: 1200 } },
      color: { value: "#CCCCCC" },
      links: {
        enable: true,
        distance: 150,
        color: "#888888",
        opacity: 0.5,
        width: 2.3,
      },
      move: { enable: true, speed: 2, outModes: { default: "out" } },
      collisions: { enable: true, mode: "bounce" },
    },
    detectRetina: true,
  });
});

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
