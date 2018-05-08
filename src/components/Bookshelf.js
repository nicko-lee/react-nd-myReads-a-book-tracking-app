import React, { Component } from 'react';
import Book from './Book';
import PropTypes from 'prop-types'

class Bookshelf extends Component {
    static propTypes = {
      name: PropTypes.string.isRequired,
      books: PropTypes.array.isRequired  
    }
 
    render() {
        return (
          <div className="list-books-content">
          <div> 
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.name}</h2>
                  <div className="bookshelf-books">
                  <ol className='books-grid'>
                      {this.props.books.map((book) => (
                        <li key={book.name}>
                        <Book 
                        title={book.title}
                        author={book.author}
                        imgUrl={book.imgUrl}
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