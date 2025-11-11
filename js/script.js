/* ===== DISCORD + PROFILE COUNTER ===== */
const discordId = '632757650890686485'; // your Discord ID

document.addEventListener("DOMContentLoaded", function() {
  function fetchDiscordData() {
    fetch(`https://api.lanyard.rest/v1/users/${discordId}`)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          const userData = data.data;
          const discordUser = userData.discord_user;

          // Profile picture + name
          document.getElementById("profile-pic").src =
            `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`;
          document.getElementById("profile-name").textContent =
            discordUser.display_name || discordUser.username;

          // Discord card info
          document.getElementById("discord-pic").src =
            `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`;
          document.getElementById("discord-username").textContent =
            `@${discordUser.username}`;

          // Status indicator
          const statusIndicator = document.getElementById("status-indicator");
          const status = userData.discord_status;
          statusIndicator.style.background =
            status === "dnd"
              ? "red"
              : status === "idle"
              ? "yellow"
              : "green";

          // Activity
          const activityContainer = document.getElementById("activity");
          activityContainer.innerHTML = "";

          const rpcActivity = userData.activities.find(
            (a) => a.type === 0 && a.assets && a.assets.large_image
          );

          if (rpcActivity) {
            const activityImg = document.createElement("img");
            const activityText = document.createElement("div");
            activityImg.src = `https://cdn.discordapp.com/app-assets/${rpcActivity.application_id}/${rpcActivity.assets.large_image}.png`;
            activityImg.classList.add("activity-img");
            activityText.classList.add("activity-text");
            activityText.innerHTML = `<strong>${rpcActivity.name}</strong><br>${rpcActivity.details || ""}<br>${rpcActivity.state || ""}`;
            activityContainer.appendChild(activityImg);
            activityContainer.appendChild(activityText);
          } else {
            const text =
              userData.activities.length > 0
                ? userData.activities[0].state
                : "Doing nothing";
            const activityEl = document.createElement("div");
            activityEl.textContent = text;
            activityContainer.appendChild(activityEl);
          }

          // Discord button
          document.getElementById("discord-btn").onclick = () =>
            window.open(`https://discord.com/users/${discordUser.id}`, "_blank");
        }
      })
      .catch((error) => console.error("Error fetching Discord data:", error));
  }

  fetchDiscordData();
  setInterval(fetchDiscordData, 2000);
});

/* === PROFILE VIEW COUNTER === */
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

  /* --- BINARY RAIN (slow purple with glow) --- */
  const binaryRain = document.getElementById("binaryRain");
  if (binaryRain) {
    const numCols = 18;
    for (let i = 0; i < numCols; i++) {
      const col = document.createElement("div");
      col.className = "binary-column";

      // Generate random binary string
      col.textContent = Array(40)
        .fill(0)
        .map(() => (Math.random() > 0.5 ? "1" : "0"))
        .join("");

      // Position + animation
      col.style.left = `${(i / numCols) * 100}%`;
      col.style.top = `${Math.random() * 100}%`;
      col.style.animationDuration = `${10 + Math.random() * 8}s`; // slow, smooth
      col.style.animationDelay = `${Math.random() * 6}s`;

      // Color + glow
      col.style.color = "rgba(180, 60, 255, 0.3)";
      col.style.textShadow =
        "0 0 8px rgba(180, 60, 255, 0.6), 0 0 12px rgba(180, 60, 255, 0.4)";

      binaryRain.appendChild(col);
    }
  }

  /* --- LIGHTNING FLASH --- */
  const lightning = document.getElementById("lightning");
  setInterval(() => {
    if (Math.random() > 0.7) {
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

  /* --- GLITCH FLICKER --- */
  const glitch = document.querySelector(".glitch");
  setInterval(() => {
    glitch.style.opacity = 0.05 + Math.random() * 0.1;
  }, 300);
});
