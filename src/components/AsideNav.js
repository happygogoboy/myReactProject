import { useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { Menu } from 'antd';

import { Layout } from 'antd';
const {  Sider } = Layout;



const SiderNav = ()=>{
    const curMenu = useSelector(state=>state.common.curMenu)
    const menu = useSelector(state=>state.common.menu)
    const subMenu = menu.find(item=>item.name==curMenu).children||[]
    const items2 = subMenu.map((item,index)=>{
        return{
            key:index,
            label:item.name,
            url:item.url
        }
    })

    const navigate = useNavigate()

    const menuClick = (item,key)=>{
        const url = items2[item.key].url
        console.log(url);
        navigate(url)
    }
   
    
    return(
        <Sider className="site-layout-background" width={200}>
        <Menu
          mode="inline"
          style={{ height: '100%' }}
          items={items2}
          onSelect={(item,key)=>{
            menuClick(item,key)
          }}

        />
      </Sider>
    )

}

export default SiderNav