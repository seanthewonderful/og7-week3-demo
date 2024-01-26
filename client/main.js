console.log("Hello from main.js");

// axios.get("/hello").then((res) => {
//   console.log(res.data.message);
// });

const drinkDisplay = document.querySelector("#drinkDisplay");
const drinkForm = document.querySelector("form");

// Want to create "cards" for each drink from our database
// Assume that this function will be called passing in a drink object from the database == parameter
const createDrinkCard = (drinkObj) => {
  // Create a new section element
  const newDrinkCard = document.createElement("section");
  // Add a class name "drinkCard"
  newDrinkCard.className = "drinkCard";
  // Add some innerHTML to newDrinkCard
  newDrinkCard.innerHTML = `
      <img src=${drinkObj.picture} />  
      <p>${drinkObj.name}</p>

      <section>
        <button onclick="updateDrink(${drinkObj.id}, 'downvote')" >-</button>
        Popularity: ${drinkObj.votes}
        <button onclick="updateDrink(${drinkObj.id}, 'upvote')" >+</button>
      </section>

      <br/>

      <button onclick="deleteDrink(${drinkObj.id})" >Delete Me</button>
  `;
  // Add this new element to the end of drinkDisplay
  drinkDisplay.appendChild(newDrinkCard);
};

// Create a function that takes in an array of drink objects (our database array), and invokes createDrinkCard at each object in the array
const displayAllDrinks = (drinkArr) => {
  for (let i = 0; i < drinkArr.length; i++) {
    // at each iteration, create a new drink card passing in the drink object
    createDrinkCard(drinkArr[i]);
  }
};

// Create a function to make a call to our server to retrieve the drink array
const getAllDrinks = () => {
  axios.get("/drinks").then((res) => {
    displayAllDrinks(res.data.allDrinks);
  });
};

const handleSubmit = (evt) => {
  evt.preventDefault();

  let name = document.getElementById("drinkName");
  let drinkImg = document.getElementById("drinkImg");

  // Create body object for post request
  let bodyObj = {
    drinkName: name.value,
    drinkPic: drinkImg.value,
  };

  drinkDisplay.innerHTML = "";
  name.value = "";
  drinkImg.value = "";

  axios.post("/addDrink", bodyObj).then((res) => {
    displayAllDrinks(res.data.allDrinks);
  });
};

// Function to delete a drink
const deleteDrink = (id) => {
  // Send an axios delete request including the id as a req param
  axios.delete(`/deleteDrink/${id}`).then((res) => {
    // clear drinkDisplay div and repopulate by calling displayAllDrinks()
    drinkDisplay.innerHTML = "";
    displayAllDrinks(res.data.allDrinks);
  });
};

// Function to update the popularity votes of a drink
// This function should accept both the drink's id AND whether we are upvoting/downvoting
const updateDrink = (id, type) => {
  // Create a body object to provide the put request
  let bodyObj = {
    voteType: type,
  };

  // send a PUT request providing the bodyObj and a param for the drink's id
  axios.put(`/updateDrink/${id}`, bodyObj).then((res) => {
    drinkDisplay.innerHTML = "";
    displayAllDrinks(res.data.allDrinks);
  });
};

// Add an event listener to the drinkForm to fire a function (handleSubmit) when submitted
drinkForm.addEventListener("submit", handleSubmit);

// Invoke getAllDrinks on page load
getAllDrinks();
