import Reimbursement, { IsApproved } from "../dtos/dtos";
import ReimbursementRow from "./reimbursement-row";

export default function ReimbursementTable(props: {reimbursements: Reimbursement[]}){
    // const reimbursements: Reimbursement[] = [
    //     {id:"101", ownerId:"tdog", ownerName:"Tommy Dog", amount:200, reason:"Groceries", isApproved: IsApproved.no},
    //     {id:"201", ownerId:"mham", ownerName:"Mark Ham", amount:100, reason:"Gas", isApproved: IsApproved.yes},
    //     {id:"301", ownerId:"jcroc", ownerName:"Johnny Croc", amount:200, reason:"Pizza", isApproved: IsApproved.pending}
    // ]
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