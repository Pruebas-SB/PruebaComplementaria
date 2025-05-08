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
window.addEventListener('load', () => {
  const video = document.getElementById("video");
  const estado = document.getElementById("estado");
  let rostrosRegistrados = [];  
  let imagenesRegistradas = []; 

  const modeloURL = "https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights";

  Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri(modeloURL),
    faceapi.nets.faceLandmark68Net.loadFromUri(modeloURL),
    faceapi.nets.faceRecognitionNet.loadFromUri(modeloURL),
  ]).then(iniciarVideo).catch(error => {
    estado.innerText = "❌ Error al cargar modelos.";
    estado.classList.add('estado-error');
    console.error(error);
  });

  function iniciarVideo() {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        video.srcObject = stream;
        estado.innerText = "✅ Modelos cargados. Cámara activa.";
        estado.classList.add('estado-exito');
      })
      .catch(err => {
        estado.innerText = "❌ Error al acceder a la cámara.";
        estado.classList.add('estado-error');
        console.error(err);
      });
  }

  async function registrarRostro() {
    const deteccion = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();
    if (!deteccion) {
      estado.innerText = "❗ No se detectó ningún rostro.";
      estado.classList.add('estado-error');
      return;
    }

    const canvas = faceapi.createCanvasFromMedia(video);
    const dataURL = canvas.toDataURL('image/jpeg'); 

    rostrosRegistrados.push(deteccion.descriptor);
    imagenesRegistradas.push(dataURL);

    estado.innerText = "✅ Rostro registrado correctamente.";
    estado.classList.add('estado-exito');
  }

  async function verificarRostro() {
    if (rostrosRegistrados.length === 0) {
      estado.innerText = "⚠️ Registra un rostro primero.";
      estado.classList.add('estado-error');
      return;
    }

    const deteccion = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();
    if (!deteccion) {
      estado.innerText = "❗ No se detectó ningún rostro.";
      estado.classList.add('estado-error');
      return;
    }

    let rostroVerificado = false;
    let imagenCoincidente = null;

    for (let i = 0; i < rostrosRegistrados.length; i++) {
      const distancia = faceapi.euclideanDistance(rostrosRegistrados[i], deteccion.descriptor);
      if (distancia < 0.5) {
        rostroVerificado = true;
        imagenCoincidente = imagenesRegistradas[i]; 
        break;
      }
    }

    if (rostroVerificado) {
      estado.innerText = "✅ Rostro verificado con éxito.";
      estado.classList.add('estado-exito');
      const imagenVerificada = document.createElement('img');
      imagenVerificada.src = imagenCoincidente;
      document.body.appendChild(imagenVerificada); 
      setTimeout(() => {
        window.location.href = 'index.html'; 
      }, 2000);
    } else {
      estado.innerText = "❌ Rostro no coincide.";
      estado.classList.add('estado-error');
    }
  }

  window.registrarRostro = registrarRostro;
  window.verificarRostro = verificarRostro;
});
// State global para manejar autenticación y roles
const userState = {
  isLoggedIn: false,       // false = invitado, true = cliente autenticado
  role: 'guest'            // 'guest' o 'client'
};

// Función para iniciar sesión (simulación)
function loginUser() {
  userState.isLoggedIn = true;
  userState.role = 'client';
  console.log('Usuario logueado como cliente');
}

// Función para cerrar sesión
function logoutUser() {
  userState.isLoggedIn = false;
  userState.role = 'guest';
  console.log('Usuario deslogueado, rol invitado');
}

// Al intentar reservar sin estar autenticado, redirige al login
function redirectToLogin() {
  window.location.href = './login.html';
}

// Función simulada de reserva
function reserveMovie(movie) {
  alert(`¡Has reservado la película: ${movie.title}!`);
}

// En el renderizado de películas, asociamos el control por estado
function renderMovies(movies) {
  const container = document.getElementById('movies');
  container.innerHTML = '';

  movies.forEach(movie => {
    const card = document.createElement('div');
    card.className = 'movie-card';

    const img = document.createElement('img');
    img.src = IMG_BASE_URL + movie.poster_path;
    img.alt = movie.title;

    const title = document.createElement('div');
    title.className = 'movie-title';
    title.textContent = movie.title;

    const btnReservar = document.createElement('button');
    btnReservar.className = 'btn-reservar';
    btnReservar.textContent = 'Reservar';
    btnReservar.style.marginTop = '8px';

    // Control de acceso según estado
    btnReservar.addEventListener('click', () => {
      if (!userState.isLoggedIn) {
        redirectToLogin();
      } else if (userState.role === 'client') {
        reserveMovie(movie);
      }
    });

    card.append(img, title, btnReservar);
    container.appendChild(card);
  });
}

// Inicialización document ready
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const movies = await fetchPopularMovies();
    renderMovies(movies);
  } catch (err) {
    console.error('Error al cargar películas:', err);
  }
});
// State global para manejar autenticación, roles y almacenamiento temporal de usuarios
const userStatee = {
  isLoggedIn: false,       // false = invitado, true = cliente autenticado
  role: 'guest',            // 'guest' o 'client'
  currentUser: null         // objeto usuario activo
};

// Contenedor temporal para guardar usuarios (simulando BD)
const userList = [];

// Función para iniciar sesión (simulación)
function loginUser(user) {
  userStatee.isLoggedIn = true;
  userStatee.role = 'client';
  userStatee.currentUser = user;
  console.log(`Usuario ${user.email} logueado como cliente`);
}

// Función para cerrar sesión
function logoutUser() {
  userStatee.isLoggedIn = false;
  userStatee.role = 'guest';
  userStatee.currentUser = null;
  console.log('Usuario deslogueado, rol invitado');
}

// Redirigir al login
function redirectToLogin() {
  window.location.href = './login.html';
}

// Función simulada de reserva
function reserveMovie(movie) {
  alert(`¡Has reservado la película: ${movie.title}!`);
}

// Registrar un nuevo usuario en userList
function registerUser(event) {
  event.preventDefault();
  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  
  // Validación básica
  if (!nombre || !email || !password) {
    alert('Todos los campos son obligatorios.');
    return;
  }
  
  // Verificar que no exista email
  if (userList.some(u => u.email === email)) {
    alert('Este correo ya está registrado.');
    return;
  }
  
  // Crear objeto usuario
  const newUser = { nombre, email, password, faceData: null };
  userList.push(newUser);
  console.log('Usuario registrado:', newUser);
  
  // Iniciar reconocimiento facial si hay lógica
  // Aquí podrías vincular registrarRostro() para guardar newUser.faceData
  
  // Loguear al usuario automáticamente
  loginUser(newUser);
  
  // Redirigir al listado de películas o página principal
  window.location.href = './index.html';
}

// Enlazar el evento de registro
function initRegistration() {
  const formRegistro = document.getElementById('form-registro');
  if (formRegistro) {
    formRegistro.addEventListener('submit', registerUser);
  }
}

// En el renderizado de películas, asociamos el control por estado
function renderMovies(movies) {
  const container = document.getElementById('movies');
  container.innerHTML = '';

  movies.forEach(movie => {
    const card = document.createElement('div');
    card.className = 'movie-card';

    const img = document.createElement('img');
    img.src = IMG_BASE_URL + movie.poster_path;
    img.alt = movie.title;

    const title = document.createElement('div');
    title.className = 'movie-title';
    title.textContent = movie.title;

    const btnReservar = document.createElement('button');
    btnReservar.className = 'btn-reservar';
    btnReservar.textContent = 'Reservar';
    btnReservar.style.marginTop = '8px';

    btnReservar.addEventListener('click', () => {
      if (!userStatee.isLoggedIn) {
        redirectToLogin();
      } else if (userStatee.role === 'client') {
        reserveMovie(movie);
      }
    });

    card.append(img, title, btnReservar);
    container.appendChild(card);
  });
}

// Inicialización general
document.addEventListener('DOMContentLoaded', async () => {
  initRegistration();

  // Si estamos en la página de películas
  const moviesContainer = document.getElementById('movies');
  if (moviesContainer) {
    try {
      const movies = await fetchPopularMovies();
      renderMovies(movies);
    } catch (err) {
      console.error('Error al cargar películas:', err);
    }
  }
});
function initUserRegistration() {
  const form = document.getElementById('form-registro');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // 1. Leer campos del formulario
    const nombre    = document.getElementById('nombre').value.trim();
    const email     = document.getElementById('email').value.trim();
    const password  = document.getElementById('password').value;

    if (!nombre || !email || !password) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    // 2. Verificar que no exista el email
    if (userList.some(u => u.email === email)) {
      alert('Este correo ya está registrado.');
      return;
    }

    // 3. Obtener datos de reconocimiento facial (si se registró al menos un rostro)
    let faceData  = null;
    let faceImage = null;
    if (rostrosRegistrados.length > 0) {
      faceData  = rostrosRegistrados[rostrosRegistrados.length - 1];
      faceImage = imagenesRegistradas[imagenesRegistradas.length - 1];
    }

    // 4. Crear el objeto usuario y guardarlo
    const newUser = {
      nombre,
      email,
      password,
      faceData,   // descriptor NumPy-like
      faceImage   // dataURL de la foto
    };
    userList.push(newUser);

    console.log('Usuario registrado:', newUser);

    // 5. Loguear al usuario e iniciar sesión
    loginUser(newUser);

    // 6. Redirigir a la página principal (por ejemplo index.html)
    window.location.href = './index.html';
  });
}

// Llamar a la función tras cargar toda la lógica
initUserRegistration();
/**
 * Muestra en el span#user-name el nombre del usuario si está logueado,
 * o "Invitado" si no lo está.
 */
function displayUserName() {
  const nameSpan = document.getElementById('user-name');
  if (!nameSpan) return;

  if (userStatee.isLoggedIn && userStatee.currentUser) {
    nameSpan.textContent = userStatee.currentUser.nombre;
  } else {
    nameSpan.textContent = 'Invitado';
  }
}

// Llamamos a displayUserName justo después de cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
  // tu inicialización existente...
  initUserRegistration();
  displayUserName();
});
/**
 * Inicializa la lógica de inicio de sesión.
 * - Captura email y password.
 * - Busca en userList.
 * - Si coincide, hace login y redirige a index.html.
 * - Si falla, muestra alerta.
 */
function initLogin() {
  const form = document.getElementById('form-login');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const emailInput    = document.getElementById('email').value.trim();
    const passwordInput = document.getElementById('password').value;

    // Busca usuario en memoria
    const usuario = userList.find(u => u.email === emailInput);

    if (!usuario) {
      alert('Usuario no registrado.');
      return;
    }

    if (usuario.password !== passwordInput) {
      alert('Contraseña incorrecta.');
      return;
    }

    // Credenciales válidas → login y redirect
    loginUser(usuario);
    window.location.href = './index.html';
  });
}

// Llamamos al inicializador cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  // tu inicialización existente…
  initUserRegistration();
  initLogin();
  displayUserName();
});
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-login');
  form.addEventListener('submit', e => {
    e.preventDefault();            // evita el refresh o # en la URL
    // aquí podrías validar email/password si quieres
    window.location.href = './index.html';
  });
});
