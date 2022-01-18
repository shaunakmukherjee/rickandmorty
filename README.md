# Hi!
This is my homage to the incredible series that is, Rick and Morty.

It exposes a **GraphQL** Data Source and renders that with a **ReactJS** and **Material UI** frontend UI/UX.

All data, as mentioned, is taken from the fantastic Rick and Morty API.

## Features and Components

- Easy login system
- Characters displayed in user-friendly 'cards' which contain relevant information
- Consistent Theme switcher (light/dark)
- Immersive UI including transitions and icons
- Pagination through page numbers from first to last index API
- Dockerization (**bonus**) through docker-compose, making it much easier to containerize and view the app.


## Installation / Usage

### DOCKER COMPOSE!

Since the feature of containerization is included, the main parts are as follows: 

- In the parent repo (this one), build the docker images of both the server and the client : 

`docker build -t frontend-image ./client`

`docker build -t backend-image ./server`

- And then, all you need to do is type those magic words:

` docker-compose up`

And **VOILA!** Going [here](http://localhost:3000/) @ port 3000 will show you the app in all its glory!
P.S. A fully-functional GraphQL API exists [here](http://localhost:4000) for your reference.

There are users already present in the system('jackie', 'jabberwocky', etc.) with loaded favourited characters.

Of course, please feel free to create your own username and venture in!



### If not the docker route, then : 



#### 0 - Install packages and dependencies

- Since the server and client dependencies are put separately to encourage modular use, they have to be installed as such.
- Running ` yarn install ` while on both the /server and /client directories, will provide the packages required.
#### 1 - Initialize the backend

- Navigate to '/server' component which contains the server-based data
- Run ` yarn dev `

#### 2 - Start the frontend

- Navigate to the '/client' component which contains the frontend-based data
- Run ` yarn start `
- Go to port 3000 on browser

