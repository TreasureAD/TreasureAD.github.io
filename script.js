// Selecting the menu icon from the document using its ID.
let menuIcon = document.querySelector('#menu-icon');

// Selecting the navbar element from the document using its class.
let navbar = document.querySelector('.navbar');

// Selecting all section elements for handling scroll behaviors.
let sections = document.querySelectorAll('section');

// Selecting all navigation links within the header for active class manipulation.
let navLinks = document.querySelectorAll('header nav a');

// Adding an event listener for the window's scroll event.
window.onscroll = () => {
    // Iterating through each section to determine if it's in the viewport.
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150; // Offset top of the section minus 150 pixels.
        let height = sec.offsetHeight; // Height of the section.
        let id = sec.getAttribute('id'); // ID attribute of the section.
        
        // Checking if the current scroll position is within the current section.
        if(top >= offset && top < offset + height){
            // Removing 'active' class from all nav links when a section is active.
            navLinks.forEach(links => {
                links.classList.remove('active');
                // Adding 'active' class to the nav link that corresponds to the current section.
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });
};

// Selecting the theme toggle button and adding a click event listener.
const toggleButton = document.getElementById('theme-toggle');
toggleButton.addEventListener('click', function () {
    // Toggling 'dark-mode' and 'light-mode' classes on the body to switch themes.
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');

    // Update button text based on the current mode for clarity to the user.
    if (document.body.classList.contains('light-mode')) {
        this.textContent = 'Switch to Dark Mode';
    } else {
        this.textContent = 'Switch to Light Mode';
    }
});

// Setting the initial button text based on whether light mode is enabled or not when the page loads.
window.onload = () => {
    if (document.body.classList.contains('light-mode')) {
        toggleButton.textContent = 'Switch to Dark Mode';
    } else {
        toggleButton.textContent = 'Switch to Light Mode';
    }
};

// Adding a click event listener to the menu icon for mobile responsive navigation.
menuIcon.onclick = () => {
    // Toggling a class to transform the menu icon and toggle the visibility of the navbar.
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Setting the current year in the footer dynamically.
document.getElementById('year').textContent = new Date().getFullYear();

// Define an asynchronous function to fetch a random dog image
async function fetchDogImage() {
    try {
        // Send a GET request to the Dog API for a random dog image
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        
        // Parse the JSON response to get a JavaScript object
        const data = await response.json();
        
        // Check if the API call was successful
        if (data.status === 'success') {
            // If successful, find the image element and set its 'src' attribute to the image URL received from the API
            document.getElementById('dog-image').src = data.message;
        } else {
            // If the API call is not successful, throw an error
            throw new Error('Failed to load dog image');
        }
    } catch (error) {
        // If there is any error during the fetch or processing, log the error to the console
        console.error('Error fetching dog image:', error);
        
        // Set the image source to an empty string to remove any previous image
        document.getElementById('dog-image').src = '';
        
        // Update the alt attribute of the image to indicate that an error occurred
        document.getElementById('dog-image').alt = 'Error loading image';
    }
}

// Attach an event listener to the button with ID 'load-dog'
document.getElementById('load-dog').addEventListener('click', fetchDogImage);

// Optionally, load a random dog image when the webpage loads
window.onload = fetchDogImage;
