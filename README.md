# Magical Inbox App

## Setup

Build the container

`docker build . -t inbox:magic`

Run the container

`docker run --rm --name magical_inbox_app -d -p 8080:80 inbox:magic`

Enjoy the magic!

Shut it down

`docker stop magical_inbox_app`
