import { configureStore } from '@reduxjs/toolkit'
import { persistStore,persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // localStorage
import storageSession from 'redux-persist/lib/storage/session'; // sessionStorage

import adminReducer from './adminSlice' // 从userSlice当中导入 对应生成的reducer
import commonReducer from './commonSlice' 

// 配置存储配置的信息
const persistConfig = {
    key:'root',// 在浏览器的本地存储当中 使用哪个key来保存redux 的全局状态的数据
    storage: storage , // 使用localStorage还是sessionStorage来保存数据 上面的storage和storageSession二选1
}

const PersistAdminReducer = persistReducer(persistConfig, adminReducer);
const PersistCommonReducer = persistReducer(persistConfig, commonReducer);

// 在 toolkit当中 使用的是 configureStore来创建 store对象
const store = configureStore({
  reducer: {
    admin:PersistAdminReducer,
    common:PersistCommonReducer
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
})

export default store
export const persistor = persistStore(store)

