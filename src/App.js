/***********************************************************************
*
* TODO:
*
* Rewrite README, and Add License
*    - License tag in package.JSON
*    - Add a License file
*
***********************************************************************/


import React from 'react'
import { Route } from 'react-router-dom'
import BookShelves from './BookShelves'
import SearchPage from './SearchPage'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    uniqueShelves: ["currentlyReading", "wantToRead", "read"] // Shelves to be rendered ** MUST BE CAMELCASED **
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
    .catch((err) => console.log('Problem getting books: ' + err))
  }

  formatShelfName = (name) => {
    const uncamel = name.replace( /([A-Z])/g, " $1" )
    return uncamel.charAt(0).toUpperCase() + uncamel.slice(1)
  }

  moveBook = async (book, shelf) => {
    try {
      await BooksAPI.update(book, shelf)
    } catch(err) {
      console.log(err)
      return
    }

    book.shelf = shelf
    // Get rid of old book in state.books and add updated book
    const movedBooks = this.state.books.filter((b) => (b.id !== book.id)).concat(book)
    this.setState({ books: movedBooks })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BookShelves
            books={this.state.books}
            formatShelfName={this.formatShelfName}
            uniqueShelves={this.state.uniqueShelves}
            moveBook={this.moveBook}
          />
        )}/>
        <Route path="/search" render={() => (
          <SearchPage
            books={this.state.books}
            formatShelfName={this.formatShelfName}
            uniqueShelves={this.state.uniqueShelves}
            moveBook={this.moveBook}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp

