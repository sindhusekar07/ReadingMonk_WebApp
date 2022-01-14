import React, {useState} from 'react';
import './popup.css'
import Popup from './Popup'
import AddReqForm from './AddReqForm'
import ShowReqTable from './ShowReqTable'


function ReqBooks(){

    const [isOpen, setIsOpen] = useState(false);
 
    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

        
    return(
        <div>
            <div>
                <ShowReqTable></ShowReqTable>
            </div>
            <br></br>
                <div className="mySubmit" style={{float:"right"}}>
                    <button type="submit" value="Add Book" onClick={togglePopup} style={{width:"20%", alignItems:"right"}}>Add Book</button> 
                </div>

                <div>
                    {isOpen && <Popup
                        content={<>
                        <AddReqForm></AddReqForm>    

                        </>}
                    handleClose={togglePopup}
                    />}
                </div>
            </div>
        )
}

export default ReqBooks;