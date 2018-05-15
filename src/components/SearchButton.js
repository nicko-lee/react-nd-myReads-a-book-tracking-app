import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class SearchButton extends Component {

    render() {
        return(
            <div className="open-search">
                <Link 
                    to='/search-books'
                >Add a book</Link>
            </div>
        );
    }
    
}

export default SearchButton;