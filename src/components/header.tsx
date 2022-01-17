import { useNavigate } from "react-router-dom";

export default function Header(){

    const navigate = useNavigate();

    function logout(){
        sessionStorage.clear();
        navigate("/")
        window.location.reload();
    }

    return(<div style={{display: "flex"}}>
        <h1 style={{marginLeft: "auto", color: "#4e55a7"}}>Welcome, {sessionStorage.getItem("name")}</h1>
        <button style={{marginLeft: "auto", alignSelf: "center"}} onClick={logout}>Logout</button>
    </div>)
}