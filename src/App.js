import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import toastr from 'toastr';
import Header from './components/common/Header';
import RegisterPage from './components/Auth/RegisterPage';
import LoginPage from './components/Auth/LoginPage';
import HomePage from './components/HomePage/HomePage';
import CreateFurnitere from './components/CreateFurniture/CreateFurniturePage';
import MyFurniture from './components/MyFurniture/MyFurniturePage';
import DetailsPage from './components/Details/DetailsPage';
import DeleteFurnitere from './components/MyFurniture/DeleteFurniture';
import PageNotFound from './components/common/PageNotFound';
import PrivateRoute from './components/common/PrivateRoute';

class App extends Component {
    constructor(props) {
        super(props);

        this.onLogout = this.onLogout.bind(this);
    }

    onLogout() {
        localStorage.clear();
        toastr.success('The logout was successful')
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="App">
                <Header loggedIn={localStorage.getItem('authToken') != null} onLogout={this.onLogout} />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/page/:page" component={HomePage} />
                    <PrivateRoute path="/details/:id" component={DetailsPage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                    <PrivateRoute path="/create" component={CreateFurnitere} />
                    <PrivateRoute path="/profile" component={MyFurniture} />
                    <PrivateRoute path="/furniture/delete/:id" component={DeleteFurnitere} />
                    <Route component={PageNotFound} />
                </Switch>
            </div>
        );
    }
}

export default withRouter(App);