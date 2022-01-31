import { useRef, useState } from "react"
import Reimbursement, { IsApproved } from "../dtos/dtos";

export default function ReimbursementForm(props: {reimbursements: Reimbursement[], setReimbursements: Function}){

    const [selectedFile, setSelectedFile] = useState(null);
    
    const amountInput = useRef(null);
    const reasonInput = useRef(null);
    const fileInput = useRef(null);

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
        // } else if(selectedFile !== null){
        //         if( selectedFile.size / 1024 / 1024 > 2){
        //             alert("Files larger than 2MB are not allowed");
        //             fileInput.current.value = "";
        //             setSelectedFile(null);
        //         }    
        } else {

            if(selectedFile) {

                const formData = new FormData();   
                formData.append("myFile", selectedFile, selectedFile.name);
        
                const response = await fetch('https://proj1backend.azurewebsites.net/upload', {
                    method: 'POST',
                    body: formData
                })
        
                reimbursement.imageUrl = await response.text();  
                
                fileInput.current.value = "";
                setSelectedFile(null);
            }

            const response = await fetch('https://proj1backend.azurewebsites.net/reimbursements', {
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
        <h2 style={{color: "#606c76"}}>Reimbursement Submission Form</h2>

        <label htmlFor="amountInput">Amount:</label>
        <input ref={amountInput} type="number" id="amountInput" placeholder="50" min={0}/>
        <label htmlFor="reasonInput">Reason:</label>
        <input ref={reasonInput} type="text" id="reasonInput" placeholder="Gas"/>
        <label htmlFor="fileUpload">File to Upload (optional):</label>
        <input ref={fileInput} type={'file'} id="fileUpload" name="myFile" onChange={(e) => setSelectedFile(e.target.files[0])}/>
        <button onClick={submitReimbursement}>Submit</button>
    </>)
}