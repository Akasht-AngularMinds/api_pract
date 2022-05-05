import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useEffect, useState }from 'react'
import Login from './Authentication/Login';
import SignUp from './Authentication/SignUp';
import Feed from './Components/Feed';
import Header from './Components/Header';
import ChangePass from './Components/ChangePass'
import EditProfile from './Components/EditProfile';
import axios from "axios"
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
   
  }, []);
  console.log(user)
  return (
    <div className="App">
     <Router>
        <Routes>
         
            <Route path='/feed' element={<Feed />} />   
          <Route path='/' element={<Login />} />     
          <Route path='/signup' element={<SignUp />} />        
          <Route path='/edit-profile' element={<EditProfile />} />

          {/* <Route path='/' element={<ChangePass />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
