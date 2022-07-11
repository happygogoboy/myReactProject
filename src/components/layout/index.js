
import {Outlet} from 'react-router-dom'
import './style.scss'
import { Layout } from 'antd';

import TopNav from '../TopNav';
const {  Sider, Content } = Layout;

const LayoutAll =()=>{


        return(
            <>
              <Layout>
                  <TopNav></TopNav>
                  <Layout>
                      <Sider>Sider</Sider>
                      <Content><Outlet/></Content>
                  </Layout>
              </Layout>
             
            </>  
        ) 
    
}

export default LayoutAll
