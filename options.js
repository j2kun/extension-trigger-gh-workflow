function saveOptions(e) {
    e.preventDefault();
    chrome.storage.sync.set({
      githubUser: document.getElementById('github-user').value,
      githubRepo: document.getElementById('github-repo').value,
      workflowName: document.getElementById('workflow-name').value,
      githubToken: document.getElementById('github-token').value
    }, function() {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    });
  }
  
  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  function restoreOptions() {
    chrome.storage.sync.get({
      githubUser: '',
      githubRepo: '',
      workflowName: '',
      githubToken: ''
    }, function(items) {
      document.getElementById('github-user').value = items.githubUser;
      document.getElementById('github-repo').value = items.githubRepo;
      document.getElementById('workflow-name').value = items.workflowName;
      document.getElementById('github-token').value = items.githubToken;
    });
  }
  
  document.addEventListener('DOMContentLoaded', restoreOptions);
  document.getElementById('options-form').addEventListener('submit', saveOptions);