import React, { Component } from 'react';
import PropTypes from 'prop-types'

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    uniqueShelves: PropTypes.array.isRequired,
    formatShelfName: PropTypes.func.isRequired,
    moveBook: PropTypes.func.isRequired
  }

  render () {
    const { book, uniqueShelves, formatShelfName, moveBook } = this.props
    // If no thumbnail leave blank
    let url
    if (book.imageLinks) {
      url = `url(${book.imageLinks.smallThumbnail})`
    }
    // Format Author Names
    let lastAuthor
    let authorsCopy
    // If no authors skip formatting
    if (book.authors) {
      lastAuthor = 'and ' + book.authors[book.authors.length - 1]
      authorsCopy = book.authors.slice(0)
      authorsCopy.splice( -1, 1, lastAuthor )
    }
    // If no book.shelf set select value to "none"
    if (!book.shelf) {
      book.shelf = 'none'
    }

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: url }}></div>
            <div className="book-shelf-changer">
              <select value={book.shelf} onChange={(event) => moveBook(book, event.target.value)}>
                <option value="move" disabled>Move to...</option>
              { uniqueShelves.map((shelf) =>
                <option
                  key={shelf}
                  value={shelf}
                  >{formatShelfName(shelf)}
                </option>
              )}
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">
          { book.authors && (book.authors.length > 1 ?
            authorsCopy.join(', ')
          :
            book.authors
          )}
          </div>
        </div>
      </li>
    )
  }
}

export default Book