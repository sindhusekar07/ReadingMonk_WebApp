import React from "react"
import {Redirect, useHistory} from "react-router-dom"



const LandingPage = () => {

    const history = useHistory()

    const add = async()=>{
        history.push('/add_a_book')
        console.log("Add_a_book")
        return(
        <Redirect to ='/add_a_book'></Redirect>
        )
    
    }

    const search = async()=>{
        history.push('/search_a_book')
        console.log("Search_a_book")
        return(
        <Redirect to ='/search_a_book'></Redirect>
        )
    
    }

    return (
        <div style={{ display: 'flex', width: '100%', height: '100vh', flexDirection: 'column', backgroundColor: "#0e6881",justifyContent:"center",alignItems:"center" }}>
        <h1 style={{fontFamily:"Segoe Script"}}>Reading Monk</h1>
            <div style={{width:"50%",height:"50%",borderRadius:"20px",display:"flex",alignItems:"center",flexDirection:"column",justifyContent:"space-around",backgroundColor: "white"}}>
            <button onClick={() => { add() }} style={{ width:"70%",height:"20%", color: "black", cursor: "pointer", fontWeight:"bold", fontSize:"40px", textAlign:"center", fontFamily:"serif", backgroundColor: "#258ea6" }}>ADD A BOOK</button>
            <button onClick={() => { search() }} style={{ width:"70%",height:"20%", color: "black", cursor: "pointer", fontWeight:"bold", fontSize:"40px", textAlign:"center", fontFamily:"serif", backgroundColor: "#258ea6" }}>SEARCH A BOOK</button>
            </div>
        </div>
    )
}

export default LandingPage;