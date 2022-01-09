import Reimbursement from "../dtos/dtos";

export default function ReimbursementRow(props: Reimbursement){
    const {owner, amount, reason, isApproved} = props;

    return(<tr>
        <td>{owner}</td>
        <td>{amount}</td>
        <td>{reason}</td>
        <td>{isApproved}</td>
    </tr>);
}