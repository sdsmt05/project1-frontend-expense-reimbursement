import Reimbursement, { IsApproved } from "../dtos/dtos";
import ReimbursementRow from "./reimbursement-row";

export default function ReimbursementTable(props: {reimbursements: Reimbursement[]}){

    const reimbursements = props.reimbursements;
    const tableRows = reimbursements.map(r => <ReimbursementRow key={r.id} {...r}/>);

    return(<>
        <table>
            <thead>
                <tr>
                    <th>Owner</th>
                    <th>Amount</th>
                    <th>Reason</th>
                    <th>Approved?</th>
                    <th>Manager Comment</th>
                </tr>
            </thead>
            <tbody>
                {tableRows}
            </tbody>
        </table>
    </>);
}