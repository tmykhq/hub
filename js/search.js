// search.js
document.addEventListener('DOMContentLoaded', () => {
    const filterContainer = document.getElementById('filterContainer');
    const cards = document.querySelectorAll('.card');
    const globalSearchResults = document.getElementById('globalSearchResults');
    const introSection = document.getElementById('introSection');

    // Global data with tags added to each entry
    const globalData = [
        { title: "Red Hat Web Console (Cockpit)", text: "A web-based graphical interface for servers. Manage storage, networks, and containers directly from your browser.", link: "console.html", linkText: "Launch Guide &rarr;", tags: ["Intermediate", "RHEL", "Tool"], tagHTML: '<span class="tag tag-difficulty">Intermediate</span>\n<span class="tag tag-topic">RHEL</span>\n<span class="tag tag-type">Tool</span>' },
        { title: "Red Hat Insights", text: "Proactive analytics and continuous security monitoring for your hybrid cloud deployments.", link: "console.html", linkText: "Explore Insights &rarr;", tags: ["Beginner", "Hybrid Cloud", "Tool"], tagHTML: '<span class="tag tag-difficulty">Beginner</span>\n<span class="tag tag-topic">Hybrid Cloud</span>\n<span class="tag tag-type">Tool</span>' },
        { title: "OpenShift Web Console", text: "Navigate the administrator and developer perspectives to manage pods, deployments, and cluster health.", link: "console.html", linkText: "OpenShift Docs &rarr;", tags: ["Beginner", "OpenShift", "Documentation"], tagHTML: '<span class="tag tag-difficulty">Beginner</span>\n<span class="tag tag-topic">OpenShift</span>\n<span class="tag tag-type">Documentation</span>' },
        { title: "Kickstart Installations", text: "Automate your RHEL installations by creating and modifying Kickstart configuration files.", link: "installing.html", linkText: "Kickstart Guide &rarr;", tags: ["Intermediate", "RHEL", "Documentation"], tagHTML: '<span class="tag tag-difficulty">Intermediate</span>\n<span class="tag tag-topic">RHEL</span>\n<span class="tag tag-type">Documentation</span>' },
        { title: "RHEL Image Builder", text: "Create custom operating system images optimized for cloud providers, virtual machines, or bare metal.", link: "installing.html", linkText: "Build an Image &rarr;", tags: ["Beginner", "RHEL", "Tool"], tagHTML: '<span class="tag tag-difficulty">Beginner</span>\n<span class="tag tag-topic">RHEL</span>\n<span class="tag tag-type">Tool</span>' },
        { title: "OpenShift Assisted Installer", text: "Deploy a highly available OpenShift cluster quickly and easily using the web-based Assisted Installer.", link: "installing.html", linkText: "Start Deployment &rarr;", tags: ["Beginner", "OpenShift", "Web App"], tagHTML: '<span class="tag tag-difficulty">Beginner</span>\n<span class="tag tag-topic">OpenShift</span>\n<span class="tag tag-type">Web App</span>' },
        { title: "RHEL 9 Administration", text: "A complete guide to managing users, storage, and networking in Red Hat Enterprise Linux 9.", link: "learning.html", linkText: "Read Guide &rarr;", tags: ["Intermediate", "RHEL", "Documentation"], tagHTML: '<span class="tag tag-difficulty">Intermediate</span>\n<span class="tag tag-topic">RHEL</span>\n<span class="tag tag-type">Documentation</span>' },
        { title: "OpenShift Basics", text: "Learn the fundamentals of deploying and managing containerized applications with OpenShift.", link: "learning.html", linkText: "Start Tutorial &rarr;", tags: ["Beginner", "OpenShift", "Documentation"], tagHTML: '<span class="tag tag-difficulty">Beginner</span>\n<span class="tag tag-topic">OpenShift</span>\n<span class="tag tag-type">Documentation</span>' },
        { title: "Ansible Workshops", text: "90 minute+ self led Ansible Workshops", link: "learning.html", linkText: "View Workshops &rarr;", tags: ["Intermediate", "Ansible", "Web App"], tagHTML: '<span class="tag tag-difficulty">Intermediate</span>\n<span class="tag tag-topic">Ansible</span>\n<span class="tag tag-type">Web App</span>' },
        { title: "Interactive Self Paced Labs", text: "These step-by-step scenarios guide you through the fundamentals of using Red Hat® products and solutions, from artificial intelligence, to virtualization, and more.", link: "learning.html", linkText: "Explore Labs &rarr;", tags: ["Beginner", "RHEL", "Web App"], tagHTML: '<span class="tag tag-difficulty">Beginner</span>\n<span class="tag tag-topic">RHEL</span>\n<span class="tag tag-type">Web App</span>' },
        { title: "Performance Co-Pilot (PCP)", text: "Collect and analyze live system metrics, including CPU, memory, and disk I/O, using PCP and Grafana.", link: "monitoring.html", linkText: "Configure PCP &rarr;", tags: ["Advanced", "RHEL", "Tool"], tagHTML: '<span class="tag tag-difficulty">Advanced</span>\n<span class="tag tag-topic">RHEL</span>\n<span class="tag tag-type">Tool</span>' },
        { title: "Prometheus on OpenShift", text: "Learn how cluster monitoring works in OpenShift Container Platform using Prometheus and Alertmanager.", link: "monitoring.html", linkText: "View Architecture &rarr;", tags: ["Intermediate", "OpenShift", "Documentation"], tagHTML: '<span class="tag tag-difficulty">Intermediate</span>\n<span class="tag tag-topic">OpenShift</span>\n<span class="tag tag-type">Documentation</span>' },
        { title: "RHEL System Roles: Metrics", text: "Use Ansible system roles to easily deploy and configure monitoring solutions across multiple RHEL servers.", link: "monitoring.html", linkText: "Get Playbook &rarr;", tags: ["Intermediate", "Ansible", "Documentation"], tagHTML: '<span class="tag tag-difficulty">Intermediate</span>\n<span class="tag tag-topic">Ansible</span>\n<span class="tag tag-type">Documentation</span>' },
        { title: "SELinux Troubleshooting", text: "Master Security-Enhanced Linux. Learn how to read audit logs, manage booleans, and adjust file contexts.", link: "security.html", linkText: "Read Guide &rarr;", tags: ["Advanced", "RHEL", "Documentation"], tagHTML: '<span class="tag tag-difficulty">Advanced</span>\n<span class="tag tag-topic">RHEL</span>\n<span class="tag tag-type">Documentation</span>' },
        { title: "OpenSCAP Compliance", text: "Automate vulnerability management and evaluate your RHEL systems against security baselines.", link: "security.html", linkText: "View Documentation &rarr;", tags: ["Intermediate", "RHEL", "Documentation"], tagHTML: '<span class="tag tag-difficulty">Intermediate</span>\n<span class="tag tag-topic">RHEL</span>\n<span class="tag tag-type">Documentation</span>' },
        { title: "Identity Management (IdM)", text: "Centralize authentication, authorization, and DNS for your Linux domain using Red Hat IdM.", link: "security.html", linkText: "Setup Tutorial &rarr;", tags: ["Intermediate", "RHEL", "Documentation"], tagHTML: '<span class="tag tag-difficulty">Intermediate</span>\n<span class="tag tag-topic">RHEL</span>\n<span class="tag tag-type">Documentation</span>' },
        { title: "Red Hat Customer Portal", text: "Access the official Knowledgebase, manage your subscriptions, download software, and open support tickets.", link: "support.html", linkText: "Visit Portal &rarr;", tags: ["Beginner", "Support", "Web App"], tagHTML: '<span class="tag tag-difficulty">Beginner</span>\n<span class="tag tag-topic">Support</span>\n<span class="tag tag-type">Web App</span>' },
        { title: "Generating an sosreport", text: "Learn how to safely collect system configuration and diagnostic information from RHEL to provide to Red Hat Support.", link: "support.html", linkText: "View Command &rarr;", tags: ["Beginner", "RHEL", "Tool"], tagHTML: '<span class="tag tag-difficulty">Beginner</span>\n<span class="tag tag-topic">RHEL</span>\n<span class="tag tag-type">Tool</span>' },
        { title: "Red Hat Communities", text: "Engage with other professionals and Red Hat engineers to share solutions, ask questions, and discuss best practices.", link: "support.html", linkText: "Join Discussion &rarr;", tags: ["Beginner", "Community", "Web App"], tagHTML: '<span class="tag tag-difficulty">Beginner</span>\n<span class="tag tag-topic">Community</span>\n<span class="tag tag-type">Web App</span>' },
        { title: "Product Documentation", text: "Browse the complete, official product documentation for all Red Hat products and versions.", link: "support.html", linkText: "Read Docs &rarr;", tags: ["Beginner", "Documentation", "Documentation"], tagHTML: '<span class="tag tag-difficulty">Beginner</span>\n<span class="tag tag-topic">Documentation</span>\n<span class="tag tag-type">Documentation</span>' }
    ];

    let activeFilters = new Set();
    let availableTags = new Map();

    if (!filterContainer) return;

    // Collect tags from current page context
    if (cards.length > 0) {
        cards.forEach(card => {
            const tags = card.querySelectorAll('.tag');
            tags.forEach(tag => {
                const tagText = tag.textContent.trim();
                if (!availableTags.has(tagText)) {
                    availableTags.set(tagText, tag.className);
                }
            });
        });
    } else if (globalSearchResults) {
        // We are on index.html
        globalData.forEach(item => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = item.tagHTML;
            const tags = tempDiv.querySelectorAll('.tag');
            tags.forEach(tag => {
                const tagText = tag.textContent.trim();
                if (!availableTags.has(tagText)) {
                    availableTags.set(tagText, tag.className);
                }
            });
        });
    }

    // Render filter pills
    availableTags.forEach((className, tagText) => {
        const filterTag = document.createElement('span');
        filterTag.className = `${className} filter-tag`;
        filterTag.textContent = tagText;
        
        filterTag.addEventListener('click', () => {
            if (activeFilters.has(tagText)) {
                activeFilters.delete(tagText);
                filterTag.classList.remove('active');
            } else {
                activeFilters.add(tagText);
                filterTag.classList.add('active');
            }
            applyFilters();
        });

        filterContainer.appendChild(filterTag);
    });

    function applyFilters() {
        if (cards.length > 0) {
            // Local page filter
            cards.forEach(card => {
                if (activeFilters.size === 0) {
                    card.style.display = 'block';
                    return;
                }
                
                const cardTags = Array.from(card.querySelectorAll('.tag')).map(t => t.textContent.trim());
                // Card must have ALL active filters to be shown (AND logic)
                const hasAllFilters = Array.from(activeFilters).every(filter => cardTags.includes(filter));
                
                card.style.display = hasAllFilters ? 'block' : 'none';
            });
        } else if (globalSearchResults) {
            // Global index filter
            globalSearchResults.innerHTML = '';
            
            if (activeFilters.size === 0) {
                globalSearchResults.style.display = 'none';
                if (introSection) introSection.style.display = 'block';
                return;
            }

            globalSearchResults.style.display = 'grid';
            if (introSection) introSection.style.display = 'none';

            let matchCount = 0;
            globalData.forEach(item => {
                const hasAllFilters = Array.from(activeFilters).every(filter => item.tags.includes(filter));
                
                if (hasAllFilters) {
                    matchCount++;
                    const cardDiv = document.createElement('div');
                    cardDiv.className = 'card';
                    cardDiv.innerHTML = `
                        <h3>${item.title}</h3>
                        <div class="tags-container">
                            ${item.tagHTML}
                        </div>
                        <p>${item.text}</p>
                        <a href="${item.link}">${item.linkText}</a>
                    `;
                    globalSearchResults.appendChild(cardDiv);
                }
            });

            if (matchCount === 0) {
                globalSearchResults.innerHTML = '<p style="grid-column: 1 / -1; text-align: center;">No results found for selected filters.</p>';
            }
        }
    }
});
