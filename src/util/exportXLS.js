import * as XLSX from 'xlsx/xlsx.mjs'; // 引入一个xlsx

// 将导出的excel的业务封装成一个函数
// https://docs.sheetjs.com/ 官方文档
export default ({filename,data})=>{

    // 使用时间作为文件名
     filename = (filename || Date.now() ) +'.xlsx';
     const ws_name = "Sheet1"; //Excel第一个sheet的名称
     const wb = XLSX.utils.book_new(); // 新建一个 excel表单对象
     const ws = XLSX.utils.aoa_to_sheet(data); // 设置表单的值到sheet
     XLSX.utils.book_append_sheet(wb, ws, ws_name);  //将数据添加到工作薄
     XLSX.writeFile(wb, filename); //导出Excel

}