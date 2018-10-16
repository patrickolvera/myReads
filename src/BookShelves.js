import React, { Component } from 'react';


class BookShelves extends Component {

  render () {

    const { books, moveBook } = this.props
    const uniqueShelves = ["currentlyReading", "wantToRead", "read"]

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
          {uniqueShelves.map((shelfName) => {
            return (
              <BookShelf
                books={books}
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
          {/* TODO: use a Link element here */}
          <a onClick={() => this.props.showSearchPage()}>Add a book</a>
        </div>
      </div>
    )
  }
}

class BookShelf extends Component {

  formatShelfName = (name) => {
    const uncamel = name.replace( /([A-Z])/g, " $1" )
    return uncamel.charAt(0).toUpperCase() + uncamel.slice(1)
  }

  render() {
    const { books, shelf, uniqueShelves, moveBook } = this.props
    const shelfName = this.formatShelfName(shelf)
    const matchingBooks = books.filter((book) => book.shelf === shelf)

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
          { books.filter((book) => book.shelf === shelf)
            .map((book) =>
              <Book
                book={book}
                uniqueShelves={uniqueShelves}
                formatShelfName={this.formatShelfName}
                moveBook={moveBook}
                key={book.id}
              />
            )
          }
          { matchingBooks.length === 0 && (
            <div className="empty-shelf">Add your <b>{shelfName.toLowerCase()}</b> books here</div>
          )}
          </ol>
        </div>
      </div>
    )
  }
}

class Book extends Component {

  render () {
    const { book, uniqueShelves, formatShelfName, moveBook } = this.props
    // Format Author Names
    const lastAuthor = 'and ' + book.authors[book.authors.length - 1]
    const authorsCopy = book.authors.slice(0)

    authorsCopy.splice(-1 , 1, lastAuthor)

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
            <div className="book-shelf-changer">
              <select value={book.shelf} onChange={(event) => moveBook(book, event.target.value)}>
                <option value="move" disabled>Move to...</option>
                {uniqueShelves.map((shelf) =>
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
          {/* TODO: add and here */}
          <div className="book-authors">
          { book.authors.length > 1 ?
            authorsCopy.join(', ')
          :
            book.authors
          }
          </div>
        </div>
      </li>
    )
  }
}

export default BookShelves