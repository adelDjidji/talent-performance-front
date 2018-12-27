import React, { Component } from 'react';

import {Tabs, Icon} from 'antd'

import ListObjColl from '../component/ObjCollList'
import ObjCollForm from '../component/ObjCollForm'
const TabPane = Tabs.TabPane;

export default class ObjColl extends Component{
     render (){
         return (
            <Tabs tabPosition="left">
                <TabPane tab={<span><Icon type="plus-circle" theme="outlined" /> Ajouter un objetif collectif</span>} key="1"><ObjCollForm></ObjCollForm></TabPane>
                <TabPane tab={<span><Icon type="bars" theme="outlined" /> Liste des objectifs</span>} key="2"><ListObjColl></ListObjColl></TabPane>
            </Tabs>
         )
     }
}