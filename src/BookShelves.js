import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'


class BookShelves extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    moveBook: PropTypes.func.isRequired
  }

  render () {

    const { books, moveBook, uniqueShelves, formatShelfName } = this.props

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
          { uniqueShelves.map((shelfName) => {
            return (
              <BookShelf
                books={books}
                formatShelfName={formatShelfName}
                shelf={shelfName}
                uniqueShelves={uniqueShelves}
                moveBook={moveBook}
                key={shelfName}
              />
            )
          })}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BookShelves
