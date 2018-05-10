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
        this.setState({ currentlyReading })
      } else if (book.shelf==="wantToRead") {
        wantToRead.push(book)
        this.setState({ wantToRead })
      } else if (book.shelf==="read") {
        read.push(book)
        this.setState({ read })
      }
    })
  }


  toggleSearchPage = (showOrNoShow) => {
    this.setState({ showSearchPage: showOrNoShow })
  }

  updateBookShelf = (targetBookShelf, bookId, originBookShelf ) => {
    // update book.shelf value in allBooks array
    let allBooks = []
    this.state.allBooks.map( book => {
      if (book.id === bookId) {
        book.shelf=targetBookShelf
        allBooks.push(book)
      }
      else {
        allBooks.push(book)
      }
    })
    this.setState({ allBooks })

    // send book to bookshelf that was selected
    this.sortBooks(this.state.allBooks)

    // // grab original list of books from state
    // const updatedBookArray = this.state.books

    // console.log('updatedBookshelf', updatedBookshelf)
    // // change shelf of book based on bookId
    
    // //updateAllBooks with updatedBookArray

    // // this.setState({
      

    // })
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
