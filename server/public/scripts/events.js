const renderEvents = async () => {
  const response = await fetch('/events')
  const data = await response.json()

  const mainContent = document.getElementById('main-content')

  if (data) {
    data.map(event => {
      const card = document.createElement('div')
      card.classList.add('card')

      const topContainer = document.createElement('div') // fixed typo
      topContainer.classList.add('top-container')

      const bottomContainer = document.createElement('div')
      bottomContainer.classList.add('bottom-container')

      topContainer.style.backgroundImage = `url(${event.image})` // fixed missing )

      const name = document.createElement('h3')
      name.textContent = event.eventName
      bottomContainer.appendChild(name)

      const pricePoint = document.createElement('p')
      pricePoint.textContent = 'Ticket Price: ' + event.ticketPrice
      bottomContainer.appendChild(pricePoint)

      const genre = document.createElement('p')
      genre.textContent = 'Genre: ' + event.genre
      bottomContainer.appendChild(genre)

      const link = document.createElement('a')
      link.textContent = 'Read More'
      link.setAttribute('role', 'button')
      link.href = `/events/${event.id}`
      bottomContainer.appendChild(link)

      card.appendChild(topContainer)
      card.appendChild(bottomContainer)

      mainContent.appendChild(card)
    })
  } else {
    const message = document.createElement('h2')
    message.textContent = 'No Events Available :('
    mainContent.appendChild(message)
  }
}

const renderEvent = async () => {
    const requestedID = parseInt(window.location.href.split('/').pop());
    const response = await fetch('/events');
    const data = await response.json();
    const eventContent = document.getElementById('event-content');

    if (!eventContent) return;

    const event = data.find(event => event.id === requestedID);

    if(event){
        document.getElementById('image').src = event.image;
        document.getElementById('eventName').textContent = event.eventName;
        document.getElementById('artists').textContent = 'Artists: ' + event.artists.join(', ');
        document.getElementById('dateTime').textContent = 'Date & Time: ' + event.dateTime;
        document.getElementById('venue').textContent = 'Venue: ' + event.venue;
        document.getElementById('ticketPrice').textContent = 'Ticket Price: $' + event.ticketPrice;
        document.getElementById('genre').textContent = 'Genre: ' + event.genre;

        document.title = `UnEarthed - ${event.eventName}`;
    } else {
        const message = document.createElement('h2');
        message.textContent = 'No Events Available :(';
        eventContent.appendChild(message);  
    }
}

if (document.getElementById('main-content')) {
  renderEvents()
}

// Only run on detail page
if (document.getElementById('event-content')) {
  renderEvent()
}

