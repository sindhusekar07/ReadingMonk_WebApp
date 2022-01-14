import React, { useState, useEffect } from 'react'
import Navbar from './NavBar'
import './Table.css'
import {useLocation} from 'react-router-dom'
import PrimaryLink from '../axios/primary_link'

const UserProfile = ()=>{
    const location = useLocation()
    const id = location.state.params;
    console.log('id ' + id)
    const url = '/User/getByUserId/'+ id;
    const fetchData = async()=>{
        console.log('url ' + url);
        console.log('token ' + localStorage.getItem("token"));
        const response = await PrimaryLink.get(url, 
            {headers:{'x-access-token':localStorage.getItem("token")}})
              .then((response) => {
                console.log(response);
                setname(response.data.name);
                setemail(response.data.email);
                setaddress(response.data.address);
                setcity(response.data.city);
                setprovince(response.data.province);
                setzip(response.data.zipcode);
              });

    }
    useEffect(() => {
        fetchData()
    }, [])

    const renderHeader = () => {
        let headerElement = ['Name', 'Email', 'Address', 'City', 'Province', 'ZIP']

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    const [name,setname] = useState('');
    const [email,setemail] = useState('');
    const [address,setaddress] = useState('');
    const [city,setcity] = useState('');
    const [province,setprovince] = useState('');
    const [zip,setzip] = useState('');


    const renderBody = () => {
        return( <tr>
            <td>{name}</td>
            <td>{email}</td>
            <td>{address}</td>
            <td>{city}</td>
            <td>{province}</td>
            <td>{zip}</td>
        </tr>)
               
    }

    return(
        <div>
           <Navbar /> 
           <br/><br/>
           <div className="mytable"> 
           <table id="book">
                <thead>
                    <tr>{renderHeader()}</tr>
                </thead>
                <tbody>
                    {renderBody()}
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default UserProfile;