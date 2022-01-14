import React from 'react';
import PrimaryLink from '../axios/primary_link'


class AddForm extends React.Component {
    constructor(props){
        super(props);
        this.state={
          errors: {},
          fields: {},
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    createBook = async() =>{
        let fields = this.state.fields;
        let res=await PrimaryLink.post('/books',
        {"name":fields['bname'] ,
        "author": fields['auth'],
        "publication_year":fields['yr'],
        "in_language":fields['lang'],
        "number_of_pages":fields['pgs'],
        "publisher":fields['publ'],
        "user_id":localStorage.getItem("userid"),
        "book_location":fields['loc']},
        {headers:{'x-access-token':localStorage.getItem("token")}}
        )
        console.log(res)
    }

    onChange = (event) => {
        let fields = this.state.fields;
        fields[event.target.name]=event.target.value;
        this.setState({fields});
    }

    

    onSubmit = (event) => {
        event.preventDefault();
        
        let fields = this.state.fields;
        let errors = {};
        let isValid = true;


        if (!fields['bname'] ){
            isValid=false;
            errors['bname'] = "Please enter book name."
        } 

        if (!fields['yr'] ){
            isValid=false;
            errors['yr'] = "Please enter publication year."
        } 

        if (!fields['publ'] ){
            isValid=false;
            errors['publ'] = "Please enter publisher information."
        } 

        if (!fields['lang'] ){
            isValid=false;
            errors['lang'] = "Please enter publisher information."
        } 

        if (!fields['loc'] ){
            isValid=false;
            errors['loc'] = "Please enter book location."
        } 


        this.setState({
            errors: errors
        });
        
        if (isValid===true){
            this.setState({fields:fields});
  
            console.log(this.state);
            this.createBook();
            alert("submitted");
            window.location.reload();

  
        }
    }

    


    render() {
        
        return(

        <div>
            
            <div  >
                <form onSubmit={this.onSubmit}>
                    <div className="password">
                    <label htmlFor='bname'>Book Name:</label>
                    <input 
                        className={this.state.errors.bname ? "error" : null}
                        type='text' 
                        name='bname' 
                        placeholder='Enter Book Name' 
                        onChange={this.onChange} 
                    />
                    <span className="errorMessage">{this.state.errors.bname}</span>
                    </div>

                    <div className="password">
                    <label htmlFor='auth'>Authors:</label>
                    <input 
                        className={this.state.errors.auth ? "error" : null}
                        type='text' 
                        name='auth' 
                        placeholder='Author1, Author2, ...' 
                        onChange={this.onChange} 
                    />
                    <span className="errorMessage">{this.state.errors.auth}</span>
                    </div>


                    <div className="password">
                    <label htmlFor='yr'>Publication Year:</label>
                    <input 
                        className={this.state.errors.yr ? "error" : null}
                        type='date' 
                        name='yr' 
                        placeholder='Enter Publication Year' 
                        onChange={this.onChange} 
                    />
                    <span className="errorMessage">{this.state.errors.yr}</span>
                    </div>

                    <div className="password">
                    <label htmlFor='lang'>In Language:</label>
                    <input 
                        className={this.state.errors.lang ? "error" : null}
                        type='text' 
                        name='lang' 
                        placeholder='Enter Language' 
                        onChange={this.onChange} 
                    />
                    <span className="errorMessage">{this.state.errors.lang}</span>
                    </div>

                    <div className="password">
                    <label htmlFor='pgs'>Number of Pages:</label>
                    <input 
                        className={this.state.errors.pgs ? "error" : null}
                        type='number' 
                        name='pgs' 
                        placeholder='Enter number of pages' 
                        onChange={this.onChange} 
                    />
                    <span className="errorMessage">{this.state.errors.pgs}</span>
                    </div>

                    <div className="password">
                    <label htmlFor='publ'>Publisher:</label>
                    <input 
                        className={this.state.errors.publ ? "error" : null}
                        type='text' 
                        name='publ' 
                        placeholder='Enter publisher name' 
                        onChange={this.onChange} 
                    />
                    <span className="errorMessage">{this.state.errors.publ}</span>
                    </div>


                    <div className="password">
                    <label htmlFor='loc'>Book Location:</label>
                    <input 
                        className={this.state.errors.loc ? "error" : null}
                        type='text' 
                        name='loc' 
                        placeholder='Enter book location' 
                        onChange={this.onChange} 
                    />
                    <span className="errorMessage">{this.state.errors.loc}</span>
                    </div>

                    
                    <div className="mySubmit"><button type="submit" value="submit" >Add</button></div>
                </form>
              
            </div>
        </div>
        )
    }
}

export default AddForm;