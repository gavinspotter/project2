# project name

below is a list of node packages used on this project

![dependency](https://img.shields.io/badge/dependency-version-purple)![dependency](https://img.shields.io/badge/bcryptjs-2.4.3-blue)![dependency](https://img.shields.io/badge/dotenv-8.2.0-blue)![dependency](https://img.shields.io/badge/express-4.17.1-blue)![dependency](https://img.shields.io/badge/expresssession-1.17.1-blue)![dependency](https://img.shields.io/badge/mysql2-2.1.0-blue)![dependency](https://img.shields.io/badge/nodemon-2.0.2-blue)![dependency](https://img.shields.io/badge/passport-0.4.1-blue)![dependency](https://img.shields.io/badge/passportlocal-1.0.0-blue)![dependency](https://img.shields.io/badge/sequelize-5.21.3-blue)

  ### files and folders 
```
    .
    ├── config
    │       ├──middleware
    │       │           └── isAuthenticated.js
    │       │
    │       ├── config.js
    │       └── passport.js
    │
    ├── database
    │         └──schema.sql
    │
    ├── models
    │       ├── index.js
    │       ├── Post.js
    │       ├── Recipe.js
    │       ├── ShoppingList.js
    │       └── user.js
    │
    ├── node_modules
    │ 
    ├── public
    │       ├── assets
    │       │       ├── css
    │       │       │    └── styles.css
    │       │       │                      
    │       │       ├── images
    │       │       └── js
    │       │            ├── login.js
    │       │            ├── script.js
    │       │            └── signup.js
    │       │
    │       ├── index.html
    │       ├── saved.html
    │       └── search.html
    │
    ├── routes
    │       ├── api.route.js
    │       └── html.routes.js
    │
    ├── .env 
    │ 
    ├── .eslintrc.js
    │ 
    ├── .gitattributes
    │ 
    ├── .gitignore
    │ 
    ├── .travis.yml
    │
    ├── pack-lock.json 
    │
    ├── package.json
    │ 
    ├── proposal.md
    │
    └── server.js
```

### config folder

##### middleware
in our middleware folder is a isAuthenticated.js which is for users who arent logged in or are logged in and their access to the website.
##### config.js
 our config.js which contains in a module.exports a development, tests, and production entry to mysql
##### passport.js
we have a passport.js which is requiring three things, passport, passport-local, and are models folder. we use a local strategy to set login credentials, in our case username/email and password. We use the findOne method to locate the user when theres a sign in. If we're unable to find the user email an incorrect email message will occur. also an incorrect password message will occur if we have the users email and no password.

### database

##### schema.sql 
  the schema.sql was part of the github template.
  
### models 

##### index.js
 the models folder begins with a index.js which is the default file created when running the sequelize cli command __sequelize init:models__ 
  
##### Recipe.js
    
the Recipe.js uses sequelize.define to create a table called 'Recipe' with the column content which has a data type of string. it also uses associating. calling the belongsTo function which is handled by the index.js file. There are three columns defined by sequelize in the recipe.js file. the first column ,name, has a datatype string, allowNull: false. and a validator that defines the minimum len as one character. the second column ,details, has the same exact data structure as the first; while the third column pickedDay is simply a datatype string and nothing else. 

##### ShoppingList.js
**** 
the ShoppingList.js defines a table 'ShoppingList' with  columns named name. the name column has a datatype.string while the pri

##### User.js

the User.js defines a table 'User' with two columns email and password. this table is for the authentication. both columns use the datatype.string with allownull set to false. the email column has a unique property which says there cannot be two of the same email. There is a validate property which requires the user input in for the email column to be in email format (johndoe@email.com). There is a has many association telling us our User table has many recipe's from the ___ recipe.js ___. The User.js is importing bcrypt. A function called addHook is called which encrypts the users password before creating their account. Before the addHook function is called the function validPassword checks to see if the password entered by the user in a login attempt is the same password stored in the database. Note the passwords in the database are all encrypted by the addHook function. 

### Public














  




  

