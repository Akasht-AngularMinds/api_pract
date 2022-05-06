import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import InputLabel from '@mui/material/InputLabel';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {useState,useEffect} from 'react';
import Header from './Header'

const EditProdile =() => {
  let err1 ={ 
    email:false,
    pass:false
  }

  const [name,setName] = useState('');
  const [bio,setBio] = useState('');
  const [gender,setGender] = useState('');
  const [DOB,setDOB] = useState('');
  const [email,setEmail] = useState('');
  const [mobNumber,setMobNumber] = useState('');
  const [err,setErr]=useState(err1);



const paperStyle = { padding: 20, width: 480, margin: "20px auto" };
const btnstyle = { margin: "20px 200px", width: "85px", };

const handleSubmit = () => {
  isValidmail(email)
  isValidMobNumber(mobNumber)

  const data = {
    name:name,
    email: email,
    mobNumber: mobNumber,
  };
  // setEmps([...emps,data]); 

};
function isValidMobNumber (pass1) { 

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
      <Header />
    <Paper elevation={10} 
    style={paperStyle}
    >
      <Grid align="center">
        <h2>Edit Profile</h2>
      </Grid>
      <TextField
        style={{width:'470px',marginTop: "20px"}}
        label="name"
     
        // error={erName}
        placeholder="Enter  name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        
        required
      />

      <TextareaAutosize
        style={{width:'470px',marginTop: "20px", height:'45px', borderRadius: '5px'}}
        label="Bio"     
        // error={erName}
        placeholder="Enter Bio"
        variant="outlined"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        
        required
      />   

        <InputLabel  style={{marginTop: "20px"}} id="demo-row-radio-buttons-group-label">
          Gender
        </InputLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
          onChange={(e) => setGender(e.target.value)}
        >
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
        </RadioGroup>


        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Birth Date"
            value={DOB}
            onChange={(newValue) => {
              setDOB(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

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
          label="Mobile Number"
          style={{ width: '470px' ,marginTop: "20px"}}
          variant="outlined"
          error={err.pass}
          placeholder="Enter Mobile Number"
          value={mobNumber}
          onChange={(e) => {setMobNumber(e.target.value);isValidMobNumber(e.target.value)}}
         
        />  

     
      <Button
        color="primary"
        onClick={() => {
          handleSubmit();
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

export default EditProdile