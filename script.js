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
