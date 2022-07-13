import $api from './server'

// 添加房型
export const addRoomtype = async (data)=>{
    let res = await $api.post('./roomtype/add',data)
    return res.data
}

//查询所有房型
export const getAllRoomtype = async (data)=>{
    let res = await $api.post('./roomtype/getAll',data)
    return res.data
}

//删除一个房型
export const delRoomtype = async (data)=>{
    let res = await $api.post('./roomtype/del',data)
    return res.data
}

//修改一个房型
export const editRoomtype = async (data)=>{
    let res = await $api.post('./roomtype/edit',data)
    return res.data
}
