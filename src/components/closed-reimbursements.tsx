import Reimbursement from "../dtos/dtos";
import ReimbursementTable from "./reimbursement-table";

export default function ClosedReimbursements(props: {reimbursements: Reimbursement[]}){

    const reimbursements = props.reimbursements;

    return(<>
        <h3>Closed Reimbursement Requests</h3>
        {reimbursements[0] ? <ReimbursementTable reimbursements={reimbursements}/> : <h4>**No Closed Reimbursements**</h4>}
    </>);
}