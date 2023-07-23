# espcharts

This is a super simple REST API for managing esports tournaments, players, matches, and teams.
It provides basic CRUD (Create, Read, Update, Delete) operations to interact with the tournament data.

#Introduction
This REST API serves as a backend for managing esports tournaments. It allows you to perform CRUD operations on players, matches, teams, and tournaments.
You can create new players and teams, organize matches, and manage tournament data easily using the provided endpoints.

#Installation
Clone this repository to your local machine.
Navigate to the project directory.
Install the dependencies using npm:
bash
Copy code
npm install
Create a .env file in the root directory and set the environment variables:
makefile
Copy code
PORT=3000
MONGODB_URI=mongodb://localhost/esports_tournament
Start the server:
bash
Copy code
npm start
The API will be accessible at http://localhost:3000.
