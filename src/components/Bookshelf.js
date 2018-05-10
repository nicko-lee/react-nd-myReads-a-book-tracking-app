import React, { Component } from 'react';
import Book from './Book';
import PropTypes from 'prop-types'
import { update } from '../utils/BooksAPI';

class Bookshelf extends Component {
    static propTypes = {
      name: PropTypes.string.isRequired,
      books: PropTypes.array.isRequired,
      updateBookShelf: PropTypes.func.isRequired  
    }
 
    render() {
        return (
          <div className="list-books-content">
          <div> 
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.name}</h2>
                  <div className="bookshelf-books">
                  <ol className='books-grid'>
                      {this.props.books.map( book => (
                        <li key={book.id}>
                        <Book 
                        title={book.title}
                        author={book.authors}
                        imgUrl={book.imageLinks.thumbnail}
                        updateBookShelf={this.props.updateBookShelf}
                        bookId={book.id}
                        bookShelf={book.shelf}
                        /> 
                        </li>
                      ))}
                  </ol>
                  </div>
            </div>
          </div>
          </div>
        )
    }
}

export default Bookshelf