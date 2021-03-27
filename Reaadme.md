# First Version
## Make StoryBooks web app with those features:
- Login with Google
- Create public and private stories to share your weekly 
- Edit your stories
- Delete your stories
- View Others public stories
- All those actions presisted in mongoo db

# Second Version
## Dockerize app
- Create Dockerfile
- Build Command : docker build -t storybooks .
- Run Command (interactive mode): docker run -it -p 9000:5000 storybooks
- Run Command (background mode): docker run -d -p 9000:5000 storybooks
- Run container with volume flag : docker run -it -p 9001:5000 -v $(pwd):/app  storybooks

## Helping command
- Get All running containers : docker ps
- Get All containers : docker ps -a
- Get All images : docker images
- Stop running container : docker stop containerId
- Get all info : docker info
- Enter container : docker container exec -i containerId bash and exit to leave the container
- 