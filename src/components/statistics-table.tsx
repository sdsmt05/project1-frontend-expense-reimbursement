import Reimbursement from "../dtos/dtos";
import StatisticsRow from "./statistics-row";

export default function StatisticsTable(props: {reimbursements: Reimbursement[]}){

    const {reimbursements} = props;
    
    const users = Array.from(new Set(reimbursements.map((r: Reimbursement) => r.ownerName)));
    let tableRows = [];

    for(let user of users) {
        let userReimbursements = reimbursements.filter(r => r.ownerName === user);
        let totalAmount: number = 0;
        userReimbursements.forEach((r)=> totalAmount += Number(r.amount));
        tableRows.push(<StatisticsRow key={user} ownerName={user} numRequests={userReimbursements.length} totalAmount={totalAmount}/>)
    }

    return(<>
        <h3 style={{color: "#606c76"}}>General Statistics</h3>
        <table>
            <thead>
                <tr>
                    <th>Owner</th>
                    <th>Num Requests</th>
                    <th>Total Amount</th>
                </tr>
            </thead>
            <tbody>
                {tableRows}
            </tbody>
        </table>
    </>)
}