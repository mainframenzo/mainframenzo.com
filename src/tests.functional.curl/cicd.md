# CICD API
These docs are executable as bash scripts and used in functional tests. See `<meblog-src>/.justfiles/backend.just` for test setup.

## CICD API / Background
You run CICD on the VM for a publish stage...for now. When you push changes to either publish stage's respective Github branch, Github makes a POST request with the change reference, and that kicks off CICD.

## CICD API / Pre-reqs
Run the backend locally. Run the Auth API curl-based functional test to login.
```bash
export bearer_token=$(cat /tmp/meblog-test-token)
```

## CICD API / Start CICD
To mimic Github POSTing a change, from a terminal, run:
```bash

  # FIXME Signature is failing test...why?
  export app_stage_github_webhook_secret="{{app_stage}}_github_webhook_secret"
  export github_webhook_secret=`echo "${!app_stage_github_webhook_secret}"`

  export payload='{
    "ref": "refs/heads/main",
    "before": "a1b2c3d4e5f67890abcdef1234567890abcdef12",
    "after": "f6e5d4c3b2a10987654321fedcba987654321fed",
    "created": false,
    "deleted": false,
    "forced": false,
    "base_ref": null,
    "compare": "https://github.com/mainframenzo/mainframenzo.com/compare/a1b2c3d4...f6e5d4c3",
    "commits": [
      {
        "id": "f6e5d4c3b2a10987654321fedcba987654321fed",
        "tree_id": "9f3d1c2e4b5a6d7e8f90a1b2c3d4e5f678901234",
        "distinct": true,
        "message": "Fix bug in authentication flow",
        "timestamp": "2024-01-15T10:30:00Z",
        "url": "https://github.com/mainframenzo/mainframenzo.com/commit/f6e5d4c3",
        "author": {
          "name": "Monalisa Octocat",
          "email": "monalisa@octocat.com",
          "username": "octocat"
        },
        "committer": {
          "name": "GitHub",
          "email": "noreply@github.com",
          "username": "web-flow"
        },
        "added": ["src/new-file.ts"],
        "removed": [],
        "modified": ["src/auth.ts", "README.md"]
      }
    ],
    "head_commit": {
      "id": "f6e5d4c3b2a10987654321fedcba987654321fed",
      "tree_id": "9f3d1c2e4b5a6d7e8f90a1b2c3d4e5f678901234",
      "distinct": true,
      "message": "Fix bug in authentication flow",
      "timestamp": "2024-01-15T10:30:00Z",
      "url": "https://github.com/mainframenzo/mainframenzo.com/commit/f6e5d4c3",
      "author": {
        "name": "Monalisa Octocat",
        "email": "monalisa@octocat.com",
        "username": "octocat"
      },
      "committer": {
        "name": "GitHub",
        "email": "noreply@github.com",
        "username": "web-flow"
      },
      "added": ["src/new-file.ts"],
      "removed": [],
      "modified": ["src/auth.ts", "README.md"]
    },
    "pusher": { "name": "octocat", "email": "octocat@github.com" },
    "sender": {
      "login": "octocat",
      "id": 1,
      "node_id": "MDQ6VXNlcjE=",
      "avatar_url": "https://github.com/images/error/octocat_happy.gif",
      "gravatar_id": "",
      "url": "https://api.github.com/users/octocat",
      "html_url": "https://github.com/octocat",
      "followers_url": "https://api.github.com/users/octocat/followers",
      "following_url": "https://api.github.com/users/octocat/following{/other_user}",
      "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
      "organizations_url": "https://api.github.com/users/octocat/orgs",
      "repos_url": "https://api.github.com/users/octocat/repos",
      "events_url": "https://api.github.com/users/octocat/events{/privacy}",
      "received_events_url": "https://api.github.com/users/octocat/received_events",
      "type": "User",
      "site_admin": false
    },
    "repository": {
      "id": 123456789,
      "node_id": "MDEwOlJlcG9zaXRvcnkxMjM0NTY3ODk=",
      "name": "Hello-World",
      "full_name": "mainframenzo/mainframenzo.com",
      "private": false,
      "owner": {
        "login": "octocat",
        "id": 1,
        "node_id": "MDQ6VXNlcjE=",
        "avatar_url": "https://github.com/images/error/octocat_happy.gif",
        "gravatar_id": "",
        "url": "https://api.github.com/users/octocat",
        "html_url": "https://github.com/octocat",
        "followers_url": "https://api.github.com/users/octocat/followers",
        "following_url": "https://api.github.com/users/octocat/following{/other_user}",
        "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
        "organizations_url": "https://api.github.com/users/octocat/orgs",
        "repos_url": "https://api.github.com/users/octocat/repos",
        "events_url": "https://api.github.com/users/octocat/events{/privacy}",
        "received_events_url": "https://api.github.com/users/octocat/received_events",
        "type": "User",
        "site_admin": false
      },
      "html_url": "https://github.com/mainframenzo/mainframenzo.com",
      "description": "My first repo",
      "fork": false,
      "url": "https://api.github.com/repos/mainframenzo/mainframenzo.com",
      "forks_url": "https://api.github.com/repos/mainframenzo/mainframenzo.com/forks",
      "keys_url": "https://api.github.com/repos/mainframenzo/mainframenzo.com/keys{/key_id}",
      "collaborators_url": "https://api.github.com/repos/mainframenzo/mainframenzo.com/collaborators{/collaborator}",
      "teams_url": "https://api.github.com/repos/mainframenzo/mainframenzo.com/teams",
      "hooks_url": "https://api.github.com/repos/mainframenzo/mainframenzo.com/hooks",
      "issue_events_url": "https://api.github.com/repos/mainframenzo/mainframenzo.com/issues/events{/number}",
      "events_url": "https://api.github.com/repos/mainframenzo/mainframenzo.com/events",
      "assignees_url": "https://api.github.com/repos/mainframenzo/mainframenzo.com/assignees{/user}",
      "branches_url": "https://api.github.com/repos/mainframenzo/mainframenzo.com/branches{/branch}",
      "tags_url": "https://api.github.com/repos/mainframenzo/mainframenzo.com/tags",
      "blobs_url": "https://api.github.com/repos/mainframenzo/mainframenzo.com/git/blobs{/sha}",
      "git_tags_url": "https://api.github.com/repos/mainframenzo/mainframenzo.com/git/tags{/sha}",
      "git_refs_url": "https://api.github.com/repos/mainframenzo/mainframenzo.com/git/refs{/sha}",
      "trees_url": "https://api.github.com/repos/mainframenzo/mainframenzo.com/git/trees{/sha}",
      "statuses_url": "https://api.github.com/repos/mainframenzo/mainframenzo.com/statuses/{sha}",
      "languages_url": "https://api.github.com/repos/mainframenzo/mainframenzo.com/languages",
      "stargazers_url": "https://api.github.com/repos/mainframenzo/mainframenzo.com/stargazers",
      "contributors_url": "https://api.github.com/repos/mainframenzo/mainframenzo.com/contributors",
      "subscribers_url": "https://api.github.com/repos/mainframenzo/mainframenzo.com/subscribers",
      "subscription_url": "https://api.github.com/repos/mainframenzo/mainframenzo.com/subscription",
      "commits_url": "https://api.github.com/repos/mainframenzo/mainframenzo.com/commits{/sha}",
      "git_commits_url": "https://api.github.com/repos/mainframenzo/mainframenzo.com/git/commits{/sha}",
      "comments_url": "https://api.github.com/repos/mainframenzo/mainframenzo.com/comments{/number}",
      "issue_comment_url": "https://api.github.com/repos/mainframenzo/mainframenzo.com/issues/comments{/number}",
      "contents_url": "https://api.github.com/repos/mainframenzo/mainframenzo.com/contents/{+path}",
      "compare_url": "https://api.github.com/repos/mainframenzo/mainframenzo.com/compare/{base}...{head}",
      "merges_url": "https://api.github.com/repos/mainframenzo/mainframenzo.com/merges",
      "archive_url": "https://api.github.com/repos/mainframenzo/mainframenzo.com/{archive_format}{/ref}",
      "downloads_url": "https://api.github.com/repos/mainframenzo/mainframenzo.com/downloads",
      "issues_url": "https://api.github.com/repos/mainframenzo/mainframenzo.com/issues{/number}",
      "pulls_url": "https://api.github.com/repos/mainframenzo/mainframenzo.com/pulls{/number}",
      "milestones_url": "https://api.github.com/repos/mainframenzo/mainframenzo.com/milestones{/number}",
      "notifications_url": "https://api.github.com/repos/mainframenzo/mainframenzo.com/notifications{?since,all,participating}",
      "labels_url": "https://api.github.com/repos/mainframenzo/mainframenzo.com/labels{/name}",
      "releases_url": "https://api.github.com/repos/mainframenzo/mainframenzo.com/releases{/id}",
      "deployments_url": "https://api.github.com/repos/mainframenzo/mainframenzo.com/deployments",
      "created_at": 1296068472,
      "updated_at": "2024-01-15T10:30:00Z",
      "pushed_at": 1296068472,
      "git_url": "git://github.com/mainframenzo/mainframenzo.com.git",
      "ssh_url": "git@github.com:mainframenzo/mainframenzo.com.git",
      "clone_url": "https://github.com/mainframenzo/mainframenzo.com.git",
      "svn_url": "https://svn.github.com/mainframenzo/mainframenzo.com",
      "homepage": null,
      "size": 108,
      "stargazers_count": 80,
      "watchers_count": 80,
      "language": "TypeScript",
      "has_issues": true,
      "has_projects": true,
      "has_downloads": true,
      "has_wiki": true,
      "has_pages": false,
      "forks_count": 9,
      "mirror_url": null,
      "archived": false,
      "open_issues_count": 0,
      "license": null,
      "topics": [],
      "visibility": "public",
      "forks": 9,
      "open_issues": 0,
      "watchers": 80,
      "default_branch": "main",
      "is_template": false,
      "web_commit_signoff_required": false
    }
  }'

  export sha1_signature="sha1=$(echo -n "${payload}" | openssl dgst -sha256 -hmac "${github_webhook_secret}" | awk '{print $2}')"
  export sha256_signature="sha256=$(echo -n "${payload}" | openssl dgst -sha1 -hmac "${github_webhook_secret}" | awk '{print $2}')"

  curl -X POST "http://localhost:8081/api/cicd/start" \
    -H "Content-Type: application/json" \
    -H "user-agent: GitHub-Hookshot/37285b7" \
    -H "X-GitHub-Event: push" \
    -H "X-GitHub-Delivery: eb4057fc-95a3-11ef-8f93-0d3bc12a52ef" \
    -H "x-hub-signature: ${sha1_signature}" \
    -H "X-Hub-Signature-256: ${sha256_signature}" \
    -H "x-github-hook-id: 123457890" \
    -H "x-github-hook-installation-target-id: 123456789" \
    -H "x-github-hook-installation-target-type: repository" \
    -H "connection: close" \
    -d "${payload}"

  echo ${github_webhook_secret}
```
