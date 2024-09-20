chrome.storage.sync.get({
    githubUser: '',
    githubRepo: '',
    workflowName: '',
    githubToken: ''
}, function(items) {
    let owner = items.githubUser;
    let repo = items.githubRepo;
    let workflow_id = items.workflowName;
    let token = items.githubToken;

    let currentUrl = window.location.href;

    console.log('Current URL:', currentUrl);

    fetch(`https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflow_id}/dispatches`, {
        method: 'POST',
        headers: {
            'Accept': 'application/vnd.github+json',
            'Authorization': `Bearer ${token}`,
            'X-GitHub-Api-Version': '2022-11-28',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ref: 'main',
            inputs: { url: currentUrl }
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log('Workflow triggered successfully');
    })
    .catch(error => {
        console.error('Error triggering workflow:', error);
    });
});