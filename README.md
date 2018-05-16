# Udacity React Nanodegree Project 1 - MyReads: A Book Tracking App

## Some background and personal reflection
I opted for Option 3 - starting from scratch with Create React App as the starting point. Based off that I pulled in requisite files and HTML/CSS as needed from the project starter repository. 

I felt this way was more instructive for me personally, being able to start from nothing and build upwards one step at a time. As opposed to starting with the starter repository which was a bit more like starting almost at the end (with regard to the UI and visual elements).

This allowed me to more readily grasp the cause and effect relationships between the HTML/CSS code and what appeared on the webpage. Starting from scratch also allowed me to tinker/experiment and move HTML/CSS around and see what happens in the browser.

## Key learnings
The key learnings I derived from this project were manifold. Here are some off the top of my head:
* **Composition** - logically breaking up the app into components and implementing them.
* **State** - logically planning and deciding the best place state should live.
* **Props** - good experience using props which are read-only data. Saw how they can only be passed downwards from parent to child. Saw firsthand how things can start to get unwieldy once you pass props down 2 levels or more - sometimes a component in the middle would do nothing with the props received from the parent and merely acts as a "messenger" passing it downstream. Perfect segue into Part 2 of the Nanodegree (React & Redux) where Redux is introduced as a single central place where all app state can live.  
* **React Router** - saw the difference between conditionally rendering some UI based on state versus rendering some UI based on matching a URL path with React Router. The latter allows your back button to work as well as allows for user bookmarking hence not breaking the web "contract" that users of the web have come to expect as standard behavior of webpages or webapps.
* **Throttling user input with lodash** - found that sometimes the difference in speed between data obtained via the network hitting the Udacity Books API was much slower than React's immediate re-rendering feature leading to erratic behavior at times. For e.g. data arriving too late from a network call hence 'polluting' our current state. Googling around for a solution led to the concept of throttling user input. Hence I throttled this using a package called "lodash" by essentially restricting AJAX calls to only happen every 300 ms versus before whereby it unnecessarily fires off AJAX calls for every single little change.
* **Working with the backend server** - good experience interacting with the backend server and using it to persist information between page refreshes. Had to play around a few times with the token header to understand how it worked.
* **Basic CSS** - since I started with Option 3 Create React App at times the styling was off and it was handy experience figuring out how to correct the CSS and styling.
* `.map()` method on arrays - awesome method that is very handy when looping through arrays. No need to use for-loops! However sometimes you get a warning message in the console saying "Expected to return a value in arrow function  array-callback-return" - in that scenario I've found the `.forEach()` method to solve this issue. They can be used interchangeably to loop through all elements of an array however `.map()` expects you to return a value.
* **React Developer Tools Chrome Plugin** - came in very handy when debugging and figuring out what is going on in the app as well as "stepping through" the code line by line.
* **ES6** - good experience getting the hang of ES6 syntax and way of doing things which are often shorter and more elegant.
* **Coding standards and Udacity style guides** - style guide for Git messages. Getting the hang of good practices.
* **PropTypes package** - good practice and helps in debugging given JavaScript is loosely typed this provides some guardrails.
* **Deploying** - what's the point of doing all this "devving" if it only works on localhost on your local machine lol. Real devs got their stuff on Chrome/Firefox right? Good experience using a PaaS (Heroku) to deploy my app to share it with friends and family.

## How to start the frontend React App
* Simply `git clone` the repo.
* On your machine terminal, `cd` into local directory you cloned the remote repo into.
* Enter `npm install` in your terminal to install all project dependencies.
* Start the development server with `npm start`

## Backend

We were provided a backend server so we could only focus on the frontend.

[Here is the full API spec](https://reactnd-books-api.udacity.com/).

The provided file [`BooksAPI.js`](src/utils/BooksAPI.js) contained all the methods needed to interface with the backend. We simply had to call the relevant methods to make AJAX calls.

A note on the backend server: The backend API uses a fixed set of search results and is limited to a particular set of search terms, [which can be found here](https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md). However, the BooksAPI.search method DOES search by title or author. 

## Project Rubric/Spec Checklist

### Application Setup
- [x] The application was created with create-react-app and requires only `npm install` and `npm start` to get it installed and launched.
- [x] An updated README that describes the project and has instructions for installing and launching the project is included.

### Main Page
- [x] The main page shows 3 shelves for books, and each book is shown on the correct shelf.

- [x] The main page shows a control that allows users to move books between shelves. The control should be tied to each book instance. The functionality of moving a book to a different shelf works correctly.
- [x] When the browser is refreshed, the same information is displayed on the page.

### Search Page

- [x] The search page has a search input field. 
- [x] The search page behaves correctly:
  - [x] As the user types into the search field, books that match the query are displayed on the page.
  - [x] Search results are not shown when all of the text is deleted out of the search input box.
  - [x] Invalid queries are handled and prior search results are not shown.
  - [x] The search works correctly when a book does not have a thumbnail or an author. (To test this, try searching for "poetry" and "biography").
  - [x] The user is able to search for multiple words, such as “artificial intelligence.”
 - [x] Search results on the search page allow the user to select “currently reading”, “want to read”, or “read” to place the book in a certain shelf. If a book is assigned to a shelf on the main page and that book appears on the search page, the correct shelf should be selected on the search page. If that book's shelf is changed on the search page, that change should be reflected on the main page as well. The option "None" should be selected if a book has not been assigned to a shelf.
 - [x] When an item is categorized on the search page and the user navigates to the main page, it appears on that shelf in the main page.

### Routing
- [x] The main page contains a link to the search page. When the link is clicked, the search page is displayed and the URL in the browser’s address bar is /search.
- [x] The search page contains a link to the main page. When the link is clicked, the main page is displayed and the URL in the browser’s address bar is /.

### Code Functionality
- [x] Component state is passed down from parent components to child components. The state variable is not modified directly - setState() function is used correctly. Books have the same state on both the search page and the main application page: If a book is on a bookshelf, that is reflected in both locations.
- [x] All JSX code is formatted properly and functional.

## Deployed demo version
As mentioned above what's the point of doing all this "devving" if it only works on localhost? Real devs got their stuff on Chrome/Firefox. That way you can share with friends and family! 

[Here is the deployed version of my app.](https://reactnd-project-1-myreads.herokuapp.com/)

Note that it may take a few seconds to boot up for the first time as it lives on a free dyno on Heroku.



