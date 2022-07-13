import './style.scss'
import { Button,Drawer,Input,Form,Select,Radio,DatePicker, Space, message   } from 'antd'
import { useState,useEffect } from 'react';
import { getAllBuild } from '../../api/build';
import {addRoomtype} from '../../api/roomType'
const { RangePicker } = DatePicker;

const { Option } = Select;


const Roomtype = ()=>{

    //添加房型信息的抽屉相关 start
    const [addDrawer, setaddDrawer] = useState(false);

    const showAddDrawer = () => {
      setaddDrawer(true);
    };

    const closeAddDrawer = () => {
      setaddDrawer(false);
    };

    const onLiveChange = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
        setliveLimit(dateString)
    };

    const onStartChange = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
        setstartLimit(dateString)
      };
      
    const onOk = (value) => {
      console.log('onOk: ', value);
    };

    //抽屉表单状态和状态方法的声明
    const [name,setName] = useState(''); 
    const [price,setprice] = useState('');
    const [yaPrice,setyaPrice] = useState('');
    const [shortName,setshortName] = useState('');
    const [liveLimit,setliveLimit] = useState('');
    const [startLimit,setstartLimit] = useState('');
    const [couponNum,setcouponNum] = useState('');
    const [beds,setbeds] = useState('');
    //添加房型信息的抽屉相关 end

    //执行添加房型 start
        const doAddRoomType = async ()=>{
            let res = await addRoomtype({
                name,price,yaPrice,shortName,liveLimit,startLimit,startLimit,couponNum,beds
            })
            const {success} = res
            if(!success) message.info('添加失败')
            message.info('添加成功')
            closeAddDrawer()
        } 
    //执行添加房型 end
    
    return (
       
        <div className='roomTypeBox'>
             <h1>
                <span></span>
                房型管理
            </h1>
            <Button type="primary" onClick={showAddDrawer}>添加房型</Button>

            {/* 添加房型的抽屉 start*/}
            <Drawer className='drawer' title="添加房型" placement="right" onClose={closeAddDrawer} visible={addDrawer}>
            {/* 
              name:String,
              price: Number,
              yaPrice:Number,
              shortName:String,
              liveLimit: Number,
              startLimit: Number,
              couponNum: Number,
              beds:Number,
              imgs: Array
            */}
            <Form
             labelCol={{ span: 6 }}
             wrapperCol={{ span: 18 }}
            >


                <Form.Item
                label="房型名称"
                name="name"
                rules={[{ required: true, message: '请填写房型!' }]}
                >
                    <Input placeholder='请输入房型' onChange={(ev)=>{setName(ev.target.value)}}></Input>
                </Form.Item>
                
                <Form.Item
                label="价格"
                name="price"
                rules={[{ required: true, message: '请填写价格!' }]}
                >
                    <Input placeholder='请输入价格' onChange={(ev)=>{setprice(ev.target.value)}}></Input>
                </Form.Item>
                
                <Form.Item
                label="押金"
                name="yaPrice"
                rules={[{ required: true, message: '请填写价格!' }]}
                >
                    <Input placeholder='请输入价格' onChange={(ev)=>{setyaPrice(ev.target.value)}}></Input>
                </Form.Item>
                
                <Form.Item
                label="简称"
                name="shortName"
                >
                    <Input placeholder='请输入简称' onChange={(ev)=>{setshortName(ev.target.value)}}></Input>
                </Form.Item>
                
                <Form.Item
                label="入住时间"
                name="liveLimit"
                >
                    <Space direction="vertical" size={12}>
                      <DatePicker showTime onChange={onLiveChange} onOk={onOk} />
                    </Space>
                </Form.Item>

                <Form.Item
                label="开始时间"
                name="startLimit"
                >
                    <Space direction="vertical" size={12}>
                      <DatePicker showTime onChange={onStartChange} onOk={onOk} />
                    </Space>
                </Form.Item>

                <Form.Item
                label="枕头数"
                name="couponNum"
                >
                    <Input onChange={(ev)=>{setcouponNum(ev.target.value)}} placeholder='请输入详情'></Input>
                </Form.Item>

                <Form.Item
                label="床数"
                name="beds"
                >
                    <Input onChange={(ev)=>{setbeds(ev.target.value)}} placeholder='请输入详情'></Input>
                </Form.Item>

                <Button type='danger' onClick={closeAddDrawer}>取消</Button>
                <Button type='primary' onClick={doAddRoomType}>确认添加</Button>
            </Form>     
            </Drawer>

            {/* 添加房型的抽屉 end*/}

        </div>
    )
}

export default Roomtype