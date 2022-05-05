import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import {useState,useEffect} from 'react';
import Link from '@mui/material/Link';
import { GoogleLogin } from 'react-google-login'
import ReCAPTCHA from "react-google-recaptcha"
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function Login() {
  const [user, setUser] = useState(null);


const [email,setEmail] = useState('');
const [pass,setPass] = useState('');

const navigate = useNavigate();

const paperStyle = { padding: 20, width: 480, margin: "20px auto" };
const btnstyle = { margin: "20px 200px", width: "85px", };

const token = localStorage.getItem('token');
 useEffect(()=>{
  
  if(token){
    navigate('/feed');
  }
  else{
    navigate('/');
  }
  
 },[])
//  const google = () => {
//     window.open("http://localhost:5000/auth/google", "_self");
//   };

  
    const google = () => {
      var checkLogin=0;
     
      let getUser = async () => {
        //  let user= await axios.get()
        await fetch("http://localhost:8080/api/auth/login/success", {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        
        })
          .then((response) => {

            if (response.status === 200) 
              
            localStorage.setItem("googleLogin", JSON.stringify("ok"))

            return response.json()
            throw new Error("authentication has been failed!");

          })
          .then((resObject) => {
            // checkLogin = resObject.user
            setUser(resObject.user);
          })
          .catch((err) => {
            console.log(err);
          });
      };
        getUser();

     
      if (token) {
        navigate('/feed');
      }
      console.log("token ", checkLogin)
       checkLogin = JSON.parse(localStorage.getItem("googleLogin"))
      if (checkLogin!="ok") {

        window.open("http://localhost:8080/api/auth/google/callback", "_self");

      }
    }
  console.log(user)

const handleSubmit = () => {
  const data = {
    email:email,
    password:pass
  };
  // setEmps([...emps,data]);

  axios.post('api/auth/login',data)
        .then(response => {
            console.log(response)
            // console.log(response.data.accessToken);
            localStorage.setItem('token',JSON.stringify(response.data.accessToken))
            localStorage.setItem('user',JSON.stringify(response.data.data))
            const temp = () => navigate('/feed')
            temp()
        })
   

};
  const responseGoogle = (res) => {
    // console.log(res.Lu.Bv);
    axios
      .post("http://localhost:7000/google-login", { email: res.Lu.Bv })
      .then((res) => {
        if (res.data.status !== false) {
          if (res !== "user not found" && res.data.token !== "undefined") {
            console.log(res);
            res.data.token &&
              localStorage.setItem("token", JSON.stringify(res.data.token));
            res.data.token &&
              localStorage.setItem("id", JSON.stringify(res.data.user._id));
            // props.setToken(res.data.token);
            // props?.handleClick("Login Successful !");
            navigate("/");
          }
        } else {
          alert("Gmail Account Not Found");
        }
      });
  };


  return (
    <Grid>
    <Paper elevation={10} 
    style={paperStyle}
    >
      <Grid align="center">
        <h2>Login</h2>
      </Grid>
     
      <TextField
        style={{width:'470px',marginTop: "20px"}}
        label="email"       
        // error={erEmail}
        placeholder="Enter email address"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

       <TextField
          label="Password"
          style={{ width: '470px' ,marginTop: "20px"}}
          variant="outlined"
          placeholder="Enter password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
        
        />    
      <Button
        color="primary"
        onClick={() => {
          handleSubmit();
        }}
        variant="contained"
        style={btnstyle}
      >
        Login
      </Button>
      <Link  style={{marginLeft:'150px'}} onClick={()=>navigate('/signup')}>Sign up</Link>
    
      {/* <Link   style={{marginLeft:'15px'}} >Log in with Google</Link> */}
        <button onClick={()=>google()}>LoginG</button>
        <GoogleLogin
          clientId="762736905727-u4gko4aeh379p4g9qt4rh067e2hhdclc.apps.googleusercontent.com"
          // clientId="1069481089822-bfacd3vd7f547gss8cn0o9b49v32l76q.apps.googleusercontent.com"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
    </Paper>
  </Grid>
  )
}
export default Login


