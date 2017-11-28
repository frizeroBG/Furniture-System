import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { getStats } from '../../api/remote';

export default class Header extends Component {
    constructor(props){
        super(props);

        this.state = {
            furniture: 0,
            users : 0
        }

        //bind
        this.status = this.status.bind(this);
    }

    componentDidMount() {
        this.status();
    }

    async status(){
        let res = await getStats();
        this.setState({
            users: res.users,
            furniture: res.furniture
        })
    }


    render() {
        const { loggedIn, onLogout } = this.props;

        return (
            <header>
                <nav className="navbar navbar-dark bg-primary">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <NavLink className="navbar-brand" to="/">FS</NavLink>
                                <NavLink className="nav-link" exact to="/" activeClassName="active">Home</NavLink>
                                {loggedIn && <NavLink className="nav-link" to="/create" activeClassName="active">Create Furniture</NavLink>}
                                {loggedIn && <NavLink className="nav-link" to="/profile" activeClassName="active">My Furniture</NavLink>}
                                {loggedIn && <a className="nav-link" href="javascript:void(0)" onClick={onLogout}>Logout</a>}
                                {!loggedIn && <NavLink className="nav-link" to="/login" activeClassName="active">Login</NavLink>}
                                {!loggedIn && <NavLink className="nav-link" to="/register" activeClassName="active">Register</NavLink>}
                                <span>{this.state.furniture} items in catalog </span>
                                <span>{this.state.users} total users in this site</span>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}

