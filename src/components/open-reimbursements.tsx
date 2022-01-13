import Reimbursement from "../dtos/dtos";
import ReimbursementTable from "./reimbursement-table";

export default function OpenReimbursements(props: {reimbursements: Reimbursement[]}){

    const reimbursements = props.reimbursements;

    return(<>
        <h3>Open Reimbursement Requests</h3>
        {reimbursements[0] ? <ReimbursementTable reimbursements={reimbursements}/> : "No Open Reimbursements"}
    </>);
}