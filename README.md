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

we have a passport.js which is requiring three things, passport, passport-local, and are models folder. we use a local strategy to set login credentials, in our case username/email and password. We use the findOne method to locate the user when theres a sign in. If we’re unable to find the user email an incorrect email message will occur. also an incorrect password message will occur if we have the users email and no password.

### database

##### schema.sql

the schema.sql was part of the github template.

### models

##### index.js

the models folder begins with a index.js which is the default file created when running the sequelize cli command **sequelize init:models**

##### Recipe.js

the Recipe.js uses sequelize.define to create a table called ‘Recipe’ with the column content which has a data type of string. it also uses associating. calling the belongsTo function which is handled by the index.js file. There are three columns defined by sequelize in the recipe.js file. the first column ,name, has a datatype string, allowNull: false. and a validator that defines the minimum len as one character. the second column ,details, has the same exact data structure as the first; while the third column pickedDay is simply a datatype string and nothing else.

##### ShoppingList.js

---

the ShoppingList.js defines a table ‘ShoppingList’ with columns named name. the name column has a datatype.string while the pri

##### User.js

the User.js defines a table ‘User’ with two columns email and password. this table is for the authentication. both columns use the datatype.string with allownull set to false. the email column has a unique property which says there cannot be two of the same email. There is a validate property which requires the user input in for the email column to be in email format (johndoe@email.com). There is a has many association telling us our User table has many recipe’s from the **_ recipe.js _**. The User.js is importing bcrypt. A function called addHook is called which encrypts the users password before creating their account. Before the addHook function is called the function validPassword checks to see if the password entered by the user in a login attempt is the same password stored in the database. Note the passwords in the database are all encrypted by the addHook function.

### Public

#### css

the css folder has some styling for static html pages staged in the public folder

#### images

the images folder has static images staged in the public folder

#### js

##### login.js

the login.js has our front-end javascript pulled in by the static html pages. There are three variables being defined referencing a button and two input fields. the ‘on’ function is called (jQuery) as a submit button. event.preventDefault is called to keep the form from automatically submitting. the userData constant is created as an object with the two input fields as two values in two key value pairs. the loginUser function is created at the bottom of the page hoisted up to the jQuery ‘on’ function. the loginUser function uses jQuery and has two parameters email and password. the two parameters email and password are passed in as the two input field values. the post function has the field route /api/index and passes an object with the key value pairs email:email and password:password. If the uses posts to the /api/index by typing in the correct user name (or email) and password they are redirected to the /search page, and if theres an error the error is caught and consoled to the log.

##### saved.js

in the saved.js theres five initial constants being defined. createCards, createList, getList, getRecipes, and pageLoad. the **_ createCards _** constant assigns four constants cardEl, cardBodyEl, cardTitleEl, and saveBtnEl all using jQuery. the cardEl constant creates a div with the ‘style: width 18re’ and class ‘card’. the cardBodyEl constant creates a div with the class ‘card-body’. the cardTitleEl contains an h5 tag with the class ‘card-title’. the cardTitleEl also calls the function .text which adds text to the h5 tag its creating in this case the text added is the parameter title. the saveBtnEl creates a button with the class ’btn btn-primary add-btn. the saveBtnEl also has some data attributes they are ’data-recipe-id: id, ‘data-recipe-title’: title, ‘data-saved-day’:day. the saveBtnEl calls the .text function with the text “Add to the Meal Plan”. the createCards constant goes on to append cardTitleEl and saveBtnEl to cardBodyEl, after that, cardBodyEl is appended to cardEl, and finally, cardEl is appended to the class test-recipes.
then there is the **_createList _** constant with the parameters item, id, and userId containing the constants liEl and buttonEl. the liEl creates li tag with the class list-group-item containing in text the first parameter ‘item’ of createList. the second constant defined buttonEl creates a button tag with the class:‘btn btn-primary remove-item-btn’ with two data attributes ‘data-id’:id and ‘data-userId’:userId and finally the function call .text with the text or parameters “Remove”. the create list constant goes on to append buttonEl to liEl and append liEl to a class test-list-ul.
Then there is the getList constant that is a function which has userData as a parameter. the function begins with a get route which is /api/shopping_lists/${userData.id} using the then function with the parameters results. the getList constant takes the results of the get function or the parameter results and creates a forEach loop. the forEach loop uses the createList constant with the parameters result.name, result.id, and userData.id. this makes it so the result.name with be entered as text in the liEl. ****
next is the getRecipes constant which is a function passing userData as a parameter. this function uses a get route with the route /api/recipes/${userData.id} then calling the then function with the parameter results. just like the get list function there is a forEach loop which uses the createCards constant. The arguments passed are result.name which will end up being the cardTitleEl text, result.pickedDay, and result.recipeId. \*\*\*\*
the constant pageLoad handles populating the shopping list with recipe ingredients

##### script.js

the script.js does a post function call with the parameters /api/user_data to get the logged in user’s data greeting the user with the then function and then setting the user object to be used during search. there is a function called createCard which is a constant which is used to dynamically create cards . there is a search button which when clicked will query the backend and search for results . There is a save button that when clicked will save a recipe to the calender as well as the database.

##### signup.js

here the signup button is subjected through jQuery. the to fields are validated which are email and password.

#### index.html saved.html search.html

the index.html, saved.html and search.html are all static webpages located in the public folder.

### routes

#### api-routes.js

the api-routes.js is importing four things, axios, passport, our models folder, and dotenv. there is a total of five post routes, four get routes and two delete routes.

#### html-routes.js

the html-routes.js is importing path and the folder needed to configure authentication. and uses four get routes to serve up three different static html pages.
