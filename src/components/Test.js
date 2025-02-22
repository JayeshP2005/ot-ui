import ServerCall from '@/common/ServerCall';
import React, { useContext, useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { ctx } from '@/context/ctxContext';

export const Test = () => {
    const [que,setque]=useState([]);
    const ctxdata = useContext(ctx)
    const [key,setkey]= useState({})
    const [ans , setans]= useState({})

    const fnGetQue=async()=>{
        try {
            const res = await ServerCall.fnSendGetReq("/test/get")
            const _keyobj={}
            res.data.forEach(({_id,ans}) => {
                _keyobj[_id]=ans;               
            });
            setkey(_keyobj);
            setque(res.data)
            console.log(res.data)
            
        } catch (err) {
            console.log(err)            
        }
    }
    useEffect(()=>{
        fnGetQue();
    },[])

    const fnLogout=()=>{
        const isok=window.confirm("Are You Sure")
        if(isok){
        sessionStorage.clear();
        ctxdata.dispatch({
            type : "LOGOUT",
            patload : false
        })
        }
    }
    const fnSubmit=()=>{
     console.log(key)
     console.log(ans)
     let marks = 0;
     Object.keys(ans).forEach((val)=>{
        if(key[val]==ans[val]){
            marks=marks+1;
        }
     })
     alert("You Got "+marks+" Marks")
    }
    const fnChange=(eve)=>{
        const {name,value}=eve.target;
        console.log(name)
        setans({...ans,[name]:value})
    }
  return (
    <div>
        <Button className='position-fixed end-0 top-2 bg-danger' onClick={fnLogout} variant="contained">LOGOUT</Button>
        {
            que.map((obj,ind)=>{
                const {_id,que,opt1,opt2,opt3,opt4,type}=obj;
                return <Card className='ms-4 mb-5'  key={"card_"+ind} >
                <h3 key={"h3_"+ind}>{ind+1}. {que}</h3>
                <p key={"p1_"+ind} className='ms-4'><input value="1" onChange={fnChange} name={_id} type={type == 'S'||'Single' ? 'radio' : 'checkbox'}/> {opt1}</p>
                <p key={"p2_"+ind} className='ms-4'><input value="2" onChange={fnChange} name={_id} type={type == 'S'||'Single' ? 'radio' : 'checkbox'}/> {opt2}</p>
                <p key={"p3_"+ind} className='ms-4'><input value="3" onChange={fnChange} name={_id} type={type == 'S'||'Single' ? 'radio' : 'checkbox'}/> {opt3}</p>
                <p key={"p4_"+ind} className='ms-4'><input value="4" onChange={fnChange} name={_id} type={type == 'S'||'Single' ? 'radio' : 'checkbox'}/> {opt4}</p>
                </Card>
            })
        }
        <Button className='position-relative ms-4 bottom-7' onClick={fnSubmit} variant="contained">SUBMIT</Button>
    </div>
  )
}
