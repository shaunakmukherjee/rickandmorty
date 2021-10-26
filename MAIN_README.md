# Hi, Highsnobiety! 
This is the app I have created, based on the specifications. Screenshots and usage are included below.


## Components

Apart from containing the basic features of logging in and viewing character cards, this app also entails the following: 
- Theme switcher (light/dark)
- Immersive UI including transitions and icons
- Pagination (**bonus**) through page numbers from first to last index of the Rick N Morty API
- Dockerization (**bonus**) through docker-compose, making it much easier to containerize and view the app.


## Installation / Usage

### DOCKER COMPOSE!

Yes, all you need to do is go to the parent repo (where the docker-compose is) and type those magic words:


` docker-compose up `

And **VOILA!** Going to `http://localhost:3000/` will show you the app in all its glory!


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




