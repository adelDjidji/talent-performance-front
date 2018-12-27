import React from 'react';
import { Layout, Menu, Icon, Breadcrumb, Dropdown, Avatar } from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import '../styles/home.css'
import Team from './team'
import UserDetail from "./userDetail";
import ObjColl from './ObjColl'
import Profil from './profile.js'
import People from './people'
import FormAddUser from '../component/formAddUser'

const { Header, Sider, Content } = Layout;

const { SubMenu } = Menu;


export default class SiderDemo extends React.Component {

  constructor(props){
    super(props)
    this.type_user = JSON.parse(sessionStorage.getItem('sessionAccess'))
    this.curent_user = JSON.parse(sessionStorage.getItem('sessionCurrent'))
  }
  state = {
      featching:true,
    collapsed: false,
  };

logout= ()=>{
   
  sessionStorage.setItem("sessionID", 0);
  sessionStorage.setItem("sessionAccess", -1);
  sessionStorage.setItem("sessionCurrent", "");
  
  window.location.href='/'
  }

   
 

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  
  componentDidMount(){
      this.setState({featching:false})
  }

  getMenuByUserType=()=>{
    //alert('user type '+this.type_user)
    switch(this.type_user){
      case 0://admin
          return (
            <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item key="1"><Link to="/home"><Icon type="team" /><span>Equipes</span></Link></Menu.Item>
            <Menu.Item key="2"><Link to="/obj_coll"><Icon type="bulb" /><span>Objectifs collectifs</span></Link></Menu.Item>
            <Menu.Item key="3"><Link to="/people"><Icon type="bulb" /><span>Liste personnes</span></Link></Menu.Item>
            <Menu.Item key="3"><Link to="/add_user"><Icon type="bulb" /><span>ajouter des personnes</span></Link></Menu.Item>
          </Menu>
            )
      case 1://Manager
          return (
            <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
              <Menu.Item key="1"><Link to={{ pathname: '/home', state: { user_id: this.curent_user.id_user} }}><Icon type="team" /><span>Mon équipe</span></Link></Menu.Item>
              <Menu.Item key="3"><Link to="/obj_coll"><Icon type="bulb" /><span>Mon evaluation</span></Link></Menu.Item>
          </Menu>)
        default:
        return  <Menu.Item key="1"><Link to={{ pathname: '/home', state: { user_id: this.curent_user.id_user} }}><Icon type="team" /><span>jjj</span></Link></Menu.Item>

    }
  }
profil_test=()=>{
  return (<div>mon profile</div>)
}
  render() {
    var menu_left = this.getMenuByUserType()
   var  menu_dropdown = (
      <Menu>
        <Menu.Item>
          <Link to="/profil"><Icon type="user" /><span>Mon compte</span></Link>
        </Menu.Item>
        <Menu.Item>
          <a onClick={this.logout.bind(this)} rel="noopener noreferrer" href="">Deconnexion</a>
        </Menu.Item>
      </Menu>
    );
  
      if(this.state.featching) return (<h1>chargement ...</h1>)
      else return (
    <Router >
    <div style={{height: '100%'}}>
      <Layout style={{height: '100%', background: '#fff'}}>
     
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          
        >
          <div className="logo">
            <img src="assets/img/samha.png" />
            <span className={this.state.collapsed? "hidden":""}></span>
          </div>
       
        {menu_left}
        
      </Sider>
        <Layout style={{backgroundColor: '#e6f7ff'}} >
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              onClick={this.toggle} type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
            />
            <div className="header-right" > 
            <Dropdown overlay={menu_dropdown}>
                <a className="ant-dropdown-link" href="#" >
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  {this.curent_user.firstname +" "+this.curent_user.lastname }
                  <Icon type="down" />
                </a>
            </Dropdown>
            </div>
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff',minHeight: 'unset' }}>
            <Breadcrumb>    
                <Breadcrumb.Item href="/">
                  <Icon type="home" />
                </Breadcrumb.Item>
                <Breadcrumb.Item >
                  <Icon type="user" />
                  <span>Listes des collaborateurs</span>
                </Breadcrumb.Item>
               
            </Breadcrumb>
                        
                <div >
                    <Route  exact path="/" component={Team} />
                    <Route  exact path="/home" component={Team} />
                    <Route  exact path="/people" component={People} />
                    <Route  exact path="/add_user" component={FormAddUser} />
                    <Route  exact path="/profil" component={Profil} />
                    <Route name="detail" path="/detail"  component={UserDetail} />
                    <Route name="obj_coll" path="/obj_coll"  component={ObjColl} />
                </div> 

          </Content>
        </Layout>
      </Layout>
    </div>
    </Router>
    );
  }
}

