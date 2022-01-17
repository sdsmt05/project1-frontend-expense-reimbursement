
export default function StatisticsRow(props: {ownerName: string, numRequests: number, totalAmount: number}){

    const {ownerName, numRequests, totalAmount} = props;

    return(<tr>
        <td>{ownerName}</td>
        <td>{numRequests}</td>
        <td>{totalAmount}</td>
    </tr>)
}