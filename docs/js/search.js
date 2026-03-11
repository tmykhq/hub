---
---
// search.js
const searchInput = document.getElementById('searchInput');
const cards = document.querySelectorAll('.card');
const globalSearchResults = document.getElementById('globalSearchResults');
const introSection = document.getElementById('introSection');

// Global search data containing all cards from across the site
const globalData = [
  {% for item in site.data.learning %}
  { title: {{ item.title | jsonify }}, text: {{ item.desc | jsonify }}, link: "learning.html", linkText: {{ item.link_text | jsonify }} },
  {% endfor %}
  {% for item in site.data.console %}
  { title: {{ item.title | jsonify }}, text: {{ item.desc | jsonify }}, link: "console.html", linkText: {{ item.link_text | jsonify }} },
  {% endfor %}
  {% for item in site.data.installing %}
  { title: {{ item.title | jsonify }}, text: {{ item.desc | jsonify }}, link: "installing.html", linkText: {{ item.link_text | jsonify }} },
  {% endfor %}
  {% for item in site.data.monitoring %}
  { title: {{ item.title | jsonify }}, text: {{ item.desc | jsonify }}, link: "monitoring.html", linkText: {{ item.link_text | jsonify }} },
  {% endfor %}
  {% for item in site.data.security %}
  { title: {{ item.title | jsonify }}, text: {{ item.desc | jsonify }}, link: "security.html", linkText: {{ item.link_text | jsonify }} },
  {% endfor %}
  {% for item in site.data.support %}
  { title: {{ item.title | jsonify }}, text: {{ item.desc | jsonify }}, link: "support.html", linkText: {{ item.link_text | jsonify }} },
  {% endfor %}
  {% for item in site.data.events %}
  { title: {{ item.title | jsonify }}, text: {{ item.desc | jsonify }}, link: "events.html", linkText: {{ item.link_text | jsonify }} },
  {% endfor %}
];

const difficultyFilter = document.getElementById('difficultyFilter');
const topicFilter = document.getElementById('topicFilter');
const typeFilter = document.getElementById('typeFilter');

function performSearchAndFilter() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const diff = difficultyFilter ? difficultyFilter.value.toLowerCase() : '';
    const topic = topicFilter ? topicFilter.value.toLowerCase() : '';
    const type = typeFilter ? typeFilter.value.toLowerCase() : '';

    // Check if we are on a specific page with local cards
    if (cards.length > 0) {
        cards.forEach(card => {
            const cardText = card.textContent.toLowerCase();
            const cardDiff = card.querySelector('.tag-difficulty') ? card.querySelector('.tag-difficulty').textContent.toLowerCase() : '';
            const cardTopic = card.querySelector('.tag-topic') ? card.querySelector('.tag-topic').textContent.toLowerCase() : '';
            const cardType = card.querySelector('.tag-type') ? card.querySelector('.tag-type').textContent.toLowerCase() : '';

            const matchesSearch = cardText.includes(searchTerm);
            const matchesDiff = diff === '' || cardDiff === diff;
            const matchesTopic = topic === '' || cardTopic === topic;
            const matchesType = type === '' || cardType.includes(type);

            card.style.display = (matchesSearch && matchesDiff && matchesTopic && matchesType) ? 'block' : 'none';
        });
    } 
    // Otherwise, we are likely on the index page performing a global search
    else if (globalSearchResults) {
        globalSearchResults.innerHTML = ''; // Clear previous results
        
        if (searchTerm.trim() === '') {
            globalSearchResults.style.display = 'none';
            if (introSection) introSection.style.display = 'block';
        } else {
            globalSearchResults.style.display = 'grid'; // Use grid to match styles
            if (introSection) introSection.style.display = 'none';

            let matchCount = 0;
            globalData.forEach(item => {
                const searchableText = `${item.title.toLowerCase()} ${item.text.toLowerCase()}`;
                if (searchableText.includes(searchTerm)) {
                    matchCount++;
                    const cardDiv = document.createElement('div');
                    cardDiv.className = 'card';
                    cardDiv.innerHTML = `
                        <h3>${item.title}</h3>
                        <p>${item.text}</p>
                        <a href="${item.link}">${item.linkText}</a>
                    `;
                    globalSearchResults.appendChild(cardDiv);
                }
            });

            if (matchCount === 0) {
                globalSearchResults.innerHTML = '<p style="grid-column: 1 / -1;">No results found.</p>';
            }
        }
    }
}

if (searchInput) searchInput.addEventListener('input', performSearchAndFilter);
if (difficultyFilter) {
    difficultyFilter.addEventListener('change', performSearchAndFilter);
    difficultyFilter.addEventListener('input', performSearchAndFilter);
}
if (topicFilter) {
    topicFilter.addEventListener('change', performSearchAndFilter);
    topicFilter.addEventListener('input', performSearchAndFilter);
}
if (typeFilter) {
    typeFilter.addEventListener('change', performSearchAndFilter);
    typeFilter.addEventListener('input', performSearchAndFilter);
}
