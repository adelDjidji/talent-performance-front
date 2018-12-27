import React, { Component } from 'react';
import { Table, Button, Form, Input, Select, DatePicker, Col, Row , message} from 'antd';

const { Column, ColumnGroup } = Table;
const Option = Select.Option;
const { TextArea } = Input;
const FormItem = Form.Item;
const data = [{
  key: '1',
  firstName: 'John',
  lastName: 'Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
  tags: ['nice', 'developer'],
}, {
  key: '2',
  firstName: 'Jim',
  lastName: 'Green',
  age: 42,
  address: 'London No. 1 Lake Park',
  tags: ['loser'],
}, {
  key: '3',
  firstName: 'Joe',
  lastName: 'Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
  tags: ['cool', 'teacher'],
}];

const styleButton={
  float: 'right',
  marginRight: '40pt',
  width: '20%'
}
export default class userObj extends React.Component{

  constructor(props){
    super(props)
    this.set_pond = this.set_pond.bind(this)
    //this.handleChangePond = this.handleChangePond.bind(this)
  }
  state={
    total_pond:60,
    pond:[10,10,10,10],
    objectifs:[
      { id:1,
        objectif:"",
        pond:10,
        cible:"",
        plan:"",
        echnacie:""
      },
      { id:2,
        objectif:"",
        pond:10,
        cible:"",
        plan:"",
        echnacie:""
      },
      { id:3,
        objectif:"",
        pond:10,
        cible:"",
        plan:"",
        echnacie:""
      },
      { id:4,
        objectif:"",
        pond:10,
        cible:"",
        plan:"",
        echnacie:""
      },
    ]
  }

  
  set_pond =(id, pond)=>{
    var old =this.state.objectifs
    old.map(item=>{
      if(item.id==id) item.pond=pond
    })
    this.setState({objectifs:old})
  }

  handleChangePond= (e)=>{
    //alert(value)
    console.log("data-id :")
  console.log(e.target.dataset.letter)
  }
  set_som_pond=()=>{
    var som=0
    var p=this.state.pond
    for(let i=0; i<p.length; i++){
      som+=parseInt (p[i])
    }
    this.setState({total_pond:som})
   if(som>100) message.warning('Alert: la pondération ne doit pas depasser 100% !')
  }
change_pond1=(value)=>{
  var old=this.state.pond
  old[0]= value
  this.setState({pond:old})
  this.set_som_pond()
}
change_pond2=(value)=>{
  var old=this.state.pond
  old[1]= value
  this.setState({pond:old})
  this.set_som_pond()
}
change_pond3=(value)=>{
  var old=this.state.pond
  old[2]= value
  this.setState({pond:old})
  this.set_som_pond()
}
change_pond4=(value)=>{
  var old=this.state.pond
  old[3]= value
  this.setState({pond:old})
  this.set_som_pond()
}
change=(e)=>{
  alert(e.target.dataset.id)
}

set_obj(id , value){

}
validate= ()=>{
  
}
    render(){
        return (
<div>
  {/* <input type="text" data-id="7777" onChange={this.change} placeholder="try here to edit and see the magic !"></input> */}
{/* <Table dataSource={this.state.objectifs} pagination='none'>
      <Column
        title="Objectif"
        dataIndex="Objectif"
        key="Objectif"
        render={
            (text, record)=><Input id={"obj"+record.id} name={"objectif"+record.id} onChange={(record)=>this.set_obj(record.id, this)} placeholder={"objectif "+record.id} />
        }
      />
      <Column
        title="Ponderation"
        dataIndex="Ponderation"
        key="Ponderation"
        render={
            (text, record)=>(
            <Select defaultValue="10" key={"select"+record.id} id={"select"+record.id} data-letter="4444" onChange={this.handleChangePond} >
            <Option value="10">10 %</Option>
            <Option value="15">15 %</Option>
            <Option value="20">20 %</Option>
            <Option value="25">25 %</Option>
            <Option value="30">30 %</Option>
          </Select>)
        }
      />
  
    <Column
      title="Plan actions"
      dataIndex="age"
      key="age"
      render={
        (text, record)=><TextArea id={"plan"+record.id} name={"plan"+record.id} placeholder="Plan d'actions" autosize={{ minRows: 2, maxRows: 4 }} />
    }
    />
    <Column
      title="Cible"
      dataIndex="cible"
      key="cible"
      render={
        (text, record)=><Input id={"cible"+record.id} name={"cible"+record.id} placeholder="Cible"  />
    }
    />
    <Column
      title="Echancié"
      dataIndex="tags"
      key="tags"
      render={
        (text, record)=> <DatePicker id={"date"+record.id} name={"date"+record.id} />
    }
    />
    
  </Table> */}
<Row className="table-head">
      <Col span={4}>Objectif</Col>
      <Col span={2}>Ponderation</Col>
      <Col span={4}>Plan d'actions</Col>
      <Col span={4}>Cible</Col>
      <Col span={4}>Echancié</Col>
      <Col span={4}>Evaluation</Col>
  </Row>
  <Form >
      <Row className="table-row">
            <Col span={4}>
              <Input required name={"objectif1"}  placeholder={"objectif 1"} />
            </Col>
            <Col span={2}><Select required defaultValue="10" onChange={this.change_pond1} >
                  <Option value="10">10 %</Option>
                  <Option value="15">15 %</Option>
                  <Option value="20">20 %</Option>
                  <Option value="25">25 %</Option>
                  <Option value="30">30 %</Option>
                </Select></Col>
            <Col span={4}><TextArea required id={"plan1"} name={"plan1"} placeholder="Plan d'actions" autosize={{ minRows: 2, maxRows: 4 }} /></Col>
            <Col span={4}><Input required id={"cible1"} name={"cible1"} placeholder="Cible"  /></Col>
            <Col span={4}><DatePicker required id={"date1"} name={"date1"} /></Col>
            <Col span={4}><Input required  name={"objectif1"}  placeholder={"evaluation"} /></Col>
        </Row>

        <Row className="table-row">
            <Col span={4}><Input required name={"objectif2"}  placeholder={"objectif 2"} /></Col>
            <Col span={2}><Select required defaultValue="10" onChange={this.change_pond2} >
                  <Option value="10">10 %</Option>
                  <Option value="15">15 %</Option>
                  <Option value="20">20 %</Option>
                  <Option value="25">25 %</Option>
                  <Option value="30">30 %</Option>
                </Select></Col>
            <Col span={4}><TextArea required id={"plan2"} name={"plan2"} placeholder="Plan d'actions" autosize={{ minRows: 2, maxRows: 4 }} /></Col>
            <Col span={4}><Input required id={"cible2"} name={"cible1"} placeholder="Cible"  /></Col>
            <Col span={4}><DatePicker required id={"date2"} name={"date2"} /></Col>
            <Col span={4}><Input required name={"objectif2"}  placeholder={"evaluation"} /></Col>
        </Row>

        <Row className="table-row">
            <Col span={4}><Input required name={"objectif3"}  placeholder={"objectif 3"} /></Col>
            <Col span={2}><Select required defaultValue="10" onChange={this.change_pond3} >
                  <Option value="10">10 %</Option>
                  <Option value="15">15 %</Option>
                  <Option value="20">20 %</Option>
                  <Option value="25">25 %</Option>
                  <Option value="30">30 %</Option>
                </Select></Col>
            <Col span={4}><TextArea required id={"plan3"} name={"plan3"} placeholder="Plan d'actions" autosize={{ minRows: 2, maxRows: 4 }} /></Col>
            <Col span={4}><Input required id={"cible3"} name={"cible3"} placeholder="Cible"  /></Col>
            <Col span={4}><DatePicker required id={"date3"} name={"date3"} /></Col>
            <Col span={4}><Input required name={"objectif3"}  placeholder={"evaluation"} /></Col>
        </Row>

        <Row className="table-row">
            <Col span={4}><Input required name={"objectif4"}  placeholder={"objectif 4"} /></Col>
            <Col span={2}><Select required defaultValue="10" onChange={this.change_pond4} >
                  <Option value="10">10 %</Option>
                  <Option value="15">15 %</Option>
                  <Option value="20">20 %</Option>
                  <Option value="25">25 %</Option>
                  <Option value="30">30 %</Option>
                </Select></Col>
            <Col span={4}><TextArea required id={"plan4"} name={"plan4"} placeholder="Plan d'actions" autosize={{ minRows: 2, maxRows: 4 }} /></Col>
            <Col span={4}><Input required id={"cible4"} name={"cible4"} placeholder="Cible"  /></Col>
            <Col span={4}><DatePicker required id={"date4"} name={"date4"} /></Col>
            <Col span={4}><Input required name={"objectif4"}  placeholder={"evaluation"} /></Col>
        </Row>
        <FormItem >
          <Button type="primary" htmlType="submit">submit</Button>
        </FormItem>
  </Form>
  <strong>Pondération totale: </strong> <span className={this.state.total_pond>100? "error": ""} id="total_pond">{this.state.total_pond} %</span>
  <Button style={styleButton} onClick={this.validate} type="primary" icon="check" size='large'>valider</Button>

</div>
        );
    }
}
