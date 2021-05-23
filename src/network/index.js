import {
    API_POST_LOGIN,
    API_POST_REGISTER,
    API_POST_GET_CIRCLE_LIST_BY_USER,
    API_POST_GET_TASK_BY_CIRCLE,
    API_POST_ADD_TASK,
    API_POST_GET_TASK_BY_GET,
    API_POST_GET_TASK_BY_POST,
    API_POST_PUT_ACCEPT_TASK,
    API_POST_PUT_COMPLETE_TASK,
    API_POST_PUT_CREATE_CIRCLE,
    API_POST_GET_CIRCLE_BY_NAME,
    API_POST_PUT_JOIN_CIRCLE,
    API_POST_FLAG_JOIN_CIRCLE,
    API_POST_DELETE_TASK
} from './config'

import axios from './axios'
import qs from 'qs'

export function deleteTaskReq(taskId){
    return axios({
        url:API_POST_DELETE_TASK,
        method:'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:qs.stringify({
            taskId
        })
    })
}

export function isJoinCircleReq(stuNum,circleId){
    return axios({
        url:API_POST_FLAG_JOIN_CIRCLE,
        method:'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:qs.stringify({
            stuNum,circleId
        })
    })
}

export function joinCircleReq(stuNum,circleId){
    return axios({
        url:API_POST_PUT_JOIN_CIRCLE,
        method:'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:qs.stringify({
            stuNum,circleId
        })
    })
}

export function getCircleByName(name){
    return axios({
        url:API_POST_GET_CIRCLE_BY_NAME,
        method:'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:qs.stringify({
            name
        })
    })
}
export function loginReq(studentNumber, password) {
    return axios({
        url: API_POST_LOGIN,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify({
            studentNumber,
            password
        })
    })
}

export function registerReq(password, phone, pswConfirm, studentNumber, username) {
    return axios({
        url: API_POST_REGISTER,
        method: 'post',
        data: {
            password,
            phone,
            pswConfirm,
            studentNumber,
            username
        }
    })
}

export function getCircleListReq(stuNum) {
    return axios({
        url: API_POST_GET_CIRCLE_LIST_BY_USER,
        method: 'post',
        data: qs.stringify({
            stuNum
        })
    })
}

export function getTaskByCircleReq(id) {
    return axios({
        url: API_POST_GET_TASK_BY_CIRCLE,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify({
            circleId: id
        })
    })
}

export function putAddTask(circleId,content,title,userPost) {
    return axios({
        url: API_POST_ADD_TASK,
        method:'post',
        data:{
            circleId,content,title,userPost
        }
    })
}

export function getTaskByGet(userGet){
    return axios({
        url:API_POST_GET_TASK_BY_GET,
        method:'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:qs.stringify({
            userGet
        })
    })
}

export function getTaskByPost(userPost){
    return axios({
        url:API_POST_GET_TASK_BY_POST,
        method:'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:qs.stringify({
            userPost	
        })
    })
}

export function acceptTask(taskId,userGet){
    return axios({
        url:API_POST_PUT_ACCEPT_TASK,
        method:'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:qs.stringify({
            taskId,userGet
        })
    })
}

export function completeTask(taskId){
    return axios({
        url:API_POST_PUT_COMPLETE_TASK,
        method:'post',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:qs.stringify({
            taskId
        })

    })
}

export function createCircle(name,manager){
    return axios({
        url:API_POST_PUT_CREATE_CIRCLE,
        method:'post',
        data:{
            name,
            manager
        }
    })
}