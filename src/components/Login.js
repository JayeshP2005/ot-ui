import React, { useContext, useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ServerCall from '@/common/ServerCall';
import { ctx } from '@/context/ctxContext';

export const Login = () => {
    const {dispatch}=useContext(ctx)
    const [data , setdata]=useState({})
    const [massege,setMassege]=useState('')
    const fnChange=(eve)=>{
        const {id,value}=eve.target
        setdata({
            ...data,
            [id] : value
        });
    }

    const fnLogin=()=>{
        console.log(data)
        ServerCall.fnSendPostReq("/auth/login ",data)
        .then((res)=>{
            const {token,message}=res.data;
            sessionStorage.token=token;
            if (token) {
                dispatch({
                    type : "LOGIN",
                    payload : true
                })
            } else {
                setMassege(message);
            }
            
        })
        .catch((res)=>{
            setMassege(res.data);
        })
    }
  return (
    <div>
        <h3 className='text-center'>Login</h3>
        <div className='row'>
            <div className='col-sm-5 text-end mt-3'>
                <b className='mui-label'>User_Id :</b>
            </div>
            <div className='col-sm-3 mui-tb-div'>
            <TextField onChange={fnChange} id="uid" label="User Id" variant="standard" />
            </div>
        </div>

        <div className='row'>
            <div className='col-sm-5 text-end mt-3'>
                <b className='mui-label'>Password :</b>
            </div>
            <div className='col-sm-3 mui-tb-div'>
            {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" />
            <TextField id="filled-basic" label="Filled" variant="filled" /> */}
            <TextField onChange={fnChange} id="pwd" label="Password" variant="standard" />
            </div>
            <div className='offset-sm-5 col-sm-7 mt-3'>
            <Button onClick={fnLogin} variant="contained">LOGIN</Button>
            </div>
            <div className='row text-center mt-3'>
                <p className='text-danger'>{massege}</p>
            </div>
        </div>
    </div>
  )
}