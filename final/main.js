const colorBtns = document.querySelectorAll(".color-btn");
const sizeBtns = document.querySelectorAll(".size-btn");
const selectedShadeEl = document.querySelector(".selected-shade");
const productImg = document.querySelector(".product-image-carousel img");
let fadeOverlayImg;

const colorNameMap = {
  "rose-btn": "Rose",
  "raspberry-btn": "Raspberry",
  "dark-cherry-btn": "Dark Cherry",
};

const shadeImageMap = {
  "rose-btn": "../assets/benetint-rose.png",
  "raspberry-btn": "../assets/benetint-raspberry.png",
  "dark-cherry-btn": "../assets/benetint-dark-cherry.png",
};

function getImageSrcForBtn(btn) {
  if (!btn) return null;
  return shadeImageMap[btn.id] || null;
}

// Image crossfade

function ensureFadeOverlay() {
  if (!productImg) return null;
  if (fadeOverlayImg) return fadeOverlayImg;
  const container = productImg.parentElement;
  fadeOverlayImg = document.createElement("img");
  fadeOverlayImg.className = "image-fade-overlay";
  fadeOverlayImg.alt = productImg.alt || "";
  container.appendChild(fadeOverlayImg);
  return fadeOverlayImg;
}

function crossfadeTo(src) {
  if (!productImg || !src || productImg.src.endsWith(src)) return;
  const overlay = ensureFadeOverlay();
  if (!overlay) return;

  overlay.src = src;
  overlay.style.opacity = "0";

  requestAnimationFrame(() => {
    overlay.style.opacity = "1";
  });

  setTimeout(() => {
    productImg.src = src;
    overlay.style.opacity = "0";
  }, 320);
}

function setProductImage(src) {
  crossfadeTo(src);
}

function updateImageForSelected() {
  const selectedBtn = document.querySelector(".color-btn.is-selected");
  const src = getImageSrcForBtn(selectedBtn);
  if (src) setProductImage(src);
}

// Color selection 
function selectColor(btn) {
  if (!btn) return;
  colorBtns.forEach((b) => b.classList.remove("is-selected"));
  btn.classList.add("is-selected");
  if (selectedShadeEl) {
    const name =
      colorNameMap[btn.id] ||
      btn.dataset.colorName ||
      btn.getAttribute("aria-label");
    if (name) selectedShadeEl.textContent = name;
  }

  if (selectedShadeEl) {
    selectedShadeEl.classList.remove("is-fading");

    void selectedShadeEl.offsetWidth;
    selectedShadeEl.classList.add("is-fading");
  }

  updateImageForSelected();
}

colorBtns.forEach((btn) => {
  btn.addEventListener("click", () => selectColor(btn));
});

// Size selection

function selectSize(btn) {
  if (!btn) return;
  sizeBtns.forEach((b) => b.classList.remove("is-selected"));
  btn.classList.add("is-selected");
}

sizeBtns.forEach((btn) => {
  btn.addEventListener("click", () => selectSize(btn));
});

// Add to Bag button 

const addToBagBtn = document.querySelector(".add-to-bag-btn");
const addToBagLabel = addToBagBtn
  ? addToBagBtn.querySelector(".btn-label")
  : null;

const defaultText = "Add to Bag";
const addedText = "Added";
let resetTimer;

function setPlainLabel(label, text) {
  if (!label) return;
  label.classList.remove("is-split");
  label.textContent = text;
}

function setAnimatedLabel(label, text, direction) {
  if (!label) return;
  label.classList.add("is-split");
  label.innerHTML = "";
  Array.from(text).forEach((ch, i) => {
    const span = document.createElement("span");
    span.className = `char char-${direction}`;
    span.style.setProperty("--i", String(i));
    span.textContent = ch === " " ? "\u00A0" : ch;
    label.appendChild(span);
  });
}

function onClick(btn, label) {
  if (btn.classList.contains("is-added")) return;
  btn.classList.add("is-added");
  setAnimatedLabel(label, addedText, "up");

  clearTimeout(resetTimer);
  resetTimer = setTimeout(() => {
    btn.classList.remove("is-added");
    setAnimatedLabel(label, defaultText, "down");
  }, 5000);
}

// Call on page load

function initialize() {
  const defaultColorBtn = document.getElementById("rose-btn") || colorBtns[0];
  if (defaultColorBtn) selectColor(defaultColorBtn);

  const defaultSizeBtn = sizeBtns[0];
  if (defaultSizeBtn) selectSize(defaultSizeBtn);

  updateImageForSelected();

  Object.values(shadeImageMap).forEach((src) => {
    const img = new Image();
    img.src = src;
  });

  if (addToBagBtn && addToBagLabel) {
    setPlainLabel(addToBagLabel, defaultText);
    addToBagBtn.addEventListener("click", () =>
      onClick(addToBagBtn, addToBagLabel)
    );
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initialize);
} else {
  initialize();
}
