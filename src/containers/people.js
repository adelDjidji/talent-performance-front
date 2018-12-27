import React, { Component } from 'react'
import axios from 'axios'

import {Table, Icon, Input, Row, Col, Spin} from 'antd'
import FormAddUser from '../component/formAddUser'

const colums= [
    {
                title: 'ID',
                dataIndex: 'matricule',
                key: 'id',
                sorter: (a,b) => a.article_id - b.article_id,
    },{
                title: 'Nom',
                dataIndex: 'firstname',
                key: 'firstname',
                sorter: (a,b) => (a.firstname).localeCompare(b.firstname),
    },{
        title: 'Prenom',
        dataIndex: 'lastname',
        key: 'lastname',
        sorter: (a,b) => (a.lastname).localeCompare(b.lastname),
    },{
        title: 'Post',
        dataIndex: 'post',
        key: 'post',
        sorter: (a,b) => (a.post).localeCompare(b.post),
    },{
        title: 'Nom Responsable N+1',
        dataIndex: 'respo1_first',
        key: 'respo1_first',
        sorter: (a,b) => (a.respo1_first).localeCompare(b.respo1_first),
    },{
        title: 'Prenom Responsable N+1',
        dataIndex: 'respo1_last',
        key: 'respo1_last',
        sorter: (a,b) => (a.respo1_last).localeCompare(b.respo1_last),
    }
]


export default class People extends Component {

    constructor(props){
        super(props)
    }

    componentWillMount(){
        console.log("getting data")
        axios({
            method: 'get',
            baseURL: 'http://localhost:3005/user/all',
            headers: {'Access-Control-Allow-Origin': '*'}
            })
        .then( (response)=> {
            console.log("data is here ")
            if(response.data){
                console.log("yes", response.data)
            this.setState({users:response.data, feathing:false})
            } 
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    state = { 
        feathing:true,
        users:[]
     }
    render() {
        if(this.state.feathing) return ( <Spin size="large" />)
        else return (
            <div>
                <Table bordered dataSource={this.state.users} columns={colums} />  
                
            </div>
            
        );
    }
}