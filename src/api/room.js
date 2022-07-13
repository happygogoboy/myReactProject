import $api from './server'

// 添加房型
export const addRoom = async (data)=>{
    let res = await $api.post('./room/add',data)
    return res.data
}

//查询所有房型
export const getAllRoom = async (data)=>{
    let res = await $api.post('./room/getAll',data)
    return res.data
}

//删除一个房型
export const delRoom = async (data)=>{
    let res = await $api.post('./room/del',data)
    return res.data
}

//修改一个房型
export const editRoom = async (data)=>{
    let res = await $api.post('./room/edit',data)
    return res.data
}
