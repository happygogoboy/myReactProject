import { Component} from 'react'
import withRouter from '../../util/withRouter'
import './style.scss'

class Go extends Component{
    state={
        time:3
    }

    componentDidMount(){
        this.Interval()
        this.timer()
    }

    componentWillUnmount(){
        clearInterval(this.Interval)
    }

    Interval = ()=>{
        setInterval(()=>{
            this.setState({
                time:this.state.time-1
            })
        },1000)
    }

    timer = ()=>{
        setTimeout(()=>{
          this.props.navigate('/login',{replace:true})  
        },3000)
    }

    render(){
        return(
        <div className='goBox'>
            <h1 >您还没有登录哦，请先进行登录操作</h1>
            <h2><span style={{color:'red',fontSize:'30px'}}>{this.state.time}</span>秒钟后将跳转到登录页</h2>
        </div>
        )
    }
}

export default withRouter(Go)