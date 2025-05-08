const API_KEY = '73a44d12ca98272b5143400f14f463a1';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

async function fetchPopularMovies() {
  const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-ES&page=1`;
  const response = await fetch(url);
  const data = await response.json();
  return data.results.slice(0, 10);
}

function renderMovies(movies) {
  const container = document.getElementById('movies');
  container.innerHTML = '';

  movies.forEach(movie => {
    const card = document.createElement('div');
    card.className = 'movie-card';

    // Imagen de la película
    const img = document.createElement('img');
    img.src = IMG_BASE_URL + movie.poster_path;
    img.alt = movie.title;

    // Título de la película
    const title = document.createElement('div');
    title.className = 'movie-title';
    title.textContent = movie.title;

    // Botón Reservar
    const btnReservar = document.createElement('button');
    btnReservar.className = 'btn-reservar';
    btnReservar.textContent = 'Reservar';
    btnReservar.style.marginTop = '8px';
      
    

    // Montaje de elementos en la tarjeta
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(btnReservar);

    // Añadir tarjeta al contenedor
    container.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const movies = await fetchPopularMovies();
    renderMovies(movies);
  } catch (err) {
    console.error('Error al cargar películas:', err);
  }
});

// 0) Modal de contacto: creación y lógica
function createContactModal() {
  if (document.getElementById('contact-overlay')) return;

  // Overlay
  const overlay = document.createElement('div');
  overlay.id = 'contact-overlay';
  Object.assign(overlay.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '1000'
  });

  // Modal container
  const modal = document.createElement('div');
  modal.id = 'contact-modal';
  Object.assign(modal.style, {
    background: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '400px',
    boxSizing: 'border-box',
    textAlign: 'center',
    position: 'relative'
  });

  // Close button
  const closeBtn = document.createElement('span');
  closeBtn.innerHTML = '&times;';
  Object.assign(closeBtn.style, {
    position: 'absolute',
    top: '10px',
    right: '15px',
    cursor: 'pointer',
    fontSize: '24px'
  });
  closeBtn.addEventListener('click', () => {
    document.body.removeChild(overlay);
  });
  modal.appendChild(closeBtn);

  // Title
  const title = document.createElement('h2');
  title.textContent = 'Contáctanos';
  modal.appendChild(title);

  // Sección Correo
  const correoDiv = document.createElement('div');
  const correoTitle = document.createElement('h3');
  correoTitle.textContent = 'Correo';
  correoDiv.appendChild(correoTitle);
  ['jairo.betancourt@epn.edu.ec', 'justin.imbaquingo@epn.edu.ec', 'cristian.tambaco@epn.edu.ec']
    .forEach(email => {
      const btn = document.createElement('button');
      btn.textContent = email;
      btn.style.margin = '5px';
      btn.addEventListener('click', () => {
        window.location.href = `mailto:${email}`;
      });
      correoDiv.appendChild(btn);
    });
  modal.appendChild(correoDiv);

  // Sección Llamada
  const callDiv = document.createElement('div');
  const callTitle = document.createElement('h3');
  callTitle.textContent = 'Llamada';
  callDiv.appendChild(callTitle);
  ['0984523160', '0962122064', '0961402549'].forEach(num => {
    const btn = document.createElement('button');
    btn.textContent = num;
    btn.style.margin = '5px';
    btn.addEventListener('click', () => {
      window.location.href = `tel:${num}`;
    });
    callDiv.appendChild(btn);
  });
  modal.appendChild(callDiv);

  // Sección WhatsApp
  const waDiv = document.createElement('div');
  const waTitle = document.createElement('h3');
  waTitle.textContent = 'WhatsApp';
  waDiv.appendChild(waTitle);
  [
    { display: '0984523160', code: '593984523160' },
    { display: '0962122064', code: '593962122064' },
    { display: '0961402549', code: '593961402549' }
  ].forEach(({ display, code }) => {
    const btn = document.createElement('button');
    btn.textContent = display;
    btn.style.margin = '5px';
    btn.addEventListener('click', () => {
      window.open(`https://wa.me/${code}`, '_blank');
    });
    waDiv.appendChild(btn);
  });
  modal.appendChild(waDiv);

  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}

// 1) tuFuncion llama al modal en lugar de prompt
function tuFuncion() {
  createContactModal();
}

// 2) Toggle menú
function initMenuToggle() {
  const menuIcon = document.getElementById('menu-icon');
  const menu = document.getElementById('menu');
  if (!menuIcon || !menu) return;
  menuIcon.addEventListener('click', () => menu.classList.toggle('active'));
}

// Inicializar toggle al cargar
document.addEventListener('DOMContentLoaded', initMenuToggle);
