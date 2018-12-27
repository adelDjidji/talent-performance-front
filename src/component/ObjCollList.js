import React, { Component } from 'react';

import axios from 'axios'

import {Table} from 'antd'

import { server_url } from "../config/var";


const columns = [{
    title: 'Business unit',
    dataIndex: 'bu',
    sorter: (a, b) => a.bu - b.bu,
  }, {
    title: 'Titre objectif',
    dataIndex: 'title',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.title - b.title,
  }, {
    title: 'Cible',
    dataIndex: 'cible',
  }];
  
  const data = [{
    key: '1',
    manager: 'John Brown',
    title: 32,
    cible: 'New York No. 1 Lake Park',
  }, {
    key: '2',
    manager: 'Jim Green',
    title: 42,
    cible: 'London No. 1 Lake Park',
  }, {
    key: '3',
    manager: 'Joe Black',
    title: 32,
    cible: 'Sidney No. 1 Lake Park',
  }, {
    key: '4',
    manager: 'Jim Red',
    title: 32,
    cible: 'London No. 2 Lake Park',
  }];
  
  function onChange(pagination, filters, sorter) {
    console.log('params', pagination, filters, sorter);
  }

export default class ListObjColl extends Component{
    constructor(){
        super()
        this.load_data= this.load_data.bind(this)
    }

    state={
        feathing:true,
        objectifs:[]
    }

    load_data=()=>{
      console.log("LOADING COLL")
        axios({
            method: 'get',
            baseURL: server_url+'/objectif/allObjColl',
            headers: {'Access-Control-Allow-Origin': '*'}
            })
        .then( (response)=> {
            if(response.data){
                console.log("OBJ COLLs : ", response.data)
            this.setState({objectifs:response.data, feathing:false})
            } 
        })
        .catch(function (error) {            
            console.log(error);
        });
    }

    componentWillMount(){
        this.load_data()
    }

    render(){
        return(
            <div>
               <Table columns={columns} dataSource={this.state.objectifs} onChange={onChange} />
            </div>
        )
    }
}