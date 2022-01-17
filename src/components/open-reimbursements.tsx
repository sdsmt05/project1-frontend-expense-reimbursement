import Reimbursement from "../dtos/dtos";
import ReimbursementTable from "./reimbursement-table";

export default function OpenReimbursements(props: {reimbursements: Reimbursement[]}){

    const reimbursements = props.reimbursements;

    return(<>
        <h3 style={{color: "#606c76"}}>Open Reimbursement Requests</h3>
        {reimbursements[0] ? <ReimbursementTable reimbursements={reimbursements}/> : <h4>**No Open Reimbursements**</h4>}
    </>);
}