## HOW TO RUN THIS PROJECT LOCALLY

- To run this project you must have node installed. To check if you already have node installed run the command ` node --version`, if this prints a version number then you already have node installed.If Otherwise you can download the node from the official website [here](https://nodejs.org/en/download).

- You must also have git (a version control) installed. If not installed yet [download here](https://git-scm.com/downloads).

- On your local machine open your terminal, create a folder and cd into it. Run the command `git clone git@github.com:malachi43/introduction-to-API.git` to get a local copy of the project on your machine.

- Run `npm install && npm run build` to install the required dependencies and compile the typescript files in /src folder to javascript files that will be stored in the /build folder. Thereafter start the server with the command `npm run start:dev`

- Point your browser to `http://localhost:3000/api/v1/rooms` to see the available rooms.

- Test other endpoints located using the appropriate http verbs (GET, POST, DELETE, PATCH)
