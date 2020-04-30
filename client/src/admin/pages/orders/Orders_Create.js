import React, { Component } from 'react'
import Form from './Form'
import axios from 'axios'
import $ from 'jquery'

export default class Orders_Create extends Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            colors: []
        }
        this.onImageChange = this.onImageChange.bind(this)
    }

    componentWillMount = async () => {
        await axios.get(`http://diplom/server/admin/all_categories`)
            .then(res => {
                this.setState({
                    categories: JSON.parse(res.data)
                })
            })
        await axios.get(`http://diplom/server/admin/all_colors`)
            .then(res => {
                this.setState({
                    colors_filter: JSON.parse(res.data)
                })
            })
    }

    state = {}
    UPLOAD_ENDPOINT = 'http://diplom/server/admin/image';
    onSubmit = async (e) => {
        e.preventDefault()

        await this.saveProduct(this.state.file);
    }

    onImageChange(e) {
        this.setState({ file: e.target.files[0] })
    }

    async saveProduct(file) {

        const formData = new FormData();

        formData.append('avatar', file)

        return await axios.post(this.UPLOAD_ENDPOINT, formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }).then(async (res) => {
            var path = JSON.parse(res.data).path
            await axios.post(`http://diplom/server/admin/create_product`, JSON.stringify({
                product: this.state,
                imagePath: path
            }))
                .then(res => {
                    this.props.history.push('/admin/products/' + JSON.parse(res.data).id + "/view")
                })
        });
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    setColor = (e, color) => {
        e.preventDefault()

        var li = $($(e.target)[0]).parent()[0]

        $(li).toggleClass('active')

        if ($(li).hasClass('active')) {
            this.state.colors.push(color)
        } else {
            this.setState({
                colors: this.state.colors.filter(item => item !== color)
            })
        }
    }

    render() {
        return (
            <div className="create-product">
                <h3>Create new product</h3>

                <div className="row">
                    <Form 
                        onSubmit={this.onSubmit} 
                        onChange={this.onChange} 
                        onImageChange={this.onImageChange} 
                        categories={this.state.categories}
                        colors_filter={this.state.colors_filter}
                        setColor={this.setColor}
                    />
                </div>
            </div>
        )
    }

}