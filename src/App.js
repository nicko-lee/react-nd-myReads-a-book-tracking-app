import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Bookshelf from './components/Bookshelf';
import SearchBooks from './components/SearchBooks';
import SearchButton from './components/SearchButton';
import * as BooksAPI from './utils/BooksAPI';
import { Route } from 'react-router-dom';

class App extends Component {
  state = {
    allBooks: [], 
    currentlyReading: [],
    wantToRead: [],
    read: []
  };

  componentDidMount() {
    // get books from server
    BooksAPI.getAll()
    // loop through and sort into shelves
    .then((books) => {
      this.setState({ allBooks: books });
      // loop through and sort into shelves
      this.sortBooks(books);
    });
    }

  // send book to bookshelf that was selected
  sortBooks = (allBooks) => {
    let currentlyReading = [];
    let wantToRead = [];
    let read = []; 
    allBooks.map( (book) => {
      if (book.shelf==="currentlyReading") {
        currentlyReading.push(book);
      } else if (book.shelf==="wantToRead") {
        wantToRead.push(book);
      } else if (book.shelf==="read") {
        read.push(book);
      }
    })
    this.setState({ 
      currentlyReading,
      wantToRead,
      read 
    });
  }
  
  // check if selected book exists in this.state.allBooks (i.e. it is a book that's currently on one of our bookshelves)
  isSelectedBookInStateAllBooks = (bookId) => {
    let bool = false;   
    this.state.allBooks.map( book => {
        if (book.id === bookId) {
        bool = true;
        }
      })
      return bool;
  }

  updateBookShelf = (targetBookShelf, bookId ) => {
    let allBooks = [];
    // 2 scenarios:
    // #1: if update book shelf from home page
    if (this.isSelectedBookInStateAllBooks(bookId)) {
      // update book.shelf value in this.state.allBooks array directly
      this.state.allBooks.map( book => {
        if (book.id === bookId) {
          book.shelf=targetBookShelf;
          allBooks.push(book);
        } else {
          allBooks.push(book);
        }
      })
      this.setState({ allBooks });
      this.sortBooks(this.state.allBooks);
      BooksAPI.get(bookId)
      .then(book => BooksAPI.update(book, targetBookShelf));
  } else {
    // #2: if update book shelf from search page
      BooksAPI.get(bookId)
      .then(book => {
        BooksAPI.update(book, targetBookShelf)
        .then( () => {
          BooksAPI.getAll()
          .then( books => {
            this.setState({ allBooks: books }); 
            this.sortBooks(books);
          })
        })
      })

  }

  }


  render() {
    return (
      <div className="App">
        <div className="list-books-content">
          <Route path='/search-books' render={() => (
            <SearchBooks 
              updateBookShelf={this.updateBookShelf}
              allBooks={this.state.allBooks}
            />
          )}/>
          <Route exact path='/' render={() => (
            <div>
                <Header />
                <Bookshelf 
                  name="Currently Reading Yo"
                  books={this.state.currentlyReading}
                  updateBookShelf={this.updateBookShelf}
                />
                <Bookshelf 
                  name="Want to Read Yo"
                  books={this.state.wantToRead}
                  updateBookShelf={this.updateBookShelf}
                />
                <Bookshelf 
                  name="Read Yo"
                  books={this.state.read}
                  updateBookShelf={this.updateBookShelf}
                />
              <div className="search-button">
                <SearchButton />
              </div>  
            </div>
          )}/>
  
        </div>  
      </div>
    );
  }
}

export default App;
