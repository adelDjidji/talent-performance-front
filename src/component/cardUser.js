import React, { Component } from 'react';
import { Card, Icon, Avatar } from 'antd';

import '../styles/carduser.css'

const { Meta } = Card;
export default  class cardUser extends Component{
    constructor(props){
        super(props)
        this.user=this.props.data
    }
    componentWillMount(){
        this.user=this.props.data
    }
    componentWillUpdate(){
        this.user=this.props.data
    }
    componentWillUnmount(){
        this.user=null
    }
    render(){
        return (
            <Card
                style={{ width: 300 }}
                cover={<img alt="image not found" src="assets/img/1.jpg" />}
               //actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
            >
                <Meta
               // avatar={<Icon type="user" theme="outlined" />}
               title={<div><p className="nom">{this.props.data.firstname}</p><span className="prenom">{this.props.data.lastname}</span></div>}
                description={this.props.data.post}
                />
            </Card>
        )
    }
}
