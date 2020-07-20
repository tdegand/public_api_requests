//This file handles all the API requests and building of the user tiles

/**API for requesting Users
 * https://randomuser.me/api/?results=12&nat=US
 * */

//fetch the API information using promises
fetch('https://randomuser.me/api/?results=12&nat=US')
    .then(response => response.json())
    .then(data => generateUserCards(data.results))
    .catch(error => {
        const gallery = document.getElementById('gallery');
        gallery.innerHTML = `<h2>Something went wrong</h2> <br> ${error}`
        gallery.style.display = 'block';
        gallery.style.color = 'red';
    })

//check to see if there are any errors. if there are then display error message


//use API data to generate the user cards and then append them to the parent container
const generateUserCards = (users) => {
    const gallery = document.getElementById('gallery');
    console.log(users)
    users.map(user => {
        const cardArr = [];
        const userCard = `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${user.picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
                <p class="card-text">${user.email}</p>
                <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
            </div>
        </div>
        `;
        //add each card generated to empty array and then display each one on page
        cardArr.push(userCard)
        cardArr.forEach(item => {
            gallery.innerHTML += item;
        })
    })
}


