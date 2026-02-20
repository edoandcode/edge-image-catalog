"use strict";

// Catalogo immagini locali: la trasformazione effettiva viene delegata all'edge.
const IMAGE_FILES = [
  "photo1.jpg",
  "photo2.jpg",
  "photo3.jpg",
  "photo4.jpg",
  "photo5.jpg",
  "photo6.jpg"
];

const galleryElement = document.getElementById("gallery");
const widthSelect = document.getElementById("widthSelect");
const qualitySelect = document.getElementById("qualitySelect");
const updateButton = document.getElementById("updateButton");

/**
 * Costruisce il src con query string per i parametri gestiti dal layer edge.
 */
function buildImageUrl(fileName, width, quality) {
  const basePath = `images/${fileName}`;
  const query = new URLSearchParams({
    width,
    quality
  });

  return `${basePath}?${query.toString()}`;
}

/**
 * Crea una card catalogo con immagine e URL richiesto.
 */
function createCard(fileName, src) {
  const article = document.createElement("article");
  article.className = "card";

  const img = document.createElement("img");
  img.src = src;
  img.alt = `Prodotto ${fileName}`;
  img.loading = "lazy";
  img.decoding = "async";

  const content = document.createElement("div");
  content.className = "card-content";

  const title = document.createElement("h2");
  title.className = "card-title";
  title.textContent = fileName;

  const path = document.createElement("p");
  path.className = "card-path";
  path.textContent = src;

  content.appendChild(title);
  content.appendChild(path);
  article.appendChild(img);
  article.appendChild(content);

  return article;
}

/**
 * Aggiorna l'intera galleria usando i parametri correnti selezionati.
 */
function renderGallery() {
  const width = widthSelect.value;
  const quality = qualitySelect.value;

  const fragment = document.createDocumentFragment();

  IMAGE_FILES.forEach((fileName) => {
    const src = buildImageUrl(fileName, width, quality);
    fragment.appendChild(createCard(fileName, src));
  });

  galleryElement.replaceChildren(fragment);
}

updateButton.addEventListener("click", renderGallery);

// Render iniziale con valori di default dei selettori.
renderGallery();