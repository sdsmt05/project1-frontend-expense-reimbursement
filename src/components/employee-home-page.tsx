import { useEffect, useState } from "react";
import Reimbursement from "../dtos/dtos";
import ClosedReimbursements from "./closed-reimbursements";
import Header from "./header";
import OpenReimbursements from "./open-reimbursements";
import ReimbursementForm from "./reimbursement-form";

export default function EmployeeHomePage(){

    const [openReimbursements, setOpenReimbursements] = useState<Reimbursement[]>([]);
    const [closedReimbursements, setClosedReimbursements] = useState<Reimbursement[]>([]);

    useEffect(()=>{
        (async ()=>{
            const response = await fetch(`https://proj1backend.azurewebsites.net/reimbursements/${sessionStorage.getItem("id")}`);
            const reimbursements: Reimbursement[] = await response.json();
            setOpenReimbursements(reimbursements.filter(r => r.isApproved === "Pending"));
            setClosedReimbursements(reimbursements.filter(r => r.isApproved !== "Pending"));
        })()
    },[])



    return(<>
        {closedReimbursements ? <>
        <Header/>
        <hr/>
        <h1 style={{color: "#6d6477"}}>Employee Home Page</h1>
        <hr/>
        <ReimbursementForm reimbursements={openReimbursements} setReimbursements={setOpenReimbursements}/>
        <OpenReimbursements reimbursements={openReimbursements}/>
        <ClosedReimbursements reimbursements={closedReimbursements}/>
        </> : <h4>Loading...</h4>}     
    </>);

}