import React, { Component } from 'react'
import { Button, Table } from "antd";
import LoginService from '../../service/author_service/LoginService';
import moment from "moment";
import projectService from '../../service/project_service/ProjectService';
import CreateProjectModal from '../project/CreateProjectModal';



export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            projects: [],
            showModal: false
        };
    }

    componentDidMount() {
        this.getAllProject();
    }

    getAllProject() {
        projectService.getAllProject().then((response) => {
            if (response.data.length) {
                let projects = [];

                response.data.forEach((project) => {
                    project.startDate = moment(project.startDate).format("DD-MM-YYYY");
                    project.endDate = moment(project.endDate).format("DD-MM-YYYY");
                    projects.push(project);
                });

                this.setState({
                    projects: projects,
                });
            }
        }).catch(err => {
            if (err.message.includes('401')) {
                localStorage.clear();
                this.props.history.push("/");
            }
        })
    }

    showModal = () => {
        this.setState({
            showModal: true
        })
    }

    closeModal = () => {
        this.setState({
            showModal: false
        })
        this.getAllProject()
    }

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
        const tableData = this.state.projects;
        const columns = [
            {
                title: "Project Name",
                dataIndex: "name",
                key: "name"
            },
            {
                title: "Project Type",
                dataIndex: "projectType",
                key: "projectType",
                render: (projectType) => <>{projectType.name}</>,
            },
            {
                title: "Start Date",
                dataIndex: "startDate",
                key: "startDate",
            },
            {
                title: "End Date",
                dataIndex: "endDate",
                key: "endDate",
            },
            {
                title: "Current stage",
                dataIndex: "lastSprint",
                key: "lastSprint",
                render: lastSprint => lastSprint ? <>{lastSprint.stage.name}</> : <></>,
            },

            {
                title: " Last sprint",
                dataIndex: "lastSprint",
                key: "lastSprint",
                render: lastSprint => lastSprint ? <>{lastSprint.no}</> : <></>,
            }
        ];
        return (
            <div>
                <h1>Hello {localStorage.getItem('user')}</h1>
                <h2>PROJECT</h2>
                <Button onClick={this.showModal} style={{ float: 'left' }}>Create project</Button>
                <Button onClick={this.logout} style={{ float: 'right' }}>Logout</Button>
                <Table
                    pagination={{ position: ['bottomCenter'] }}
                    className="thead-dark"
                    columns={columns}
                    dataSource={tableData}
                />
                <CreateProjectModal
                    showCreateProject={this.state.showModal}
                    onHide={this.closeModal}
                />
            </div>
        )
    }
}
