import React, { useState, useEffect } from 'react'
import './Table.css'
import PrimaryLink from '../axios/primary_link'


const ShowReqTable = () => {
    const [books, setbooks] = useState([])
    
    const url = '/books/getReqBooksByUserId/'+ localStorage.getItem("userid")

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

    const removeData = (book_id) => {
        const delUrl = '/books/'+book_id
        console.log("book_id",book_id)
        PrimaryLink.delete(delUrl ,
        {headers:{'x-access-token':localStorage.getItem("token")}})
        .then(res => {
            const del = books.filter(book => book_id !== book.book_id);
            setbooks(del);
            window.location.reload();
            
        })
    }

    const renderHeader = () => {
        let headerElement = ['Book', 'Author(s)', 'Publication', 'In Language', 'No. of pages','Publisher','Location','Delete?']

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    const renderBody = () => {
        return books && books.map(({ _id,name, author, publication_year, in_language,number_of_pages,publisher,book_location }) => {
            return (
                <tr key={_id}>
                    <td>{name}</td>
                    <td>{author}</td>
                    <td>{publication_year}</td>
                    <td>{in_language}</td>
                    <td>{number_of_pages}</td>
                    <td>{publisher}</td>
                    <td>{book_location}</td>
                    <td>
                        <button className="del" onClick={() => removeData(_id)}>Delete</button>
                    </td>
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


export default ShowReqTable