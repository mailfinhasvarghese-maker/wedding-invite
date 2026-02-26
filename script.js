const envelope = document.getElementById("env");
const rsvpBtn = document.getElementById("rsvpBtn");

envelope.addEventListener("click", () => {
  envelope.classList.toggle("open");
  // Optional confetti effect when flap opens
  if (envelope.classList.contains("open")) {
    launchConfetti();
  }
});

// Simple confetti using canvas
function launchConfetti() {
  const canvas = document.getElementById("confettiCanvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext("2d");

  const confettiCount = 100;
  const confetti = [];

  for (let i = 0; i < confettiCount; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * confettiCount,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      tilt: Math.random() * 10 - 10,
      tiltAngleIncrement: Math.random() * 0.07 + 0.05
    });
  }

  let angle = 0;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach((c, i) => {
      ctx.beginPath();
      ctx.lineWidth = c.r / 2;
      ctx.strokeStyle = c.color;
      ctx.moveTo(c.x + c.tilt + c.r / 4, c.y);
      ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r / 4);
      ctx.stroke();

      c.tilt += c.tiltAngleIncrement;
      c.y += (Math.cos(angle + c.d) + 3 + c.r / 2) / 2;
      c.x += Math.sin(angle);
      if (c.y > canvas.height) {
        c.y = -10;
        c.x = Math.random() * canvas.width;
      }
    });
    angle += 0.01;
    requestAnimationFrame(draw);
  }
  draw();
}

// RSVP button action
rsvpBtn.addEventListener("click", () => {
  window.open("https://forms.gle/YOUR-RSVP-FORM", "_blank");
});
