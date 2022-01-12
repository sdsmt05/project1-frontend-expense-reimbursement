import { useEffect, useState } from "react";
import Reimbursement from "../dtos/dtos";
import ReimbursementForm from "./reimbursement-form";
import ReimbursementTable from "./reimbursement-table";

export default function EmployeeHomePage(){

    const [reimbursements, setReimbursements] = useState<Reimbursement[]>([]);

    useEffect(()=>{
        (async ()=>{
            const response = await fetch("http://localhost:5000/reimbursements");
            const reimbursements = await response.json();
            setReimbursements(reimbursements);
        })()
    },[])



    return(<>
        <h1>Employee Home Page</h1>
        <ReimbursementForm reimbursements={reimbursements} setReimbursements={setReimbursements}/>
        <ReimbursementTable reimbursements={reimbursements}/>
        
    </>);
}