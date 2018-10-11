/***********************************************************************
*
* TODO:
*
* 1) Compose and attach methods for managing book state
*   <- Home page ->
*     * Book changes shelf on user input
*   <- Search page ->
*     * Install PropTypes, escapeRegExp, and sortBy
*     * Search functionality (using BooksAPI)
*     * State managed on search page (changing book's shelf)
* 2) Routing
*    - Install React Router
*    - Install Route elements
*    - Use Link elements
*    - Manage url updates
* 3) Rewrite README
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
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  showSearchPage = () => {
    this.setState({ showSearchPage: true })
  }

  hideSearchPage = () => {
    this.setState({ showSearchPage: false })
  }

  render() {
    return (
      <div className="app">
        {!this.state.showSearchPage ?
          <BookShelves
          books={this.state.books}
          showSearchPage={this.showSearchPage}
          />
        :
          <SearchPage
            hideSearchPage={this.hideSearchPage}
          />
        }
      </div>
    )
  }
}

export default BooksApp

