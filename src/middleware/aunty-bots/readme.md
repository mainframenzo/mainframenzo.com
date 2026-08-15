> This readme has been @deprecated - you no longer host the website on AWS, and this functionality was moved to nginx et. al. This readme remains in case you ever want to deploy to AWS again.

"So many _Auntys_ you could make an Aunty team." Aunty as in anti as in anti-bots. 

Here's what we're dealing with:
* This blog is regularly poked at by idiots, kids, and nation states. They look for common secret files in places like `/admin/.env`. To do what with, bro? Crypto mine using my empty AWS account? (Yea, probably) They'll find those files here, alright :D
* This blog is bombarded with requests from "users" with empty user-agents (probably not folks using netcat, lol). They'll find an HTTP response fit for such ghoulish behavior, alright.

Here's how we're dealing with them:

This directory contains middleware which redirects all requests for `**/*.php`, or any "bad" i.e. popular route, to a Github Pages domain you setup. That domain returns HTML which endlessly loops, free of charge. Thanks Microsoft! The middleware also returns an HTML file if redirects aren't honored, which in itself redirects. This is cheap at $0.10 USD per million requests using AWS.

It's not perfect - FIXME you need to validate how HTML redirects are handled if a markdown file is requested and the response is HTML, for example - but it's a start.

Snootchie Bootchies.