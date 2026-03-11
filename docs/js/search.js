---
---
// search.js
const searchInput = document.getElementById('searchInput');
const cards = document.querySelectorAll('.card');
const globalSearchResults = document.getElementById('globalSearchResults');
const introSection = document.getElementById('introSection');

// Global search data containing all cards from across the site
const globalData = [
  {% for data_file in site.data %}
    {% assign namespace = data_file[0] %}
    {% if namespace == "scale_test" %}{% continue %}{% endif %}
    {% assign items = data_file[1] %}
    {% assign page_link = namespace | replace: "_", "-" | append: ".html" %}
    {% for item in items %}
  { title: {{ item.title | jsonify }}, text: {{ item.desc | jsonify }}, link: {{ page_link | jsonify }}, linkText: {{ item.link_text | jsonify }} },
    {% endfor %}
  {% endfor %}
];

const difficultyFilter = document.getElementById('difficultyFilter');
const topicFilter = document.getElementById('topicFilter');
const typeFilter = document.getElementById('typeFilter');

// Debounce helper: delays fn execution until after `delay` ms of inactivity
function debounce(fn, delay) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

function performSearchAndFilter() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const diff = difficultyFilter ? difficultyFilter.value.toLowerCase() : '';
    const topic = topicFilter ? topicFilter.value.toLowerCase() : '';
    const type = typeFilter ? typeFilter.value.toLowerCase() : '';

    // Check if we are on a specific page with local cards
    if (cards.length > 0) {
        cards.forEach(card => {
            const cardText = card.textContent.toLowerCase();
            const diffEl = card.querySelector('.tag-difficulty');
            const topicEl = card.querySelector('.tag-topic');
            const typeEl = card.querySelector('.tag-type');
            const cardDiff = diffEl ? diffEl.textContent.toLowerCase() : '';
            const cardTopic = topicEl ? topicEl.textContent.toLowerCase() : '';
            const cardType = typeEl ? typeEl.textContent.toLowerCase() : '';

            const matchesSearch = cardText.includes(searchTerm);
            const matchesDiff = diff === '' || cardDiff === diff;
            const matchesTopic = topic === '' || cardTopic === topic;
            const matchesType = type === '' || cardType.includes(type);

            if (matchesSearch && matchesDiff && matchesTopic && matchesType) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    }
    // Otherwise, we are likely on the index page performing a global search
    else if (globalSearchResults) {
        // Clear previous results safely
        while (globalSearchResults.firstChild) {
            globalSearchResults.removeChild(globalSearchResults.firstChild);
        }

        if (searchTerm.trim() === '') {
            globalSearchResults.classList.add('hidden');
            if (introSection) introSection.classList.remove('hidden');
        } else {
            globalSearchResults.classList.remove('hidden');
            if (introSection) introSection.classList.add('hidden');

            let matchCount = 0;
            globalData.forEach(item => {
                const searchableText = `${(item.title || '').toLowerCase()} ${(item.text || '').toLowerCase()}`;
                if (searchableText.includes(searchTerm)) {
                    matchCount++;
                    const cardDiv = document.createElement('div');
                    cardDiv.className = 'card';

                    const h3 = document.createElement('h3');
                    h3.textContent = item.title;

                    const p = document.createElement('p');
                    p.textContent = item.text;

                    const a = document.createElement('a');
                    a.href = item.link;
                    a.textContent = item.linkText;
                    a.rel = 'noopener noreferrer';

                    cardDiv.appendChild(h3);
                    cardDiv.appendChild(p);
                    cardDiv.appendChild(a);
                    globalSearchResults.appendChild(cardDiv);
                }
            });

            if (matchCount === 0) {
                const noResults = document.createElement('p');
                noResults.style.gridColumn = '1 / -1';
                noResults.textContent = 'No results found.';
                globalSearchResults.appendChild(noResults);
            }
        }
    }
}

const debouncedSearch = debounce(performSearchAndFilter, 300);

if (searchInput) searchInput.addEventListener('input', debouncedSearch);
if (difficultyFilter) difficultyFilter.addEventListener('change', performSearchAndFilter);
if (topicFilter) topicFilter.addEventListener('change', performSearchAndFilter);
if (typeFilter) typeFilter.addEventListener('change', performSearchAndFilter);
