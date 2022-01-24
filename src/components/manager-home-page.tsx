import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Reimbursement from "../dtos/dtos";
import ClosedReimbursements from "./closed-reimbursements";
import Header from "./header";
import OpenReimbursements from "./open-reimbursements";
import ReimbursementForm from "./reimbursement-form";

export default function ManagerHomePage(){

    const [openReimbursements, setOpenReimbursements] = useState<Reimbursement[]>([]);
    const [closedReimbursements, setClosedReimbursements] = useState<Reimbursement[]>([]);
    const navigate = useNavigate();

    useEffect(()=>{
        (async ()=>{
            const response = await fetch(`https://proj1backend.azurewebsites.net/reimbursements/${sessionStorage.getItem("id")}`);
            const reimbursements: Reimbursement[] = await response.json();
            setOpenReimbursements(reimbursements.filter(r => r.isApproved === "Pending"));
            setClosedReimbursements(reimbursements.filter(r => r.isApproved !== "Pending"));
        })()
    },[])


    function goApprove(){
        navigate("approve");
    }

    return(<>
        {closedReimbursements ? <>
        <Header/>
        <h1 style={{color: "#6d6477"}}>Manager Home Page</h1>
        <ReimbursementForm reimbursements={openReimbursements} setReimbursements={setOpenReimbursements}/>
        <OpenReimbursements reimbursements={openReimbursements}/>
        <ClosedReimbursements reimbursements={closedReimbursements}/>
        <hr/>
        <button onClick={goApprove}>Go To Approvals</button>
        </> : <h4>Loading...</h4>}
    </>)
}