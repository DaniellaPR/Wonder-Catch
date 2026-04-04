let monstruo = document.getElementById("monstruo");
let texto = document.getElementById("texto");
let final = document.getElementById("final");
let mensajeCaptura = document.getElementById("mensajeCaptura");
let tarjetaMonstruo = document.getElementById("tarjetaMonstruo");
let coleccion = document.getElementById("coleccion");
let fondoEstrellas = document.getElementById("fondo-estrellas");
let contador = document.getElementById("contador");
let seguirCazando = document.getElementById("seguirCazando");
let reiniciarColeccion = document.getElementById("reiniciarColeccion");
let activarSonido = document.getElementById("activarSonido");
let cursorOvni = document.getElementById("cursor-ovni");

let monstruos = [
  {
    nombre: "Camarón Galáctico",
    imagen: "assets/imagen/Camaron4.png",
    fondo: "assets/audio/Aylex - Turn It Louder-Fondo.mp3",
    sonido: "assets/audio/Camaroncito.mp3"
  },
  {
    nombre: "Conejo OVNI",
    imagen: "assets/imagen/ConejOvni2.png",
    fondo: "assets/audio/Burgundy - All Night-Fondo.mp3",
    sonido: "assets/audio/Conejito.mp3"
  },
  {
    nombre: "Gato OVNI",
    imagen: "assets/imagen/GatOvni1.png",
    fondo: "assets/audio/Dagored - Listen To My Heartbeat-Fondo.mp3",
    sonido: "assets/audio/Gatito.mp3"
  },
  {
    nombre: "Hámster Estelar",
    imagen: "assets/imagen/Hamster3.png",
    fondo: "assets/audio/Damtaro - Combat-Fondo.mp3",
    sonido: "assets/audio/Hamstercito.mp3"
  },
  {
    nombre: "Vaca Mutada",
    imagen: "assets/imagen/VacaMutada0.png",
    fondo: "assets/audio/HiLau - Digital Soul-Fondo.mp3",
    sonido: "assets/audio/Vaquita.mp3"
  }
];

let frases = [
  "La bestia te vio.",
  "Casi la atrapas.",
  "Se escapó entre las estrellas.",
  "Sigue persiguiéndola.",
  "Estás cerca...",
  "Tu raza estaría decepcionada"
];


let monstruoActual;
let coleccionGuardada = [];
let sonidoActivo = false;

let musicaFondo = new Audio();
let sonidoAnimal = new Audio();
let sonidoVictoria = new Audio("assets/audio/SonidoVictoria.mp3");

musicaFondo.loop = true;
sonidoAnimal.loop = false;
sonidoVictoria.loop = false;

musicaFondo.volume = 0.08;
sonidoAnimal.volume = 0.5;
sonidoVictoria.volume = 0.35;

cargarColeccion();
actualizarContador();
mostrarColeccion();
elegirMonstruo();
crearFondoEstrellas();

document.addEventListener("mousemove", function(evento) {
  moverCursor(evento);

  if (monstruo.style.display == "none") {
    return;
  }

  let rect = monstruo.getBoundingClientRect();

  let centroX = rect.left + rect.width / 2;
  let centroY = rect.top + rect.height / 2;

  let distanciaX = evento.clientX - centroX;
  let distanciaY = evento.clientY - centroY;

  let distancia = Math.sqrt(distanciaX * distanciaX + distanciaY * distanciaY);

  if (distancia < 70) {
    let nuevoX = Math.random() * (window.innerWidth - 160);
    let nuevoY = Math.random() * (window.innerHeight - 160);

    monstruo.style.left = nuevoX + "px";
    monstruo.style.top = nuevoY + "px";

    let numero = Math.floor(Math.random() * frases.length);
    texto.textContent = frases[numero];

    crearEstrella(nuevoX + 40, nuevoY + 20);
  }
});

monstruo.addEventListener("click", function() {
  detenerMusicaFondo();

  if (sonidoActivo) {
    sonidoAnimal.currentTime = 0;
    sonidoAnimal.play();
  }

  monstruo.style.display = "none";

  guardarEnColeccion(monstruoActual);
  actualizarContador();
  mostrarColeccion();

  mensajeCaptura.textContent = "Atrapaste a " + monstruoActual.nombre;

  tarjetaMonstruo.innerHTML =
    "<img src='" + monstruoActual.imagen + "' alt='" + monstruoActual.nombre + "'>" +
    "<p>" + monstruoActual.nombre + "</p>";

  setTimeout(function() {
    final.classList.remove("oculto");
    texto.textContent = "Captura completada.";
    crearMuchasEstrellas();

    if (sonidoActivo) {
      sonidoVictoria.currentTime = 0;
      sonidoVictoria.play();
    }
  }, 500);
});

seguirCazando.addEventListener("click", function() {
  final.classList.add("oculto");
  texto.textContent = "Persigue a la criatura espacial y captúrala.";
  monstruo.style.display = "block";
  elegirMonstruo();
});

reiniciarColeccion.addEventListener("click", function() {
  localStorage.removeItem("coleccionBestias");
  coleccionGuardada = [];
  actualizarContador();
  mostrarColeccion();
  final.classList.add("oculto");
  texto.textContent = "Colección reiniciada. Vuelve a cazar.";
  monstruo.style.display = "block";
  elegirMonstruo();
});

activarSonido.addEventListener("click", function() {
  sonidoActivo = true;
  activarSonido.textContent = "Sonido activado";
  reproducirMusicaFondo();
});

function moverCursor(evento) {
  cursorOvni.style.left = evento.clientX + "px";
  cursorOvni.style.top = evento.clientY + "px";
}

function elegirMonstruo() {
  let numero = Math.floor(Math.random() * monstruos.length);
  monstruoActual = monstruos[numero];
  monstruo.src = monstruoActual.imagen;

  sonidoAnimal.src = monstruoActual.sonido;
  musicaFondo.src = monstruoActual.fondo;

  if (sonidoActivo) {
    reproducirMusicaFondo();
  }
}

function guardarEnColeccion(monstruoNuevo) {
  let yaExiste = false;

  for (let i = 0; i < coleccionGuardada.length; i++) {
    if (coleccionGuardada[i].nombre == monstruoNuevo.nombre) {
      yaExiste = true;
    }
  }

  if (yaExiste == false) {
    coleccionGuardada.push(monstruoNuevo);
    localStorage.setItem("coleccionBestias", JSON.stringify(coleccionGuardada));
  }
}

function cargarColeccion() {
  let datos = localStorage.getItem("coleccionBestias");

  if (datos) {
    coleccionGuardada = JSON.parse(datos);
  }
}

function actualizarContador() {
  contador.textContent = "Bestias atrapadas: " + coleccionGuardada.length + "/5";
}

function mostrarColeccion() {
  coleccion.innerHTML = "";

  for (let i = 0; i < coleccionGuardada.length; i++) {
    let tarjeta = document.createElement("div");
    tarjeta.className = "monstruo-coleccion";

    tarjeta.innerHTML =
      "<img src='" + coleccionGuardada[i].imagen + "' alt='" + coleccionGuardada[i].nombre + "'>" +
      "<p>" + coleccionGuardada[i].nombre + "</p>";

    coleccion.appendChild(tarjeta);
  }
}

function reproducirMusicaFondo() {
  detenerMusicaFondo();
  musicaFondo.currentTime = 0;
  musicaFondo.play();
}

function detenerMusicaFondo() {
  musicaFondo.pause();
  musicaFondo.currentTime = 0;
}

function crearEstrella(x, y) {
  let estrella = document.createElement("div");
  estrella.className = "estrella";
  estrella.textContent = "✨";
  estrella.style.left = x + "px";
  estrella.style.top = y + "px";

  document.body.appendChild(estrella);

  setTimeout(function() {
    estrella.remove();
  }, 1000);
}

function crearMuchasEstrellas() {
  for (let i = 0; i < 20; i++) {
    let x = Math.random() * window.innerWidth;
    let y = Math.random() * window.innerHeight;
    crearEstrella(x, y);
  }
}

function crearFondoEstrellas() {
  for (let i = 0; i < 80; i++) {
    let estrella = document.createElement("div");
    estrella.className = "estrellita-fondo";

    let x = Math.random() * window.innerWidth;
    let y = Math.random() * window.innerHeight;
    let tiempo = Math.random() * 3 + 1;
    let tamaño = Math.random() * 3 + 2;

    estrella.style.left = x + "px";
    estrella.style.top = y + "px";
    estrella.style.width = tamaño + "px";
    estrella.style.height = tamaño + "px";
    estrella.style.animationDuration = tiempo + "s";

    fondoEstrellas.appendChild(estrella);
  }
}
