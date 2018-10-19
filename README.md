# MyReads Project

This is my deployment of the final assessment project for Udacity's React Fundamentals course which is part of [Udacity's Front-End Web Developer Nanodegree Program](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001). MyReads utilizes the [React JavaScript framework](https://github.com/facebook/react) and [React Router](https://github.com/ReactTraining/react-router) to create a single page web application that allows you to search for books and keep track of them by putting them on different book shelves.

## Installation

To get MyReads up and running on your local machine first make sure you have npm installed. Npm installs automatically with Node.js. You can check your node version by opening up your terminal and typing:

    node -v

If node isn't installed follow the download instructions on the [NodeJS page](https://github.com/nodejs/node#download).

### Download MyReads

To download the projects files and dependencies run:

    git clone https://github.com/patrickolvera/myreads.git
    cd myreads
    npm install

### Running the app

Start the development server with:

    npm start

## Backend Server

Udacity provided a backend server for me to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods needed to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## License

This project is licensed under the MIT license. View [`LICENSE`](LICENSE) for more information.
