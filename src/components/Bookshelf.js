import React, { Component } from 'react';
import Book from './Book';
import PropTypes from 'prop-types'

class Bookshelf extends Component {

  constructor(props) {
    super(props)
    console.log(this.props)
  }

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
                      {this.props.books.map( book => (
                        <li key={book.id}>
                        <Book 
                        title={book.title}
                        author={book.authors}
                        imgUrl={book.imageLinks.thumbnail}
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