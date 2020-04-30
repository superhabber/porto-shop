import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'

import axios from 'axios'
import cookie from 'react-cookies'

class Compare extends PureComponent {

    constructor(props) {
        super(props)

        this.state = {
            list: {
                data: []
            }
        }

    }

    componentDidMount = async () => {
        await axios.get(`http://diplom/server/user/compares_cat?user_id=` + cookie.load('user').id)
            .then(res => {
                this.setState({ list: JSON.parse(res.data) })
            }, () => {
                console.log(this.state)
            })
    }

    render() {

        const compare = () => {
            return (
                <>
                    <div className="text-center mt-2 mb-2">
                        <h4>Compare List</h4>
                    </div>

                    {this.state.list &&
                        <table class="table mb-4">
                            <thead class="thead-light">

                                <tr>
                                    <th className="text-center" scope="col">Attribute</th>
                                    {this.state.list.data.map((item) =>
                                        <th className="text-center" scope="col">{item.title}</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>

                                <tr>
                                    <td className="text-center">TITLE</td>
                                    <td className="text-center">{this.state.list.data[0]['title']}</td>
                                    <td className="text-center">{this.state.list.data[0]['title']}</td>
                                </tr>
                                {console.log(this.state.list.compares)}
                                {this.state.list.compares.map((item) =>
                                    <tr>

                                        <td className="text-center">{item.name}</td>
                                        {console.log(item)}
                                        {item.values.map((item, key) =>
                                            <>
                                                {console.log(key)}
                                                <td className="text-center">{item}</td>
                                            </>
                                        )}

                                    </tr>
                                )}

                            </tbody>
                        </table>
                    }
                </>
            )
        }

        const not_enough = () => {
            return (
                <div className="text-center mt-4 mb-4">
                    <h4> Add one more product to compare </h4>
                </div>
            )
        }

        return (
            <div className="container">

                {this.state.list.data.length < 2 ?
                    not_enough()
                    :
                    compare()
                }


            </div>
        )
    }

}

export default withTranslation()(Compare)