<script>
const discordId = '632757650890686485'; // your Discord ID

document.addEventListener("DOMContentLoaded", function() {

  function fetchDiscordData() {
    fetch(`https://api.lanyard.rest/v1/users/${discordId}`)
      .then(response => response.json())
      .then(data => {
        if (!data.success) return;

        const userData = data.data;
        const discordUser = userData.discord_user;

        // === Profile Image & Name ===
        document.getElementById("profile-pic").src =
          `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`;
        document.getElementById("profile-name").textContent =
          discordUser.display_name || discordUser.username;

        // === Discord card image & username ===
        document.getElementById("discord-pic").src =
          `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`;
        document.getElementById("discord-username").textContent =
          `@${discordUser.username}`;

        // === Status Indicator ===
        const statusIndicator = document.getElementById("status-indicator");
        const status = userData.discord_status;
        statusIndicator.style.background =
          status === "dnd" ? "red" :
          status === "idle" ? "yellow" :
          status === "offline" ? "gray" : "limegreen";

        // === Dynamic Discord Status (Activity / Custom) ===
        const statusTextElement = document.getElementById("status-text");
        const activities = userData.activities || [];
        let displayText = "Idle";

        const gameActivity = activities.find(a => a.type === 0);
        const customStatus = activities.find(a => a.type === 4);

        if (gameActivity && gameActivity.name) {
          displayText = `🎮 ${gameActivity.name}`;
          if (gameActivity.details) displayText += ` — ${gameActivity.details}`;
          if (gameActivity.state) displayText += ` (${gameActivity.state})`;
        } else if (customStatus && customStatus.state) {
          displayText = customStatus.state;
        }

        // Smooth fade transition
        statusTextElement.style.opacity = 0;
        setTimeout(() => {
          statusTextElement.textContent = displayText;
          statusTextElement.style.opacity = 1;
        }, 150);

      })
      .catch(error => console.error('Error fetching data:', error));
  }

  fetchDiscordData();
  setInterval(fetchDiscordData, 1000);
});

// === Profile View Counter ===
const namespace = "jaylotti_profile_page"; // unique key
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
  .then(res => res.json())
  .then(res => animateCount(document.getElementById("view-count"), res.value))
  .catch(err => console.error("Error fetching view count:", err));
</script>
