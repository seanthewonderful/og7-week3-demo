# H1 Week 3 Assessment instructions:

**Essentially you will re-create the code-along application we made in class, but you can customize it how you like. The general structure should be the same though.**

1. Here is the setup:

- mkdir week3-assessment
- cd week3-assessment
- code .
- mkdir client server
- touch client/index.html client/main.js client/styles.cssindex.html client/main.js client/styles.css
- touch server/server.js server/controller.js server/db.json
- npm init -y
- npm i axios express cors morgan express-session
- package.json -
  - change "main" --> "main": "server/server.js",
  - under this line, add --> "type": "module",
  - add a script --> "dev": "nodemon app.js -w server -w client -e html,js,css",
  - Don't forget the trailing commas on those lines!

**File structure should be:**

Week3-assessment
|- client
| |- index.html
| |- main.js
| |- styles.css
|
|- node_modules
|- server
| |- controller.js
| |- db.json
| |- server.js
|
|-package-lock.json
|-package.json

2. For your db.json file:

- Write your data yourself modeled after the code-along.
- You are encouraged to keep the same attributes for each object in the array --> id, name, picture, votes. (But you can change if you have a plan for how to use them differently)

3. You should copy the gist of the index.html and styles.css from our code-along. But you should customize it for what your application is working with (code-along was about drinks, so change your id attributes to match more closely to what you're building, and of course the css selectors will need to match).

- You have liberties to change the styles/structure of these files, but I'd recommend against it since this is mostly about the functionality
- Be sure to include the proper links in index.html:
  - `<link rel="stylesheet" href="styles.css" />`
  - `<script src="https://unpkg.com/axios/dist/axios.min.js"></script>`
  - `<script src="./main.js"></script>`

4. Copy in the boilerplate server.js setup from our code-along

5. In main.js write the line:

- console.log("Hello world")

6. In the terminal: `npm run dev`

- make sure it's running and that your index.html page has loaded properly
- open the page inspector console and confirm that you see "Hello from main.js" from main.js

7.

- Add this to main.js:
  - axios.get("/hello").then((res) => console.log(res.data.message))
- Add this route to server.js:
  - app.get("/hello", (req, res) => {
    res.send({ message: "I am awake. I think I am programmed to destroy all life." })
    })

8. Save your files, make sure your server restarts, and refresh the browser page. Inspect the browser console and you should now see:
   Hello from main.js
   I am awake. I think I am programmed to destroy all life.

9. Once your files are all connected and the above is working, your tasks are to continue on and create methods for the user to interact with your server so that you have at least one axios request and server route that communicate with each other to do the following:

- GET request to retrieve all your data from db.json
- POST request to add a new data object to your "database"
- PUT request to update the value of any given object from your "database".
  - This doesn't HAVE to be the upvote/downvote, but I think that's a good practice.
- DELETE request to delete a specified object from your "database"

10. As your working, obviously your front-end needs to be able to handle the data getting sent back and dynamically update your web page upon these user interactions:

- All data should be loaded and displayed on your page immediately when a user visits your site.
  - Please keep the display generally the same as the code-along, where each object from your database is rendered visually like a card
- All the requests should immediately repopulate the page with the new data from your database

11. Since you have all the code you'll need from the code-along, this will potentially be very easy if you just copy everything over. Please challenge yourself and think about each step along the way. For errors - LOTS of console.logs. Every console.log will give you confirmation that the code has 1. Reached that line of code, and 2. That the data you are logging is being sent around as you expect. When I make a console.log that doesn't show up, I know that my code did not reach that point, so I must work my way backwards from that point in the code instead of forwards.
    (Reminder that console.logs from server.js/controller.js will appear in your VSCode terminal that is running the server. But console.logs from main.js will appear in your browser console.)

12. Happy coding!
