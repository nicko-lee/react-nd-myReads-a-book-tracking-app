import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import Bookshelf from './components/Bookshelf'
// import SearchButton from './components/SearchButton';
import SearchBooks from './components/SearchBooks';
import SearchButton from './components/SearchButton';


class App extends Component {
  state = {
    showSearchPage: false
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
              <Bookshelf />
              <SearchButton 
                onSearchButtonClick={this.toggleSearchPage}
              />
            </div>
          )}
        </div>  
      </div>
    );
  }
}

export default App;
