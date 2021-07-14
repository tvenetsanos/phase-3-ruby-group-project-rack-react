import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import SignUp from "./components/signup.js"
import YourVault from "./components/yourvault.js"
import Details from "./components/details.js"
import Main from "./main.js"
import Footer from "./components/footer.js"
import Header from "./components/header.js"

class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Header />
                    <div>
                        <Switch>
                            <Route 
                                render={(routeProps) => {
                                    return <Details {...routeProps}/>
                                }}
                                path="/details">
                            </Route>
                            <Route 
                                render={(routeProps) => {
                                    return <YourVault {...routeProps}/>
                                }}
                                path="/yourvault">
                            </Route>
                            <Route path="/signUp">
                                <SignUp />
                            </Route>
                            <Route path="/">
                                <Main />
                            </Route>
                        </Switch>
                    </div>
                </Router>
                <Footer />
            </div>
        );
    }
}

export default App;