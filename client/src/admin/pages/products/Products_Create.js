import React, { Component } from 'react'
import Form from './Form'
import axios from 'axios'
import $ from 'jquery'

export default class Products_Create extends Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            parameters: {},
            colors: []
        }
        this.onImageChange = this.onImageChange.bind(this)
        this.paramChange = this.paramChange.bind(this)
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
            console.log(this.state.parameters)

            this.state.sizes = this.state.sizes.split(' ')
            await axios.post(`http://diplom/server/admin/create_product`, JSON.stringify({
                product: this.state,
                imagePath: path
            }))
                .then(res => {
                   this.props.history.push('/admin/products/' + JSON.parse(res.data).id + "/view")
                })
        });
    }

    paramChange = (val) => {
        this.setState({
            parameters: val
        })
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
            <div className="page-wrapper">

                <div className="page-breadcrumb">
                    <div className="row">
                        <div className="col-12 d-flex no-block align-items-center">
                            <h4 className="page-title">Create new product</h4>
                            <div className="ml-auto text-right">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Products Create</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container-fluid">

                    <div className="row">
                        <Form
                            onSubmit={this.onSubmit}
                            onChange={this.onChange}
                            onImageChange={this.onImageChange}
                            paramChange={this.paramChange}
                            categories={this.state.categories}
                            colors_filter={this.state.colors_filter}
                            setColor={this.setColor}
                        />
                    </div>
                </div>
            </div>
        )
    }

}