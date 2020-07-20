//This file handles all the API requests and building of the user tiles

/**API for requesting Users
 * https://randomuser.me/api/?results=12&nat=US
 * */

//fetch the API information using promises
fetch('https://randomuser.me/api/?results=12&nat=US')
    .then(response => response.json())
    .then(data => generateUserCards(data.results));


const generateUserCards = (users) => {
    users.map(user => {
        console.log(user);
        const userCard = `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${user.picture.thumbnail}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
                <p class="card-text">${user.email}</p>
                <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
            </div>
        </div>
        `;
        document.getElementById('gallery').innerHTML = userCard;
    });
}


