import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Bookshelf from './components/Bookshelf';
import SearchBooks from './components/SearchBooks';
import SearchButton from './components/SearchButton';
import * as BooksAPI from './utils/BooksAPI';

class App extends Component {
  state = {
    allBooks: [], 
    showSearchPage: false,
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  componentDidMount() {
    // get books from server
    BooksAPI.getAll()
    // loop through and sort into shelves
    .then((books) => {
      this.setState({ allBooks: books })
      // loop through and sort into shelves
      this.sortBooks(books)
    })
    }

  sortBooks = (allBooks) => {
    let currentlyReading = []
    let wantToRead = []
    let read = [] 
    allBooks.map( (book) => {
      if (book.shelf==="currentlyReading") {
        currentlyReading.push(book)
      } else if (book.shelf==="wantToRead") {
        wantToRead.push(book)
      } else if (book.shelf==="read") {
        read.push(book)
      }
    })
    this.setState({ 
      currentlyReading,
      wantToRead,
      read 
    })
  }


  toggleSearchPage = (showOrNoShow) => {
    this.setState({ showSearchPage: showOrNoShow })
  }

  updateBookShelf = (targetBookShelf, bookId ) => {
    BooksAPI.get(bookId)
    .then(book => {
      BooksAPI.update(book, targetBookShelf)
      .then( () => {
        BooksAPI.getAll()
        .then( books => {
          this.setState({ allBooks: books }) 
          this.sortBooks(books)
        })
      })
    })

  }

  render() {
    return (
      <div className="App">
        <div className="list-books-content">
          { this.state.showSearchPage ? (
            <SearchBooks 
              onBackButtonClick={this.toggleSearchPage}
              updateBookShelf={this.updateBookShelf}
              allBooks={this.state.allBooks}
            />
          ) : (  
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
                <SearchButton 
                  onSearchButtonClick={this.toggleSearchPage}
                />
              </div>  
            </div>
          )}
        </div>  
      </div>
    );
  }
}

export default App;
