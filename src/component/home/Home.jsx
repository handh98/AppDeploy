import React, { Component } from 'react'
import { Button } from "antd";
import LoginService from '../service/author_service/LoginService';


export default class Home extends Component {

    logout = (event) => {
        event.preventDefault();
        LoginService.logout().then(
            () => {
                localStorage.clear();
                this.props.history.push("/");
            }
        ).catch(err => {
            if (err.message.includes('401')) {
                localStorage.clear();
                this.props.history.push("/");
            }
        })
    };

    render() {
        return (
            <div>
                <h1>Hello {localStorage.getItem('user')}</h1>
                <Button onClick={this.logout}>Logout</Button>
            </div>
        )
    }
}
