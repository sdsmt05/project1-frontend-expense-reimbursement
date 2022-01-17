import React, { useState } from 'react';
import EmployeeHomePage from './components/employee-home-page';
import LoginPage from './components/login-page';
import ManagerHomePage from './components/manager-home-page';

export default function App() {
  
  const [user, setUser] = useState({
    username: sessionStorage.getItem('username'),
    isManager: sessionStorage.getItem('isManager') === "false" ? false : true
  })

  return (<>{
    !user.username ? <LoginPage updateUser={setUser}/>:
    user.isManager ? <ManagerHomePage/> : <EmployeeHomePage/>
  }
  </>);
}
