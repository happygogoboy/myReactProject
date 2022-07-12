import './style.scss'
import { Button, Modal ,Input,message  } from 'antd';
import React, { useEffect, useState } from 'react';
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
            <Button type='danger' onClick={()=>{setShowDel(true)}}>删除此栋楼</Button>
            <Button type='success' onClick={()=>{setShowEdit(true)}}> 编辑修改楼名</Button>

            {/* 添加楼栋的弹窗 start*/}
            <Modal title="添加楼栋" visible={isModalVisible} onOk={doAddBuild} onCancel={handleCancel} cancelText={"取消"} okText={"确认添加"} afterClose={()=>setIptName('')}>
                 <Input placeholder="请输入楼栋名称" onChange={(value)=>setIptName(value)}/>
            </Modal>
            {/* 添加楼栋的抽屉 end*/}

            {/* 删除楼栋的弹窗 start*/}
            <Modal title="添加楼栋" visible={showDel} onOk={doDelBuild} onCancel={()=>{setShowDel(false)}} cancelText={"取消"} okText={"确认删除"} >
                 <h1>你确定要删除该楼栋吗？</h1>
            </Modal>
            {/* 删除楼栋的抽屉 end*/}

            {/* 编辑楼栋的弹窗 start*/}
            <Modal title="编辑楼栋" visible={showEdit} onOk={doEditBuild} onCancel={()=>setShowEdit(false)} cancelText={"取消"} okText={"确认修改"} >
                 <Input placeholder={curBuild.name}  onChange={(value)=>setEditIptName(value)}/>
            </Modal>
            {/* 编辑楼栋的弹窗 end*/}

        </div>
    )
}

export default SetBuild