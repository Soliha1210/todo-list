import { defineStore,storeToRefs } from "pinia";
import {ref} from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'

export const taskStore = defineStore('task',()=>{
    const tasks:any= ref([])
    const url = 'https://todo-back.bookblogs.uz'

    const get_one_task = async (_id:any) => {
        return await axios.get(`${url}/todolist/getone/${_id}`)
    }
    const get_task = async (search:object) => {
        console.log("searchg", search);
        let result = await axios.get(`${url}/todolist`,{params: search})
        if (result.status === 200){
            tasks.value = [...result.data.todolist]
            console.log(result.data);
        }
    }
    const add_task = async (payload:object) => {
        let result = await axios.post(`${url}/todolist`,payload)
        if (result.status === 201){
            console.log(result.data);
            tasks.value = [result.data,...tasks.value]
            ElMessage({
                type:'success',
                message: 'A new task has been added'
            })
        }
        
    }
    const delete_task = async (_id:string) => {
        let result = await axios.delete(`${url}/todolist/${_id}`)
        if (result.status === 200){
            tasks.value = tasks.value.filter((task:any) => {
                if (task._id == _id) return false
                return task
            })
            ElMessage.success('The task has been deleted')
        }
    }
    const update_task = async (payload:object) => {
        let result = await axios.put(`${url}/todolist`,payload)
        if (result.status === 201){
            console.log("update",result);
                tasks.value = tasks.value.map((task:any) => {
                    if (task._id == result.data._id) 
                    return result.data
                    return task
                })
                
            ElMessage({
                type:'success',
                message: 'The task has been updated'
            })
        }
    }
    return{
        get_task,
        tasks,
        add_task,
        delete_task,
        update_task,
        get_one_task,
        url
    }
})