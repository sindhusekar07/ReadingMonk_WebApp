import React, { useState} from 'react';
import './popup.css'
import Popup from './Popup'
import AddForm from './AddForm'
import Table from './ShowAvTable'

function AvailableBooks(){

    const [isOpen, setIsOpen] = useState(false);
 
    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    return(
            <div>
                <div>
                    {/* <ShowTable></ShowTable> */}
                    <Table></Table>
                </div>
                <br></br>
                <div className="mySubmit" style={{float:"right"}}>
                    <button type="submit" value="Add Book" onClick={togglePopup} style={{width:"20%", alignItems:"right"}}>Add Book</button> 
                </div>

                <div>
                    {isOpen && <Popup
                        content={<>
                        <AddForm></AddForm>    

                        </>}
                    handleClose={togglePopup}
                    />}
                </div>
            </div>
        )
}

export default AvailableBooks;