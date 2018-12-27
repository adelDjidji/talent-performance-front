import React, { Component } from 'react'
import {
    Form, Select, Input, 
    Button, DatePicker,
  } from 'antd';

  const FormItem = Form.Item;
  const Option = Select.Option;

class FormAddUser extends Component {

    constructor(props){
        super(props)
    }

    state = { 
        entites:[],
        departements:[],
        directions:[],
        services:[]
     }

    render() {

        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
          labelCol: { span: 6 },
          wrapperCol: { span: 14 },
        };

        return (
            <Form onSubmit={this.handleSubmit}>       
        <FormItem
          {...formItemLayout}
          label="Type utilisateur :"
           hasFeedback
        >
          {getFieldDecorator('type', {
            rules: [
              { required: true, message: 'choisir le type du user !' },
            ],
          })(
            <Select defaultValue="0" onChange={this.changetype} >
              <Option value="0">admin</Option>
              <Option value="1">Manager</Option>
              <Option value="2">Simple collaborateur</Option>
            </Select>
          )}
        </FormItem>

        

        <FormItem
          {...formItemLayout}
          label="Matricule :"
          hasFeedback
        >
          {getFieldDecorator('matricule', 
          {rules : 
            [
                { required: true}
            ]
        })(
            <Input type="text" placeholder="matricule ..." />
          )}
          
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Nom :"
          hasFeedback
        >
          {getFieldDecorator('firstname', 
          {rules : 
            [{ required: true} ]
        })(
            <Input type="text" placeholder="nom ..." />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Prenom :"
          hasFeedback
        >
          {getFieldDecorator('lastname', 
          {rules : 
            [{ required: true} ]
        })(
            <Input type="text" placeholder="prenom ..." />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="email :"
          hasFeedback
        >
          {getFieldDecorator('email', 
          {rules : 
            [{ required: true} ]
        })(
            <Input type="text" placeholder="email ..." />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Post :"
          hasFeedback
        >
          {getFieldDecorator('post', 
          {rules : 
            [{ required: true} ]
        })(
            <Input type="text" placeholder="post ..." />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Categorie :"
          hasFeedback
        >
          {getFieldDecorator('categorie', 
          {rules : 
            [{ required: true} ]
        })(
            <Input type="text" placeholder="categorie ..." />
          )}
        </FormItem>

         
        <FormItem
            {...formItemLayout}
            label="Entite :"
            hasFeedback
            >
            {getFieldDecorator('entite_id', {
                rules: [
                { required: true, message: 'choisir entite ' },
                ],
            })(
                <Select defaultValue="0">
                    {this.state.entites.map(entite=>{
                        return (<Option value={entite.id_entite}>{entite.entite_name}</Option>)
                    })
                }
                </Select>
            )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label="Direction :"
            hasFeedback
            >
            {getFieldDecorator('direction_id', {
                rules: [
                { required: true, message: 'choisir direction ' },
                ],
            })(
                <Select defaultValue="0">
                    {this.state.directions.map(direction=>{
                        return (<Option value={direction.id_direction}>{direction.title}</Option>)
                    })
                }
                </Select>
            )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label="Departement :"
            hasFeedback
            >
            {getFieldDecorator('departement_id', {
                rules: [
                { required: true, message: 'choisir departement ' },
                ],
            })(
                <Select defaultValue="0">
                    {this.state.departements.map(departement=>{
                        return (<Option value={departement.id_departement}>{departement.title}</Option>)
                    })
                }
                </Select>
            )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label="Service :"
            hasFeedback
            >
            {getFieldDecorator('service_id', {
                rules: [
                { required: true, message: 'choisir service ' },
                ],
            })(
                <Select defaultValue="0">
                    {this.state.services.map(service=>{
                        return (<Option value={service.id_service}>{service.title}</Option>)
                    })
                }
                </Select>
            )}
        </FormItem>
       

         

        

        

        <FormItem
        {...formItemLayout}
        >
        {getFieldDecorator('date_rec', {
            rules: [{
            required: true, message: 'entrer une date',
            }],
        })(
            <DatePicker disabled={this.state.sent} />
        )}
        </FormItem>

        <FormItem
          wrapperCol={{ span: 12, offset: 6 }}
        >
          <Button className="btn btn-default" size="large" icon="check" type="primary" htmlType="submit">Ajouter</Button>
        </FormItem>
      </Form>
        );
    }
}
const WrappedRegistrationForm = Form.create()(FormAddUser);

export default WrappedRegistrationForm