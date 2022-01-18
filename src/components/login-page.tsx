import { useRef } from "react";
import { isEnumMember } from "typescript";

export default function LoginPage(props: {updateUser: Function}){

    const usernameInput = useRef(null);
    const passwordInput = useRef(null);

    async function login(){

        const loginInfo = {
            username: usernameInput.current.value,
            password: passwordInput.current.value
        }

        if(!loginInfo.username || !loginInfo.password){
            alert("Either the Username or Password is missing.")
        } else {

            const response = await fetch('http://localhost:5000/login', {
            method: 'PATCH',
            body: JSON.stringify(loginInfo),
            headers: {'content-type': 'application/json'}
            })


            if(response.status === 404) {
                alert(`User with username ${loginInfo.username} could not be found`);
                usernameInput.current.value = "";
                passwordInput.current.value = "";
            } else if (response.status === 401) {
                alert("Invalid Password");
                usernameInput.current.value = "";
                passwordInput.current.value = "";
            } else {
                const user = await response.json();
                props.updateUser({username: user.username, isManager: user.isManager});

                sessionStorage.setItem("username", user.username);
                sessionStorage.setItem("id", user.id);
                sessionStorage.setItem("name", `${user.fname} ${user.lname}`);
                sessionStorage.setItem("isManager", user.isManager);
            }
        }
    }

    return(<>
        <h1>Login Page</h1>

        <label htmlFor="usernameInput">Username</label>
        <input ref={usernameInput} type="text" id="usernameInput" required/>

        <label htmlFor="passwordInput">Password</label>
        <input ref={passwordInput} type="password" id="passwordInput" required/>

        <button onClick={login}>Login</button>

    </>);
}