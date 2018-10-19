/***********************************************************************
*
* TODO:
*
* 1) Routing
*    - Install React Router
*    - Install Route elements
*    - Use Link elements
*    - Manage url updates
* 2) Rewrite README, and Add License
*    - License tag in package.JSON
*    - Add a License file
*
***********************************************************************/


import React from 'react'
import BookShelves from './BookShelves'
import SearchPage from './SearchPage'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
    uniqueShelves: ["currentlyReading", "wantToRead", "read", "onHold"] // Shelves to be rendered ** MUST BE CAMELCASED **
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

  showSearchPage = () => {
    this.setState({ showSearchPage: true })
  }

  hideSearchPage = () => {
    this.setState({ showSearchPage: false })
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
        {!this.state.showSearchPage ?
          <BookShelves
            books={this.state.books}
            formatShelfName={this.formatShelfName}
            uniqueShelves={this.state.uniqueShelves}
            showSearchPage={this.showSearchPage}
            moveBook={this.moveBook}
          />
        :
          <SearchPage
            books={this.state.books}
            formatShelfName={this.formatShelfName}
            hideSearchPage={this.hideSearchPage}
            uniqueShelves={this.state.uniqueShelves}
            moveBook={this.moveBook}
          />
        }
      </div>
    )
  }
}

export default BooksApp

