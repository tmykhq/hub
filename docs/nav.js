// nav.js
// 1. Define your navigation HTML here
const navHTML = `
    <nav>
        <a href="index.html">Home</a>
        <a href="learning.html">Learning Resources</a>
        <a href="security.html">Security</a>
        <a href="console.html">Console</a>
        <a href="monitoring.html">Monitoring</a>
        <a href="installing.html">Installing</a>
        <a href="support.html">Support</a>
        <a href="events.html">Events</a>
    </nav>
`;

// 2. Find the placeholder and inject the HTML
const navPlaceholder = document.getElementById('nav-placeholder');
if (navPlaceholder) {
    navPlaceholder.innerHTML = navHTML;
}