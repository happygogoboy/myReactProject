import './style.scss'
import { Button,Drawer,Input,Form,Select,DatePicker, message,Table ,Modal,Pagination ,Radio,Cascader  } from 'antd'
import { useState,useEffect } from 'react';
import {addRoom,getAllRoom,delRoom,editRoom} from '../../api/room'
import {getAllBuild} from '../../api/build'
import {getAllRoomtype} from '../../api/roomType'
import { useForm } from 'antd/lib/form/Form';

import moment  from 'moment'
const { RangePicker } = DatePicker;
const { Option } = Select;
const options = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
        },
      ],
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
        },
      ],
    },
  ];


  const gogo =[
    {value:123,label:123,childern:[
                {value:987,
                label:987}
                        ]},
    {value:123,label:123,childern:[
                {value:987,
                label:987}
                        ]}
    ]
const Room = ()=>{
    //获取所有楼栋信息为联级选择器提供数组 start
    const [buildIdArr,setbuildIdArr] = useState([])
    const doGetAllBuild = async ()=>{
        let res = await getAllBuild()        
        const tempArr = []
        res.data?.map(item=>{
            const tempObj=
                {
                    value:item.name,
                    label:item.name,
                    children:
                        item.floorInfo.map(it=>({
                            value:it,
                            label:it
                        })                           
                        )
                    
                }
                tempArr.push(tempObj)
        })
        setbuildIdArr(tempArr)
    }

    useEffect(()=>{
        doGetAllBuild()
    },[])
    //获取所有楼栋信息为联级选择器提供数组 end
    
    //联级选择器相关 start


 
    const [builds, setBuilds] = useState(null);
    const [secondBuild, setScondBuild] = useState(null);
    
    useEffect(()=>{
        console.log('buildIdArr',buildIdArr);
        if(buildIdArr){
        setbuildId(buildIdArr[0])
        }
    },[buildIdArr])

    

    //联级选择器相关 end

    //房型下拉选项相关 start
    const [typeArr,setTypeArr] = useState()
    const doGetAllRoomtype = async ()=>{
        let res = await getAllRoomtype()
        const tempArr = []
        res.data.map(item=>{
            tempArr.push(item.name)
        })
        setTypeArr(tempArr)
    }
    useEffect(()=>{
        console.log(typeArr);
    },[typeArr])
    //房型下拉选项相关 end

    

    useEffect(()=>{
        doGetAllRoom()
        doGetAllRoomtype()
    },[])

    //添加房间信息的抽屉相关 start
    const [addDrawer, setaddDrawer] = useState(false);
    const [roomArr,setRoomArr]= useState([])

    const showAddDrawer = () => {
      console.log('打开一下');
      setTimeout(()=>{
        const initValue = addForm.current.getFieldsValue(true)
        console.log('initValue',initValue)
      },300)
      
      setaddDrawer(true);
    };

    const closeAddDrawer = () => {   
      setTimeout(()=>{
        addForm.current.resetFields()
      },300)
      setaddDrawer(false);
    };


    //抽屉表单状态和状态方法的声明
    const [addForm] = useForm()

    
    const [buildId,setbuildId] = useState(); 
    const [floor,setFloor] = useState(); 
    const [type,setType] = useState();
    const [roomName,setRoomName] = useState('');
    const [phone4in,setPhone4in] = useState('');
    const [phone4out,setPhone4out] = useState('');
    const [direction,setDirection] = useState(1);
    const [isClose2Road,setIsClose2Road] = useState(true);
    const [hasWindow,sethasWindow] = useState(true);
    const [isSmoke,setIsSmoke] = useState(true);
    const [isNoise,setIsNoise] = useState(true);
    const [isHigh,setIsHigh] = useState(true);
    const [sthintheroom,setSthIntheroom] = useState('');

    useEffect(()=>{
        console.log(typeArr,'typeArr');
        if(typeArr)setType(typeArr[0])
        if(buildIdArr)setbuildId(buildIdArr[0])
        
    },[typeArr,buildIdArr])
    const clearAddIpt = ()=>{
        setbuildId('')
        setFloor('')
        setFloor('')
        setType('')
        setRoomName('')
        setPhone4in('')
        setPhone4out('')
        setDirection('')
        setIsClose2Road('')
        sethasWindow('')
        setIsSmoke('')
        setIsNoise('')
        setIsHigh('')
        setSthIntheroom('')
    }
    //添加房间信息的抽屉相关 end

    //执行添加房间 start

    
    const doAddRoom = async ()=>{
        const values = addForm.current.getFieldsValue(true);
        let res = await addRoom({
            buildId,
            floor,
            type,
            direction,
            isClose2Road,
            hasWindow,
            isSmoke,
            isNoise,
            isHigh,
            ...values,
        })
        const {success} = res
        if(!success) return message.info('添加失败')
        message.info('添加成功')
        closeAddDrawer()
        doGetAllRoom()
        setTimeout(() => {
            addForm.current.resetFields()
        }, 300);
    } 
    //执行添加房间 end

    //执行查询所有且table的设置 start
    const [roomList,setRoomList] = useState([])
    const [limit,setLimit] = useState(30)
    const [page,setPage] = useState(1)
    const [search,setSearch] = useState()
    const [searchType,setSearchType] = useState()
    const [total,setTotal] = useState()

    //监听limit和page的变化
    useEffect(()=>{
        console.log(limit,'limit');
        console.log(page,'page');
        doGetAllRoom()
    },[limit,page])

    //发出获取所有信息的请求和操作
    const doGetAllRoom = async ()=>{
        const tempObj = {}
        if(search)tempObj.roomName = search
        if(searchType)tempObj.type = searchType
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
          title: '楼层',
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
          render:(text)=>{
            if(text===1) return '东'
            if(text===2) return '西'
            if(text===3) return '南'
            if(text===4) return '北'
            return '其他'
          }
        },
        {
            title: '近马路吗',
            dataIndex: 'isClose2Road',
            key: 'isClose2Road',
            render:(text)=>{
                if(text===true) return '是'
                if(text===false) return '否'
            }
        },
        {
            title: '有窗吗',
            dataIndex: 'hasWindow',
            key: 'hasWindow',
            render:(text)=>{
                if(text===true) return '是'
                if(text===false) return '否'
            }
        },
        {
            title: '可否吸烟',
            dataIndex: 'isSmoke',
            key: 'isSmoke',
            render:(text)=>{
                if(text===true) return '是'
                if(text===false) return '否'
            }
        },
        {
            title: '是否很吵',
            dataIndex: 'isNoise',
            key: 'isNoise',
            render:(text)=>{
                if(text===true) return '是'
                if(text===false) return '否'
            }
        },
        {
            title: '是否很热',
            dataIndex: 'isHigh',
            key: 'isHigh',
            render:(text)=>{
                if(text===true) return '是'
                if(text===false) return '否'
            }
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
                    <Button type='danger' size="small" style={{marginRight:'5px'}}  onClick={()=>{
                        console.log('record',record);
                        setId(record._id)
                        setShowDelModel(true)
                    }}>删除</Button>
                    <Button type='primary' size="small" onClick={()=>{
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
    const [showDelModel,setShowDelModel] = useState(false)
    const doDelRoom = async ()=>{
        console.log(Id);
        let res = await delRoom(
           {roomid:Id} 
        )
        const {success} = res
        if(!success) return message.info('删除失败')
        message.info('删除成功')
        setShowDelModel(false)
        doGetAllRoom()
    }
    //删除单个房间操作 end

    //编辑的操作 start
    const [editRef] = useForm()
    const [editDrawer,setEditDrawer] = useState(false)

    //关掉编辑抽屉的函数
    const closeEditDrawer = ()=>{
        setEditDrawer(false)
    }

    //打开编辑抽屉的函数
    const openEditDrawer=(record)=>{
        setEditDrawer(true)
        setId(record._id)
        setbuildId(record.buildId)
        setFloor(record.floor)
        console.log(record);
        setTimeout(()=>{
            console.log('rrrrr',record)
            editRef.current.setFieldsValue({
                ...record,
                floor:[buildId,floor]
            })
            
        },300)
       
    }
    
    //发送编辑请求执行编辑操作

    const doEditRoom = async ()=>{

        const values = editRef.current.getFieldsValue(true)
        let res = await editRoom({
            roomid:Id,
            ...values
        })
        const {success} = res
        if(!success) return message.info('修改失败')
        message.info('修改成功')
        closeEditDrawer()
        doGetAllRoom()
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
                 <Input placeholder='通过房间类型查询'
                 onChange={(ev)=>setSearchType(ev.target.value)}
                 ></Input>
                 <Button onClick={doGetAllRoom}>点击查询</Button>
            </div>
            
            {/* 渲染的表格 start*/}
            <Table 
                columns={columns} 
                dataSource={roomList} 
                pagination={false} 
                scroll={{y:'500px'}}
            />
            {/* 渲染的表格 end*/}

            {/* 分页器 start */}
            <Pagination 
                style={{marginTop:'10px'}} 
                defaultCurrent={1} 
                total={total} 
                pageSize={limit} 
                pageSizeOptions={[4, 10, 20, 30]} 
                showSizeChanger
                onChange={(page,pageSize)=>{
                    if(page)setPage(page)
                    setLimit(pageSize)
                }}
            />
            {/* 分页器 end */}
            

            {/* 添加的抽屉 start*/}
            <Drawer className='drawer' title="添加房间" placement="right" onClose={closeAddDrawer} visible={addDrawer}>
            <Form
             labelCol={{ span: 6 }}
             wrapperCol={{ span: 18 }}
             ref={addForm}
            >

                <Form.Item label="楼栋楼层" name="bandf">
                    <Cascader  
                    options={buildIdArr} 
                    placeholder="请选择楼栋楼层" 
                    onChange={(value)=>{
                        console.log('value',value)
                        setbuildId(value[0])
                        setFloor(value[1])
                    }}
                    ></Cascader>
                </Form.Item>
                
                <Form.Item
                label="房型"
                name="type"
                rules={[{ required: true, message: '请选择房型!' }]}
                >
                    <Select 
                        style={{
                          width: 120,
                        }}
                        defaultValue={typeArr&&typeArr[0]}
                        onChange={(value)=>setType(value)}
                    >
                        {typeArr?.map(item=>(<Option key={item}>{item}</Option>))}
                    </Select>
                </Form.Item>
                
                <Form.Item
                label="房间名"
                name="roomName"
                rules={[{ required: true, message: '请填写房间名' }]}
                >
                    <Input placeholder='请填写房间名' onChange={(ev)=>{setRoomName(ev.target.value)}} value={roomName}></Input>
                </Form.Item>
                
                <Form.Item
                label="内线电话"
                name="phone4in"
                >
                    <Input placeholder='请输入内线电话' onChange={(ev)=>{setPhone4in(ev.target.value)}} value={phone4in}></Input>
                </Form.Item>
                
                <Form.Item
                label="外线电话"
                name="phone4out"
                >
                    <Input placeholder='请输入外线电话' onChange={(ev)=>{setPhone4out(ev.target.value)}} value={phone4out}></Input>                 
                </Form.Item>

                <Form.Item
                label="朝向"
                name="direction"
                >
                    <Radio.Group name="direction" defaultValue={1}>
                    
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
                     <Radio.Group name="isClose2Road" defaultValue={true}>                       
                       <Radio value={true}>是</Radio>
                       <Radio value={false}>否</Radio>
                    </Radio.Group> 
                </Form.Item>

                <Form.Item
                label="有窗吗"
                name="hasWindow"
                >
                     <Radio.Group name="hasWindow" defaultValue={true}>
                       <Radio value={true}>是</Radio>
                       <Radio value={false}>否</Radio>
                    </Radio.Group> 
                </Form.Item>

                <Form.Item
                label="可否吸烟"
                name="isSmoke"
                >
                     <Radio.Group name="isSmoke" defaultValue={true} >
                        <Radio value={true}>是</Radio>
                       <Radio value={false}>否</Radio>
                    </Radio.Group> 
                </Form.Item>

                <Form.Item
                label="是否很吵"
                name="isNoise"
                >
                     <Radio.Group name="isNoise" defaultValue={true} >
                        <Radio value={true}>是</Radio>
                       <Radio value={false}>否</Radio>
                    </Radio.Group> 
                </Form.Item>

                <Form.Item
                label="是否很热"
                name="isHigh"
                >
                     <Radio.Group name="isHigh" defaultValue={true} >
                       <Radio value={true}>是</Radio>
                       <Radio value={false}>否</Radio>
                    </Radio.Group> 
                </Form.Item>

                <Form.Item
                label="房间资产"
                name="sthintheroom"
                >
                     <Input onChange={(ev)=>{setSthIntheroom(ev.target.value)}} placeholder='请输入资产详情' value={sthintheroom}></Input>
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
            <Drawer className='drawer' title="编辑房间信息" placement="right" onClose={closeEditDrawer} visible={editDrawer}>
            <Form
             labelCol={{ span: 6 }}
             wrapperCol={{ span: 18 }}
             ref={editRef}
            >

                <Form.Item
                label="楼栋楼层"
                name="floor"
                rules={[{ required: true, message: '请选择楼栋楼层' }]}
                >
                    <Cascader  
                    options={buildIdArr} 
                    placeholder="请选择楼栋楼层" 
                    onChange={(value)=>{
                        console.log('value',value)
                        setbuildId(value[0])
                        setFloor(value[1])
                    }}
                    ></Cascader>
                </Form.Item>
                                      
                <Form.Item
                label="房型"
                name="type"
                rules={[{ required: true, message: '请选择房型!' }]}
                >
                    <Select 
                        style={{
                          width: 120,
                        }}
                        defaultValue={typeArr&&typeArr[0]}
                        onChange={(value)=>setType(value)}
                    >
                        {typeArr?.map(item=>(<Option key={item}>{item}</Option>))}
                    </Select>
                </Form.Item>
                
                <Form.Item
                label="房间名"
                name="roomName"
                rules={[{ required: true, message: '请填写房间名' }]}
                >
                    <Input placeholder='请填写房间名' onChange={(ev)=>{setRoomName(ev.target.value)}} value={roomName}></Input>
                </Form.Item>
                
                <Form.Item
                label="内线电话"
                name="phone4in"
                >
                    <Input placeholder='请输入内线电话' onChange={(ev)=>{setPhone4in(ev.target.value)}} value={phone4in}></Input>
                </Form.Item>
                
                <Form.Item
                label="外线电话"
                name="phone4out"
                >
                    <Input placeholder='请输入外线电话' onChange={(ev)=>{setPhone4out(ev.target.value)}} value={phone4out}></Input>                 
                </Form.Item>

                <Form.Item
                label="朝向"
                name="direction"
                >
                    <Radio.Group name="direction" defaultValue={1}>
                    
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
                     <Radio.Group name="isClose2Road" defaultValue={true}>                       
                       <Radio value={true}>是</Radio>
                       <Radio value={false}>否</Radio>
                    </Radio.Group> 
                </Form.Item>

                <Form.Item
                label="有窗吗"
                name="hasWindow"
                >
                     <Radio.Group name="hasWindow" defaultValue={true}>
                       <Radio value={true}>是</Radio>
                       <Radio value={false}>否</Radio>
                    </Radio.Group> 
                </Form.Item>

                <Form.Item
                label="可否吸烟"
                name="isSmoke"
                >
                     <Radio.Group name="isSmoke" defaultValue={true} >
                        <Radio value={true}>是</Radio>
                       <Radio value={false}>否</Radio>
                    </Radio.Group> 
                </Form.Item>

                <Form.Item
                label="是否很吵"
                name="isNoise"
                >
                     <Radio.Group name="isNoise" defaultValue={true} >
                        <Radio value={true}>是</Radio>
                       <Radio value={false}>否</Radio>
                    </Radio.Group> 
                </Form.Item>

                <Form.Item
                label="是否很热"
                name="isHigh"
                >
                     <Radio.Group name="isHigh" defaultValue={true} >
                       <Radio value={true}>是</Radio>
                       <Radio value={false}>否</Radio>
                    </Radio.Group> 
                </Form.Item>

                <Form.Item
                label="房间资产"
                name="sthintheroom"
                >
                     <Input onChange={(ev)=>{setSthIntheroom(ev.target.value)}} placeholder='请输入资产详情' value={sthintheroom}></Input>
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