import React, { useState, useEffect } from 'react'
import './Table.css'
import PrimaryLink from '../axios/primary_link'
import { BrowserRouter as Link, Redirect, useHistory } from 'react-router-dom';

const ShowSearch = () => {
    const [books, setbooks] = useState([])
    const url = '/books/searchBooks/'+ localStorage.getItem("query")
    

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {

        const response = await PrimaryLink.get(url, 
            {headers:{'x-access-token':localStorage.getItem("token")}})
              .then((response) => {
                // check if the data is populated
                console.log(response.data);
                console.log(localStorage.getItem("userid"));
                console.log(localStorage.getItem(url));
                setbooks(response.data)
                // you tell it that you had the result
              });
        
    }
     
    const history = useHistory();
    const viewData = (user_id) => {
        console.log(user_id)
        history.push('/userprofile',{params:user_id});        
    }

    const renderHeader = () => {
        let headerElement = ['View?','Book', 'Author(s)', 'Publication', 'In Language', 'No. of pages','Publisher','Location']

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    const renderBody = () => {
        return books && books.map(({ user_id,name, author, publication_year, in_language,number_of_pages,publisher,book_location }) => {
            return (
                <tr key={user_id}>
                    <td>
                        <button className="view"  onClick={() => viewData(user_id)}>View</button>
                    </td>
                    <td>{name}</td>
                    <td>{author}</td>
                    <td>{publication_year}</td>
                    <td>{in_language}</td>
                    <td>{number_of_pages}</td>
                    <td>{publisher}</td>
                    <td>{book_location}</td>
                    
                </tr>
            )
        })
    }

    return (
        <div className="App"> 
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


export default ShowSearch