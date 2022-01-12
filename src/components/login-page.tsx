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

        const response = await fetch('http://localhost:5000/login', {
            method: 'PATCH',
            body: JSON.stringify(loginInfo),
            headers: {'content-type': 'application/json'}
        })

        const user = await response.json();
        props.updateUser({username: user.username, isManager: user.isManager});

        sessionStorage.setItem("username", user.username);
        sessionStorage.setItem("id", user.id);
        sessionStorage.setItem("name", `${user.fname} ${user.lname}`);
        sessionStorage.setItem("isManager", user.isManager);
    }

    return(<>
        <h1>Login Page</h1>

        <label htmlFor="usernameInput">Username</label>
        <input ref={usernameInput} type="text" id="usernameInput" required/>

        <label htmlFor="passwordInput">Username</label>
        <input ref={passwordInput} type="password" id="passwordInput" required/>

        <button onClick={login}>Login</button>

    </>);
}