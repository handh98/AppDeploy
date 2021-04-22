import React, { Component } from 'react';
import ProjectService from '../../service/project_service/ProjectService';
import ProjectTypeService from '../../service/project_service/ProjectTypeService';
import { Modal, Form, Input, Select, DatePicker } from 'antd';
import moment from 'moment';

const { Option } = Select;
const { RangePicker } = DatePicker;


class CreateProjectModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            projectTypes: [],
            messageErr: ''
        }

    }

    componentDidMount() {
        ProjectTypeService.getAllProjectTypes().then((response) => {
            this.setState({
                projectTypes: response.data
            })
        })
    }




    onCreate = (value) => {

        let projectRequest = {
            Name: value.name,
            StartDate: moment(value.time[0]).format(),
            EndDate: moment(value.time[1]).format(),
            ProjectTypeId: value.projectTypeId
        };
        console.log(projectRequest)
        ProjectService.create(projectRequest).then(
            (response) => {
                this.props.onHide();
            }
        ).catch(err => {
            this.setState({ messageErr: err.response.data.detail.innerMessage })
        })
    }

    handleClose = () => {
        this.setState({ messageErr: '' })
        this.props.onHide();
    };

    render() {
        return (
            <>
                <Modal
                    visible={this.props.showCreateProject}
                    title={'Create project'}
                    onCancel={this.handleClose}
                    okText="Create"
                    onOk={() => {
                        this.form
                            .validateFields()
                            .then((values) => {
                                this.form.resetFields();
                                this.onCreate(values);
                            })
                            .catch((info) => {
                                console.log('Validate Failed:', info);
                            });
                    }}
                >
                    <Form
                        layout='horizontal '
                        wrapperCol={{ span: 30 }}
                        ref={c => { this.form = c }}
                        name="basic"
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                        layout={'inline'}
                    >

                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[{ required: true, message: 'Please input name' }]}
                        >
                            <Input onChange={() => this.setState({ messageErr: '' })} />
                        </Form.Item>
                        <Form.Item
                            label="Time"
                            name="time"
                            rules={[{ required: true, message: 'Please select date' }]}
                        >
                            <RangePicker />
                        </Form.Item>
                        <Form.Item
                            label="Project type:"
                            name={'projectTypeId'}
                            rules={[{ required: true, message: 'Please select type' }]}
                        >
                            <Select style={{ width: 130 }} placeholder='Select type'>
                                {this.state.projectTypes.map((type, index) => (
                                    <Option value={type.id} key={index}>
                                        {type.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                    </Form>
                    <div
                        style={{ color: "red", "font-weight": "bold" }}
                    >{this.state.messageErr}</div>

                </Modal >
            </>
        );
    }
}

export default CreateProjectModal;