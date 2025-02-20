async function loadConfig() {
    try {
        const response = await fetch('_config.yml');
        const yamlText = await response.text();
        const config = jsyaml.load(yamlText);
        populateLinks(config);
    } catch (error) {
        console.error('Error loading configuration:', error);
    }
}

function populateLinks(config) {
    // Populate Backend APIs
    const backendList = document.querySelector('#backend-apis');
    config.api_documentation.backend.forEach(api => {
        backendList.innerHTML += `
            <a href="${api.url}" class="list-group-item list-group-item-action">
                <i class="bi bi-gear"></i> ${api.name}
            </a>
        `;
    });

    // Populate Frontend Services
    const frontendList = document.querySelector('#frontend-services');
    config.api_documentation.frontend.forEach(service => {
        frontendList.innerHTML += `
            <a href="${service.url}" class="list-group-item list-group-item-action">
                <i class="bi bi-window"></i> ${service.name}
            </a>
        `;
    });

    // Populate Internal Resources - Repositories
    const reposList = document.querySelector('#repositories');
    config.internal_resources.repositories.forEach(repo => {
        reposList.innerHTML += `
            <a href="${repo.url}" class="list-group-item list-group-item-action">
                <i class="bi bi-github"></i> ${repo.name}
            </a>
        `;
    });

    // Populate Internal Resources - Documentation
    const docsList = document.querySelector('#documentation');
    config.internal_resources.documentation.forEach(doc => {
        docsList.innerHTML += `
            <a href="${doc.url}" class="list-group-item list-group-item-action">
                <i class="bi bi-book"></i> ${doc.name}
            </a>
        `;
    });

    // Populate Third Party Integrations
    const thirdPartyContainer = document.querySelector('#third-party-integrations');
    config.api_documentation.third_party.forEach(integration => {
        thirdPartyContainer.innerHTML += `
            <div class="col-md-4 mb-3">
                <a href="${integration.url}" class="card h-100 text-decoration-none">
                    <div class="card-body">
                        <h5 class="card-title"><i class="bi bi-plug"></i> ${integration.name}</h5>
                        <p class="card-text text-muted">Integration documentation</p>
                    </div>
                </a>
            </div>
        `;
    });
}

// Load configuration when the page loads
document.addEventListener('DOMContentLoaded', loadConfig); 