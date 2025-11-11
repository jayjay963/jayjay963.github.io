/* ===== DISCORD + PROFILE COUNTER ===== */
const discordId = '632757650890686485';

document.addEventListener("DOMContentLoaded", function() {
  function fetchDiscordData() {
    fetch(`
https://api.lanyard.rest/v1/users/${discordId}`)
      .then(r => r.json())
      .then(data => {
        if (!data.success) return;
        const d = data.data;
        const u = d.discord_user;

        // Profile info
        document.getElementById("profile-pic").src =
          `
https://cdn.discordapp.com/avatars/${u.id}/${u.avatar}.png`;
        document.getElementById("profile-name").textContent =
          u.display_name || u.username;

        // Discord card info
        document.getElementById("discord-pic").src =
          `
https://cdn.discordapp.com/avatars/${u.id}/${u.avatar}.png`;
        document.getElementById("discord-username").textContent = `@${u.username}`;

        // Status
        const s = d.discord_status;
        const i = document.getElementById("status-indicator");
        i.style.background = s === "dnd" ? "red" : s === "idle" ? "yellow" : "green";

        // Activity
        const actDiv = document.getElementById("activity");
        actDiv.innerHTML = "";
        const rpc = d.activities.find(a => a.type === 0 && a.assets?.large_image);
        if (rpc) {
          const img = document.createElement("img");
          const txt = document.createElement("div");
          img.src = `
https://cdn.discordapp.com/app-assets/${rpc.application_id}/${rpc.assets.large_image}.png`;
          img.classList.add("activity-img");
          txt.classList.add("activity-text");
          txt.innerHTML = `<strong>${rpc.name}</strong><br>${rpc.details || ""}<br>${rpc.state || ""}`;
          actDiv.append(img, txt);
        } else {
          const txt = document.createElement("div");
          txt.textContent = d.activities[0]?.state || "Doing nothing";
          actDiv.append(txt);
        }

        // Discord button
        document.getElementById("discord-btn").onclick = () =>
          window.open(`
https://discord.com/users/${u.id}`, "_blank");
      })
      .catch(console.error);
  }

  fetchDiscordData();
  setInterval(fetchDiscordData, 2000);
});

/* ===== PROFILE VIEW COUNTER ===== */
const namespace = "jaylotti_profile_page";
const key = "views";

function animateCount(el, val) {
  let cur = 0;
  const step = Math.ceil(val / 50);
  const timer = setInterval(() => {
    cur += step;
    if (cur >= val) { cur = val; clearInterval(timer); }
    el.textContent = cur;
  }, 20);
}

fetch(`
https://api.countapi.xyz/hit/${namespace}/${key}`)
  .then(r => r.json())
  .then(res => animateCount(document.getElementById("view-count"), res.value))
  .catch(console.error);

/* ===== BACKGROUND ANIMATIONS ===== */
document.addEventListener("DOMContentLoaded", () => {
  /* --- STARS --- */
  const p = document.getElementById("particlesContainer");
  for (let i = 0; i < 80; i++) {
    const s = document.createElement("div");
    s.className = "particle";
    s.style.left = `${Math.random() * 100}%`;
    s.style.top = `${Math.random() * 100}%`;
    s.style.animationDuration = `${6 + Math.random() * 10}s`;
    s.style.animationDelay = `${Math.random() * 5}s`;
    p.appendChild(s);
  }

document.addEventListener("DOMContentLoaded", () => {
  const host = document.getElementById("binaryRain");
  if (!host) return;

  const STREAMS = 25; // number of vertical streams
  const MIN_DURATION = 10;
  const MAX_DURATION = 20;

  const screenHeight = window.innerHeight;

  for (let i = 0; i < STREAMS; i++) {
    const el = document.createElement("div");
    el.className = "binary-line";

    // Generate a binary string — each line is short so it doesn’t wrap
    const len = 20 + Math.floor(Math.random() * 20);
    let bits = "";
    for (let j = 0; j < len; j++) bits += Math.random() > 0.5 ? "1" : "0";
    el.textContent = bits;

    // distribute horizontally across the screen
    el.style.left = `${(i / STREAMS) * 100}%`;
    // start slightly above the screen
    el.style.top = `${-Math.random() * 20}%`;

    // random speed and delay
    const dur = MIN_DURATION + Math.random() * (MAX_DURATION - MIN_DURATION);
    el.style.animationDuration = `${dur}s`;
    el.style.animationDelay = `${(Math.random() * 10).toFixed(2)}s`;

    host.appendChild(el);
  }
});
  
  /* --- LIGHTNING --- */
  const light = document.getElementById("lightning");
  setInterval(() => {
    if (Math.random() > 0.7) {
      const flash = document.createElement("div");
      flash.className = "lightning-flash";
      flash.style.left = `${Math.random() * 100}%`;
      flash.style.top = `${Math.random() * 100}%`;
      flash.style.height = `${60 + Math.random() * 200}px`;
      flash.style.transition = "opacity 0.2s";
      light.appendChild(flash);
      setTimeout(() => (flash.style.opacity = "1"), 30);
      setTimeout(() => (flash.style.opacity = "0"), 250);
      setTimeout(() => light.removeChild(flash), 400);
    }
  }, 2500);

  /* --- GLITCH FLICKER --- */
  const glitch = document.querySelector(".glitch");
  setInterval(() => {
    glitch.style.opacity = 0.05 + Math.random() * 0.1;
  }, 300);
});









