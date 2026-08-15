# Auth API
These docs are executable as bash scripts and used in functional tests. See `<meblog-src>/.justfiles/backend.just` for test setup.

## Auth API / Background
The API allows you to get a JWT which can be used for protected APIs like the [Media API](./media.md). 

## Auth API / Pre-reqs
Run the backend locally.

## Auth API / Login
To login, from a terminal, run:
```bash
echo "/auth/login"
login_response=`curl --fail -X POST "$local_backend_dev_api_url/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"'$local_your_username'","password":"'$local_your_password'"}'`

export bearer_token=$(jq -n "$login_response" | jq -r ".data.bearer_token")

# Other tests that require auth need access to this token.
echo "${bearer_token}" > /tmp/meblog-test-token
```

> On the frontend, logging in does nothing if JavaScript is disabled because it does not use cookies, just LocalStorage.