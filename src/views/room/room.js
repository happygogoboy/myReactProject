import './style.scss'
import { Button,Drawer,Input,Form,Select,DatePicker, Space, message,Table, Tag ,Modal,Pagination ,Radio } from 'antd'
import { useState,useEffect ,useRef} from 'react';
import {addRoom,getAllRoom,delRoom,editRoom} from '../../api/room'
import {getAllBuild} from '../../api/build'
import {getAllRoomtype} from '../../api/roomType'
import moment  from 'moment'
const { RangePicker } = DatePicker;
const { Option } = Select;

const Room = ()=>{
    //获取所有楼栋信息为联级选择器提供数组 start
    const [buildNameArr,setBuildNameArr] = useState([])
    const [floorObj,setFloorObj] = useState({})
    const doGetAllBuild = async ()=>{
        let res = await getAllBuild()
        const tempArr = []
        const tempObj = {}
        res.data?.map(item=>{
            tempArr.push(item.name)
            const tempName = item.name;
            tempObj[tempName]=item.floorInfo ;
        })
        setTimeout(()=>{
            setBuildNameArr(tempArr)
            setFloorObj(tempObj)
        },3000)
        console.log('buildNameArr',buildNameArr);
        console.log('floorObj',floorObj);
        console.log('type of floorObj',typeof(floorObj));
    }

    useEffect(()=>{
        doGetAllBuild()
    },[])
    //获取所有楼栋信息为联级选择器提供数组 end
    
    //联级选择器相关 start
    // const buildNameArr = ['Zhejiang', 'Jiangsu'];
    // const floorObj = {
    //   Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
    //   Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
    // };
    const [curBuild, setCurBuild] = useState(buildNameArr[0]);
    const [curFloor, setCurFloor] = useState(floorObj.Zhejiang);
  
    const handleProvinceChange = (value) => {
        setCurBuild(floorObj[value]);
        setCurFloor(floorObj[value][0]);
    };
  
    const oncurFloorChange = (value) => {
        setCurFloor(value);
    };
    //联级选择器相关 end

    const addRef = useRef()
    const editRef = useRef()
    

    useEffect(()=>{
        doGetAllRoom()
    },[])
    //添加房间信息的抽屉相关 start
    const [addDrawer, setaddDrawer] = useState(false);
    const [roomArr,setRoomArr]= useState([])

    const showAddDrawer = () => {
      setaddDrawer(true);
    };

    const closeAddDrawer = () => {
      clearAddIpt()
      addRef.current.resetFields()
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
    const clearAddIpt = ()=>{
        setName('')
        setprice('')
        setyaPrice('')
        setshortName('')
        setliveLimit('')
        setstartLimit('')
        setcouponNum('')
        setbeds('')
    }
    //添加房间信息的抽屉相关 end

    //执行添加房间 start
    const doAddRoom = async ()=>{
        let res = await addRoom({
            name,
            price,
            yaPrice,
            shortName,
            liveLimit,
            startLimit,
            couponNum,
            beds
        })
        const {success} = res
        if(!success) message.info('添加失败')
        message.info('添加成功')
        closeAddDrawer()
        doGetAllRoom()
        clearAddIpt()
        addRef.current.resetFields()
    } 
    //执行添加房间 end

    //执行查询所有且table的设置 start
    const [roomList,setRoomList] = useState([])
    const [limit,setLimit] = useState(30)
    const [page,setPage] = useState(1)
    const [search,setSearch] = useState()
    const [searchPrice,setSearchPrice] = useState()
    const [total,setTotal] = useState()
    useEffect(()=>{
        console.log(limit,'limit');
        console.log(page,'page');
        doGetAllRoom()
    },[limit,page])
    const doGetAllRoom = async ()=>{
        const tempObj = {}
        if(search)tempObj.name = search
        if(searchPrice)tempObj.price = searchPrice
        let res = await getAllRoom({
            limit,
            page,
            ...tempObj
        })
        setRoomList(res.data)
        setTotal(res.count)
    }
        //table的设置 start 
    const columns = [
        {
          title: '楼栋楼层',
          dataIndex: 'floor',
          key: 'floor',
        },
        {
          title: '房型',
          dataIndex: 'type',
          key: 'type',
        },
        {
          title: '房间名',
          dataIndex: 'roomName',
          key: 'roomName',
        },
        {
          title: '内线电话',
          dataIndex: 'phone4in',
          key: 'phone4in',
        },
        {
          title: '外线电话',
          dataIndex: 'phone4out',
          key: 'phone4out',
        },
        {
          title: '朝向',
          dataIndex: 'direction',
          key: 'direction',
        },
        {
            title: '近马路吗',
            dataIndex: 'isClose2Road',
            key: 'isClose2Road',
        },
        {
            title: '有窗吗',
            dataIndex: 'hasWindow',
            key: 'hasWindow',
        },
        {
            title: '可否吸烟',
            dataIndex: 'isSmoke',
            key: 'isSmoke',
        },
        {
            title: '是否很吵',
            dataIndex: 'isNoise',
            key: 'isNoise',
        },
        {
            title: '是否很热',
            dataIndex: 'isHigh',
            key: 'isHigh',
        },
        {
            title: '房间资产',
            dataIndex: 'sthintheroom',
            key: 'sthintheroom',
        },
        {
          title: '操作',
          dataIndex: 'handle',
          key: 'handle',
          render:(_,record)=>(
                <div>
                    <Button type='danger' style={{marginRight:'5px'}}  onClick={()=>{
                        console.log(record._id);
                        setId(record._id)
                        setShowDelModel(true)
                    }}>删除</Button>
                    <Button type='primary' onClick={()=>{
                        openEditDrawer(record)
                    }}>编辑</Button>
                </div>
          )
          }
    ]
        //table的设置 end 
    //执行查询所有且table的设置 end

    //删除单个房间操作 start
    const [Id,setId] = useState()
    const [List,setList] = useState([])
    const [showDelModel,setShowDelModel] = useState(false)
    const doDelRoom = async ()=>{
        console.log(Id);
        let res = await delRoom(
           {id:Id} 
        )
        const {success} = res
        if(!success) return message.info('删除失败')
        message.info('删除成功')
        setShowDelModel(false)
        doGetAllRoom()
    }
    //删除单个房间操作 end

    //编辑的操作 start
    const [editDrawer,setEditDrawer] = useState(false)
    const closeEditDrawer = ()=>{
        clearAddIpt()
        setEditDrawer(false)
        setList([])
    }
    const openEditDrawer=(record)=>{
        setId(record._id)
        setEditDrawer(true)
        setList(record)
        setTimeout(()=>{
            console.log('rrrrr',record)
            editRef.current.setFieldsValue({
                ...{liveLimit,...record},
                liveLimit:moment(record.liveLimit)
            })
            setName(record.name)
            setprice(record.price)
            setyaPrice(record.yaPrice)
            setshortName(record.shortName)
            setliveLimit(record.liveLimit)
            setstartLimit(record.startLimit)
            setcouponNum(record.couponNum)
            setbeds(record.beds)
        },300)
       
    }
    const doEditRoom = async ()=>{
        let res = await editRoom(
            {
                id:Id,
                name,
                price,
                yaPrice,
                shortName,
                liveLimit,
                startLimit,
                couponNum,
                beds}
        )
        const {success} = res
        if(!success) return message.info('修改失败')
        message.info('修改成功')
        closeEditDrawer()
        doGetAllRoom()
        clearAddIpt()
    }
    //编辑的操作 end
    
    return (
       
        <div className='roomBox'>
             <h1>
                <span></span>
                房间管理
            </h1>
            <div className='addMiniBox'>
                 <Button type="primary" onClick={showAddDrawer}>添加房间</Button>
                 <Input placeholder='通过房间名称查询'
                 onChange={(ev)=>setSearch(ev.target.value)}
                 ></Input>
                 <Input placeholder='通过价格查询'
                 onChange={(ev)=>setSearchPrice(ev.target.value)}
                 ></Input>
                 <Button onClick={doGetAllRoom}>点击查询</Button>
            </div>
            
            {/* 渲染的表格 start*/}
            <Table columns={columns} dataSource={roomList} 
            pagination={false} scroll={{y:'500px'}}
            />
                {/* 分页器 start */}
                <Pagination style={{marginTop:'10px'}} defaultCurrent={1} total={total} pageSize={limit} pageSizeOptions={[4, 10, 20, 30]} showSizeChanger
                onChange={(page,pageSize)=>{
                    if(page)setPage(page)
                    setLimit(pageSize)
                }}
                />
                {/* 分页器 end */}
            {/* 渲染的表格 end*/}

            {/* 添加的抽屉 start*/}
            <Drawer className='drawer' title="添加房间" placement="right" onClose={closeAddDrawer} visible={addDrawer}>
            <Form
             labelCol={{ span: 6 }}
             wrapperCol={{ span: 18 }}
             ref={addRef}
            
            >

                <Form.Item
                label="楼栋楼层"
                name="floor"
                rules={[{ required: true, message: '请选择楼栋楼层' }]}
                >
                     <Select
                        defaultValue={buildNameArr[0]}
                        style={{
                          width: 120,
                        }}
                        onChange={handleProvinceChange}
                     >
                        {buildNameArr?.map((province) => (
                          <Option key={province}>{province}</Option>
                        ))}
                     </Select>
                     <Select
                        style={{
                          width: 120,
                        }}
                        value={curFloor}
                        onChange={oncurFloorChange}
                      >
                        {curBuild?.map((city) => (
                          <Option key={city}>{city}</Option>
                        ))}
                     </Select>
                </Form.Item>
                
                <Form.Item
                label="房型"
                name="type"
                rules={[{ required: true, message: '请选择房型!' }]}
                >
                    <Select>
                        {roomArr?.map(item=>(<Option value={item.name}>{item.name}</Option>))}
                    </Select>
                </Form.Item>
                
                <Form.Item
                label="房间名"
                name="roomName"
                rules={[{ required: true, message: '请填写房间名' }]}
                >
                    <Input placeholder='请填写房间名' onChange={(ev)=>{setyaPrice(ev.target.value)}} value={yaPrice}></Input>
                </Form.Item>
                
                <Form.Item
                label="内线电话"
                name="phone4in"
                >
                    <Input placeholder='请输入内线电话' onChange={(ev)=>{setshortName(ev.target.value)}} value={shortName}></Input>
                </Form.Item>
                
                <Form.Item
                label="外线电话"
                name="phone4out"
                >
                    <Input placeholder='请输入外线电话' onChange={(ev)=>{setshortName(ev.target.value)}} value={shortName}></Input>                 
                </Form.Item>

                <Form.Item
                label="朝向"
                name="direction"
                >
                    <Radio.Group name="radiogroup" defaultValue={1}>
                       <Radio value={1}>东</Radio>
                       <Radio value={2}>西</Radio>
                       <Radio value={3}>南</Radio>
                       <Radio value={4}>北</Radio>
                    </Radio.Group> 
                </Form.Item>

                <Form.Item
                label="近马路吗"
                name="isClose2Road"
                >
                     <Radio.Group name="radiogroup" defaultValue={1}>
                       <Radio value={1}>是</Radio>
                       <Radio value={2}>否</Radio>
                    </Radio.Group> 
                </Form.Item>

                <Form.Item
                label="有窗吗"
                name="hasWindow"
                >
                     <Radio.Group name="radiogroup" defaultValue={1}>
                       <Radio value={1}>是</Radio>
                       <Radio value={2}>否</Radio>
                    </Radio.Group> 
                </Form.Item>

                <Form.Item
                label="可否吸烟"
                name="isSmoke"
                >
                     <Radio.Group name="radiogroup" defaultValue={1}>
                       <Radio value={1}>是</Radio>
                       <Radio value={2}>否</Radio>
                    </Radio.Group> 
                </Form.Item>

                <Form.Item
                label="是否很吵"
                name="isNoise"
                >
                     <Radio.Group name="radiogroup" defaultValue={1}>
                       <Radio value={1}>是</Radio>
                       <Radio value={2}>否</Radio>
                    </Radio.Group> 
                </Form.Item>

                <Form.Item
                label="是否很热"
                name="isHigh"
                >
                     <Radio.Group name="radiogroup" defaultValue={1}>
                       <Radio value={1}>是</Radio>
                       <Radio value={2}>否</Radio>
                    </Radio.Group> 
                </Form.Item>

                <Form.Item
                label="房间资产"
                name="sthintheroom"
                >
                     <Input onChange={(ev)=>{setbeds(ev.target.value)}} placeholder='请输入资产详情' value={beds}></Input>
                </Form.Item>

                <Button type='danger' onClick={closeAddDrawer}>取消</Button>
                <Button type='primary' onClick={doAddRoom}>确认添加</Button>
            </Form>     
            </Drawer>
            {/* 添加的抽屉 end*/}

            {/* 删除的弹出框 start */}
            <Modal title="温馨提醒" visible={showDelModel} onOk={doDelRoom} onCancel={()=>setShowDelModel(false)} cancelText="取消" okText="确认">
              <p>确定删除所选房间吗？</p>
            </Modal>
            {/* 删除的弹出框 end */}

            {/* 编辑的抽屉 start*/}
            <Drawer className='drawer' title="编辑房间" placement="right" onClose={closeEditDrawer} visible={editDrawer}>
            <Form
             labelCol={{ span: 6 }}
             wrapperCol={{ span: 18 }}
             ref={editRef}
            >

                <Form.Item
                label="房间名称"
                name="name"
                rules={[{ required: true, message: '请填写房间!' }]}
                
                >
                    <Input placeholder='请输入房间' onChange={(ev)=>{setName(ev.target.value)}} value={name}></Input>
                </Form.Item>
                
                <Form.Item
                label="价格"
                name="price"
                rules={[{ required: true, message: '请填写价格!' }]}
                >
                    <Input placeholder='请输入价格' onChange={(ev)=>{setprice(ev.target.value)}} value={price}></Input>
                </Form.Item>
                
                <Form.Item
                label="押金"
                name="yaPrice"
                rules={[{ required: true, message: '请填写价格!' }]}
                >
                    <Input placeholder='请输入价格' onChange={(ev)=>{setyaPrice(ev.target.value)}} value={yaPrice}></Input>
                </Form.Item>
                
                <Form.Item
                label="简称"
                name="shortName"
                >
                    <Input placeholder='请输入简称' onChange={(ev)=>{setshortName(ev.target.value)}} value={shortName}></Input>
                </Form.Item>
                
                <Form.Item
                label="入住时间"
                name="liveLimit"
                >
                    <Space direction="vertical" size={12}>
                      <DatePicker showTime onChange={onLiveChange} onOk={onOk}/>
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
                    <Input onChange={(ev)=>{setcouponNum(ev.target.value)}} placeholder='请输入详情' value={couponNum}></Input>
                </Form.Item>

                <Form.Item
                label="床数"
                name="beds"
                >
                    <Input onChange={(ev)=>{setbeds(ev.target.value)}} placeholder='请输入详情' value={beds}></Input>
                </Form.Item>

                <Button type='danger' onClick={closeEditDrawer}>取消</Button>
                <Button type='primary' onClick={doEditRoom}>确认修改</Button>
            </Form>     
            </Drawer>
            {/* 编辑的抽屉 end*/}

        </div>
    )
}

export default Room