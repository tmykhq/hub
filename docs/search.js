// search.js
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const cards = document.querySelectorAll('.card');
    const globalSearchResults = document.getElementById('globalSearchResults');
    const introSection = document.getElementById('introSection');

    // Global search data containing all cards from across the site
    const globalData = [
        { title: "Red Hat Web Console (Cockpit)", text: "A web-based graphical interface for servers. Manage storage, networks, and containers directly from your browser.", link: "console.html", linkText: "Launch Guide &rarr;" },
        { title: "Red Hat Insights", text: "Proactive analytics and continuous security monitoring for your hybrid cloud deployments.", link: "console.html", linkText: "Explore Insights &rarr;" },
        { title: "OpenShift Web Console", text: "Navigate the administrator and developer perspectives to manage pods, deployments, and cluster health.", link: "console.html", linkText: "OpenShift Docs &rarr;" },
        { title: "Kickstart Installations", text: "Automate your RHEL installations by creating and modifying Kickstart configuration files.", link: "installing.html", linkText: "Kickstart Guide &rarr;" },
        { title: "RHEL Image Builder", text: "Create custom operating system images optimized for cloud providers, virtual machines, or bare metal.", link: "installing.html", linkText: "Build an Image &rarr;" },
        { title: "OpenShift Assisted Installer", text: "Deploy a highly available OpenShift cluster quickly and easily using the web-based Assisted Installer.", link: "installing.html", linkText: "Start Deployment &rarr;" },
        { title: "RHEL 9 Administration", text: "A complete guide to managing users, storage, and networking in Red Hat Enterprise Linux 9.", link: "learning.html", linkText: "Read Guide &rarr;" },
        { title: "OpenShift Basics", text: "Learn the fundamentals of deploying and managing containerized applications with OpenShift.", link: "learning.html", linkText: "Start Tutorial &rarr;" },
        { title: "Ansible Workshops", text: "90 minute+ self led Ansible Workshops", link: "learning.html", linkText: "View Workshops &rarr;" },
        { title: "Interactive Self Paced Labs", text: "These step-by-step scenarios guide you through the fundamentals of using Red Hat® products and solutions, from artificial intelligence, to virtualization, and more.", link: "learning.html", linkText: "Explore Labs &rarr;" },
        { title: "Performance Co-Pilot (PCP)", text: "Collect and analyze live system metrics, including CPU, memory, and disk I/O, using PCP and Grafana.", link: "monitoring.html", linkText: "Configure PCP &rarr;" },
        { title: "Prometheus on OpenShift", text: "Learn how cluster monitoring works in OpenShift Container Platform using Prometheus and Alertmanager.", link: "monitoring.html", linkText: "View Architecture &rarr;" },
        { title: "RHEL System Roles: Metrics", text: "Use Ansible system roles to easily deploy and configure monitoring solutions across multiple RHEL servers.", link: "monitoring.html", linkText: "Get Playbook &rarr;" },
        { title: "SELinux Troubleshooting", text: "Master Security-Enhanced Linux. Learn how to read audit logs, manage booleans, and adjust file contexts.", link: "security.html", linkText: "Read Guide &rarr;" },
        { title: "OpenSCAP Compliance", text: "Automate vulnerability management and evaluate your RHEL systems against security baselines.", link: "security.html", linkText: "View Documentation &rarr;" },
        { title: "Identity Management (IdM)", text: "Centralize authentication, authorization, and DNS for your Linux domain using Red Hat IdM.", link: "security.html", linkText: "Setup Tutorial &rarr;" },
        { title: "Red Hat Customer Portal", text: "Access the official Knowledgebase, manage your subscriptions, download software, and open support tickets.", link: "support.html", linkText: "Visit Portal &rarr;" },
        { title: "Generating an sosreport", text: "Learn how to safely collect system configuration and diagnostic information from RHEL to provide to Red Hat Support.", link: "support.html", linkText: "View Command &rarr;" },
        { title: "Red Hat Communities", text: "Engage with other professionals and Red Hat engineers to share solutions, ask questions, and discuss best practices.", link: "support.html", linkText: "Join Discussion &rarr;" },
        { title: "Product Documentation", text: "Browse the complete, official product documentation for all Red Hat products and versions.", link: "support.html", linkText: "Read Docs &rarr;" }
    ];

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();

            // Check if we are on a specific page with local cards
            if (cards.length > 0) {
                cards.forEach(card => {
                    const cardText = card.textContent.toLowerCase();
                    card.style.display = cardText.includes(searchTerm) ? 'block' : 'none';
                });
            } 
            // Otherwise, we are likely on the index page performing a global search
            else if (globalSearchResults) {
                globalSearchResults.innerHTML = ''; // Clear previous results
                
                if (searchTerm.trim() === '') {
                    globalSearchResults.style.display = 'none';
                    if (introSection) introSection.style.display = 'block';
                    return;
                }

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
        });
    }
});