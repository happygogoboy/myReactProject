import $api from './server'

// 添加楼栋
export const login = async (data)=>{
    let res = await $api.post('./admin/login',data)
    return res.data
}


