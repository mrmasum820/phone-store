const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = ``;

    // show 11 phones
    const showBtn = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        showBtn.classList.remove('d-none');
        phones = phones.slice(0, 11);
    } else {
        showBtn.classList.add('d-none');
    }

    // display if phones not found
    const noFound = document.getElementById('no-phons-found');
    if (phones.length === 0) {
        noFound.classList.remove('d-none');
    } else {
        noFound.classList.add('d-none');
    }


    // display phones
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-4">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone.phone_name
            }</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to
                additional content. This content is a little bit longer.</p>
            <a onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Show Details</a>
        </div>
        `
        phonesContainer.appendChild(phoneDiv);
    })
    // hide spinner
    toggleSpinner(false);
}


// common search input function
const searchPhones = (dataLimit) => {
    toggleSpinner(true);
    const inputField = document.getElementById('input-field');
    const fieldText = inputField.value;
    loadPhones(fieldText, dataLimit);
}

// handle search input
document.getElementById('search-btn').addEventListener('click', function () {
    //show spinner
    searchPhones(10);

})

// input field enter key event
document.getElementById('input-field').addEventListener('keypress', function (event) {
    // console.log(event.key);
    if (event.key === 'Enter') {
        searchPhones(10);
    }
})

//spinner function if true the loader will show
const toggleSpinner = isLoading => {
    const loader = document.getElementById('spinner');
    if (isLoading) {
        loader.classList.remove('d-none');
    } else {
        loader.classList.add('d-none');
    }
}

document.getElementById('show-all-btn').addEventListener('click', function () {
    searchPhones();
})


//phone details
const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone => {
    console.log(phone);
    const modalTitle = document.getElementById('exampleModalLabel');
    modalTitle.innerText = phone.name;

    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <img class="mb-3" src=${phone.image}>
        <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No release date found'}</p>
        <p>Display Size: ${phone.mainFeatures ? phone.mainFeatures.displaySize : 'No display size found'}</p>
    `
}

loadPhones('a');