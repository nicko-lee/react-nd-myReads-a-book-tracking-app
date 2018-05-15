import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from '../utils/BooksAPI';
import Book from './Book';
import _ from 'lodash';
import { Link } from 'react-router-dom';

class SearchBooks extends Component {
    static propTypes = {
        updateBookShelf: PropTypes.func.isRequired,  
        allBooks: PropTypes.array.isRequired
      };

    state = {
        query: '',
        booksReturned: [],
        error: false
    };

    updateQueryOnSearchInputChange = (query) => {
        const bookSearch = _.debounce((query) => { this.searchBooks(query) }, 300);
        this.setState(() => ({ query }));
        bookSearch(query);
    }

    searchBooks = (query) => {
            BooksAPI.search(query)  // search for books from hitting server endpoint /search using query above
            .then( books => {
                const booksError = books.error ? true : false;

                this.setState({ 
                    booksReturned: books,
                    error: booksError
                });
            })
            .catch(error => {
                this.setState({ 
                    booksReturned: [],
                    query: ''
                });
            });
    
    }

    getBookShelf = (targetBook) => {
        let bookShelfName = 'none';
        // based on bookId of current book
        this.props.allBooks.map( book => {
            if (book.id===targetBook.id) {
                bookShelfName=book.shelf;
            }
        });
        return bookShelfName;
    }

    render() {
        
        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link 
                        to='/'
                        className="close-search" 
                    >Close</Link>
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
                            value={this.state.query}
                            onChange={ (event) => this.updateQueryOnSearchInputChange(event.target.value)}  
                        />

                    </div>
                </div>
                <div className="search-books-results">
                
                {(this.state.error && this.state.query !== '') && (<div className="query-not-found-msg">Sorry, there ain't no results for '{this.state.query}'.....¯\_(ツ)_/¯ </div>)}

                    { (this.state.booksReturned.length !== 0 && !this.state.error) ? ( 
                        <ol className="books-grid">
                        {this.state.booksReturned.map( book => (
                            <li key={book.id}>
                            <Book 
                            title={book.title || ''}
                            author={book.authors || []}
                            imgUrl={(book.imageLinks && book.imageLinks.thumbnail) ? book.imageLinks.thumbnail : ''}
                            updateBookShelf={this.props.updateBookShelf}
                            bookId={book.id || ''}
                            bookShelf={this.getBookShelf(book)}
                            /> 
                            </li>
                        ) )}
                        </ol>
                    ) : null
                    }
                </div>
            </div>
        )
    }
    
}

export default SearchBooks;