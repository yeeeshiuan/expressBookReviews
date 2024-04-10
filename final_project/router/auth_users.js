const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
  let filtered_users_by_username = users.filter((user) => user.username === username);
  return filtered_users_by_username.length > 0;
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
let filtered_users_by_username_and_password = users.filter((user) => (user.username === username) && (user.password === password));
return filtered_users_by_username_and_password.length > 0;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const username = req.body.username;
  if (! isValid(username)) {
    return res.status(404).json({message: "Username is not exist."});
  }

  const password = req.body.password;
  if (! authenticatedUser(username, password)) {
    return res.status(404).json({message: "It's not matched between username and password."});
  }

  let accessToken = jwt.sign({
      data: username
    }, 'access', { expiresIn: 60 * 60 });

    req.session.authorization = {
      accessToken
  }
  return res.status(200).send("User successfully logged in");
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const isbn = req.params.isbn;
  let filtered_books_by_isbn = books[isbn];
  if ( filtered_books_by_isbn.length === 0 ) {
    return res.status(404).send("The ISBN is not exist.");
  }

  const review = req.body.review;
  const username = req.username.data;

  books[isbn]['reviews'][username] = review;
  res.send(books[isbn]);
  //return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
