import React from "react"
import image from '../Images/image2.jpg'
import PrimaryLink from '../axios/primary_link'
import { BrowserRouter as Link, Redirect, useHistory } from 'react-router-dom';


const Homepage = () => {

    const [userId, setUserid] = React.useState('');
    const [password, setpwd] = React.useState('');
    const [error, seterror] = React.useState('')
    const history = useHistory()
    
    const signin = async()=>{
        try
        {
            const response = await PrimaryLink.post('/signin',{"email":userId ,"password": password});
            seterror('')
            console.log(response.data.success)
            if(response.data.success)
            {
                //set token
                console.log(response.data)
                localStorage.setItem("token",response.data.token)
                localStorage.setItem("userid",response.data.message.email)
                //get token
                //console.log(localStorage.getItem("token"))
                history.push('/home')
                console.log("Home")
                return(
                <Redirect to ='/home'></Redirect>
                )
            }
        }
        catch(err)
        {
            seterror(err)
            console.log(err)
        }
    }

    const signup = async()=>{
        history.push('/register')
        console.log("Register")
        return(
        <Redirect to ='/register'></Redirect>
        )

    }

    return (
        <div style={{backgroundImage: `url(${image})`, display: 'flex', width: '100%', height: '100vh', flexDirection: 'column', justifyContent:"center",alignItems:"center" }}>
            <div style={{width:"40%",height:"50%",borderRadius:"6px",display:"flex",alignItems:"center",flexDirection:"column",justifyContent:"space-around",backgroundColor: "white"}}>
            <h1 style={{fontFamily:"serif"}}>Welcome to Book Exchange App!</h1>
            <input onChange={(text) => { setUserid(text.target.value) }} style={{ width: '60%', height: 30, fontWeight:"bold"}} placeholder={'Emai Id'} />
            <input type='password' onChange={(text) => { setpwd(text.target.value) }} style={{ width: '60%', height: 30, fontWeight:"bold"}} placeholder={'Password'} />
            {error!==''?<h6 style={{ fontSize: "15px", color:"red", fontWeight:"normal", fontFamily:"serif" }}>Invalid Email or password, Try again!</h6>:null}
            <div style={{ display: 'flex', flexDirection: "row", justifyContent: "space-around", alignItems: "center", width: "60%" }}>
                    <button onClick={() => { signin() }} style={{ width: '100px', height: "30px", borderRadius: "5px", fontWeight:"bold", backgroundColor: "#258ea6",fontFamily:"serif" }}>Sign In</button>
                    <button onClick={() => { signup() }} style={{ width: '100px', height: "30px", borderRadius: "5px", fontWeight:"bold", backgroundColor: "#258ea6", fontFamily:"serif" }}>Sign Up</button>
                    <Link to={'/pass_req'} style={{ color: "black", cursor: "pointer", fontWeight:"bold", fontFamily:"serif" }}>Forget Password?</Link>
            </div>
            </div>
        </div>
    )
}

export default Homepage;



