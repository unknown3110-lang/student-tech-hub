// Base URL for the backend API
const API_BASE_URL = 'http://localhost:8000';

// Elements
const loadEventsBtn = document.getElementById('load-events-btn');
const eventsList = document.getElementById('events-list');
const registrationForm = document.getElementById('registration-form');
const registrationMessage = document.getElementById('registration-message');

// Load Events Function
async function loadEvents() {
    try {
        // Clear current list
        eventsList.innerHTML = '<li>Loading events...</li>';
        
        // Fetch data from backend
        const response = await fetch(`${API_BASE_URL}/api/events`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const events = await response.json();
        
        // Clear loading message
        eventsList.innerHTML = '';
        
        if (events.length === 0) {
            eventsList.innerHTML = '<li>No events found.</li>';
            return;
        }

        // Display events
        events.forEach(event => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="event-title">${event.title}</div>
                <div>📅 ${event.date} | 📍 ${event.location}</div>
            `;
            eventsList.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching events:', error);
        eventsList.innerHTML = `<li style="color: red;">Failed to load events. Make sure the backend is running!</li>`;
    }
}

// Register Student Function
async function registerStudent(event) {
    // Prevent the default form submission (page reload)
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, email: email })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        // Show success message
        registrationMessage.style.color = '#27ae60'; // Green
        registrationMessage.textContent = result.message;
        
        // Clear the form
        registrationForm.reset();
    } catch (error) {
        console.error('Error registering:', error);
        registrationMessage.style.color = 'red';
        registrationMessage.textContent = 'Failed to register. Make sure the backend is running!';
    }
}

// Event Listeners
loadEventsBtn.addEventListener('click', loadEvents);
registrationForm.addEventListener('submit', registerStudent);
