import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    shelf: PropTypes.string.isRequired,
    uniqueShelves: PropTypes.array.isRequired,
    moveBook: PropTypes.func.isRequired
  }

  render() {
    const { books, shelf, uniqueShelves, moveBook, formatShelfName } = this.props
    const shelfName = formatShelfName(shelf)
    const matchingBooks = books.filter((book) => book.shelf === shelf)

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
          { matchingBooks.map((book) =>
            <Book
              book={book}
              uniqueShelves={uniqueShelves}
              formatShelfName={formatShelfName}
              moveBook={moveBook}
              key={book.id}
            />
          )}
          { matchingBooks.length === 0 && (
            <div className="empty-shelf">Add your <b>{shelfName.toLowerCase()}</b> books here</div>
          )}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf