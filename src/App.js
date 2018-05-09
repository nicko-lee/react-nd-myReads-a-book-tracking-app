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
    showSearchPage: false,
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  componentDidMount() {
    let currentlyReading = []
    let wantToRead = []
    let read = [] 
    // get books from server
    BooksAPI.getAll()
    // loop through and sort into shelves
    .then((books) => {
      // loop through and sort into shelves
      books.map( (book) => {
        if (book.shelf==="currentlyReading") {
          currentlyReading.push(book)
          this.setState({ currentlyReading })
        } else if (book.shelf==="wantToRead") {
          wantToRead.push(book)
          this.setState({ wantToRead })
        } else if (book.shelf==="read") {
          read.push(book)
          this.setState({ read })
        }
      })
    })
    }

  toggleSearchPage = (showOrNoShow) => {
    this.setState({ showSearchPage: showOrNoShow })
  }

  render() {
    return (
      <div className="App">
        <div className="list-books-content">
          { this.state.showSearchPage ? (
            <SearchBooks 
              onBackButtonClick={this.toggleSearchPage}
            />
          ) : (  
            <div>
              <Header />
              <Bookshelf 
                name="Currently Reading Yo"
                books={this.state.currentlyReading}
              />
              <Bookshelf 
                name="Want to Read Yo"
                books={this.state.wantToRead}
              />
              <Bookshelf 
                name="Read Yo"
                books={this.state.read}
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
