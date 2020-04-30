import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import { withRouter } from 'react-router-dom'

import axios from 'axios'
import OwlCarousel from 'react-owl-carousel2'

class Dress_Room_Men extends PureComponent {

    constructor(props) {
        super(props)

        this.state = {
            male: props.male,
            sizes: undefined,
            current: undefined,
            status: {
                width: undefined,
                height: undefined
            },
            diff: {
                width: undefined,
                height: undefined
            },
            values: {
                width: 40,
                height: 60
            },
            best: {
                width: undefined,
                height: undefined
            }
        }
    }

    componentDidMount = async () => {
        await axios.get(`http://diplom/server/size/size_names`)
            .then(res => {
                this.setState({
                    sizes: JSON.parse(res.data).sizes
                })
            })

        await this.updateData()
    }

    updateData = async () => {
        await axios.get(`http://diplom/server/size/sizes_man?width=` + this.state.values.width + `&height=` + this.state.values.height)
            .then(res => {
                var data = JSON.parse(res.data)
                this.setState({
                    current: data.good_size.code,
                    diff: {
                        width: data.sizes_info.width.diff,
                        height: data.sizes_info.height.diff
                    },
                    status: {
                        width: data.sizes_info.width.status,
                        height: data.sizes_info.height.status
                    },
                    best: {
                        width: data.sizes_info.width.cm,
                        height: data.sizes_info.height.cm
                    }
                })

            })
    }

    onChange = async (e) => {
        this.setState({
            values: {
                height: e.target.name === 'height' ? Number(e.target.value) : this.state.values.height,
                width: e.target.name === 'width' ? Number(e.target.value) : this.state.values.width
            }
        }, () => {
            this.updateData()
        })
    }

    changeCurrent = async (item) => {

        await axios.get(`http://diplom/server/size/size_by_key_man?width=` + this.state.values.width + `&height=` + this.state.values.height + `&key=` + item)
            .then(res => {
                var data = JSON.parse(res.data)
                this.setState({
                    current: item,
                    diff: {
                        width: data.sizes_info.width.diff,
                        height: data.sizes_info.height.diff
                    },
                    status: {
                        width: data.sizes_info.width.status,
                        height: data.sizes_info.height.status
                    },
                    best: {
                        width: data.sizes_info.width.cm,
                        height: data.sizes_info.height.cm
                    }
                })
            })

    }

    render() {

        const circle = (status) => {
            if (status === 0) {
                return <div className="LS_block_different  diff- diff0">&#10004;</div>
            } else if (status === 1) {
                return <div className="LS_block_different  diff- diff1">!</div>
            } else {
                return <div className="LS_block_different  diff- diff2">X</div>
            }
        }

        return (
            <div className="container">
                <link rel="stylesheet" href="/assets/main/css/ls.css" />
                <script src="https://www.looksize.com/js/ls.js?_=6"></script>
                <div id="LS_main" className="LS_form LS_2col">

                    <div id="LS_figure" className="LS_figure  LS_figure_male" style={{ display: "block" }}>

                    <div className={`LS_line width_shoulders diffundefined wide diff${this.state.status.width}`} style={{ display: "block" }}><i>
                            {this.state.diff.width}
                        </i></div>

                        <div className={`LS_line length_shoulders diffundefined wide diff${this.state.status.height}`} style={{ display: "block" }}><i>
                            {this.state.diff.height}
                        </i></div>
                        
                    </div>
                    <div className="LS_block_brand_size">

                        <div className="LS_clr"></div>
                        <div id="LS_block_size" className="LS_block_size LS_block_size_left">
                            <span id="LS_size_items">
                                {this.state.sizes &&
                                    <OwlCarousel ref="sizes" options={{ items: 4, lazyLoad: true }} >

                                        {this.state.sizes.map((item, key) =>

                                            <span onClick={() => this.changeCurrent(item)} key={key} id={"LS_item__5"} data-id="_5" className={"LS_item " + (this.state.current === item ? "LS_cur_item" : " ")}>{item}</span>
                                        )}

                                    </OwlCarousel>
                                }
                            </span>
                        </div>
                    </div>

                    <div className="LS_block_data_entry">

                        <div className="LS_field_title ">
                            <span id="LS_title_us">Your<br />measurements</span>
                            <span id="LS_title_sm">Cm</span>
                            <span className="LS_title_bs">
                                <span id="LS_title_bs"><br />Size:</span>
                                <span id="LS_current_size">{this.state.current ? this.state.current : "Select"}</span>
                            </span>
                        </div>
                        <div id="LS_block_fields">

                            <div className="LS_field height LS_need_field" data-size_name="height" data-size_figure="">
                                <label className="LS_caption  LS_show_video" data-title="How to measure chest girth correctly">Height</label>
                                <div className="LS_block_edit">
                                    <input onChange={this.onChange} className="LS_edit_field" name="height" defaultValue={this.state.values.height} min="60" max="80" step="0.1" type="number" pattern="[0-9]{1,3}" maxLength="3" />
                                </div>
                                <div className="LS_block_product_size">{this.state.best.height} cm</div>
                                {circle(this.state.status.height)}

                            </div>

                            <div className="LS_field width LS_need_field" data-size_name="width" data-size_figure="">
                                <label className="LS_caption  LS_show_video" data-title="How to measure width circumference">Width</label>
                                <div className="LS_block_edit">
                                    <input onChange={this.onChange} className="LS_edit_field" name="width" defaultValue={this.state.values.width} min="40" max="70" step="0.1" type="number" pattern="[0-9]{1,3}" maxLength="3" />
                                </div>
                                <div className="LS_block_product_size">{this.state.best.width} cm</div>
                                {circle(this.state.status.width)}
                            </div>

                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }

}

export default withTranslation()(withRouter(Dress_Room_Men))