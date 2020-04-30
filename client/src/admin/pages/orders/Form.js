import React, { Component } from 'react'
import MainImage from './MainImage'
import { Link } from 'react-router-dom'

export default class Form extends Component {

    render() {
        return (
            <div className="form col-md-12">
                <form action="" onChange={this.props.onChange} onSubmit={this.props.onSubmit}>

                    <div className="form-group">
                        <label htmlFor="title">User name and last name</label>
                        <input type="text" className="form-control" defaultValue={this.props.order ? this.props.order.username : ""} id="title" name="username" placeholder="Enter name and last name" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="title">User email</label>
                        <input type="text" className="form-control" defaultValue={this.props.order ? this.props.order.email : ""} id="title" name="email" placeholder="Enter user email" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="category_id">Status</label>
                        <select className="form-control" id="category_id" name="status">
                            <option>Select Status</option>
                            {this.props.statuses &&
                                this.props.statuses.map((item, key) =>

                                    <option key={key} value={key} selected={this.props.order.status === item ? true : false}>{item}</option>

                                )
                            }
                        </select>
                    </div>


                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        {/* <input type="text" className="form-control" id="new_price" name="new_price" placeholder="Enter new price" /> */}
                        <textarea className="form-control" name="description" rows="2" id="description" defaultValue={this.props.product ? this.props.product.description : ""} placeholder="Enter description"></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }

}