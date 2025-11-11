const discordId = '1133030912397938820'; // PUT YOUR DISCORD ID HERE

document.addEventListener("DOMContentLoaded", function() {
    function fetchDiscordData() {
        fetch(`https://api.lanyard.rest/v1/users/${discordId}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const userData = data.data;
                    const discordUser = userData.discord_user;

                    document.getElementById("profile-pic").src = `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`;
                    document.getElementById("profile-name").textContent = discordUser.display_name || discordUser.username;

                    document.getElementById("discord-pic").src = `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`;
                    document.getElementById("discord-username").textContent = `@${discordUser.username}`;

                    const statusIndicator = document.getElementById("status-indicator");
                    statusIndicator.style.background = userData.discord_status === "dnd" ? "red" : userData.discord_status === "idle" ? "yellow" : "green";

                    const activityContainer = document.getElementById("activity");
                    activityContainer.innerHTML = "";

                    const activities = userData.activities;
                    const rpcActivity = activities.find(activity => activity.type === 0 && activity.assets && activity.assets.large_image);

                    if (rpcActivity) {
                        const activityImg = document.createElement("img");
                        const activityText = document.createElement("div");

                        activityImg.src = `https://cdn.discordapp.com/app-assets/${rpcActivity.application_id}/${rpcActivity.assets.large_image}.png`;
                        activityImg.classList.add('activity-img');
                        activityText.classList.add('activity-text');
                        activityText.innerHTML = `<strong>${rpcActivity.name}</strong><br>${rpcActivity.details}<br>${rpcActivity.state}`;

                        activityContainer.appendChild(activityImg);
                        activityContainer.appendChild(activityText);
                    } else {
                        const statusText = userData.activities.length > 0 ? userData.activities[0].state : "Doing nothing";
                        const activityElement = document.createElement("div");
                        activityElement.textContent = statusText;
                        activityContainer.appendChild(activityElement);
                    }

                    document.getElementById("discord-btn").addEventListener("click", function() {
                        window.open(`https://discord.com/users/${discordUser.id}`, "_blank");
                    });
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    fetchDiscordData();
    
    setInterval(fetchDiscordData, 1000);
});