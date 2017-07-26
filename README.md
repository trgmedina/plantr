# Plantr
An easy to use houseplant web application for new or busy plant owners. 

## Description

Plantr gives useful care details for specfic plants, allow plant owners to add and save all their plants in one convenient place, and remind plant owners when to water, fertilize, or prune specific plants. 

## Screenshots
Login Page:
![](https://github.com/trgmedina/plantapp/blob/master/public/Screenshots/Login-1.PNG?raw=true)
![](https://github.com/trgmedina/plantapp/blob/master/public/Screenshots/Login-2.PNG?raw=true)

Reminders:
![](https://github.com/trgmedina/plantapp/blob/master/public/Screenshots/Reminders.PNG?raw=true)

Plants:
![](https://github.com/trgmedina/plantapp/blob/master/public/Screenshots/Plants-1.PNG?raw=true)
![](https://github.com/trgmedina/plantapp/blob/master/public/Screenshots/Plants-2.PNG?raw=true)

Add Plants:
![](https://github.com/trgmedina/plantapp/blob/master/public/Screenshots/AddPlant-1.PNG?raw=true)
![](https://github.com/trgmedina/plantapp/blob/master/public/Screenshots/AddPlant-2.PNG?raw=true)

## Languages/Libraries Used
* HTML
* CSS
* Twitter Bootstrap
* Javascript
* jQuery Library
* React

## Technologies Used
* Node.js
* MongoDB
* Express
* Passport/OAuth
* Semantic-UI

## NPM Packages
* Axios
* Bcrypt
* ICS
* Mongoose
* Moment
* Moment-Recur
* Passport
* React-Modal
* React-Router

## Prerequisites

For optimal performance, user will need to have Google Chrome browser. Development was based on testing with Chrome.

## Web Application

[Plantr](https://plantr-dev3.herokuapp.com)

## Built With
* Sublime
* Heroku

## File and Directory Structure
```
|   .gitignore
|   npm-debug.log
|   package-lock.json
|   package.json
|   README.md
|   server.js
|   webpack.config.js
|   
+---app
|   |   app.js
|   |   index.html
|   |   loginRoutes.js
|   |   
|   +---components
|   |       AddPlant.js
|   |       Main.js
|   |       PlantProfile.js
|   |       Plants.js
|   |       Reminders.js
|   |       Reviews.js
|   |       
|   +---config
|   |       reactRoutes.js
|   |       
|   \---utils
|           helpers.js
|           profileHelpers.js
|           reminderHelpers.js
|           
+---config
|       auth.js
|       database.js
|       passport.js
|       
+---models
|       plant.js
|       user.js
|       userPlant.js
|       
+---public
|       awesomplete.css
|       awesomplete.js
|       background.jpg
|       bundle.js
|       fakeloader.css
|       fakeloader.min.js
|       favicon.ico
|       plantr_calendar.ics
|       plantsdb.json
|       style.css     
|           
\---views
        connect-local.ejs
        index.ejs
        login.ejs
        profile.ejs
        signup.ejs
```
        
## Authors

* **Michelle Didier** - [meeshyd](https://github.com/meeshyd)
* **Joy Chang** - [chiaychang](https://github.com/chiaychang)
* **Theresa Medina** - [trgmedina](https://github.com/trgmedina)

If you have any questions about how/why something works, feel free to contact any member of [Team Seedlings](https://github.com/trgmedina/plantapp/graphs/contributors) for details.
