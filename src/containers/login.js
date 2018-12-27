import React from 'react'

import { Form, Icon, Input, Button, Checkbox , Row, Col, message} from 'antd';
import { Card, CardBody, CardImage } from 'mdbreact';

import axios from 'axios';

import Home from './home'
import '../styles/login.css'
 import { server_url } from "../config/var";
const FormItem = Form.Item;

const styles= {
  cardLogin:{
    width: '59%',
    marginLeft: '20%',
    marginTop: '12%'
  }
}
class NormalLoginForm extends React.Component {
  
  handleSubmit = (e) => {
    e.preventDefault();
    message.loading('autentification en cours ...')
    this.props.form.validateFields((err, values) => {
      if (!err) {

        axios(
          {
            method: 'post',
            baseURL: server_url+'/user/login',
            data:{
              username:values.userName,
              password:values.password
            },
            //baseURL:'https://jsonplaceholder.typicode.com/todos',
            headers: {
              //'content-type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            }
          }
          )
        .then(function (response) {
          message.destroy()
          console.log(response);
          if(response.data){
            message.success('authentification réussi' );

            console.log("LOGIN data :",response.data)
            /* store session ID */ 
            sessionStorage.setItem("sessionID", 200);
            sessionStorage.setItem("sessionAccess", response.data.type);
            sessionStorage.setItem("sessionCurrent", JSON.stringify(response.data));

            console.log("HELLOO DATA")
            console.log(sessionStorage.getItem("sessionAccess"))
            console.log(sessionStorage.getItem("sessionCurrent"))
            
            window.location.href='/'
          } 
          else message.error('erreur authentification');
        })
        .catch(function (error) {
          message.error('erreur du serveur');
          console.log(error);
        });
    
        console.log('Received values of form: ', values);
        //
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    //alert("session =id  "+ sessionStorage.getItem("sessionID"))
    if(sessionStorage.getItem("sessionID")==200) return <Home></Home>
    return (
      <div>
        <Row className="headerLogin" >
        <Col span={4}>
          <img src="assets/img/samha.png" />
          <span>  </span>
        </Col>
          
          <h2>Talent performance</h2>
        </Row>
        <Row style={{background: 'url(assets/img/33.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
          <Col span={12}>    
          </Col>
          <Col span={12} style={{ height:window.innerHeight, backgroundPosition:'center', backgroundSize:'cover'}}>
          <Card style={styles.cardLogin}>
              <Icon className="icon-login" type="login" theme="outlined" />
              <CardBody>
                <h3> Connexion </h3>
              <Form onSubmit={this.handleSubmit} className="login-form">
                      <FormItem>
                        {getFieldDecorator('userName', {
                          rules: [{ required: true, message: 'Entrez votre nom utilisateur SVP!' }],
                        })(
                          <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="nom utilisateur" />
                        )}
                      </FormItem>
                      <FormItem>
                        {getFieldDecorator('password', {
                          rules: [{ required: true, message: 'Entrez votre mot de passe SVP!' }],
                        })(
                          <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="mot de passe" />
                        )}
                      </FormItem>
                      <FormItem>
                        {getFieldDecorator('remember', {
                          valuePropName: 'checked',
                          initialValue: true,
                        })(
                          <Checkbox>Rester connecté</Checkbox>
                        )}
                       
                        <Button block type="primary" htmlType="submit" className="login-form-button">
                          Se connecter
                        </Button>
                        
                      </FormItem>
                    </Form>
              </CardBody>
          </Card>
          </Col>
        </Row>
      </div>
      
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
export default WrappedNormalLoginForm