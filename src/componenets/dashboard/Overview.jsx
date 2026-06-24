import "../../styles/dashboard.css";

export default function Overview({totalGroups, totalExpense, owedToYou, youOwe}) {
    return (
        <div className="overview-container">
            <div className="overview-item">
                <span>Total groups</span>
                <strong>{totalGroups}</strong>
                <p>Active shared spaces</p>
            </div>
            <div className="overview-item">
                <span>Total expense</span>
                <strong>INR {totalExpense}</strong>
                <p>Tracked this month</p>
            </div>
            <div className="overview-item">
                <span>Owed to you</span>
                <strong className="balance-positive">INR {owedToYou}</strong>
                <p>Pending collections</p>
            </div>
            <div className="overview-item">
                <span>You owe</span>
                <strong className="balance-negative">INR {youOwe}</strong>
                <p>Pending payments</p>
            </div>
        </div>
    )
}
