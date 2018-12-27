import React, { Component } from 'react';

import {Button, Icon,Select, Avatar, Spin} from 'antd'

import axios from 'axios'

import { Link } from "react-router-dom";

import UserCard from '../component/cardUser'


const Option = Select.Option;


export default class Team extends Component{
    constructor(props) {
        super(props);     
        this.clickCard= this.clickCard.bind(this);
        this.charger_managers= this.charger_managers.bind(this);
        this.load_collaborators= this.load_collaborators.bind(this);
        this.manager_view= this.manager_view.bind(this);
        this.admin_view= this.admin_view.bind(this);


        this.current_user=JSON.parse(sessionStorage.getItem('sessionCurrent'))
        this.user_id = this.props.location.state!=null?this.user_id = this.props.location.state.user_id:this.current_user.id_user
    }
    state={
        feathing:true,
        selected_user:0,
        selected_manager:0,
        managers:[],
        curent_manager:null,
        collaborators:[]
    }


    charger_managers=()=>{
console.log("get managers list")
        axios({
            method: 'get',
            baseURL: 'http://localhost:3005/user/managers',
            headers: {'Access-Control-Allow-Origin': '*'}
            })
        .then( (response)=> {
            if(response.data){
                //alert('geted managers list ')
            this.setState({managers:response.data, feathing:false})
            } 
        })
        .catch(function (error) {
            console.log(error);
        });

    }


    componentWillMount(){
        //alert('user id id :'+this.user_id)
        if(sessionStorage.getItem('sessionAccess')!=0){
            this.setState({selected_manager:this.user_id})
            this.load_collaborators(this.user_id)
        }
        else this.charger_managers()
    }

    clickCard=(event, id)=>{
        this.setState({selected_user:id})
    }

    componentDidMount(){
        //alert(JSON.stringify(this.state))
        //alert(this.state.selected_user)
    }

    load_collaborators= (manager)=>{
        console.log("gett collabtorator")
        
        var id_manager=manager
        var manager=null
        this.setState({selected_manager:id_manager})
        axios({
            method: 'get',
            baseURL: 'http://localhost:3005/user/collaborators/'+id_manager,
            headers: {'Access-Control-Allow-Origin': '*' }
            })
        .then( (response)=> {
                console.log("collaborators list :")
                console.log(response.data)
                this.setState({collaborators:response.data})
                this.state.managers.map(manager=>{
                    if(manager.id_user==id_manager) {
                        console.log("COLLABS ===",response.data)
                        manager = manager
                        this.setState({curent_manager:manager})
                    }
                })
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    admin_view =()=>{
       // alert('admin')
        var margin_manager=0,width_deviser=0
        switch(this.state.collaborators.length){
               case 0:margin_manager=0; width_deviser=0
                        break;
                case 1: margin_manager=-12; width_deviser=0
                        break;
                case 2: margin_manager = 37; width_deviser=175
                        break;
                case 3: margin_manager = 161; width_deviser=347
                        break;
                case 4: margin_manager = 245; width_deviser=520
                        break; 
                case 5: margin_manager = 333; width_deviser=693
                        break;
                default : margin_manager = 415 ; width_deviser=865            
        }

        if(this.state.feathing) return <Spin size="large" />
        else return (
            <div>
                {this.state.selected_manager==0?<img style={{width: '20%', display: 'block',margin: '4% 14%'}} src="assets/img/team1.png"></img>:""}
                

                <Select
                    showSearch
                    size='large'
                    style={{ width: 500 }}
                    placeholder="Choisir un manager"
                    optionFilterProp="children"
                    onChange={this.load_collaborators}
                >
                {this.state.managers.map(manager=><Option key={manager.id_user} value={manager.id_user}><Avatar src="assets/img/131.jpg" />{manager.firstname+"  "}  {manager.lastname}</Option>)}
                   
                </Select>
                
                <p>{ this.state.curent_manager ?<div style={{marginLeft:margin_manager}} className="col col-lg-2 card-manager"> <UserCard hoverable data={this.state.curent_manager} ></UserCard></div> :""}</p>
                <div id="diviser" style={{width:width_deviser}} ></div>
                <div className="row" style={{marginTop:0}}>
                    
                    { this.state.collaborators.length>0?
                        this.state.collaborators.map(collab=>{
                        return ( 
                                <Link className={this.state.selected_user===collab.id_user? "selected col col-lg-2 user-card" :"col col-lg-2 user-card"} to={{ pathname: '/detail', state: { user_id: collab.id_user} }} >
                                         <UserCard hoverable data={collab} ></UserCard>             
                                </Link>
                   )
                    }):(this.state.selected_manager!=0?<div className="empty"> <Icon type="cluster" theme="outlined" /></div>:"")}
                       
                </div>
                
                   
                
            </div>
        )
    }

    manager_view=()=>{
        //alert('manager')
        var margin_manager=0,width_deviser=0
        switch(this.state.collaborators.length){
               case 0:margin_manager=0; width_deviser=0
                        break;
                case 1: margin_manager=-12; width_deviser=0
                        break;
                case 2: margin_manager = 37; width_deviser=175
                        break;
                case 3: margin_manager = 161; width_deviser=347
                        break;
                case 4: margin_manager = 245; width_deviser=520
                        break; 
                case 5: margin_manager = 333; width_deviser=693
                        break;
                default : margin_manager = 415 ; width_deviser=865            
        }
        console.log("manager vieww",this.state.collaborators)
        console.log(" current user : ",this.current_user)
        return (
            <div>
                    <p>{ this.user_id ?<div style={{marginLeft:margin_manager}} className="col col-lg-2 card-manager"> <UserCard hoverable data={this.current_user} ></UserCard></div> :""}</p>
                        <div id="diviser" style={{width:width_deviser}} ></div>
                    <div className="row" style={{marginTop:0}}>
                            
                            { this.state.collaborators.length>0?
                                this.state.collaborators.map(collab=>{
                                return ( 
                                        <Link className={this.state.selected_user===collab.id_user? "selected col col-lg-2 user-card" :"col col-lg-2 user-card"} to={{ pathname: '/detail', state: { user_id: collab.id_user} }} >
                                                <UserCard hoverable data={collab} ></UserCard>             
                                        </Link>
                        )
                            }):(this.state.selected_manager!=0?<div className="empty"> <Icon type="cluster" theme="outlined" /></div>:"")}
                            
                        </div>
                </div>
        )
    }
    render(){
        if(sessionStorage.getItem('sessionAccess')==0)
        return this.admin_view();
        else return this.manager_view()
    }
}