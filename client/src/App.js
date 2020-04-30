import React, { Component } from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Admin from './Admin'

import Main from './Main'

import cookie from 'react-cookies'

export default class App extends Component {

    render() {
        return (
            <main className="main">
                <BrowserRouter>
                    <Switch>

                        {cookie.load('user') && cookie.load('user').group === "2" &&
                            <Route path="/admin*" render={() => <Admin />} />
                        }

                        <Route render={() => < Main />} />

                    </Switch>
                </BrowserRouter>

            </main>
        )
    }

}