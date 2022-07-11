import { useSelector ,useDispatch} from 'react-redux';
import { Layout,Menu } from 'antd';
const { Header } = Layout;


const TopNav = ()=>{
    const store = useSelector(state=>state)
    console.log('store',store);
    return(
        <Header>
            <Menu>
                <Menu.Item>菜单项一</Menu.Item>
                <Menu.Item>菜单项二</Menu.Item>
            </Menu>
        </Header>
    )
}

export default TopNav