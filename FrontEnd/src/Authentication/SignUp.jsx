import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import {useState,useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const SignUp = () => {
  let err1 ={ 
    email:false,
    pass:false
  }
const [fname,setFname] = useState('');
const [lname,setLname] = useState('');
const [email,setEmail] = useState('');
const [pass,setPass] = useState('');
const [err,setErr]=useState(err1);
const [clickSignUp,setClickSignUp] = useState(false);
const navigate = useNavigate();

const paperStyle = { padding: 20, width: 480, margin: "20px auto" };
const btnstyle = { margin: "20px 200px", width: "85px", };

const handleSubmit = () => {
  isValidmail(email)
  isValidPass(pass)

  const info= {
    firstname:fname,
    lastname:lname,
    email:email,
    password:pass,
    isAdmin:"true" 

  };
  axios.post('api/auth/register',info)
  .then(response => {
      console.log(response)
      console.log(response.data.token);
      localStorage.setItem('token',JSON.stringify(response.data.token))
      const temp = () => navigate('/feed')
      temp()
  })

};
function isValidPass (pass1) { 

  let passPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
    pass1.match(passPattern) == null?
      (
       setErr({...err,pass:true})
      )
      :(  
        setErr({...err,pass:false})
      )  
  return err;
}


function isValidmail(email) {
  var emailpattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  email.match(emailpattern) == null?(
      setErr({...err,email:true})
    )
    :(  
    setErr({...err,email:false})
    )  
return err;
}


  return (
    <Grid>
    <Paper elevation={10} 
    style={paperStyle}
    >
      <Grid align="center">
        <h2>Sign Up</h2>
      </Grid>
      <TextField
        style={{width:'470px',marginTop: "20px"}}
        label="first name"             
        placeholder="Enter first name"
        variant="outlined"
        value={fname}
        onChange={(e) => setFname(e.target.value)}
        error={ clickSignUp && fname === '' ? true : false } 
        helperText={ clickSignUp && fname === '' ? "Enter First Name " : ''}
        required
      />

      <TextField
        style={{width:'470px',marginTop: "20px"}}
        label="last name"     
        // error={erName}
        placeholder="Enter last name"
        variant="outlined"
        value={lname}
        onChange={(e) => setLname(e.target.value)}
        
        required
      />          
      <TextField
        style={{width:'470px',marginTop: "20px"}}
        label="email"       
         error={err.email}
        placeholder="Enter email address"
        variant="outlined"
        value={email}
        onChange={(e) => {setEmail(e.target.value);isValidmail(e.target.value)}}
        required
      />

       <TextField
          label="Password"
          style={{ width: '470px' ,marginTop: "20px"}}
          variant="outlined"
          // error={err.pass}
          placeholder="Enter password"
          value={pass}
          onChange={(e) => {setPass(e.target.value);isValidPass(e.target.value)}}
          type="password"   
          error={ clickSignUp && pass === '' ? true : false } 
          helperText={ clickSignUp && fname === '' ? "Enter Password " : ''}     
        />  

     
      <Button
        color="primary"
        onClick={() => {
          handleSubmit();
          setClickSignUp(true)
        }}
        variant="contained"
        style={btnstyle}
      >
        Submmit
      </Button>
    </Paper>
  </Grid>
  )
}

export default SignUp