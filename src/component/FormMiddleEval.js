import React, { Component } from 'react';
import { Form, Icon, Input, Button, DatePicker , Select, message} from 'antd';

import axios from 'axios'

import {server_url} from '../config/var'
const Option= Select.Option
const FormItem = Form.Item;

class FormMiddleEval extends React.Component {

  constructor(props){
    super(props)

    this.charger= this.charger.bind(this)
    console.log("ID Collab =",this.props.id_collab)
    this.collab = this.props.id_collab
  }
  state={
    feathing:false,
    list_collab:[],
  }
  handleReset = () => {
    this.props.form.resetFields();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("VALUES MEETING: ",values)
        this.setState({feathing:true})
        axios(
          {
            method: 'post',
            baseURL: server_url+'/meeting/insert',
            headers: {'Access-Control-Allow-Origin': '*'  },
            data:values
          }
          )
      .then( (response)=> {
          if(response.data){
            message.success('C\'est fait !')
            this.setState({feathing:false})
            this.handleReset()
          } 
      })
      .catch(function (error) {
          message.error('une erreur s\'est produite')
          console.log(error);
      });
      }
    });
  }
  charger=()=>{

    axios(
        {
        method: 'get',
        baseURL: server_url+'/user/collaborators',
        headers: {
                    'Access-Control-Allow-Origin': '*'
                }
        }
        )
    .then( (response)=> {
        if(response.data){
        this.setState({list_collab:response.data, feathing:false})
        } 
        
    })
    .catch(function (error) {
        message.error('Une erreur s\'est produite lors de recuperation de la liste collaborateurs')
        console.log(error);
    });

}
componentWillMount(){
 this.charger()
}

  render() {
    const { getFieldDecorator } = this.props.form;
    //return (<h2>mao</h2>)
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
      {this.collab>0?
       <FormItem>
       {getFieldDecorator('id_collaborator', {
         initialValue:this.collab,
           label:"Collaborateur concerné :",
         rules: [{ required: true, message: 'choisir un collaborateur' }],
       })(
         <Input  type="hidden"  />
       )}
     </FormItem>
      :
      <FormItem>
          {getFieldDecorator('id_collaborator', {
              label:"Collaborateur concerné :",
            rules: [{ required: true, message: 'choisir un collaborateur' }],
          })(
            
            <Select
                    showSearch
                    placeholder="Choisir un collaborateur"
                    optionFilterProp="children"
                    
                >
                {this.state.list_collab.map(bu=><Option key={bu.id_user} value={bu.id_user}>{bu.firstname} {bu.lastname}</Option>)}
                   
                </Select>
          )}
        </FormItem>
      }

        
        <FormItem
          >
          {getFieldDecorator('date_planed', {
              rules: [{
              required: true, message: 'entrer une date svp',
              }],
          })(
              <DatePicker />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('lieu', {
            rules: [{ required: true, message: 'le lieu doit etre specifié !' }],
          })(
            <Input prefix={<Icon type="environment" />} type="text" placeholder="lieu" />
          )}
        </FormItem>
        
        <Button type="primary" htmlType="submit" className="login-form-button">
        {this.state.feathing?<Icon type="loading" />:""}
            Confirmer
          </Button>
      </Form>
    );
  }
}

const WrappedFormObjColl = Form.create()(FormMiddleEval);
export default WrappedFormObjColl
