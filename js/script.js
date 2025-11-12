const discordId = '632757650890686485'; // PUT YOUR DISCORD ID HERE

document.addEventListener("DOMContentLoaded", function() {
    function fetchDiscordData() {
        fetch(`
https://api.lanyard.rest/v1/users/${discordId}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const userData = data.data;
                    const discordUser = userData.discord_user;

                    // === Profile Image & Name ===
                    document.getElementById("profile-pic").src =
                        `
https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`;
                    document.getElementById("profile-name").textContent =
                        discordUser.display_name || discordUser.username;

                    // === Discord card image & username ===
                    document.getElementById("discord-pic").src =
                        `
https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`;
                    document.getElementById("discord-username").textContent =
                        `@${discordUser.username}`;

                    // === Status Indicator ===
                    const statusIndicator = document.getElementById("status-indicator");
                    statusIndicator.style.background =
                        userData.discord_status === "dnd" ? "red" :
                        userData.discord_status === "idle" ? "yellow" : "green";

                    // === Activity Section ===
                    const activityContainer = document.getElementById("activity");
                    activityContainer.innerHTML = "";

                    const activities = userData.activities;
                    const rpcActivity = activities.find(
                        activity => activity.type === 0 && activity.assets && activity.assets.large_image
                    );

                    if (rpcActivity) {
                        const activityImg = document.createElement("img");
                        const activityText = document.createElement("div");

                        activityImg.src =
                            `
https://cdn.discordapp.com/app-assets/${rpcActivity.application_id}/${rpcActivity.assets.large_image}.png`;
                        activityImg.classList.add('activity-img');
                        activityText.classList.add('activity-text');
                        activityText.innerHTML =
                            `<strong>${rpcActivity.name}</strong><br>${rpcActivity.details || ''}<br>${rpcActivity.state || ''}`;

                        activityContainer.appendChild(activityImg);
                        activityContainer.appendChild(activityText);
                    } else {
                        const statusText = userData.activities.length > 0
                            ? userData.activities[0].state
                            : "Doing nothing";
                        const activityElement = document.createElement("div");
                        activityElement.textContent = statusText;
                        activityContainer.appendChild(activityElement);
                    }

                    // === Discord Button Click ===
                    document.getElementById("discord-btn").addEventListener("click", function() {
                        window.open(`
https://discord.com/users/${discordUser.id}`, "_blank");
                    });

                    // === Dynamic Status Text (replaces "pay to win") ===
                    const statusTextElement = document.getElementById("status-text");
                    let displayText = "Doing nothing";

                    const gameActivity = activities.find(a => a.type === 0);
                    const customStatus = activities.find(a => a.type === 4);

                    if (gameActivity && gameActivity.name) {
                        displayText = `Playing ${gameActivity.name}`;
                        if (gameActivity.details) displayText += ` — ${gameActivity.details}`;
                        if (gameActivity.state) displayText += ` (${gameActivity.state})`;
                    } else if (customStatus && customStatus.state) {
                        displayText = customStatus.state;
                    }

                    statusTextElement.textContent = displayText;
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    fetchDiscordData();
    setInterval(fetchDiscordData, 1000);
});

