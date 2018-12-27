import React, { Component } from 'react'
import {Input} from 'antd'
import UserInfo from './userInfos'


export default class Profil extends Component {
    constructor(props){
        super(props)
        this.curent_user = JSON.parse(sessionStorage.getItem('sessionCurrent'))
    }


    state = {  }


    render() {
        return (
            <div>
            
                <UserInfo data={this.curent_user } meetings={[]} ></UserInfo>
            </div>
            
        );
    }
}