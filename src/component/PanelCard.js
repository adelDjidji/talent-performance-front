import React, { Component } from 'react';
import { Icon, Button, Modal } from "antd";

import moment  from "moment";

import FormMiddleEval from '../component/FormMiddleEval'

import '../styles/cardPanel.css'


class Panel extends Component{
    constructor(props){
        super(props)
        this.data = this.props.data

        this.state={
            modalAdd:false
        }
    }

    showModal=()=>{
        this.setState({
            modalAdd:true
        })
    }

    render(){
        console.log("PANEL INFO ==" ,this.data)
        var date 
        var same =false
        if(this.props.data!=null)
        {
            if(this.data.date_planed==this.data.date_done) {same =true;date = moment(this.data.date_planned).lang("fr").format('LL');}
            else date={planed:moment(this.data.date_planned).isValid()?this.data.date_planed:null , done:moment(this.data.date_done).isValid()?this.data.date_done:null}
            console.log("DATTE ==",date)
            return(
                <div>
                    <div className="card border-primary mb-3" style={{maxWidth: '17rem'}}>
                    <div className="card-header" style={{padding: '5pt 6.25pt'}}><b>{this.props.title}</b></div>
                    <div className="card-body">
                        {same?
                        <span>
                            <span className="card-title"><Icon type="calendar" theme="outlined" /><strong>Date entretien prévu :</strong></span>
                            <p className="card-text">{date}</p>
                        </span>:
                        <span>
                            <span className="card-title"><Icon type="calendar" theme="outlined" /><strong>Date entretien prévu :</strong></span>
                            <p className="card-text">{moment(date.planed).lang("fr").format('LL')}</p>
                            <span className="card-title"><Icon type="calendar" theme="outlined" /><strong>Date entretien tenu :</strong></span>
                            {
                                moment(date.done).isValid()?
                                    <p className="card-text">{moment(date.done).lang("fr").format('LL')}</p>
                                :
                                
                                <p>Inconnu</p>
                            }
                        </span>
                }
                        
                        <span className="card-title"><Icon type="environment" theme="outlined" /><strong>Lieu entretien :</strong></span>
                        <p className="card-text">{this.data.lieu}</p>
                    </div>
                    </div>
                            
                        
                </div>
                )
        }
        else return (<div>
            <Button type="primary" onClick={this.showModal}>
                ajouter
            </Button>
            <Modal
                title="Ajouter un RDV Mi parcours"
                visible={this.state.modalAdd}
                onOk={this.handleOk}
                onCancel={()=>this.setState({modalAdd:false})}
            >
            <FormMiddleEval></FormMiddleEval>
            </Modal>
        </div>)
        
    }
}
export default Panel