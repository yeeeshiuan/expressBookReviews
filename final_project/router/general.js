const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  let filtered_users_by_username = users.filter((user) => user.username === username);
  if (filtered_users_by_username.length) {
    res.send("The user" + (' ') + (username) + " Has already exist!");
  } else {
    users.push({"username":username, "password":req.body.password});
    res.send("The user" + (' ') + (username) + " Has been added!");
  }
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  myPromise = new Promise((resolve,reject) => {
    resolve("promise resolved")
  });

  myPromise.then((successMessage) => {
    res.send(Object.values(books));
  })
  //res.send(Object.values(books));
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  myPromise = new Promise((resolve,reject) => {
    resolve("promise resolved")
  });

  myPromise.then((successMessage) => {
    const isbn = req.params.isbn;
    let filtered_books_by_isbn = books[isbn];
    res.send(filtered_books_by_isbn);
  })
  //return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  myPromise = new Promise((resolve,reject) => {
    resolve("promise resolved")
  });

  myPromise.then((successMessage) => {
    const author = req.params.author;
    let filtered_books_by_author = Object.values(books).filter((book) => book.author === author);
    res.send({filtered_books_by_author});
  })
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  myPromise = new Promise((resolve,reject) => {
    resolve("promise resolved")
  });

  myPromise.then((successMessage) => {
    const title = req.params.title;
    let filtered_books_by_title = Object.values(books).filter((book) => book.title === title);
    res.send({filtered_books_by_title});
  })

  //return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  let filtered_books_by_isbn = books[isbn];
  res.send(filtered_books_by_isbn['reviews']);
  //return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
