let monstruo = document.getElementById("monstruo");
let texto = document.getElementById("texto");
let final = document.getElementById("final");
let mensajeCaptura = document.getElementById("mensajeCaptura");
let tarjetaMonstruo = document.getElementById("tarjetaMonstruo");
let coleccion = document.getElementById("coleccion");
let fondoEstrellas = document.getElementById("fondo-estrellas");

let monstruos = [
  {
    nombre: "Zorblip",
    imagen: "assets/img/monstruo1.png"
  },
  {
    nombre: "Nébulo",
    imagen: "assets/img/monstruo2.png"
  },
  {
    nombre: "Krimix",
    imagen: "assets/img/monstruo3.png"
  }
];

let frases = [
  "La bestia te vio.",
  "Casi la atrapas.",
  "Se escapó entre las estrellas.",
  "Sigue persiguiéndola.",
  "Está cerca..."
];

let monstruoActual;
let coleccionGuardada = [];

elegirMonstruo();
crearFondoEstrellas();

document.addEventListener("mousemove", function(evento) {
  if (monstruo.style.display == "none") {
    return;
  }

  let rect = monstruo.getBoundingClientRect();

  let centroX = rect.left + rect.width / 2;
  let centroY = rect.top + rect.height / 2;

  let distanciaX = evento.clientX - centroX;
  let distanciaY = evento.clientY - centroY;

  let distancia = Math.sqrt(distanciaX * distanciaX + distanciaY * distanciaY);

  if (distancia < 120) {
    let nuevoX = Math.random() * (window.innerWidth - 140);
    let nuevoY = Math.random() * (window.innerHeight - 140);

    monstruo.style.left = nuevoX + "px";
    monstruo.style.top = nuevoY + "px";

    let numero = Math.floor(Math.random() * frases.length);
    texto.textContent = frases[numero];

    crearEstrella(nuevoX + 40, nuevoY + 20);
  }
});

monstruo.addEventListener("click", function() {
  monstruo.style.display = "none";
  final.classList.remove("oculto");

  mensajeCaptura.textContent = "Atrapaste a " + monstruoActual.nombre;

  tarjetaMonstruo.innerHTML =
    "<img src='" + monstruoActual.imagen + "' alt='" + monstruoActual.nombre + "'>" +
    "<p>" + monstruoActual.nombre + "</p>";

  guardarEnColeccion(monstruoActual);
  mostrarColeccion();
  crearMuchasEstrellas();
});

function elegirMonstruo() {
  let numero = Math.floor(Math.random() * monstruos.length);
  monstruoActual = monstruos[numero];
  monstruo.src = monstruoActual.imagen;
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
  }
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
