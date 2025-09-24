// events.js

// Render the main events list
const renderEvents = async () => {
  try {
    const response = await fetch('/events');
    const data = await response.json();

    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;

    if (data && data.length > 0) {
      data.forEach(event => {
        const card = document.createElement('div');
        card.classList.add('card');

        const topContainer = document.createElement('div');
        topContainer.classList.add('top-container');
        topContainer.style.backgroundImage = `url(${event.image})`;

        const bottomContainer = document.createElement('div');
        bottomContainer.classList.add('bottom-container');

        const name = document.createElement('h3');
        name.textContent = event.eventName;
        bottomContainer.appendChild(name);

        const pricePoint = document.createElement('p');
        pricePoint.textContent = 'Ticket Price: $' + event.ticketPrice;
        bottomContainer.appendChild(pricePoint);

        const genre = document.createElement('p');
        genre.textContent = 'Genre: ' + event.genre;
        bottomContainer.appendChild(genre);

        const link = document.createElement('a');
        link.textContent = 'Read More';
        link.setAttribute('role', 'button');
        link.href = `/events/${event.id}`;
        bottomContainer.appendChild(link);

        card.appendChild(topContainer);
        card.appendChild(bottomContainer);
        mainContent.appendChild(card);
      });
    } else {
      const message = document.createElement('h2');
      message.textContent = 'No Events Available :(';
      mainContent.appendChild(message);
    }
  } catch (err) {
    console.error('Error fetching events:', err);
  }
};

// Render a single event detail page
const renderEvent = async () => {
  const requestedID = parseInt(window.location.pathname.split('/').pop());
  const response = await fetch('/events');
  const data = await response.json();

  const eventContent = document.getElementById('event-content');
  if (!eventContent) return;

  const event = data.find(e => e.id === requestedID);

  if (event) {
    document.getElementById('image').src = event.image;
    document.getElementById('eventName').textContent = event.eventName;
    document.getElementById('artists').textContent = 'Artists: ' + event.artists.join(', ');
    document.getElementById('dateTime').textContent = 'Date & Time: ' + event.dateTime;
    document.getElementById('venue').textContent = 'Venue: ' + event.venue;
    document.getElementById('ticketPrice').textContent = 'Ticket Price: $' + event.ticketPrice;
    document.getElementById('genre').textContent = 'Genre: ' + event.genre;
  } else {
    // Redirect to 404 page if event not found
    window.location.href = '/404.html';
  }
};


// Determine which page we're on and render appropriately
if (document.getElementById('main-content')) {
  renderEvents();
}

if (document.getElementById('event-content')) {
  renderEvent();
}
