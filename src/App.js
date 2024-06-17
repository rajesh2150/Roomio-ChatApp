import React,{lazy} from 'react';
import './App.css';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import MailSended from './Components/ForgotPassword/MailSended';
import Home from './Components/Routing/Home/Home';
import SignIn from './Components/SignIn/SignIn';
import SignUp from './Components/SignUp/SignUp';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import { CreateRoom } from './Components/Routing/Home/Home';
// const ForgotPassword = lazy(()=>import('./Components/ForgotPassword/ForgotPassword'))
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      {/* <Navbar/> */}
        <Routes>
          <Route path='/' element={<SignIn/>}/>
          <Route path='/SignUp' element={<SignUp/>}/>
          <Route path='/forgotPassword' element={<ForgotPassword/>}/>
          <Route path='/mailSended' element={<MailSended/>}/>
          <Route path='/home' element={<Home/>}/>
          {/* <Route path='/create' element={<CreateRoom/>}/> */}

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
