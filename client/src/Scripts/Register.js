import React from "react"
import PrimaryLink from '../axios/primary_link'
import { BrowserRouter as Router, Route, Redirect, useHistory } from 'react-router-dom';

const RegisterScreen = () => {
    const [name,setName] = React.useState('');
    const [email,setEmail] = React.useState('');
    const [password,setPass] = React.useState('');
    const [confirmPass,setconfirmPass] = React.useState('');
    const [address,setAddress] = React.useState('');
    const [mobile,setMobile] = React.useState('');
    const [city,setcity] = React.useState('');
    const [province,setprovince] = React.useState('');
    const [zip,setzip] = React.useState('');   
    const [errorMsg, seterror] = React.useState('')
    const history = useHistory()

    const RegisterPage = async()=>{
        var response
        try
        {
            PrimaryLink.post('/signup',{"name":name , "email":email ,"password": password, "password_confirmation":confirmPass, "address":address, "mobile number": mobile, "city":city, "province":province, "zipcode":zip}).then(response=>{
                seterror('')
                console.log(response.data.success)
                if(response.data.success)
                {
                    history.push('/')
                    console.log("Home")
                    alert("Registered Successfully!")
                    return(
                    <Redirect to ='/'></Redirect>
                    )
                }
            }).catch(error=>{
                //console.log(error.response);
                if(error.response.data.errors.length > 0){
                    for(var i in error.response.data.errors[0] ){
                        seterror("Please enter a valid"+ ' ' + i+".")
                        //seterror(i +' '+ error.response.data.errors[0][i])
                        console.log(errorMsg);
                        if(i=="user")
                        seterror("Email already exists")
                        console.log(errorMsg);
                    }
                    
                    //console.log(error.response.data.errors[0]);
                }
            });
           
        }
        catch(err)
        {
            seterror(err)
            console.log(response)
        }
    }  
    const CancelPage = async()=>{
        history.push('/')
        console.log("Home")
        return(
        <Redirect to ='/'></Redirect>
        )
    }

    return (
        <div style={{width:"100%",height:"100vh",backgroundColor:"#258ea6",display:"flex",justifyContent:"center",alignItems:"center"}}>
            <div style={{width:'40%',height:'80%',backgroundColor:"white",borderRadius:"10px",display:"flex",flexDirection:"column",justifyContent:"space-around",alignItems:"center"}}>
                <h2 style={{fontFamily:"serif"}}>Create your account here</h2>
                <input style={{width:'70%',height:"3vh", fontWeight:"bold"}} placeholder='Name' onChange={(text)=>{setName(text.target.value)}} />
                <input style={{width:'70%',height:"3vh", fontWeight:"bold"}} placeholder='Email ID' onChange={(text)=>{setEmail(text.target.value)}}/>
                <input type='password' style={{width:'70%',height:"3vh", fontWeight:"bold"}} placeholder='Password' onChange={(text)=>{setPass(text.target.value)}}/>
                <input type='password' style={{width:'70%',height:"3vh", fontWeight:"bold"}} placeholder='Confirm Password' onChange={(text)=>{setconfirmPass(text.target.value)}}/>
                <input style={{width:'70%',height:"3vh", fontWeight:"bold"}} placeholder='Address Line' onChange={(text)=>{setAddress(text.target.value)}}/>
                <input style={{width:'70%',height:"3vh", fontWeight:"bold"}} placeholder='Mobile Number(optional)' onChange={(text)=>{setMobile(text.target.value)}}/>
                <input style={{width:'70%',height:"3vh", fontWeight:"bold"}} placeholder='City(optional)' onChange={(text)=>{setcity(text.target.value)}}/>
                <input style={{width:'70%',height:"3vh", fontWeight:"bold"}} placeholder='Province' onChange={(text)=>{setprovince(text.target.value)}}/>
                <input style={{width:'70%',height:"3vh", fontWeight:"bold"}} placeholder='ZIP' onChange={(text)=>{setzip(text.target.value)}}/>
                {errorMsg!=''?<h6 style={{ fontSize: "15px", color:"red", fontWeight:"normal", fontFamily:"serif" }}>{''+errorMsg}</h6>:null}
                <div style={{ display: 'flex', flexDirection: "row", justifyContent: "space-around", alignItems: "center", width: "60%" }}>
                <button style={{height:'30px', backgroundColor: "#519e8a"}} onClick={()=>{ RegisterPage()}}>Register</button>
                <button style={{height:'30px'}} onClick={()=>{ CancelPage()}}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default RegisterScreen;