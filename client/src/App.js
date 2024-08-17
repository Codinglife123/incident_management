import logo from './logo.svg';
import './App.css';
 import Login from './components/login';
 import User from './components/User';
 import {BrowserRouter,Routes,Route} from "react-router-dom";
import Administrator from './components/Administrator';
import Register from './components/register';
import Success from './components/success';
 import Snav from './components/sidenav';
import MyComplain from './components/MyComplain';
import Edit from './components/Edit';
import Forgot from './components/Forgot';
import RoleWork from './components/RoleWork';
// import Login from './components/login';
function App() {
  return (
    <div className="App">
     
  <BrowserRouter>
  {/* <Snav/> */}
  <Routes>
        {/* <Route exact path="/" index element={<C1/>}/>
        <Route path='/Arr' element={<Arr/>}/>
        <Route path='/Arr/Update' element={<Update/>}/>
        <Route path='Arr/TableView' element={<TableView/>}/>
        <Route path='Arr/TableView/Arr' element={<Arr/>}/> */}
        {/* <Route path='/Arr/Update/Localstorage' element={<LocalStorage/>}/> */}
        <Route exact path="/" index element={<Login/>}/>
         <Route path='/User' element={<User/>}/>
         <Route path='/Administrator' element={<Administrator/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/success' element={<Success/>}/>
    <Route path='/MyComplain' element={<MyComplain/>}/>
    <Route path='/Edit' element={<Edit/>}/>
    <Route path='/forgot' element={<Forgot/>}/>
    <Route path='/RoleWork' element={<RoleWork/>}/>
    {/* <Route path='/sidenav' element={<Snav/>}/> */}
          {/*  <Route path='/DemoApi' element={<DemoApi/>}/>  */}
        {/* <Route path='/Arr/TableView/Arr' element={<Arr/>}/>
        <Route path='/' element={<TableView/>}/>
       */}
       
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
