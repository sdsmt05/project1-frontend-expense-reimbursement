import { useEffect, useState } from "react";
import Reimbursement from "../dtos/dtos";
import ApproveReimbursements from "./approve-reimbursements";
import ClosedReimbursements from "./closed-reimbursements";
import OpenReimbursements from "./open-reimbursements";
import ReimbursementForm from "./reimbursement-form";

export default function ManagerHomePage(){

    const [openReimbursements, setOpenReimbursements] = useState<Reimbursement[]>([]);
    const [closedReimbursements, setClosedReimbursements] = useState<Reimbursement[]>([]);

    useEffect(()=>{
        (async ()=>{
            const response = await fetch(`http://localhost:5000/reimbursements/${sessionStorage.getItem("id")}`);
            const reimbursements: Reimbursement[] = await response.json();
            setOpenReimbursements(reimbursements.filter(r => r.isApproved === "Pending"));
            setClosedReimbursements(reimbursements.filter(r => r.isApproved !== "Pending"));
        })()
    },[])

    return(<>
        <h1>Manager Home Page</h1>
        <ReimbursementForm reimbursements={openReimbursements} setReimbursements={setOpenReimbursements}/>
        <OpenReimbursements reimbursements={openReimbursements}/>
        <ClosedReimbursements reimbursements={closedReimbursements}/>
        <ApproveReimbursements/>
    </>);
}