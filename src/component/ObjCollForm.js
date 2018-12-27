import React, { Component } from 'react';
import { Form, Icon, Input, Button, Avatar , Select, message} from 'antd';

import axios from 'axios'

import { server_url } from "../config/var";

const Option= Select.Option
const FormItem = Form.Item;

class FormObjColl extends React.Component {

  constructor(){
    super()

    this.charger= this.charger.bind(this)
  }
  state={
    feathing:false,
    list_bu:[],
  }
  handleReset = () => {
    this.props.form.resetFields();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({feathing:true})
        axios(
          {
          method: 'post',
          baseURL: server_url+'/objectif/insert_coll',
          headers: {'Access-Control-Allow-Origin': '*'  },
          data:values
          }
          )
      .then( (response)=> {
          if(response.data){
            message.success('C\'est fait ! l\'objectif collectif est inséré avec succes')
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
        baseURL: server_url+'/business/all_bu',
        headers: {
                    'Access-Control-Allow-Origin': '*'
                }
        }
        )
    .then( (response)=> {
        if(response.data){
        this.setState({list_bu:response.data, feathing:false})
        } 
        
    })
    .catch(function (error) {
        message.error('Une erreur s\'est produite lors de recuperation de la liste des BU')
        console.log(error);
    });

}
componentWillMount(){
 this.charger()
}


  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('id_bu', {
              label:"Business unit",
            rules: [{ required: true, message: 'choisir unr bu' }],
          })(
            <Select
                    showSearch
                    size='large'
                    style={{ width: 500 }}
                    placeholder="Choisir une bu"
                    optionFilterProp="children"
                    onChange={this.handleChange}
                    
                >
                {this.state.list_bu.map(bu=><Option key={bu.id_bu} value={bu.id_bu}>{bu.bu_name}</Option>)}
                   
                </Select>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('title', {
            rules: [{ required: true, message: 'Saisir un titre pour l\'objectif !' }],
          })(
            <Input prefix={<Icon type="bulb" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="Titre objectif" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('cible', {
            rules: [{ required: true, message: 'Saisir un cible svp !' }],
          })(
            <Input prefix={<Icon type="bulb" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="cible" />
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

const WrappedFormObjColl = Form.create()(FormObjColl);
export default WrappedFormObjColl
