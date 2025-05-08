document.addEventListener("DOMContentLoaded", () => {
    // ==========================
    // PROCESO DE LOGIN
    // ==========================
    // Obtiene el botón de inicio de sesión y el contenedor de mensajes
    const btnIniciar = document.querySelector(".btn-iniciar");
    const mensajeDiv = document.getElementById("mensaje");
   
    // Evento de clic en el botón de inicio de sesión
    btnIniciar.addEventListener("click", () => {
        // Obtiene los valores ingresados por el usuario
        const email = document.getElementById("correo").value;
        const password = document.getElementById("contraseña").value;

        // Validar que los campos no estén vacíos
        if (!email || !password) {
            mostrarMensaje("Por favor, ingresa correo y contraseña.", "red");
            return;
        }

        // Crea el objeto con los datos de inicio de sesión
        const datos = { email, password };

        // Realiza la petición POST al backend para autenticar al usuario
        fetch("https://sysgesbe-production.up.railway.app/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos) // Convierte los datos a formato JSON
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Credenciales inválidas"); // Lanza un error si la respuesta no es exitosa
            }
            return response.json(); // Convierte la respuesta a JSON
        })
        .then(data => {
            // Guarda el token y el ID del usuario en localStorage
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.userId);

            // Muestra un mensaje de éxito
            mostrarMensaje("Inicio de sesión exitoso.", "green");

            // Redirige al menú principal a la ubicación ../menu/menu.html
            setTimeout(() => {
                window.location.href = "../menu/menu.html";
            }, 500);
        })
        .catch(error => {
            // Muestra un mensaje de error si ocurre un problema
            mostrarMensaje(error.message, "red");
        });
    });

    // ==========================
    // FUNCIÓN PARA MOSTRAR MENSAJES
    // ==========================
    // Función para mostrar mensajes en el contenedor #mensaje
    function mostrarMensaje(msg, color) {
        mensajeDiv.textContent = msg;
        mensajeDiv.style.color = color;
        mensajeDiv.style.fontSize = "1.2em";
        mensajeDiv.style.marginBottom = "10px";
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
  const {
    PGHOST,
    PGPORT,
    PGUSER,
    PGPASSWORD,
    PGDATABASE
  } = process.env;
  
  const { Pool } = require('pg');
  
  const pool = new Pool({
    host:     PGHOST,
    port:     parseInt(PGPORT, 10),
    user:     PGUSER,
    password: PGPASSWORD,
    database: PGDATABASE,
    ssl: {
      rejectUnauthorized: false
    }
  });
  
  async function initDB() {
    try {
      // 1) Creamos la tabla si no existe
      await pool.query(`
        CREATE TABLE IF NOT EXISTS clientes (
          correo VARCHAR(255) PRIMARY KEY,
          contraseña VARCHAR(255) NOT NULL,
          peliculasReservadas JSONB DEFAULT '[]',
          rostro BYTEA
        );
      `);
      console.log('✔ Tabla "clientes" lista');
    } catch (err) {
      console.error('Error creando la tabla:', err);
    } finally {
      await pool.end();
    }
  }
  
  initDB();
  