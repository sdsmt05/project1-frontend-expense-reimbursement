import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Reimbursement from "../dtos/dtos";
import ApproveReimbursementsTable from "./approve-reimbursements-table";
import ClosedReimbursements from "./closed-reimbursements";
import Header from "./header";
import StatisticsTable from "./statistics-table";

export default function ApproveReimbursements(){

    const [openReimbursements, setOpenReimbursements] = useState<Reimbursement[]>([]);
    const [closedReimbursements, setClosedReimbursements] = useState<Reimbursement[]>([]);
    const [allReimbursements, setAllReimbursements] = useState<Reimbursement[]>([]);

    const navigate = useNavigate();

    useEffect(()=>{
        (async ()=>{
            const response = await fetch(`https://proj1backend.azurewebsites.net/reimbursements`);
            const reimbursements: Reimbursement[] = await response.json();
            setAllReimbursements(reimbursements);
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
        <hr/>
        <h2 style={{color: "#606c76"}}>Reimbursements Needing Approval</h2>
        {openReimbursements[0] ? <ApproveReimbursementsTable openReimbursements={openReimbursements}  closedReimbursements={closedReimbursements} setOpenReim={setOpenReimbursements} setClosedReim={setClosedReimbursements}/> : <h4>**No Open Reimbursements**</h4>}
        <ClosedReimbursements reimbursements={closedReimbursements}/>
        <hr/>
        <StatisticsTable reimbursements={allReimbursements}/>
        <hr/>
        <button onClick={goHome}>Go Home</button>
    </>)
}