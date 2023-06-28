const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const menu = require("../data/items");
const home_router = express.Router();

home_router.use(bodyParser.json());

// Get ROUTES
home_router.get("/", (req, res) => {
  res.send("I am on Home Page");
});

home_router.get("/menu", (req, res) => {
  res.status(200).json(menu);
});

home_router.get("/menu/get-new-items", (req, res) => {
  const recentItems = menu[0]; // getting the item at 0  Index i.e first item
  if (recentItems) {
    res.status(201).send(recentItems);
  } else {
    res.status(500).send("Server Error");
  }
});

// POST ROUTES
home_router.post("/menu/add-new-items", (req, res) => {
  const { itemName, price, ratings } = req.body;

  if (!itemName || !price || !ratings) {
    res.status(400).send("All 3 Fields are required"); // code 400 for bad request
  } else {
    const newItem = {
      // creating a new object
      id: Date.now(),
      itemName,
      price,
      ratings,
    };
    // unshift adds items at the start of array
    menu.unshift(newItem); // adding item to our own data.js file

    // pushing the data given by user to our own file
    fs.writeFile(
      "./data/items.js",
      `
      items  = 
        ${JSON.stringify(menu)}
      module.exports = items;
      `,
      (err) => {
        if (err) {
          console.log("Error updating the Data file", err);
          res.status(500).send("Cant update Data file"); // code 500 as its internal server error
        } else {
          res.status(201).send("Item added !"); // code 201 cause the request was successful
        }
      }
    );
  }
});

module.exports = home_router;
