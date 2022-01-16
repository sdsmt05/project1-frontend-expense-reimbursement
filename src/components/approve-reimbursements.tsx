import { useEffect, useState } from "react";
import Reimbursement from "../dtos/dtos";
import ApproveReimbursementsTable from "./approve-reimbursements-table";
import ClosedReimbursements from "./closed-reimbursements";

export default function ApproveReimbursements(){

    const [openReimbursements, setOpenReimbursements] = useState<Reimbursement[]>([]);
    const [closedReimbursements, setClosedReimbursements] = useState<Reimbursement[]>([]);

    useEffect(()=>{
        (async ()=>{
            const response = await fetch(`http://localhost:5000/reimbursements`);
            const reimbursements: Reimbursement[] = await response.json();
            const allOpenReimbursements = reimbursements.filter(r => r.isApproved === "Pending");
            setOpenReimbursements(allOpenReimbursements.filter(r => r.ownerId !== sessionStorage.getItem("id")));
            setClosedReimbursements(reimbursements.filter(r => r.isApproved !== "Pending"));
        })()
    },[])

    return(<>
        <h3>Approve Reimbursements</h3>
        {openReimbursements[0] ? <ApproveReimbursementsTable openReimbursements={openReimbursements}  closedReimbursements={closedReimbursements} setOpenReim={setOpenReimbursements} setClosedReim={setClosedReimbursements}/> : <h4>**No Open Reimbursements**</h4>}
        <ClosedReimbursements reimbursements={closedReimbursements}/>
    </>)
}