/**API for requesting Users
 * https://randomuser.me/api/?results=12&nat=US
 * Documentation be found here: https://randomuser.me/documentation
 * */

//fetch the API information using promises for card
fetch('https://randomuser.me/api/?results=12&nat=US')
    .then(response => response.json())
    .then(data => generateUserInfo(data.results))
    //check to see if there are any errors. if there are then display error message
    .catch(error => {
        const gallery = document.getElementById('gallery');
        gallery.innerHTML = `<h2>Something went wrong</h2> <br> ${error}`
        gallery.style.display = 'block';
        gallery.style.color = 'red';
    })

/**
 * @function generateUserInfo uses the user information to generate and display the user cards
 * search function is also stored in here usng jquery to filter the cards upon submisson
 * When a user card is clicked it will generate a modal of that user
 * @param {*API response of users} users 
 */
const generateUserInfo = (users) => {
    const gallery = document.getElementById('gallery');
    const cardArr = [];
    users.map(user => {
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
    })
    cardArr.forEach(item => {
        gallery.innerHTML += item;
    })

    /**
     * Loops over each generated card 
     * adds an event listener to each card
     * if clicked it will generate the modal using the current user
     */
    const userCardButton = document.querySelectorAll('.card');
    for (let i = 0; i < userCardButton.length; i++) {
        userCardButton[i].addEventListener('click', (e) => {
            if (e.target === userCardButton[i] || userCardButton[i].contains(e.target)) {
                generateModal(users, i)
            }
        });
    }

    //generate search bar
    const formParent = document.querySelector('.search-container');
    formParent.innerHTML = `
    <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
    </form>`

    //use jquery to filter the search

    $(".search-input").on("keyup", function () {
        const value = $(this).val().toLowerCase();
        $('.card-name').filter(function () {
            $(this).closest(".card").toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

}

/**
 * @function generateModal will generate the modal when a user card is clicked/function called
 * and it will allow you to cycle through each modal using the next and prev buttons
 * 
 * @param users is the APi user data passed into this function
 * @param index is the index number of the returned users from the API data
 */
const generateModal = (users, index) => {

    const user = users[index];

    //create modal parent container
    const modalBox = document.createElement('div');
    modalBox.className = "modal-container";

    if (user === users[0]) {
        modalBox.classList.add('first');
    } else if (user === users[11]) {
        modalBox.classList.add('last');
    }

    //reformat the DOB of users
    const year = user.dob.date.substring(0, 4);
    const month = user.dob.date.substring(5, 7);
    const day = user.dob.date.substring(8, 10);

    let date = `${month}/${day}/${year}`;

    /**
     * Generate modal content with selected user data
     * append this modal content to the parent container
     */
    const modal = `
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${user.picture.large}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
                    <p class="modal-text">${user.email}</p>
                    <p class="modal-text cap">${user.location.city}</p>
                    <hr>
                    <p class="modal-text">${user.phone}</p>
                    <p class="modal-text">${user.location.street.number} ${user.location.street.name}<br> ${user.location.city}, ${user.location.state}<br> ${user.location.postcode}</p>
                    <p class="modal-text">Birthdate: ${date}</p>
                </div>
            </div>
            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>`
    modalBox.innerHTML = modal;
    document.body.prepend(modalBox);
    //event listener that will close the modal upon click
    const closeButton = document.getElementById('modal-close-btn')
    modalBox.addEventListener('click', (e) => {
        if (e.target === closeButton || closeButton.contains(e.target)) {
            document.body.removeChild(modalBox);
            return;
        }
    })

    //generate new modal of next user when clicked
    const next = document.getElementById('modal-next');
    const prev = document.getElementById('modal-prev');
    const nextPrevButton = document.querySelector('.modal-btn-container');
    nextPrevButton.addEventListener('click', (event) => {
        if (nextPrevButton.contains(event.target)) {
            if (event.target === next) {
                document.body.removeChild(modalBox);
                generateModal(users, index + 1);
            } else if (event.target === prev) {
                generateModal(users, index - 1);
                document.body.removeChild(modalBox);
            }
        }

    });
    //if the first modal is present it removes the Prev button
    //if Last modal is present it removes the next button
    if (modalBox.classList.contains('first')) {
        nextPrevButton.removeChild(prev)
    } else if (modalBox.classList.contains('last')) {
        nextPrevButton.removeChild(next)
    }
}













