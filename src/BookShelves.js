import React, { Component } from 'react';


class BookShelves extends Component {

  render () {

    const { books } = this.props
    const shelves = []
    let previousShelf = null

    // Create bookshelves
    books.forEach((book) => {
      if (book.shelf !== previousShelf) {
        shelves.push(
          <BookShelf books={books} shelf={book.shelf} key={book.shelf}/>
        )
      }
      previousShelf = book.shelf
    })

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelves}
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

  render() {
    const { books, shelf } = this.props
    // Format shelf name
    const shelfString = this.props.shelf.replace( /([A-Z])/g, " $1" )
    const shelfName = shelfString.charAt(0).toUpperCase() + shelfString.slice(1)

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
        {/* Add the correct books to current shelf */}
          {books.filter((book) => book.shelf === shelf)
          .map((book) => <Book book={book} key={book.id}/>)}
          </ol>
        </div>
      </div>
    )
  }
}

class Book extends Component {

  render () {
    const { book } = this.props
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
            <div className="book-shelf-changer">
              <select>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors.join(', ')}</div>
        </div>
      </li>
    )
  }
}

export default BookShelves