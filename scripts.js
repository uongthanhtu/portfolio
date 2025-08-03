document.addEventListener("DOMContentLoaded", () => {
  // Lightbox cho ảnh achievement
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  document.querySelectorAll(".year-gallery-thumbs img").forEach((img) => {
    img.addEventListener("click", () => {
      const full = img.dataset.full || img.src;
      lightboxImg.src = full;
      lightbox.style.display = "flex";
      document.body.style.overflow = "hidden";
      lightbox.focus?.();
    });
  });

  function closeLightbox() {
    lightbox.style.display = "none";
    lightboxImg.src = "";
    document.body.style.overflow = "";
  }

  document
    .querySelector(".lightbox-backdrop")
    ?.addEventListener("click", closeLightbox);
  document
    .querySelector(".lightbox-close")
    ?.addEventListener("click", closeLightbox);

  // Modal gallery mở ảnh toàn bộ năm
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
    galleryClose.focus();
  }
  function closeGallery() {
    galleryModal.style.display = "none";
    document.body.style.overflow = "";
    galleryModal.setAttribute("aria-hidden", "true");
    galleryWrapper.innerHTML = "";
  }

  galleryClose?.addEventListener("click", closeGallery);
  galleryBackdrop?.addEventListener("click", closeGallery);

  // Mở gallery khi click nút Show All
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

  // Scroll smooth cho nút scroll indicator và link #about
  document
    .querySelectorAll('[href="#about"], .scroll-indicator')
    .forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        const about = document.getElementById("about");
        if (about) about.scrollIntoView({ behavior: "smooth" });
      });
      if (el.classList.contains("scroll-indicator")) {
        el.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            const about = document.getElementById("about");
            if (about) about.scrollIntoView({ behavior: "smooth" });
          }
        });
      }
    });

  // Toggle menu mobile
  const toggle = document.querySelector(".nav-toggle");
  const navList = document.querySelector(".nav-list");

  toggle?.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    navList.classList.toggle("show");
    if (!expanded) {
      navList.querySelector("a")?.focus();
    } else {
      toggle.focus();
    }
  });

  // Đóng menu khi click ngoài
  document.addEventListener("click", (e) => {
    if (!navList.contains(e.target) && !toggle.contains(e.target)) {
      navList.classList.remove("show");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  // Đóng menu khi nhấn ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (navList.classList.contains("show")) {
        navList.classList.remove("show");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
      if (lightbox.style.display === "flex") {
        closeLightbox();
      }
      if (galleryModal.style.display === "flex") {
        closeGallery();
      }
      // đóng certificate lightbox nếu mở
      const certLightbox = document.getElementById("certificate-lightbox");
      if (certLightbox?.getAttribute("aria-hidden") === "false") {
        certLightbox.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        certLightbox.querySelector("img").src = "";
      }
    }
  });

  // Highlight nav links khi scroll
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

  // Preview chứng chỉ trong lightbox riêng
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
      lightbox.querySelector(".lightbox-close")?.focus();
    });
  });

  // Đóng lightbox chứng chỉ khi click close hoặc backdrop
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
});
