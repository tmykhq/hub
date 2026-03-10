// Wait for the page to load
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const cards = document.querySelectorAll('.card');

    // Only run if the search box exists on this page
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();

            cards.forEach(card => {
                // Grab all the text inside the card (title + description)
                const cardText = card.textContent.toLowerCase();
                
                // If the text includes the search term, show it. Otherwise, hide it.
                if (cardText.includes(searchTerm)) {
                    card.style.display = 'block'; 
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
});