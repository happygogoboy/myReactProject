import './style.scss'
import { Button,Drawer,Input,Form,Select,Radio   } from 'antd'
import { useState,useEffect } from 'react';
import { getAllBuild } from '../../api/build';

const { Option } = Select;


const Room = ()=>{
    //获取楼栋信息 和设置楼栋楼层的联级选择器 start
    const [buildList,setBuildList] = useState()
    const [buildNameArr,setBuildNameArr] = useState([])
    const [floorObj,setFloorObj] =useState({})
    const doGetAllBuild = async ()=>{
        let res = await getAllBuild()
        setBuildList(res.data)
        console.log('res.data',res.data);
        console.log('buildList',buildList);
        const tempArr = []
        res.data.map(item=>{
            tempArr.push(item.name)
        })
        
        setBuildNameArr(tempArr)
        const tempObj = res.data.map(item=>(
            buildNameArr.map(it=>(
                {it:item.floorInfo}
            ))
        )  
        )
        setFloorObj(tempObj)
        console.log('buildNameArr',buildNameArr)
        console.log('floorObj',floorObj)
    }

    useEffect(()=>{
        doGetAllBuild()
    },[])

    const provinceData = ['Zhejiang', 'Jiangsu'];
    const cityData = {
      Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
      Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
    };

    

     //获取楼栋信息 和设置楼栋楼层的联级选择器 end

     //添加房型信息的抽屉相关 start
    const [addDrawer, setaddDrawer] = useState(false);

    const showAddDrawer = () => {
      setaddDrawer(true);
    };

    const closeAddDrawer = () => {
      setaddDrawer(false);
    };

    const [cities, setCities] = useState(cityData[provinceData[0]]);
    const [secondCity, setSecondCity] = useState(cityData[provinceData[0]][0]);
   
    const handleProvinceChange = (value) => {
      setCities(cityData[value]);
      setSecondCity(cityData[value][0]);
    };
   
    const onSecondCityChange = (value) => {
      setSecondCity(value);
    };

    const [buildval, setBuildval] = useState('');
    const [floorval, setFloorval] = useState(cityData[provinceData[0]][0]);
    const [roomType, setRoomType] = useState('');
    const [roomName, setRoomName] = useState('');
    const [phone4in, setPhone4in] = useState('');
    const [phone4out, setPhone4out] = useState('');
    const [direction, setDirection] = useState(true);
    const [isClose2Road, setIsClose2Road] = useState(true);
    const [hasWindow, setHasWindow] = useState(true);
    const [isSmoke, setIsSmoke] = useState(true);
    const [isNoise, setIsNoise] = useState(true);
    const [isHigh, setIsHigh] = useState(true);
    const [roomSth, setRoomSth] = useState('');



    //添加房型信息的抽屉相关 end
    
    return (
       
        <div className='roomTypeBox'>
             <h1>
                <span></span>
                房型管理
            </h1>
            <Button type="primary" onClick={showAddDrawer}>添加房型</Button>
            {buildNameArr.map(item=>{
                <div>item</div>
            })}

            {/* 添加房型的抽屉 start*/}
            <Drawer className='drawer' title="添加房型" placement="right" onClose={closeAddDrawer} visible={addDrawer}>
            {/* 
              floor: String,
              type: String,            // 关联房型表
              roomName: String,
              buildId: String ,        // 关联楼栋表
              phone4in: String,        // 内线电话号码
              phone4out: String,       // 外线电话号码
              direction:String ,       // 1东2西3南4北
              isClose2Road: Boolean,   // 是否靠近马路
              hasWindow: Boolean,      // 是否有窗
              isSmoke: Boolean,        // 是否允许吸烟
              isNoise: Boolean,        // 是否是噪音房
              isHigh: Boolean,         // 是否是高温房   
              sthintheroom: Array,     // 房间内的资产 
            */}
            <Form
             labelCol={{ span: 6 }}
             wrapperCol={{ span: 18 }}
            >
                <Form.Item
                label="楼栋楼层"
                name="buildFloor"
                >
                    <Select defaultValue={provinceData[0]} style={{ width: 120 }} onChange={handleProvinceChange}>
                         {provinceData.map(province => (
                             <Option key={province}>{province}</Option>
                         ))}
                    </Select>
                    <Select style={{ width: 120 }} value={floorval} onChange={(value)=>setFloorval(value)}>
                      {cities.map(city => (
                        <Option key={city}>{city}</Option>
                      ))}
                    </Select>
                </Form.Item>

                <Form.Item
                label="房间类型"
                name="roomType"
                rules={[{ required: true, message: '请填写房间名!' }]}
                >
                    <Input placeholder='请输入房间名' onChange={(ev)=>{setRoomType(ev.target.value)}}></Input>
                </Form.Item>
                
                <Form.Item
                label="房间名"
                name="roomName"
                rules={[{ required: true, message: '请填写房间名!' }]}
                >
                    <Input placeholder='请输入房间名' onChange={(ev)=>{setRoomName(ev.target.value)}}></Input>
                </Form.Item>
                
                <Form.Item
                label="外线电话"
                name="phone4out"
                >
                    <Input placeholder='请输入外线电话' onChange={(ev)=>{setPhone4in(ev.target.value)}}></Input>
                </Form.Item>
                
                <Form.Item
                label="内线电话"
                name="phone4in"
                >
                    <Input placeholder='请输入内线电话' onChange={(ev)=>{setPhone4out(ev.target.value)}}></Input>
                </Form.Item>
               
                <Form.Item
                label="朝向"
                name="direction"
                >
                    <Radio.Group onChange={(ev)=>{setDirection(ev.target.value)}} value={direction} defaultValue={1}>
                        <Radio value={1}>东</Radio>
                        <Radio value={2}>西</Radio>
                        <Radio value={3}>南</Radio>
                        <Radio value={4}>北</Radio>
                    </Radio.Group>
                </Form.Item>
                
                <Form.Item
                label="是否靠马路"
                name="isClose2Road"
                >
                    <Radio.Group onChange={(ev)=>{setIsClose2Road(ev.target.value)}} value={isClose2Road} defaultValue={1}>
                        <Radio value={1}>是</Radio>
                        <Radio value={2}>否</Radio>
                    </Radio.Group>
                </Form.Item>
               
                <Form.Item
                label="是否有窗"
                name="hasWindow"
                >
                    <Radio.Group onChange={(ev)=>{setHasWindow(ev.target.value)}} value={hasWindow} defaultValue={1}>
                        <Radio value={1}>是</Radio>
                        <Radio value={2}>否</Radio>
                    </Radio.Group>
                </Form.Item>
               
                <Form.Item
                label="可否吸烟"
                name="isSmoke"
                >
                    <Radio.Group onChange={(ev)=>{setIsSmoke(ev.target.value)}} value={isSmoke} defaultValue={1}>
                        <Radio value={1}>是</Radio>
                        <Radio value={2}>否</Radio>
                    </Radio.Group>
                </Form.Item>
                
                <Form.Item
                label="是否噪音"
                name="isNoise"
                >
                    <Radio.Group onChange={(ev)=>{setIsNoise(ev.target.value)}} value={isNoise} defaultValue={1}>
                        <Radio value={1}>是</Radio>
                        <Radio value={2}>否</Radio>
                    </Radio.Group>
                </Form.Item>
                
                <Form.Item
                label="是否高温"
                name="isHigh"
                >
                    <Radio.Group onChange={(ev)=>{setIsHigh(ev.target.value)}} value={isHigh} defaultValue={1}>
                        <Radio value={1}>是</Radio>
                        <Radio value={2}>否</Radio>
                    </Radio.Group>
                </Form.Item>
               
                <Form.Item
                label="房内资产"
                name="sthintheroom"
                >
                    <Input onChange={(ev)=>{setRoomSth(ev.target.value)}} placeholder='请输入详情'></Input>
                </Form.Item>
                <Button type='danger' onClick={closeAddDrawer}>取消</Button>
                <Button type='primary'>确认添加</Button>
            </Form>     
            </Drawer>

            {/* 添加房型的抽屉 end*/}

        </div>
    )
}

export default Room