const pexelsApiKey = 'aZbeIHPsZd80pm89brXZdxnOvPIZ8Xou4dZeOBPE7QHlev1neOtm1Yaa';
let pexelsApiUrl = '';
let currentPage = 1;
let searchInput = '';

function loadPexelsImages(url) {
  fetch(url, {
    headers: {
      'Authorization': pexelsApiKey
    }
  })
    .then(response => response.json())
    .then(data => {
      const gallery = document.getElementById('gallery');
      gallery.innerHTML = '';

      data.photos.forEach(photo => {
        const imageElement = document.createElement('img');
        imageElement.src = photo.src.medium;
        imageElement.alt = photo.photographer;

        // Agregar evento de clic para abrir el modal con la imagen
        imageElement.addEventListener('click', function() {
          openModal(photo.src.large);
        });

        gallery.appendChild(imageElement);
      });
    })
    .catch(error => console.error('Error al cargar imágenes de Pexels:', error));
}

function searchPexelsImages() {
  searchInput = document.getElementById('lugarInput').value;
  if (searchInput.trim() !== '') {
    currentPage = 1;
    pexelsApiUrl = `https://api.pexels.com/v1/search?query=${searchInput}&per_page=100&page=${currentPage}`;
    loadPexelsImages(pexelsApiUrl);
  }
}

function loadMoreImages() {
  currentPage++;
  pexelsApiUrl = `https://api.pexels.com/v1/search?query=${searchInput}&per_page=100&page=${currentPage}`;
  loadPexelsImages(pexelsApiUrl);
}

function openModal(imageUrl) {
  const modal = document.getElementById('modal');
  const modalImage = document.getElementById('modalImage');

  modal.style.display = 'block';
  modalImage.src = imageUrl;
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
  // Inicializar con una búsqueda por defecto (por ejemplo, paisajes hermosos)
  pexelsApiUrl = 'https://api.pexels.com/v1/search?query=beautiful+places&per_page=100&page=1';
  loadPexelsImages(pexelsApiUrl);
});
