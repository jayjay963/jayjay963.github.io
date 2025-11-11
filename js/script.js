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

          document.getElementById("profile-pic").src =
            `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`;
          document.getElementById("profile-name").textContent =
            discordUser.display_name || discordUser.username;

          document.getElementById("discord-pic").src =
            `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`;
          document.getElementById("discord-username").textContent =
            `@${discordUser.username}`;

          const statusIndicator = document.getElementById("status-indicator");
          statusIndicator.style.background =
            userData.discord_status === "dnd"
              ? "red"
              : userData.discord_status === "idle"
              ? "yellow"
              : "green";

          const activityContainer = document.getElementById("activity");
          activityContainer.innerHTML = "";

          const activities = userData.activities;
          const rpcActivity = activities.find(
            (activity) =>
              activity.type === 0 && activity.assets && activity.assets.large_image
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
              userData.activities.length > 0
                ? userData.activities[0].state
                : "Doing nothing";
            const activityElement = document.createElement("div");
            activityElement.textContent = statusText;
            activityContainer.appendChild(activityElement);
          }

          document.getElementById("discord-btn").addEventListener("click", function() {
            window.open(`https://discord.com/users/${discordUser.id}`, "_blank");
          });
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  fetchDiscordData();
  setInterval(fetchDiscordData, 2000);
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
  // --- STAR PARTICLES ---
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

  // --- BINARY RAIN ---
  const binaryRain = document.getElementById("binaryRain");
  const numCols = 16;
  for (let i = 0; i < numCols; i++) {
    const col = document.createElement("div");
    col.className = "binary-column";
    col.style.left = `${(i / numCols) * 100}%`;
    col.style.animationDuration = `${5 + Math.random() * 4}s`;
    col.style.animationDelay = `${Math.random() * 3}s`;
    col.style.top = `${Math.random() * 100}%`;
    let bits = "";
    for (let j = 0; j < 40; j++) bits += Math.random() > 0.5 ? "1" : "0";
    col.textContent = bits;
    binaryRain.appendChild(col);
  }

  // --- LIGHTNING ---
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

  // --- GLITCH EFFECT ---
  const glitch = document.querySelector(".glitch");
  setInterval(() => {
    glitch.style.opacity = 0.05 + Math.random() * 0.1;
  }, 300);
});
