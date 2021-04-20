import React, { Component } from 'react'
import { Button, Input, Form, Card, Row, Col } from 'antd'
import LoginService from '../service/author_service/LoginService';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messageErr: "",
            loading: false
        };

    }

    onFinish = (values) => {
        this.setState(
            {
                loading: true,
            },
            () => {
                let loginRequest = {
                    Username: values.username,
                    Password: values.password,
                };
                LoginService
                    .login(loginRequest)
                    .then((res) => {
                        localStorage.setItem("user", res.user.username);

                        this.props.history.push("/home");
                    })
                    .catch((err) => {
                        this.setState({
                            loading: false,
                            messageErr: "Username or password is incorrect!",
                        });
                    });
            }
        );
    };

    onFinishFailed = (errorInfo) => {
    };

    render() {

        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };
        const tailLayout = {
            wrapperCol: { offset: 8, span: 16 },
        };

        return (
            <Row>
                <Col span={12} offset={9}>
                    <Card title="Login" style={{ width: 400, marginTop: 100 }}>
                        <Form
                            {...layout}
                            name="basic"
                            onFinish={this.onFinish}
                            onFinishFailed={this.onFinishFailed}
                        >
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item {...tailLayout}>
                                <Button type="link" style={{ float: 'left' }} href='/register'>
                                    Sign up
                                </Button>
                                <Button type="primary" htmlType="submit" loading={this.state.loading}>
                                    Submit
                                </Button>

                            </Form.Item>
                        </Form>
                        <div
                            style={{ color: "red", "font-weight": "bold" }}
                        >
                            {this.state.messageErr}
                        </div>
                    </Card>
                </Col>
            </Row>
        )
    }
}
