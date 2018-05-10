import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        author: PropTypes.array.isRequired,
        imgUrl: PropTypes.string.isRequired,
        updateBookShelf: PropTypes.func.isRequired,
        bookId: PropTypes.string.isRequired,
        bookShelf: PropTypes.string.isRequired
    }


    render() {
        return(
            <div className="book">
                <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.imgUrl})` }}></div>
                <div className="book-shelf-changer">
                    <select value={this.props.bookShelf} onChange={(e) => this.props.updateBookShelf(e.target.value, this.props.bookId, this.props.bookShelf)}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
                </div>
                <div className="book-title">{this.props.title}</div>
                { this.props.author.map( author => <div key={author} className="book-authors">{author}</div> )}
            </div>

        )
    }

}

export default Book





