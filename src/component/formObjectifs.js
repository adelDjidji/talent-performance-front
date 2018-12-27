import React, { Component } from 'react';
import PropTypes from 'prop-types';

import axios from 'axios'
import moment from 'moment'

import { Form, Input, message, Icon, Spin, Select, Row, Col, DatePicker, Button, AutoComplete } from 'antd';

import { server_url } from "../config/var";

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const { TextArea } = Input;


    const formItemLayout = {
    //   labelCol: {
    //     xs: { span: 24 },
    //     sm: { span: 8 },
    //   },
    //   wrapperCol: {
    //     xs: { span: 24 },
    //     sm: { span: 16 },
    //   },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

    
class RegistrationForm extends React.Component {
    constructor(props){
        super(props)
        this.user_id =this.props.user
        this.user_objectifs =this.props.data
        this.collectif=this.props.collectif
       this.sent= this.props.sent
    }
 
    state = {
     deja:false,
      tab_pond:[0,0,0,0],
      total_pond:0,
      validation:false,
      sending:true,
      sent:false,
      done:false,
    confirmDirty: false,
    autoCompleteResult: [],
  };
  
  componentWillMount(){
    this.setState({deja:this.user_objectifs.length>0?true:false,sent:this.sent})
    
  }
  componentWillUnmount(){
      this.user_id=null
      this.user_objectifs=null
      this.collectif=null
      this.setState({tab_pond:[0,0,0,0], total_pond:0})
  }
  send=()=>{
    axios({
        method: 'post',
        baseURL: server_url+'/objectif/affect/'+this.user_id,
        headers: {'Access-Control-Allow-Origin': '*' }
        })
    .then( (response)=> {

        console.log("WELL DONE affectation")
        console.log(response)
        this.setState({sending:false, sent:true})
        message.success('operation avec succes ')
        //this.setState({infos:response.data, featching:false})
        
    })
    .catch(function (error) {
        console.log("erroooorrrrr")
        console.log(error);
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
          console.log(" data form : "+JSON.stringify(values))
          if(this.state.total_pond!=100){
              message.error('la pondération total doit égale à 100%')
              return
          }

          this.setState({validation:true})
          var obj1={title:values.objectif1,ponderation:values.ponderation1, cible:values.cible1, plan_action:values.plan1, echancie:values.echancie1, id_user:this.user_id}
          var obj2={title:values.objectif2,ponderation:values.ponderation2, cible:values.cible2, plan_action:values.plan2, echancie:values.echancie2, id_user:this.user_id}
          var obj3={title:values.objectif3,ponderation:values.ponderation3, cible:values.cible3, plan_action:values.plan3, echancie:values.echancie3, id_user:this.user_id}
          var obj4={title:values.objectif4,ponderation:values.ponderation4, cible:values.cible4, plan_action:values.plan4, echancie:values.echancie4, id_user:this.user_id}
          var objs=[obj1, obj2, obj3, obj4]
this.user_objectifs=objs
            console.log("data ready to send :"+JSON.stringify(objs))
          axios({
                    method: 'post',
                    baseURL: server_url+'/objectif/insert',
                    data:objs,
                    //headers: {'Access-Control-Allow-Origin': '*' }
                    })
                .then( (response)=> {

                    console.log("WELL DONE insertion")
                    console.log(response)
                    this.setState({validation:false, done:true, deja:true})
                    message.success('operation avec succes ')
                    //this.setState({infos:response.data, featching:false})
                    
                })
                .catch(function (error) {
                    console.log("erroooorrrrr")
                    console.log(error);
                });
      }
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  set_pond =(id, pond)=>{
    var old =this.state.tab_pond
    old[id-1]=pond
    console.log("new tab pond")
    console.log(old)
    this.setState({tab_pond:old})
    this.set_som_pond()
  }

  set_som_pond=()=>{
    var som=0
    var p=this.state.tab_pond
    for(let i=0; i<p.length; i++){
      som+=parseInt (p[i])
    }
    this.setState({total_pond:som})
    console.log("somme now :")
    console.log(som)
   if(som>100) message.warning('Alert: la pondération ne doit pas depasser 100% !')
  }


  form_row = (id,table_obj) =>{
    const { getFieldDecorator } = this.props.form; 
    var obj=table_obj[id-1]
    var deja=false;
    console.log("ROW OBJ",obj)
    if(table_obj!=null) deja=true
    return(
        
        <Row className="table-row">
               
                <Col span={6}>
                
                <FormItem
                {...formItemLayout}
                >
                {getFieldDecorator('objectif'+id, {
                    rules: [{
                    required: true, message: 'entrer un objectif svp',
                    }],
                    initialValue:this.state.deja?obj.title:""
                })(
                    <TextArea disabled={this.state.sent} placeholder="objectif" autosize={{ minRows: 2, maxRows: 4 }} />
                )}
                </FormItem>
                    
                </Col>
                <Col span={4}>
                {
                    <FormItem
                    {...formItemLayout}
                    >
                    {getFieldDecorator('ponderation'+id, {
                        rules: [{
                        required: true, message: 'entrer une ponderation svp',
                        }],
                        initialValue:this.state.deja?obj.ponderation:0
                    })(
                        <Select disabled={this.state.sent} defaultValue="10" onChange={value=>this.set_pond(id,value)} >
                            <Option  value="5">05 %</Option>
                            <Option value="10">10 %</Option>
                            <Option value="15">15 %</Option>
                            <Option value="20">20 %</Option>
                            <Option value="25">25 %</Option>
                            <Option value="30">30 %</Option>
                            <Option value="35">35 %</Option>
                            <Option value="40">40 %</Option>
                            <Option value="45">45 %</Option>
                            <Option value="50">50 %</Option>
                    </Select>
                    )}
                    </FormItem>
                }
                </Col>
                
                <Col span={6}>
                {
                    <FormItem
                    {...formItemLayout}
                    >
                    {getFieldDecorator('plan'+id, {
                        initialValue:this.state.deja?obj.plan_action:"",
                        rules: [{
                        required: true, message: 'entrer un plan d\'action svp',
                        }],
                    })(
                        <TextArea disabled={this.state.sent} placeholder="Plan d'actions" autosize={{ minRows: 2, maxRows: 4 }} />
                    )}
                    </FormItem>
                }
                </Col>
                
                <Col span={4}>
                {
                    <FormItem
                    {...formItemLayout}
                    >
                    {getFieldDecorator('cible'+id, {
                        initialValue:this.state.deja?obj.cible:null,
                        rules: [{
                        required: true, message: 'entrer un cible svp',
                        }],
                    })(
                        <Input  disabled={this.state.sent} placeholder="cible" />
                    )}
                    </FormItem>
                }
                </Col>
                
                <Col span={4}>
                {this.state.deja? moment(obj.echancie).locale("fr").format('L'):
                <FormItem
                {...formItemLayout}
                >
                {getFieldDecorator('echancie'+id, {
                    rules: [{
                    required: true, message: 'entrer un echéancie svp',
                    }],
                })(
                    <DatePicker disabled={this.state.sent} />
                )}
                </FormItem>
                }
                </Col>
                
                </Row>
    )
        } 
            
// componentWillUnmount(){
//     alert('by!')
//     this.props.form.validateFieldsAndScroll((err, values) => {
//         console.log("Unmount !!=>>",values)
//     })
// }
  render() {
    
   

    return (
        <div>
            <Row className="table-head">
                <Col className="title" span={6}>Objectif</Col>
                <Col className="title" span={4}>Ponderation</Col>
                <Col className="title" span={6}>Plan d'actions</Col>
                <Col className="title" span={4}>Cible</Col>
                <Col className="title" span={4}>Echéancier</Col>
                {/* <Col className="title" span={4}>Evaluation</Col> */}
            </Row>
            <Form onSubmit={this.handleSubmit}>
                {this.form_row(1,this.user_objectifs)}
                {this.form_row(2,this.user_objectifs)}
                {this.form_row(3,this.user_objectifs)}
                {this.form_row(4,this.user_objectifs)}
                <strong>Pondération totale: </strong> <span className={this.state.total_pond>100? "error": ""} id="total_pond">{this.state.total_pond} %</span>
                    <FormItem {...tailFormItemLayout}>
                        <Button disabled={this.state.validation || this.state.done || this.state.deja} type="primary" icon={this.state.validation? "loading": "check"} size='large' htmlType="submit"> {this.state.done? "Enregistré" : (this.state.validation ? "Chargement" : "Valider")}</Button>
                        <Button disabled={this.state.sent} onClick={this.send} icon={this.state.sent?"check-circle":"right-circle"} size='large' style={{marginLeft:10}}> {this.state.sent?"Envoyé":"Envoyer"} </Button>
                    </FormItem>
            </Form>
            
            
            {
                this.props.collectif?    (
                    <div>
                <b><h3><Icon type="bulb" theme="filled" color="yellow" />Objectif Collectif: </h3></b>
            <Row className="table-head table-head-coll ">
                <Col className="title" span={19}>Objectif</Col>
                <Col className="title" span={5}>Cible</Col>
            </Row>
            <Row  style={{padding: '9pt 6pt'}}>
                <Col className="title" span={19}>{this.props.collectif.title}</Col>
                <Col className="title" span={5}>{this.props.collectif.cible}</Col>
            </Row></div>) :""
            }
            

        </div>
      
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default WrappedRegistrationForm