import './style.scss'
import { Button,Drawer,Input,Form,Select,DatePicker, Space, message,Table, Tag ,Modal,Pagination  } from 'antd'
import { useState,useEffect ,useRef} from 'react';
import { getAllBuild } from '../../api/build';
import {addRoomtype,getAllRoomtype,delRoomtype,editRoomtype} from '../../api/roomType'
import moment  from 'moment'
const { RangePicker } = DatePicker;


const { Option } = Select;


const Roomtype = ()=>{
    const addRef = useRef()
    const editRef = useRef()
    

    useEffect(()=>{
        doGetAllRoomtype()
    },[])


    //添加房型信息的抽屉相关 start
    const [addDrawer, setaddDrawer] = useState(false);

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
    //添加房型信息的抽屉相关 end


    //执行添加房型 start
    const doAddRoomType = async ()=>{
        let res = await addRoomtype({
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
        doGetAllRoomtype()
        clearAddIpt()
        addRef.current.resetFields()
    } 
    //执行添加房型 end


    //执行查询所有且table的设置 start
    const [roomTypeList,setRoomTypeList] = useState([])
    const [limit,setLimit] = useState(30)
    const [page,setPage] = useState(1)
    const [searchType,setSearchType] = useState()
    const [searchPrice,setSearchPrice] = useState()
    const [total,setTotal] = useState()
    useEffect(()=>{
        console.log(limit,'limit');
        console.log(page,'page');
        doGetAllRoomtype()
    },[limit,page])
    const doGetAllRoomtype = async ()=>{
        const tempObj = {}
        if(searchType)tempObj.name = searchType
        if(searchPrice)tempObj.price = searchPrice
        let res = await getAllRoomtype({
            limit,
            page,
            ...tempObj
        })
        setRoomTypeList(res.data)
        setTotal(res.count)
    }

        //table的设置 start 
    const columns = [
        {
          title: '房型名称',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '价格',
          dataIndex: 'price',
          key: 'price',
        },
        {
          title: '押金',
          dataIndex: 'yaPrice',
          key: 'yaPrice',
        },
        {
          title: '简称',
          dataIndex: 'shortName',
          key: 'shortName',
        },
        {
          title: '入住时间',
          dataIndex: 'liveLimit',
          key: 'liveLimit',
        },
        {
          title: '开始时间',
          dataIndex: 'startLimit',
          key: 'startLimit',
        },
        {
          title: '枕头数',
          dataIndex: 'couponNum',
          key: 'couponNum',
        },
        {
          title: '床数',
          dataIndex: 'beds',
          key: 'beds',
        },
        {
          title: '操作',
          dataIndex: 'handle',
          key: 'handle',
          render:(_,record)=>(
                <div>
                    <Button type='danger' size="small" style={{marginRight:'5px'}}  onClick={()=>{
                        console.log(record._id);
                        setTypeId(record._id)
                        setShowDelModel(true)
                    }}>删除</Button>
                    <Button type='primary' size="small"  onClick={()=>{
                        openEditDrawer(record)
                    }}>编辑</Button>
                </div>
          )
          }
    ]
        //table的设置 end 

    //执行查询所有且table的设置 end


    //删除单个房型操作 start
    const [typeId,setTypeId] = useState()
    const [typeList,setTypeList] = useState([])
    const [showDelModel,setShowDelModel] = useState(false)
    const doDelRoomtype = async ()=>{
        console.log(typeId);
        let res = await delRoomtype(
           {typeid:typeId} 
        )
        const {success} = res
        if(!success) return message.info('删除失败')
        message.info('删除成功')
        setShowDelModel(false)
        doGetAllRoomtype()
    }
    //删除单个房型操作 end


    //编辑的操作 start
    const [editDrawer,setEditDrawer] = useState(false)
    const closeEditDrawer = ()=>{
        clearAddIpt()
        setEditDrawer(false)
        setTypeList([])
    }
    const openEditDrawer=(record)=>{
        setTypeId(record._id)
        setEditDrawer(true)
        setTypeList(record)
        setTimeout(()=>{
            console.log('rrrrr',record)
            console.log('editRef',editRef)

            editRef.current.setFieldsValue({
                ...record,
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
    const doEditRoomtype = async ()=>{
        let res = await editRoomtype(
            {
                typeid:typeId,
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
        doGetAllRoomtype()
        clearAddIpt()
    }
    //编辑的操作 end
    

    return (
       
        <div className='roomTypeBox'>
             <h1>
                <span></span>
                房型管理
            </h1>
            <div className='addMiniBox'>
                 <Button type="primary" onClick={showAddDrawer}>添加房型</Button>
                 <Input placeholder='通过房型名称查询'
                 onChange={(ev)=>setSearchType(ev.target.value)}
                 ></Input>
                 <Input placeholder='通过价格查询'
                 onChange={(ev)=>setSearchPrice(ev.target.value)}
                 ></Input>
                 <Button onClick={doGetAllRoomtype} style={{margin:'0 5px'}}>点击查询</Button>
            </div>
            

            {/* 渲染的表格 start*/}
            <Table 
                columns={columns} 
                dataSource={roomTypeList} 
                pagination={false} 
                scroll={{y:'500px'}}
            />

                {/* 分页器 start */}
                <Pagination 
                    style={{marginTop:'10px'}} 
                    defaultCurrent={1} total={total} 
                    pageSize={limit} 
                    pageSizeOptions={[4, 10, 20, 30]} 
                    showSizeChanger
                    showTotal={
                        (total)=>('总计'+total+'条数据')
                        }
                    onChange={(page,pageSize)=>{
                        if(page)setPage(page)
                        setLimit(pageSize)
                    }}
                />
                {/* 分页器 end */}

            {/* 渲染的表格 end*/}


            {/* 添加的抽屉 start*/}
            <Drawer 
                className='drawer' 
                title="添加房型" 
                placement="right" 
                onClose={closeAddDrawer} 
                visible={addDrawer}>

                <Form
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    ref={addRef}
                >

                    <Form.Item
                        label="房型名称"
                        name="name"
                        rules={[{ required: true, message: '请填写房型!' }]}
                    >
                        <Input 
                            placeholder='请输入房型' 
                            onChange={(ev)=>{setName(ev.target.value)}} 
                            value={name} 
                        />
                    </Form.Item>
                    
                    <Form.Item
                        label="价格"
                        name="price"
                        rules={[{ required: true, message: '请填写价格!' }]}
                    >
                        <Input 
                            placeholder='请输入价格' 
                            onChange={(ev)=>{setprice(ev.target.value)}} 
                            value={price}
                        />
                    </Form.Item>
                    
                    <Form.Item
                        label="押金"
                        name="yaPrice"
                        rules={[{ required: true, message: '请填写价格!' }]}
                    >
                        <Input 
                            placeholder='请输入价格' 
                            onChange={(ev)=>{setyaPrice(ev.target.value)}} 
                            value={yaPrice}
                        />
                    </Form.Item>
                    
                    <Form.Item
                        label="简称"
                        name="shortName"
                    >
                        <Input 
                            placeholder='请输入简称' 
                            onChange={(ev)=>{setshortName(ev.target.value)}} 
                            value={shortName}
                        />
                    </Form.Item>
                    
                    <Form.Item
                        label="入住时间"
                        name="liveLimit"
                    >
                        <DatePicker   
                            showTime 
                            onChange={onLiveChange} 
                            onOk={onOk} 
                        />
                    </Form.Item>

                    <Form.Item
                        label="开始时间"
                        name="startLimit"
                    >
                        <Space 
                            direction="vertical" 
                            size={12}>
                            <DatePicker 
                                showTime 
                                onChange={onStartChange} 
                                onOk={onOk} 
                            />
                        </Space>
                    </Form.Item>

                    <Form.Item
                        label="枕头数"
                        name="couponNum"
                    >
                        <Input 
                            onChange={(ev)=>{setcouponNum(ev.target.value)}} 
                            placeholder='请输入详情' 
                            value={couponNum}
                        />
                    </Form.Item>

                    <Form.Item
                        label="床数"
                        name="beds"
                    >
                        <Input 
                            onChange={(ev)=>{setbeds(ev.target.value)}} 
                            placeholder='请输入详情' 
                            value={beds}
                        />
                    </Form.Item>

                    <Button type='danger' onClick={closeAddDrawer}>取消</Button>
                    <Button type='primary' onClick={doAddRoomType}>确认添加</Button>
                </Form>     
            </Drawer>
            {/* 添加的抽屉 end*/}


            {/* 删除的弹出框 start */}
            <Modal 
                title="温馨提醒" 
                visible={showDelModel} 
                onOk={doDelRoomtype} 
                onCancel={()=>setShowDelModel(false)} 
                cancelText="取消" 
                okText="确认">
                <p>确定删除所选房型吗？</p>
            </Modal>
            {/* 删除的弹出框 end */}


            {/* 编辑的抽屉 start*/}
            <Drawer 
                className='drawer' 
                title="编辑房型" 
                placement="right" 
                onClose={closeEditDrawer} 
                visible={editDrawer}>
            <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                ref={editRef}
            >

                <Form.Item
                    label="房型名称"
                    name="name"
                    rules={[{ required: true, message: '请填写房型!' }]}
                
                >
                    <Input 
                        placeholder='请输入房型' 
                        onChange={(ev)=>{setName(ev.target.value)}} 
                        value={name}
                    />
                </Form.Item>
                
                <Form.Item
                    label="价格"
                    name="price"
                    rules={[{ required: true, message: '请填写价格!' }]}
                >
                    <Input 
                        placeholder='请输入价格' 
                        onChange={(ev)=>{setprice(ev.target.value)}} 
                        value={price}
                    />
                </Form.Item>
                
                <Form.Item
                    label="押金"
                    name="yaPrice"
                    rules={[{ required: true, message: '请填写价格!' }]}
                >
                    <Input 
                        placeholder='请输入价格' 
                        onChange={(ev)=>{setyaPrice(ev.target.value)}} 
                        value={yaPrice}
                    />
                </Form.Item>
                
                <Form.Item
                    label="简称"
                    name="shortName"
                >
                    <Input 
                        placeholder='请输入简称' 
                        onChange={(ev)=>{setshortName(ev.target.value)}} 
                        value={shortName}
                    />
                </Form.Item>
                
                <Form.Item
                    label="入住时间"
                    name="liveLimit"
                >
                    <Space direction="vertical" size={12}>
                      <DatePicker 
                        showTime 
                        onChange={onLiveChange} 
                        onOk={onOk}
                        />
                    </Space>
                </Form.Item>

                <Form.Item
                    label="开始时间"
                    name="startLimit"
                >
                    <Space direction="vertical" size={12}>
                      <DatePicker 
                        showTime 
                        onChange={onStartChange} 
                        onOk={onOk} />
                    </Space>
                </Form.Item>

                <Form.Item
                    label="枕头数"
                    name="couponNum"
                >
                    <Input 
                        onChange={(ev)=>{setcouponNum(ev.target.value)}} 
                        placeholder='请输入详情' 
                        value={couponNum}
                    />
                </Form.Item>

                <Form.Item
                    label="床数"
                    name="beds"
                >
                    <Input 
                        onChange={(ev)=>{setbeds(ev.target.value)}} 
                        placeholder='请输入详情' 
                        value={beds}
                    />
                </Form.Item>

                <Button type='danger' onClick={closeEditDrawer}>取消</Button>
                <Button type='primary' onClick={doEditRoomtype}>确认修改</Button>
            </Form>     
            </Drawer>
            {/* 编辑的抽屉 end*/}

        </div>
    )
}

export default Roomtype