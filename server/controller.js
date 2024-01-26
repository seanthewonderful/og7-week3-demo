import drinks from "./db.json" assert { type: "json" };

let globalId = 4;

const handlerFunctions = {
  sayHello: (req, res) => {
    res.send({
      message: "Hello there",
    });
  },

  getAllDrinks: (req, res) => {
    res.send({
      message: "Here are the drinks",
      allDrinks: drinks,
    });
  },

  addDrink: (req, res) => {
    // Grab the drink name & picture from the post request object
    const drinkName = req.body.drinkName;
    const drinkPic = req.body.drinkPic;
    // Create a new drink object, passing in the values from the req object
    const newDrink = {
      id: globalId,
      name: drinkName,
      picture: drinkPic,
      votes: 0,
    };
    // Add that new drink object to our drink array (drinks)
    drinks.push(newDrink);

    globalId++;

    res.send({
      message: "Drink added successfully",
      allDrinks: drinks,
    });
  },

  deleteDrink: (req, res) => {
    // Grab drink's id from req.params object
    const drinkId = req.params.id;
    // Find the drink object with the matching id from our drinks array
    // Then remove it from the drinks array
    for (let i = 0; i < drinks.length; i++) {
      // Iterating through drinks, if a drink's id is a match, then we will delete it with a .splice() method
      if (drinks[i].id === +drinkId) {
        // +"5" === Number("5")
        drinks.splice(i, 1);
        break;
      }
    }

    res.send({
      message: "Drink deleted",
      allDrinks: drinks,
    });
  },

  updateDrink: (req, res) => {
    // grab the id from req.params
    const drinkId = req.params.id;
    // grab the type (upvote/downvote) from req.body
    const voteType = req.body.voteType;

    // grab the index of the drink using its id and the 'findIndex' array method
    const drinkIdx = drinks.findIndex((drink) => {
      return drink.id === +drinkId;
    });

    // Based on voteType, either increment or decrement the drink.votes property
    if (voteType === "upvote") {
      drinks[drinkIdx].votes += 1;
    } else if (voteType === "downvote") {
      drinks[drinkIdx].votes -= 1;
    }

    // Send a response with all the drinks again (drinks array will now have the new vote value of this drink)
    res.send({
      message: "Vote count updated",
      allDrinks: drinks,
    });
  },
};

export default handlerFunctions;
