
import './style.scss'
import { Button, Checkbox, Form, Input } from 'antd';

const Login =()=>{

    
        return(
            <div className='loginBox'>

                    <Input placeholder='请输入账号' type='text'></Input>
                    <Input placeholder='请输入密码' type='password'></Input>
                    <Button type='primary'>登录</Button>
            </div>
        )
}

export default Login