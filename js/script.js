/* ===== DISCORD + PROFILE COUNTER ===== */
const discordId = '632757650890686485'; // your Discord ID

document.addEventListener("DOMContentLoaded", function () {
  function fetchDiscordData() {
    fetch(`https://api.lanyard.rest/v1/users/${discordId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const userData = data.data;
          const discordUser = userData.discord_user;

          // --- Profile Section ---
          document.getElementById("profile-pic").src =
            `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`;
          document.getElementById("profile-name").textContent =
            discordUser.display_name || discordUser.username;

          // --- Discord Card ---
          document.getElementById("discord-pic").src =
            `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`;
          document.getElementById("discord-username").textContent =
            `@${discordUser.username}`;

          // --- Status Dot ---
          const statusIndicator = document.getElementById("status-indicator");
          statusIndicator.style.background =
            userData.discord_status === "dnd"
              ? "red"
              : userData.discord_status === "idle"
              ? "yellow"
              : "green";

          // --- Activity / RPC ---
          const activityContainer = document.getElementById("activity");
          activityContainer.innerHTML = "";

          const activities = userData.activities;
          const rpcActivity = activities.find(
            (a) => a.type === 0 && a.assets && a.assets.large_image
          );

          if (rpcActivity) {
            const activityImg = document.createElement("img");
            const activityText = document.createElement("div");

            activityImg.src = `https://cdn.discordapp.com/app-assets/${rpcActivity.application_id}/${rpcActivity.assets.large_image}.png`;
            activityImg.classList.add("activity-img");
            activityText.classList.add("activity-text");
            activityText.innerHTML = `<strong>${rpcActivity.name}</strong><br>${rpcActivity.details}<br>${rpcActivity.state}`;

            activityContainer.appendChild(activityImg);
            activityContainer.appendChild(activityText);
          } else {
            const statusText =
              activities.length > 0 ? activities[0].state : "Doing nothing";
            const activityElement = document.createElement("div");
            activityElement.textContent = statusText;
            activityContainer.appendChild(activityElement);
          }

          // --- DMs Open Button ---
          document
            .getElementById("discord-btn")
            .addEventListener("click", function () {
              window.open(`https://discord.com/users/${discordUser.id}`, "_blank");
            });
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  fetchDiscordData();
  setInterval(fetchDiscordData, 3000);
});

/* === Profile View Counter === */
const namespace = "jaylotti_profile_page";
const key = "views";

function animateCount(target, endValue) {
  let current = 0;
  const step = Math.ceil(endValue / 50);
  const interval = setInterval(() => {
    current += step;
    if (current >= endValue) {
      current = endValue;
      clearInterval(interval);
    }
    target.textContent = current;
  }, 20);
}

fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`)
  .then((res) => res.json())
  .then((res) => animateCount(document.getElementById("view-count"), res.value))
  .catch((err) => console.error("Error fetching view count:", err));

/* ===== BACKGROUND ANIMATIONS ===== */
document.addEventListener("DOMContentLoaded", () => {
  /* --- STAR PARTICLES --- */
  const particlesContainer = document.getElementById("particlesContainer");
  for (let i = 0; i < 80; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${6 + Math.random() * 10}s`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    particlesContainer.appendChild(particle);
  }

  /* --- BINARY RAIN (Slow + Glowing) --- */
  const binaryRain = document.getElementById("binaryRain");
  const numCols = 18;
  const screenWidth = window.innerWidth;

  for (let i = 0; i < numCols; i++) {
    const col = document.createElement("div");
    col.classList.add("binary-column");

    // random bits
    const bits = Array(30)
      .fill(0)
      .map(() => (Math.random() > 0.5 ? "1" : "0"))
      .join("");

    col.textContent = bits;
    col.style.left = `${Math.random() * screenWidth}px`;
    col.style.animationDuration = `${7 + Math.random() * 5}s`; // slower fall
    col.style.opacity = 0.2 + Math.random() * 0.4;

    // subtle purple → teal gradient glow
    col.style.color = Math.random() > 0.5 ? "rgba(200,100,255,0.35)" : "rgba(0,255,150,0.3)";
    binaryRain.appendChild(col);
  }

  /* --- LIGHTNING --- */
  const lightning = document.getElementById("lightning");
  setInterval(() => {
    if (Math.random() > 0.8) {
      const flash = document.createElement("div");
      flash.className = "lightning-flash";
      flash.style.left = `${Math.random() * 100}%`;
      flash.style.top = `${Math.random() * 100}%`;
      flash.style.height = `${60 + Math.random() * 200}px`;
      flash.style.transition = "opacity 0.2s";
      lightning.appendChild(flash);

      setTimeout(() => (flash.style.opacity = "1"), 30);
      setTimeout(() => (flash.style.opacity = "0"), 250);
      setTimeout(() => lightning.removeChild(flash), 400);
    }
  }, 2500);

  /* --- GLITCH EFFECT --- */
  const glitch = document.querySelector(".glitch");
  setInterval(() => {
    glitch.style.opacity = 0.05 + Math.random() * 0.1;
  }, 300);

  /* --- SCANLINE FLICKER --- */
  const scanlines = document.querySelector(".scanlines");
  if (scanlines) {
    setInterval(() => {
      scanlines.style.opacity = 0.12 + Math.random() * 0.05;
    }, 250);
  }
});
