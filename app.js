
const frm = document.querySelector('#pro');
const userName = frm.elements.username;
const card = document.getElementById('card'); 


async function fetchUserInfo(un) {
  try {
    const response = await fetch(`https://api.github.com/users/${un}`);

    if (!response.ok) {
      throw new Error(`User not found (Status: ${response.status})`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching GitHub user:", error.message);
    return null; 
  }
}


function renderCard(data) {
  if (!data) {
    card.innerHTML = `<p class="error">User not found or an error occurred.</p>`;
    return;
  }

  card.innerHTML = `
    <div class="user-card">
      <img src="${data.avatar_url}" alt="${data.login}" width="100" />
      <h2>${data.name || data.login}</h2>
      <p>${data.bio || "No bio available."}</p>
      <ul>
        <li>Repos: ${data.public_repos}</li>
        <li>Followers: ${data.followers}</li>
        <li>Following: ${data.following}</li>
      </ul>
    </div>
  `;
}


async function showCard(un) {
  card.innerHTML = `<p class="loading">Loading...</p>`;


  const userInfo = await fetchUserInfo(un);

  renderCard(userInfo);
}

frm.addEventListener('submit', (e) => {
  e.preventDefault();
  const query = userName.value.trim();

  if (query) {
    showCard(query);
  }
});