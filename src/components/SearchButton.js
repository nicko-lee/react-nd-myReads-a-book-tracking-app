import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SearchButton extends Component {
    static propTypes = {
        onSearchButtonClick: PropTypes.func.isRequired,
      }

    render() {
        return(
            <div className="open-search">
                <a onClick={() => this.props.onSearchButtonClick()}>Add a book</a>
            </div>
        )
    }
    
}

export default SearchButton