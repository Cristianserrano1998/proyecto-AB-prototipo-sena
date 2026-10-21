// =========================================================
// LÓGICA INTERACTIVA DEL PROTOTIPO A&B
// =========================================================

// MODO OSCURO / MODO CLARO (THEME TOGGLE)
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const themeIcon = document.getElementById('theme-icon');

  if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'light');
    themeIcon.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeIcon.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
  }
}

// CARGAR TEMA GUARDADO AL INICIAR
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  const themeIcon = document.getElementById('theme-icon');
  if (themeIcon) {
    themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
  }
});

// CAMBIO DE PANTALLAS (NAVEGACIÓN ENTRE LOGIN Y REGISTRO)
function mostrarPantalla(screenId) {
  document.querySelectorAll('.card-screen').forEach(screen => {
    screen.classList.remove('active');
  });

  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  const activeScreen = document.getElementById(screenId);
  if (activeScreen) {
    activeScreen.classList.add('active');
  }

  if (screenId === 'login-screen') {
    document.querySelectorAll('.nav-btn')[0].classList.add('active');
  } else if (screenId === 'register-screen') {
    document.querySelectorAll('.nav-btn')[1].classList.add('active');
  }
}

// MOSTRAR / OCULTAR CONTRASEÑA (TOGGLE)
function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  if (input.type === 'password') {
    input.type = 'text';
  } else {
    input.type = 'password';
  }
}

// PROCESAR FORMULARIO DE LOGIN
function procesarLogin(event) {
  event.preventDefault();

  const email = document.getElementById('login-email').value;
  const pwd = document.getElementById('login-password').value;

  if (email !== "admin@ab.com" || pwd !== "123456") {
    abrirModal(
      "Error de Autenticación",
      "Las credenciales ingresadas no corresponden a ningún usuario registrado en A&B. Por favor verifica tus datos."
    );
  } else {
    alert("¡Inicio de sesión exitoso en A&B!");
  }
}

// PROCESAR FORMULARIO DE REGISTRO CON VALIDACIÓN DE CONTRASEÑA
function procesarRegistro(event) {
  event.preventDefault();

  const nombres = document.getElementById('reg-nombres').value;
  const cedula = document.getElementById('reg-cedula').value;
  const pwd = document.getElementById('reg-password').value;
  const confirmPwd = document.getElementById('reg-confirm-password').value;

  // Validación 1: Longitud de la cédula
  if (cedula.length < 8) {
    abrirModal(
      "Cédula Inválida",
      "El número de cédula ingresado debe contener al menos 8 dígitos numéricos."
    );
    return;
  }

  // Validación 2: Coincidencia de contraseñas
  if (pwd !== confirmPwd) {
    abrirModal(
      "Las contraseñas no coinciden",
      "Por favor asegúrate de que la contraseña ingresada y su confirmación sean exactamente iguales."
    );
    return;
  }

  alert(`¡Cuenta creada con éxito para ${nombres}! Ahora puedes iniciar sesión en A&B.`);
  document.getElementById('register-form').reset();
  mostrarPantalla('login-screen');
}

// SIMULACIÓN DE ERRORES SECUNDARIOS
function simularError(tipo) {
  abrirModal(
    `Acción no disponible: ${tipo}`,
    "Esta función se conectará posteriormente con la API REST en Node.js."
  );
}

// CONTROL DEL MODAL DE ERRORES
function abrirModal(titulo, mensaje) {
  document.getElementById('modal-title').textContent = titulo;
  document.getElementById('modal-message').textContent = mensaje;
  document.getElementById('error-modal').classList.add('active');
}

function cerrarModal() {
  document.getElementById('error-modal').classList.remove('active');
}