import { useEffect, useState } from 'react';
import { useRoutes } from 'react-router';
import { useSelector ,useDispatch} from 'react-redux';
import { setCurMenu } from '../store/commonSlice';
import { Layout,Menu } from 'antd';
import { useNavigate } from 'react-router';
import './component.scss'
const { Header } = Layout;

const TopNav = ()=>{
    const store = useSelector(state=>state)
    const menu = store.common.menu
    console.log('menu',menu);
    const curMenu = store.common.curMenu
    const dispatch = useDispatch()
    const items1 = menu.map((key,index) => ({
        key:index,
        label: `${key.name}`,
        url:key.url
      }));

    console.log(items1,'items1')
    const navigate = useNavigate()

    const handleSelect = (item,key)=>{
        
        dispatch(setCurMenu(items1[item.key].label))   
        navigate(items1[item.key].url)
    }

    useEffect(()=>{
        console.log('curMenu',curMenu);
    },[curMenu])
    return(
        <Header>
            <div className="logo"> </div>
             <Menu theme="dark" 
             mode="horizontal" 
             items={items1} 
             selectedKeys 
             defaultSelectedKeys={[1]}
             onSelect={(item,key)=>{
                handleSelect(item,key)
             }} />
        </Header>
    )
}

export default TopNav