import Reimbursement, { IsApproved } from "../dtos/dtos";
import ReimbursementRow from "./reimbursement-row";

export default function ReimbursementTable(){
    const reimbursements: Reimbursement[] = [
        {id:"101", owner:"tdog", amount:200, reason:"Groceries", isApproved: IsApproved.no},
        {id:"201", owner:"mham", amount:100, reason:"Gas", isApproved: IsApproved.yes},
        {id:"301", owner:"jcroc", amount:200, reason:"Pizza", isApproved: IsApproved.pending}
    ]

    const tableRows = reimbursements.map(r => <ReimbursementRow key={r.id} {...r}/>);

    return(<>
        <table>
            <thead>
                <tr>
                    <th>Owner</th>
                    <th>Amount</th>
                    <th>Reason</th>
                    <th>Approved?</th>
                </tr>
            </thead>
            <tbody>
                {tableRows}
            </tbody>
        </table>
    </>);
}