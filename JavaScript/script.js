/**API for requesting Users
 * https://randomuser.me/api/?results=12&nat=US
 * 
 * Documentation be found here: https://randomuser.me/documentation
 * */

//fetch the API information using promises for card
fetch('https://randomuser.me/api/?results=12&nat=US')
    .then(response => response.json())
    .then(data => generateUserInfo(data.results))
    // .then(dataModal => generateModal(dataModal.results))
    //check to see if there are any errors. if there are then display error message
    .catch(error => {
        const gallery = document.getElementById('gallery');
        gallery.innerHTML = `<h2>Something went wrong</h2> <br> ${error}`
        gallery.style.display = 'block';
        gallery.style.color = 'red';
    })

//use API data to generate the user cards and then append them to the parent container
const generateUserInfo = (users) => {
    const gallery = document.getElementById('gallery');
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

//event listener for the modal to appear (calls modal function)
const userCard = document.querySelector('.card');
const returnData = data.results;
userCard.map(item => {
    userCard.addEventListener('click', (e) => {

    })
});

