const button = document.getElementById("runaway");
const message = document.getElementById("message");

document.addEventListener("mousemove", (e) => {
  const rect = button.getBoundingClientRect();

  const dx = e.clientX - (rect.left + rect.width / 2);
  const dy = e.clientY - (rect.top + rect.height / 2);

  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < 120) {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;

    button.style.left = x + "px";
    button.style.top = y + "px";
  }
});

button.addEventListener("click", () => {
  button.style.display = "none";
  message.classList.remove("hidden");
});









let boton = document.getElementById("boton");
let texto = document.getElementById("texto");
let final = document.getElementById("final");
let estrellaSecreta = document.getElementById("estrellaSecreta");
let tesoro = document.getElementById("tesoro");

let frases = [
  "Casi... pero todavía no.",
  "La maravilla no se deja atrapar tan fácil.",
  "Sigue intentando.",
  "Estás cada vez más cerca.",
  "No te rindas todavía."
];

document.addEventListener("mousemove", function(evento) {
  if (boton.style.display == "none") {
    return;
  }

  let rect = boton.getBoundingClientRect();

  let centroX = rect.left + rect.width / 2;
  let centroY = rect.top + rect.height / 2;

  let distanciaX = evento.clientX - centroX;
  let distanciaY = evento.clientY - centroY;

  let distancia = Math.sqrt(distanciaX * distanciaX + distanciaY * distanciaY);

  if (distancia < 140) {
    let nuevoX = Math.random() * (window.innerWidth - 120);
    let nuevoY = Math.random() * (window.innerHeight - 60);

    boton.style.left = nuevoX + "px";
    boton.style.top = nuevoY + "px";

    let numero = Math.floor(Math.random() * frases.length);
    texto.textContent = frases[numero];

    crearEstrella(nuevoX + 40, nuevoY + 20);
  }
});

boton.addEventListener("click", function() {
  boton.style.display = "none";
  texto.textContent = "Lo lograste.";
  final.classList.remove("oculto");
  crearMuchasEstrellas();
});

estrellaSecreta.addEventListener("click", function() {
  tesoro.classList.remove("oculto");
  crearMuchasEstrellas();
});

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
