import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Reimbursement from "../dtos/dtos";
import ApproveReimbursementsTable from "./approve-reimbursements-table";
import ClosedReimbursements from "./closed-reimbursements";
import Header from "./header";

export default function ApproveReimbursements(){

    const [openReimbursements, setOpenReimbursements] = useState<Reimbursement[]>([]);
    const [closedReimbursements, setClosedReimbursements] = useState<Reimbursement[]>([]);

    const navigate = useNavigate();

    useEffect(()=>{
        (async ()=>{
            const response = await fetch(`http://localhost:5000/reimbursements`);
            const reimbursements: Reimbursement[] = await response.json();
            const allOpenReimbursements = reimbursements.filter(r => r.isApproved === "Pending");
            setOpenReimbursements(allOpenReimbursements.filter(r => r.ownerId !== sessionStorage.getItem("id")));
            setClosedReimbursements(reimbursements.filter(r => r.isApproved !== "Pending"));
        })()
    },[])

    function goHome(){
        navigate("/");
    }

    return(<>
        <Header/>
        <h3 style={{color: "#606c76"}}>Reimbursements Needing Approval</h3>
        {openReimbursements[0] ? <ApproveReimbursementsTable openReimbursements={openReimbursements}  closedReimbursements={closedReimbursements} setOpenReim={setOpenReimbursements} setClosedReim={setClosedReimbursements}/> : <h4>**No Open Reimbursements**</h4>}
        <ClosedReimbursements reimbursements={closedReimbursements}/>
        <hr/>
        <button onClick={goHome}>Go Home</button>
    </>)
}