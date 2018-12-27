import React, { Component } from 'react';
import { Tabs, Icon, Spin } from 'antd';
import UserInfo from './userInfos'
import UserObj from './userObj'
import ObjForm from '../component/formObjectifs'

import axios from 'axios'
import  FormMiddleEval  from "../component/FormMiddleEval";

import {server_url} from '../config/var'
const TabPane = Tabs.TabPane;

export default class UserDetail extends Component{
constructor(props){
    super(props)
    this.user_id = this.props.location.state.user_id
    this.state={
        featching:true,
        infos:{}
    }
    this.charger = this.charger.bind(this)
    console.log("this user is ",this.user_id)
}
charger=()=>{
    axios({
        method: 'get',
        baseURL: server_url+'/user/details/'+this.user_id,
        headers: {'Access-Control-Allow-Origin': '*' }
        })
    .then( (response)=> {
        console.log("INOF DETAILS =",response.data)
        this.setState({infos:response.data, featching:false})
        
    })
    .catch(function (error) {
        console.log(error);
    });
 
}
componentWillMount(){
    this.charger()   
}
    render(){
        var sent=false

        
        if(this.state.featching) return <Spin size="large" />
        else{
            this.state.infos.infos.id_obj1==0?sent=false:sent=true

            return (
            <div>
                
            <Tabs defaultActiveKey="1">
                <TabPane tab={<span><Icon type="user" />Identification</span>} key="1">
                    <UserInfo data={this.state.infos.infos} meetings={this.state.infos.meetings}></UserInfo>
                </TabPane>
                <TabPane tab={<span> {this.state.infos.objectifs.length>0? <Icon type="bulb" theme="filled" /> :<Icon type="bulb" />} Objectifs</span>} key="2">
                    <ObjForm sent={sent} user={this.state.infos.infos.id_user} data={this.state.infos.objectifs} collectif={this.state.infos.collectif}></ObjForm>
                </TabPane>
                <TabPane tab={<span><Icon type="folder" />Evaluation</span>} key="3">
                        <Tabs defaultActiveKey="1">
                            <TabPane tab={<span><Icon type="tag" />Evaluation Mi-parcours</span>} key="1">
                                <FormMiddleEval id_collab={3}></FormMiddleEval>
                            </TabPane>
                        
                            <TabPane tab={<span><Icon type="tags" />Evaluation finale</span>} key="2">
                                <h1>finale</h1>
                            </TabPane>
                        </Tabs>
                </TabPane>
                <TabPane tab={<span><Icon type="dashboard" gs/>Plan Developement Individuel</span>} key="4">
                    <h1>PDI</h1>
                </TabPane>
            </Tabs>
            </div>
        )
        }
    }
}
