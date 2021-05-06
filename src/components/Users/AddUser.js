import React,{useState} from 'react';
import Card from '../UI/Card'
import classes from '../Users/AddUser.module.css'
import Button from '../UI/Button'
import ErrorModal from '../UI/ErrorModal'

const AddUser = (props) => {
    const[enteredUser, setEnteredUser] = useState('');
    const[enteredAge, setEnteredAge] = useState('');
    const[error,setError]=useState('');
    
    
    const userChangeHandler = (event) => {
        setEnteredUser(event.target.value);
        
   }

   const ageChangeHandler = (event) => {
       setEnteredAge(event.target.value);
       
  }

    const addUserHandler = (event) =>{
        event.preventDefault();
        if(enteredUser.trim().length === 0 || enteredAge.trim().length === 0)
        {  console.log("error!!!")
        setError({
            title:"Invalid Input",
            message:"Please enter valid name and age(non-empty values)"
        })
        return;
      }
        if(+enteredAge < 1)  //Added for validating that age should not be negative and user name is not left blank
        {  console.log("error!!!")
        setError({
            title:"Invalid Input",
            message:"Please enter age(Positive values)"
        })
          return;
        }
        //lifting state up into app.js
        props.onAddUser(enteredUser,enteredAge)
        console.log(enteredUser,enteredAge)
        setEnteredAge('');
        setEnteredUser('');

    }


    const errorModalHandler = () => {
        setError(null);
    }

    return(
        <>
        {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorModalHandler}/>}
        <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
            <label htmlFor="username">UserName</label>
            <input id = "username" type = "text" value={enteredUser} onChange={userChangeHandler} />
            <label htmlFor="age">Age (Years) </label>
            <input id="age" type="number"  value={enteredAge} onChange={ageChangeHandler}/>
            <Button type="submit" >Add User </Button>
        </form>
        </Card>
      </>  
    )
}

export default AddUser;