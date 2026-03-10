import random

resources = [
    {"topic": "Ansible", "title": "What is Ansible?", "type": "Article", "link": "https://www.redhat.com/en/topics/automation/what-is-ansible", "desc": "Learn the basics of Ansible and how it automates provisioning, configuration management, and application deployment."},
    {"topic": "Ansible", "title": "Getting Started with Ansible", "type": "Documentation", "link": "https://docs.ansible.com/ansible/latest/getting_started/index.html", "desc": "Official Ansible documentation covering installation, basic concepts, and running your first commands."},
    {"topic": "Ansible", "title": "Ansible in 100 Seconds", "type": "Video (< 10m)", "link": "https://www.youtube.com/watch?v=gTGVj0O-P-o", "desc": "A rapid-fire video explaining the core concepts of Ansible and how playbooks work."},
    {"topic": "Ansible", "title": "Ansible Best Practices", "type": "Blog", "link": "https://www.ansible.com/blog/ansible-best-practices-essentials", "desc": "Tips and tricks for writing clean, maintainable, and scalable Ansible playbooks and roles."},
    {"topic": "Ansible", "title": "Ansible Galaxy", "type": "Tool", "link": "https://galaxy.ansible.com/", "desc": "Jump-start your automation project with great content from the Ansible community."},
    {"topic": "Ansible", "title": "Intro to Playbooks", "type": "Documentation", "link": "https://docs.ansible.com/ansible/latest/user_guide/playbooks_intro.html", "desc": "Deep dive into Ansible Playbooks, the language of Ansible's configuration, deployment, and orchestration."},
    {"topic": "Ansible", "title": "Ansible Vault", "type": "Documentation", "link": "https://docs.ansible.com/ansible/latest/user_guide/vault.html", "desc": "Keep sensitive data such as passwords or keys in encrypted files, rather than as plaintext in playbooks."},
    {"topic": "OpenShift", "title": "What is OpenShift?", "type": "Article", "link": "https://www.redhat.com/en/technologies/cloud-computing/openshift/what-is-openshift", "desc": "Overview of Red Hat OpenShift, an enterprise-ready Kubernetes container platform."},
    {"topic": "OpenShift", "title": "OpenShift Explained in 3 Minutes", "type": "Video (< 10m)", "link": "https://www.youtube.com/watch?v=JtZEX1qH8zI", "desc": "A quick visual explanation of Red Hat OpenShift and how it extends Kubernetes."},
    {"topic": "OpenShift", "title": "Interactive Learning Portal", "type": "Tool", "link": "https://developers.redhat.com/learn/openshift", "desc": "Interactive, browser-based scenarios to learn OpenShift without installing anything."},
    {"topic": "OpenShift", "title": "What is an Operator?", "type": "Blog", "link": "https://cloud.redhat.com/blog/what-is-an-openshift-operator", "desc": "Understand how Operators automate the creation, configuration, and management of instances of Kubernetes-native applications."},
    {"topic": "OpenShift", "title": "Developer Sandbox", "type": "Tool", "link": "https://developers.redhat.com/developer-sandbox", "desc": "Launch your own private OpenShift environment in the cloud for free to test and build applications."},
    {"topic": "OpenShift", "title": "OpenShift Serverless", "type": "Article", "link": "https://www.redhat.com/en/technologies/cloud-computing/openshift/serverless", "desc": "Learn how OpenShift Serverless enables developers to build and deploy applications that scale up or scale to zero on demand."},
    {"topic": "OpenShift", "title": "GitOps with OpenShift", "type": "Blog", "link": "https://www.redhat.com/en/blog/what-is-gitops", "desc": "Discover how GitOps uses Git repositories as a single source of truth to deliver infrastructure as code."},
    {"topic": "RHEL", "title": "What is RHEL?", "type": "Article", "link": "https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux", "desc": "Discover the world's leading enterprise Linux platform and its benefits for your data center."},
    {"topic": "RHEL", "title": "RHEL 9 Documentation", "type": "Documentation", "link": "https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/9", "desc": "The complete, official documentation suite for Red Hat Enterprise Linux 9."},
    {"topic": "RHEL", "title": "Introduction to Podman", "type": "Video (< 10m)", "link": "https://www.youtube.com/watch?v=g2h4E3S4e0w", "desc": "Learn about Podman, a daemonless container engine for developing, managing, and running OCI containers on your Linux system."},
    {"topic": "RHEL", "title": "Podman Basics", "type": "Blog", "link": "https://www.redhat.com/sysadmin/getting-started-podman", "desc": "A quick-start guide to using Podman for container management on RHEL."},
    {"topic": "RHEL", "title": "Managing Services with systemd", "type": "Blog", "link": "https://www.redhat.com/sysadmin/systemd-intro", "desc": "An introduction to systemd, the system and service manager for Linux operating systems."},
    {"topic": "RHEL", "title": "What is SELinux?", "type": "Article", "link": "https://www.redhat.com/en/topics/linux/what-is-selinux", "desc": "Security-Enhanced Linux (SELinux) is a security architecture for Linux systems that allows administrators to have more control over who can access the system."},
    {"topic": "RHEL", "title": "Red Hat Insights", "type": "Tool", "link": "https://www.redhat.com/en/technologies/management/insights", "desc": "Proactively identify and remediate security, compliance, and performance risks across your Red Hat infrastructure."},
    {"topic": "RHEL", "title": "How to manage packages with DNF", "type": "Blog", "link": "https://www.redhat.com/sysadmin/how-manage-packages", "desc": "Learn how to search, install, update, and remove packages using the DNF package manager in RHEL."},
    {"topic": "Hybrid Cloud", "title": "What is Hybrid Cloud?", "type": "Article", "link": "https://www.redhat.com/en/topics/cloud-computing/what-is-hybrid-cloud", "desc": "Understand the architecture and benefits of deploying a hybrid cloud model in your enterprise."},
    {"topic": "RHEL", "title": "KVM Virtualization", "type": "Article", "link": "https://www.redhat.com/en/topics/virtualization/what-is-KVM", "desc": "Learn about Kernel-based Virtual Machine (KVM), an open source virtualization technology built into Linux."}
]

cards_html = []
difficulties = ["Beginner", "Intermediate", "Advanced"]

count = 1
while count <= 200:
    for res in resources:
        if count > 200:
            break
        
        diff = random.choice(difficulties)
        # Add a slight variation to the title for uniqueness at scale on repeated items
        title_suffix = f" (Instance {count})" if count > len(resources) else ""
        link_text = "Watch Video" if "Video" in res["type"] else "View Resource"
        
        card = f'''            <div class="card">
                <h3>{res["title"]}{title_suffix}</h3>
                <div class="tags-container">
                    <span class="tag tag-difficulty">{diff}</span>
                    <span class="tag tag-topic">{res["topic"]}</span>
                    <span class="tag tag-type">{res["type"]}</span>
                </div>
                <p>{res["desc"]}</p>
                <a href="{res["link"]}" target="_blank" rel="noopener noreferrer">{link_text} &rarr;</a>
            </div>'''
        cards_html.append(card)
        count += 1
        
random.shuffle(cards_html) 

html_content = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Scale Test - Red Hat Hub</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <header>
        <h1>Scale Test (200 Resources)</h1>
        <p>An unlisted page populated with 200 real Red Hat examples to test the UI and search performance at scale.</p>
    </header>

    <div id="nav-placeholder"></div>

    <main>
        <div class="search-container">
            <input type="text" id="searchInput" placeholder="Search the 200 resources...">
        </div>

        <div class="grid-container">
""" + "\n".join(cards_html) + """
        </div>
    </main>

    <script src="nav.js"></script>
    <script src="search.js"></script>
</body>
</html>
"""

with open('docs/scale-test.html', 'w') as f:
    f.write(html_content)
