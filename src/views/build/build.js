import './style.scss'
import { Button, Modal ,Input,message  } from 'antd';
import React, { useEffect, useState,useRef } from 'react';
import {addBuild ,getAllBuild,delBuild,editBuild} from '../../api/build'

const SetBuild = ()=>{
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [iptName,setIptName] = useState('')


    useEffect(()=>{
        _getAllBuild()
    },[])

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleCancel = () => {
        setIptName('')
        setIsModalVisible(false)
    };

    // 添加楼栋
    const doAddBuild = async ()=>{
        if(!iptName) return message.info('楼栋名不能为空')
        let res = await addBuild({
            name:iptName,
            floorInfo:[]
        })

        console.log(res);
        const {success} = res;    
        if(!success) return message.info('添加失败');
        message.info('添加成功');
        setIsModalVisible(false);
        setIptName('')
        console.log('iptName',iptName);
        _getAllBuild() 
    }

    //查询楼栋
    const [total,setTotal] = useState(0)
    const [buildList,setBuildList] = useState([])
    const _getAllBuild = async ()=>{
        let res = await getAllBuild({})
        console.log(res);
        setTotal(res.count)
        setBuildList(res.data)
    }

    //删除楼栋
    const [curBuildId,setCurBuildId] = useState('')
    const [showDel,setShowDel] = useState(false)
    const doDelBuild = async ()=>{
        let res = await delBuild({
            buildid:curBuildId
        })
        const {success} = res
        if(!success) return message.info('删除失败');
        message.info('删除成功');
        setShowDel(false)
        _getAllBuild()
    }

    //修改楼栋名称
    const editOnCancel = ()=>{
        setShowEdit(false);
        setEditIptName('')
    }
    const [editIptName,setEditIptName] =useState('')
    const [curBuild,setCurBuild] = useState({})
    const [showEdit,setShowEdit] = useState(false)
    const doEditBuild = async()=>{
        let res = await editBuild({
            buildid:curBuildId,
            name:editIptName,
            floorInfo:curBuild.floorInfo
        })
        const {success} = res;
        if(!success) return message.info('修改失败')
        message.info('修改成功')
        _getAllBuild()
        setShowEdit(false)
        setEditIptName('')
    }

    //添加楼层
    const [floorName,setFloorName] = useState('')
    // const [curFloor,setCurFloor] = useState('')
    const fRef = useRef()

    const addFloor = async ()=>{
        // console.log(curBuild,'curBuild')
        if(!curBuild) return message.info('请先选择楼栋')
        if(!floorName) return message.info('楼层名不能为空')
        let res = await editBuild({
            buildid:curBuildId,
            name:curBuild.name,
            floorInfo:[             
               ...curBuild.floorInfo,
               floorName
            ]
        })
        const {success} = res
        if(!success) return message.info('添加失败')
        message.info('添加成功')
        _getAllBuild()
        setCurBuild({
            ...curBuild,
            floorInfo:[
                ...curBuild.floorInfo,
                floorName
            ]
        })
        setFloorName('')
    }

    //删除楼层
    const [selectIndex,setSelectIndex] =useState()
    
    // const nweFloorInfo = curBuild.floorInfo?.filter(item=>item!==delFloorName)
    const delFloor = async()=>{
        
        if(!selectIndex)return message.info('请先选中楼层')
        const nweFloorInfo = curBuild.floorInfo
        console.log(nweFloorInfo);
        nweFloorInfo.splice(selectIndex-1,1)

        let res = await editBuild({
            buildid:curBuildId,
            floorInfo:[
                ...nweFloorInfo
            ]
        })
        const {success} = res
        if(!success) return message.info('删除失败')
        message.info('删除成功')
        setSelectIndex()
        _getAllBuild()
        setCurBuild({
            ...curBuild,
            floorInfo:[
                ...nweFloorInfo
            ]
        })
    }

    //修改楼层信息
    const editFloor =  async ()=>{
        if(!floorName) return message.info('楼层名不能为空')
        if(!selectIndex)return message.info('请先选中楼层')
        const curFlooInfo = curBuild.floorInfo
        curFlooInfo.splice(selectIndex-1,1,floorName)

        let res = await editBuild({
            buildid:curBuildId,
            floorInfo:[
                ...curFlooInfo
            ]
        })
        const {success} = res
        if(!success) return message.info('添加失败')
        message.info('添加成功')
        setSelectIndex()
        _getAllBuild()
        setCurBuild({
            ...curBuild,
            floorInfo:[
                ...curFlooInfo
            ]
        })
        setFloorName('')
    }


    useEffect(()=>{
        console.log('buildList',buildList);
    },[buildList])

    return (
        <div className="buildBox">

            <h1>
                <span></span>
                楼栋管理
            </h1>

            <Button type="primary" onClick={showModal}>添加楼栋</Button>

            <h4>一共有{total}栋楼</h4>

            {buildList.map(item=>( <Button key={item._id} onClick={()=>{
                setCurBuildId(item._id);
                setCurBuild(item)
            }}>{item.name}</Button>)  
            )}

            <Button type='danger' style={{marginLeft:'20px'}} onClick={()=>{setShowDel(true)}}>删除此栋楼</Button>

            <Button type='primary' onClick={()=>curBuild?setShowEdit(true):''}> 编辑修改楼名</Button>

            <div style={{marginTop:'100px'}}></div>

            <div className='addFloofBox'>
            {curBuild.floorInfo?.map((item,index)=>(
            <div
                key={index}
                onClick={()=>{
                    setSelectIndex(index+1)
                    console.log(index);
                }}
            >{item}</div>
            )
            )}
                 <Input value={floorName} onChange={(ev)=>setFloorName(ev.target.value)}/>
                 <Button onClick={addFloor}>添加楼层</Button>
                 <Button onClick={delFloor}>删除楼层</Button>
                 <Button style={{width:'100%'}} onClick={editFloor}>修改选中楼层</Button>
            </div>
            

            {/* 添加楼栋的弹窗 start*/}
            <Modal title="添加楼栋" visible={isModalVisible} onOk={doAddBuild} onCancel={handleCancel} cancelText={"取消"} okText={"确认添加"} afterClose={()=>setIptName('')}>
                 <Input value={iptName} placeholder="请输入楼栋名称" onChange={(ev)=>setIptName(ev.target.value)}/>
            </Modal>
            {/* 添加楼栋的抽屉 end*/}

            {/* 删除楼栋的弹窗 start*/}
            <Modal title="删除楼栋" visible={showDel} onOk={doDelBuild} onCancel={()=>{setShowDel(false)}} cancelText={"取消"} okText={"确认删除"} >
                 <h1>你确定要删除该楼栋吗？</h1>
            </Modal>
            {/* 删除楼栋的抽屉 end*/}

            {/* 编辑楼栋的弹窗 start*/}
            <Modal title="编辑楼栋" visible={showEdit} onOk={doEditBuild} onCancel={editOnCancel} cancelText={"取消"} okText={"确认修改"} >
                 <Input value={editIptName}  placeholder={curBuild.name}  onChange={(ev)=>setEditIptName(ev.target.value)}/>
            </Modal>
            {/* 编辑楼栋的弹窗 end*/}



        </div>
    )
}

export default SetBuild