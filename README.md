# The Shoppies

The Shoppies is a website that allows users to search for movies and add up to five movies to a list of nominees. It is my submission for the [2021 Shopify Frontend Challenge](https://docs.google.com/document/d/1AZO0BZwn1Aogj4f3PDNe1mhq8pKsXZxtrG--EIbP_-w/edit#heading=h.31w9woubunro). The website is deployed on Netlify and can be reached from [here](https://shoppies-louisbarrettevanasse.netlify.app/).

The features include:
* Searching for movies
* Adding movies to the list of nominees
* Removing movies from the nominees list
* Notification upon reaching 5 nominees

## Usage

To look up movies, the user may use the search bar to enter a keyword by which to find the desired movie. On pressing enter, a list of movie cards will appear below the search bar with the movie title, year of release, poster, rating and description. There is also a "+" or "-" button the user may use to add or remove a movie from their list of nominees.
At the top-right of the screen is located a button labeled "Nominees" that the user can press on to consult their nominees. A sidebar will then appear with said list of nominees. The user may click on a nominee's title to remove it from the list.

![Screen capture](https://github.com/Louismousine/TheShoppies/tree/main/public/Capture.JPG)

## Technology
The application is made in React. It uses the [burger-menu](https://github.com/negomi/react-burger-menu) library for the sidebar and the [toastify library](https://github.com/fkhadra/react-toastify) for the notification. The [OMDB API](http://www.omdbapi.com/) is used to query movie results from IMDB.
