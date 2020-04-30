import React, { PureComponent } from 'react'
import MainImage from './MainImage'

import axios from 'axios'

export default class Form extends PureComponent {

    state = {
        show_c: false
    }

    paramChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        }, () => {
            
            this.props.paramChange(this.state)
        })
    }

    changeCategory = async (e) => {
        var id = e.target.value
        await axios.get(`http://diplom/server/admin/parameters_by_category?id=` + id)
            .then(res => {
                this.setState({
                    parameters: JSON.parse(res.data),
                    show_c: true
                })
            })

    }

    render() {
        return (
            <div className="form col-md-12">
                <form action="" onChange={this.props.onChange} onSubmit={this.props.onSubmit}>

                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" className="form-control" defaultValue={this.props.product ? this.props.product.title : ""} id="title" name="title" placeholder="Enter product title" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="params">Sizes</label>
                        <textarea  defaultValue={this.props.sizes ? this.props.sizes : ""} id="params" rows="5" name="sizes" className="form-control"></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="category_id">Category</label>
                        <select className="form-control" id="category_id" name="category_id" onChange={this.changeCategory}>
                            <option>Select category</option>
                            {this.props.categories &&
                                this.props.categories.map((item, key) =>
                                    <option key={key} value={item.id} selected={this.props.product ? this.props.product.category_id === item.id : false}>{item.title}</option>
                                )
                            }
                        </select>
                    </div>

                    {this.state.show_c &&
                        <div className="form-group">
                            <hr />
                            <h5>Parameters:</h5>
                            {this.state.parameters.map((item) =>
                                <>
                                    <label htmlFor={item}>{item}</label>
                                    <input type="text" className="form-control" onChange={this.paramChange} id={item} name={item} placeholder={`Enter ${item}`} />
                                </>
                            )}
                            <hr />
                        </div>

                    }

                    {this.props.product &&
                        <div className="row col-md-4 offset-md-4 text-center">
                            <a href={"http://diplom/server" + this.props.product.image.src} target="_blank">
                                <img src={"http://diplom/server" + this.props.product.image.src} className="col-md-12" />
                            </a>
                        </div>

                    }
                    <MainImage onImageChange={this.props.onImageChange} />

                    <div className="form-group">
                        <label htmlFor="old_price">Old price</label>
                        <input type="number" className="form-control" id="old_price" name="old_price" defaultValue={this.props.product ? this.props.product.old_price : ""} placeholder="Enter old price" />
                        <small>if the product has not old price leave this empty</small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="new_price">New price</label>
                        <input type="number" className="form-control" id="new_price" name="new_price" defaultValue={this.props.product ? this.props.product.new_price : ""} placeholder="Enter new price" />
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