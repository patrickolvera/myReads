import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import sortBy from 'sort-by'
import Book from './Book'

class SearchPage extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    formatShelfName: PropTypes.func.isRequired,
    uniqueShelves: PropTypes.array.isRequired,
    moveBook: PropTypes.func.isRequired
  }

  state = {
    query: '',
    results: []
  }

  updateResults = (query) => {
    this.setState({ query })
    // If searchbox is empty clear state.results
    if (query.trim() === '') {
      this.setState({ results: [] })
      return
    }
    BooksAPI.search(query)
    .then((results) => {
      // If there is an error with API query clear state.results
      if('error' in results) {
        this.setState({ results: [] })
        return
      }
      // If state.query changes before results arrive discard results
      if(this.state.query !== query) {
        return
      }
      // Check if books from results match books in App.state.books
      // and set the shelf value accoridingly
      for (const book of results) {
        const matchingBooks = this.props.books.filter((bookOnShelf) => bookOnShelf.id === book.id)
        matchingBooks.map((bookFromShelf) => book.shelf = bookFromShelf.shelf)
      }
      // Sort book results alphabetically by title
      this.setState({ results: results.sort(sortBy('title')) })
    })
    // If API call results in an error, clear state.results and log error
    .catch((err) => {
      this.setState({ results: [] })
      console.log('Problem getting books: ' + err)
    })
  }

  render () {
    const { uniqueShelves, formatShelfName, moveBook } = this.props
    const { results, query } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateResults(event.target.value)}
              autoFocus
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          { results.map((book) =>
            <Book
              book={book}
              uniqueShelves={uniqueShelves}
              formatShelfName={formatShelfName}
              moveBook={moveBook}
              key={book.id}
            />
          )}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchPage