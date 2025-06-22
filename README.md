# Trigger GH Workflow

A button to trigger a GitHub Actions workflow.

## Usage

From the extensions details page, click "Extension Options" to set the user, repo, worfklow id, and token.

Then click the extension icon to trigger the workflow.

Currently requires the workflow to accept a specific input for the source URL,
or else the REST call will fail with "unknown inputs" (HTTP error code 422).

```yml
name: Echo URL
permissions:
  contents: write
on:
  workflow_dispatch:
    inputs:
      url:
        description: 'Echo URL'
jobs:
  echo_url:
    runs-on: ubuntu-latest
    steps:
      - name: Echo URL
        run: echo "${{ github.event.inputs.url }}"
```

Not going to publish this thing, just load it unpacked in developer mode.

## Tasker analogue

The following Tasker task can be used to do the same thing from a mobile device:

```
    Task: Add to blogroll

    A1: HTTP Request [
         Method: POST
         URL: https://api.github.com/repos/j2kun/math-intersect-programming/actions/workflows/blogroll.yml/dispatches
         Headers: Accept: application/vnd.github+json
         Authorization: Bearer %GITHUB_PAT
         X-GitHub-Api-Version: 2022-11-28
         Content-Type: application/json
         Body: {
           "ref": "main",
           "inputs": { "url": "%CLIP" }
         }
         Timeout (Seconds): 30
         Trust Any Certificate: On
         Automatically Follow Redirects: On
         Use Cookies: On
         Structure Output (JSON, etc): On ]

```
