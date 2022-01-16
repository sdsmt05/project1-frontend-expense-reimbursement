import Reimbursement from "../dtos/dtos";
import ApproveReimbursementsRow from "./approve-reimbursements-row";

export default function ApproveReimbursementsTable(props: {openReimbursements: Reimbursement[], closedReimbursements: Reimbursement[], setOpenReim: Function, setClosedReim: Function}){

    const {openReimbursements, closedReimbursements, setOpenReim, setClosedReim} = props;
    const tableRows = openReimbursements.map(r => <ApproveReimbursementsRow key={r.id} reimbursement={r} openReimbursements={openReimbursements} setOpenReim={setOpenReim} closedReimbursements={closedReimbursements} setClosedReim={setClosedReim}/>);

    return(<>
        <table>
            <thead>
                <tr>
                    <th>Owner</th>
                    <th>Amount</th>
                    <th>Reason</th>
                    <th>Approved?</th>
                    <th>Manager Comment</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {tableRows}
            </tbody>
        </table>
    </>)
}