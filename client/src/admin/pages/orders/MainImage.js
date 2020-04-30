import React, { Component } from 'react'

export default class MainImage extends Component {

    render() {
        return (
            <div className="form-group">
                <label htmlFor="main_image">Main Image</label>
                <input type="file" className="form-control" onChange={ this.props.onImageChange } />
            </div>
        )
    }

}