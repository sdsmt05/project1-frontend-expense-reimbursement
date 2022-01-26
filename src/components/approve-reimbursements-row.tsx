import { useRef } from "react";
import Reimbursement, { IsApproved } from "../dtos/dtos";

export default function ApproveReimbursementsRow(props: {reimbursement: Reimbursement, openReimbursements: Reimbursement[], closedReimbursements: Reimbursement[], setOpenReim: Function, setClosedReim: Function}){
    const {reimbursement, openReimbursements, closedReimbursements, setOpenReim, setClosedReim} = props;
    const {id, ownerName, amount, reason, isApproved, mgrComment} = reimbursement;
    const mgrInput = useRef(null);

    const updatedReimbursement: Reimbursement = {...reimbursement};

    async function updateReimbursement(e){
        e.target.value === IsApproved.yes ? updatedReimbursement.isApproved = IsApproved.yes : 
            updatedReimbursement.isApproved = IsApproved.no;
        if(mgrInput.current.value)
            updatedReimbursement.mgrComment = mgrInput.current.value ;

        const response = await fetch(`https://proj1backend.azurewebsites.net/reimbursements/${updatedReimbursement.id}`, {
            method: 'PUT',
            body: JSON.stringify(updatedReimbursement),
            headers: {'content-type': 'application/json'}
        })

        if(response.status === 201){
            alert("Successfully Submitted");
            setClosedReim([...closedReimbursements, updatedReimbursement]);
            openReimbursements.splice(openReimbursements.findIndex(r => r.id === id), 1)
            setOpenReim([...openReimbursements]);
        } else {
            alert("THERE WAS AN ERROR UPDATING THE REIMBURSEMENT");
        }
    }



    return(<tr>
        <td>{ownerName}</td>
        <td>${amount}</td>
        <td>{reason}</td>
        <td>{isApproved}</td>
        <td><input ref={mgrInput} type="text"/></td>
        <td>
            <button value={IsApproved.yes} style={{backgroundColor: "green"}} onClick={updateReimbursement}>Approve</button>
            <button value={IsApproved.no} style={{backgroundColor: "red"}} onClick={updateReimbursement}>Deny</button>
        </td>
    </tr>)
}