const url = 'https://api.npoint.io/f8d1be198a18712d3f29/films/';
const listHolder = document.getElementById('films');

document.addEventListener('DOMContentLoaded', () => {
    // Remove any existing movie items
    listHolder.innerHTML = '';
    fetchMovies(url);
});

// Create fetch function
function fetchMovies(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(movies => {
            movies.forEach(movie => {
                displayMovie(movie);
            });
        })
        .catch(error => {
            console.error('Error fetching movies:', error);
        });
}

function displayMovie(movie) {
    const li = document.createElement('li');
    li.classList.add('film', 'item'); // Add classes for styling
    li.style.cursor = "pointer";
    li.textContent = movie.title.toUpperCase();
    
    // Attach click event listener for movie selection
    li.addEventListener('click', () => selectMovie(movie));
    
    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button'); // Add class for styling
    deleteButton.addEventListener('click', (event) => {
        event.stopPropagation();
        deleteMovie(li, movie);
    });
    
    // Append delete button to movie item
    li.appendChild(deleteButton);
    
    // Append movie item to list holder
    listHolder.appendChild(li);
}

function selectMovie(movie) {
    // Display movie details based on the selected movie
    setUpMovieDetails(movie);
}

function deleteMovie(movieItem, movie) {
    // Implement logic to delete movie from API or data source
    // Then remove the movie item from the list
    movieItem.remove();
}

function setUpMovieDetails(movie) {
    const poster = document.getElementById('poster');
    const title = document.getElementById('title');
    const runtime = document.getElementById('runtime');
    const description = document.getElementById('film-info');
    const showtime = document.getElementById('showtime');
    const ticketNum = document.getElementById('ticket-num');
    const buyButton = document.getElementById('buy-ticket');
    
    // Update movie details based on the selected movie
    poster.src = movie.poster;
    title.textContent = movie.title;
    runtime.textContent = `${movie.runtime} minutes`;
    description.textContent = movie.description;
    showtime.textContent = movie.showtime;
    ticketNum.textContent = movie.capacity - movie.tickets_sold;
    updateBuyButton(movie);
}

const btn = document.getElementById('buy-ticket');
btn.addEventListener('click', function(e) {
    e.preventDefault();
    let remTickets = parseInt(document.querySelector('#ticket-num').textContent, 10);
    if (remTickets > 0) {
        document.querySelector('#ticket-num').textContent = remTickets - 1;
    } else {
        btn.textContent = 'Sold Out';
    }
});
