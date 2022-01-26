import Reimbursement from "../dtos/dtos";

export default function ReimbursementRow(props: Reimbursement){
    const {ownerName, amount, reason, isApproved, mgrComment, imageUrl} = props;

    return(<tr>
        <td>{ownerName}</td>
        <td>${amount}</td>
        <td>{reason}</td>
        <td>{isApproved}</td>
        <td>{mgrComment}</td>
        <td>{imageUrl ? <button onClick={e => window.location.href=`${imageUrl}`}>Download</button> : "-"}</td>
    </tr>);
}