import React, { Component } from 'react'

export default class Form extends Component {

    render() {
        return (
            <div className="form col-md-12">
                <form action="" onSubmit={this.props.onSubmit}>

                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" defaultValue={this.props.category ? this.props.category.title : ""} className="form-control" id="title" name="title" placeholder="Enter product title" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="title">Parent Category</label>
                        
                        <select className="form-control" name="size_type">
                            <option value="0" selected={this.props.category ? (this.props.category.main === "0" ? true : false) : ""}>Man</option>
                            <option value="1" selected={this.props.category ? (this.props.category.main === "1" ? true : false) : ""}>Woman</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="params">Parameters</label>
                        <textarea  defaultValue={this.props.parameters ? this.props.parameters : ""} id="params" rows="5" name="parameters" className="form-control"></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }

}