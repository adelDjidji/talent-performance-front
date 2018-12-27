import React from 'react'

import { Layout, Row, Col, Icon } from 'antd';

import moment from 'moment'

import Panel from "../component/PanelCard";
const { Header, Footer, Sider, Content } = Layout;

export default class userInfo extends React.Component{
    constructor(props){
        super(props)
        this.data=this.props.data
        this.meetings=this.props.meetings

        this.get_meetings= this.get_meetings.bind(this)
        this.state={
            miParcour:null,
            final:null
        }
    }


    get_meetings= ()=>{
        console.log("meetings ===", this.meetings)
        var result=null
        var final=null
        this.meetings.map(item=>{
            if(item.type=='0') {
                    result= item;
            }else{
                final=item
            }
        })
        console.log("MI parcours ==", result)
        this.setState({miParcour:result, final:final})
    }

componentWillMount(){
    this.get_meetings()
}
    render(){
        return (<div>
            
              <Layout style={{background:'unset', fontSize:'13pt'}}>
                <Content>
                <Row>
                    <Col span={9} className="info">
                    <div className="div-img" style={{backgroundImage:'url(assets/img/1.jpg)'}}></div>
                    <p><strong>Matricule :</strong> {this.data.matricule}</p>
                    <h3> <strong><Icon type="user"></Icon> {this.data.firstname+" "+this.data.lastname}</strong></h3>
                    <p><Icon type="right-circle" theme="outlined" /><strong>Entité :</strong> {this.data.service}</p>
                    <p><Icon type="right-circle" theme="outlined" /><strong>Direction :</strong> {this.data.direction}</p>
                    <p><Icon type="right-circle" theme="outlined" /><strong>Departement :</strong>{this.data.departement}</p>
                        <p><Icon type="right-circle" theme="outlined" /><strong>Poste Occupé :</strong> {this.data.post}</p>
                        <p><Icon type="right-circle" theme="outlined" /><strong>Catégorie :</strong> {this.data.categorie}</p>
                    </Col>
                    <Col span={15} className="info">
                        <p><Icon type="right-circle" theme="filled" /><strong>Responsable N+1 :</strong>{this.data.respo1_first +" "+this.data.respo1_last } </p>
                        <p><Icon type="right-circle" theme="filled" /><strong>Responsable N+2 :</strong> {this.data.respo2_first +" "+this.data.respo2_last } </p>

                        <p><Icon type="calendar" theme="outlined" /><strong>Date Rec Entité Actuelle :</strong> {moment(this.data.date_rec).locale("fr").format('LL')}</p>
                        <p><Icon type="calendar" theme="outlined" /><strong>Date Recrutement Groupe :</strong> {moment(this.data.date_rec).lang("fr").format('LL')}</p>
                        <Panel data={this.state.miParcour} title="Evaluation Mi-parcours"></Panel>
                        <Panel data={this.state.final} title="Evaluation Finale"></Panel>

                    </Col>
                </Row>
                </Content>
                
              </Layout>
             
            
          </div>)
    }
}