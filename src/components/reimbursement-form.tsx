import { useRef } from "react"
import Reimbursement, { IsApproved } from "../dtos/dtos";

export default function ReimbursementForm(props: {reimbursements: Reimbursement[], setReimbursements: Function}){

    const amountInput = useRef(null);
    const reasonInput = useRef(null);

    const {reimbursements, setReimbursements} = props;

    async function submitReimbursement(){
        
        const reimbursement: Reimbursement = {
            id: "",
            ownerId: sessionStorage.getItem("id"),
            ownerName: sessionStorage.getItem("name"),
            amount: amountInput.current.value,
            reason: reasonInput.current.value,
            isApproved: IsApproved.pending
        }


        if(!reimbursement.amount || !reimbursement.reason){
            alert("Invalid submission: Either the Amount or Reason is missing");
        } else if(reimbursement.amount <= 0){
            alert("Amount should be a positive number.");
            amountInput.current.value = "";
        }  else {

            const response = await fetch('http://localhost:5000/reimbursements', {
                method: 'POST',
                body: JSON.stringify(reimbursement),
                headers: {
                    'content-type':"application/json"
                }
            })

            if(response.status === 201){
                alert("Successfully Submitted");
                setReimbursements([...reimbursements, reimbursement]);
            } else {
                alert("THERE WAS AN ERROR SUBMITTING THE REIMBURSEMENT");
            }
            amountInput.current.value = "";
            reasonInput.current.value = "";
        }
    }

    return(<>
        <h3 style={{color: "#606c76"}}>Reimbursement Submission Form</h3>

        <label htmlFor="amountInput">Amount</label>
        <input ref={amountInput} type="number" id="amountInput" placeholder="50" min={0}/>
        <label htmlFor="reasonInput">Reason</label>
        <input ref={reasonInput} type="text" id="reasonInput" placeholder="Gas"/>

        <button onClick={submitReimbursement}>Submit</button>
    </>)
}