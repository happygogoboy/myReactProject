
import './style.scss'
import { Button, Input,Form,message} from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux/es/exports';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import {login} from '../../api/admin'
import { setAdminInfo } from '../../store/adminSlice';

const Login =()=>{

        const navigate = useNavigate()
        const dispatch = useDispatch()
        console.log('dispatch',dispatch);
        const [username,setUsername] = useState()
        const [pwd,setPwd] = useState()
        const userInfo = useSelector(state=>state.admin.adminInfo)

        const doLogin = async()=>{
                let res = await login({
                        name:username,
                        pwd:pwd
                })
                const {success} = res
                console.log('success',success);
                if(success){
                        dispatch(setAdminInfo(res.data))
                        navigate('/index')
                        console.log();
                }else{
                        message.info('请输入正确的用户名和密码')
                }
        }
    
        return(
                <div className='loginBg'>
                   <div className='loginBox'>
                        <Form>
                             <Form.Item
                                label="账号"
                                name="username"
                                rules={[{ required: true, message: '请填写用户名' }]}
                              >
                                 <Input placeholder='请输入账号' type='text' onChange={(ev)=>setUsername(ev.target.value)}></Input>
                            </Form.Item>  
                            <Form.Item
                               label="密码"
                               name="password"
                               rules={[{ required: true, message: '请填写密码' }]}
                             >
                                 <Input placeholder='请输入密码' type='password' onChange={(ev)=>setPwd(ev.target.value)}></Input>
                            </Form.Item>                  
                            <Button type='primary' onClick={doLogin}>登录</Button>
                        </Form>
                   </div>
                </div>
            
        )
}

export default Login