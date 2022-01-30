import Reimbursement from "../dtos/dtos";
import ReimbursementTable from "./reimbursement-table";

export default function ClosedReimbursements(props: {reimbursements: Reimbursement[]}){

    const reimbursements = props.reimbursements;

    return(<>
        <h2 style={{color: "#606c76"}}>Closed Reimbursement Requests</h2>
        {reimbursements[0] ? <ReimbursementTable reimbursements={reimbursements}/> : <h4>**No Closed Reimbursements**</h4>}
    </>);
}