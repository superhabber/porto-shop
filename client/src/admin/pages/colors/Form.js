import React, { Component } from 'react'

export default class Form extends Component {

    
    render() {
        return (
            <div className="form col-md-12">
                <form action="" onSubmit={this.props.onSubmit}>

                    <div className="form-group">
                        <label htmlFor="title">Name</label>
                        <input type="text" className="form-control" id="title" name="name" placeholder="Enter color name" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="value">Value</label> <a href="https://www.w3schools.com/colors/colors_picker.asp" rel="noopener noreferrer" target="_blank">Select color ( starts with # )</a>
                        <input type="text" className="form-control" id="value" name="value" placeholder="Enter color value hash" />
                    </div>
                    

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div >
        )
    }

}