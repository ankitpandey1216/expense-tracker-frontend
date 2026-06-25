import "../../styles/dashboard.css";

// const groupBalances = [
//     {
//         id: 1,
//         groupName: "Goa Trip",
//         owed: "INR 8,400",
//         owe: "INR 1,200",
//     },
//     {
//         id: 2,
//         groupName: "Flatmates",
//         owed: "INR 3,100",
//         owe: "INR 5,750",
//     },
//     {
//         id: 3,
//         groupName: "Office Travel",
//         owed: "INR 12,000",
//         owe: "INR 0",
//     },
//     {
//         id: 4,
//         groupName: "Friends",
//         owed: "INR 1,850",
//         owe: "INR 650",
//     },
// ];

export default function GroupBalance({groupBalances=[]}) {
    return (
        <section className="dashboard-panel">
            <div className="dashboard-panel-header">
                <div>
                    <h2>Group balances</h2>
                    <p>What each group owes you and what you owe.</p>
                </div>
            </div>

            <div className="group-balance-list">
                {Array.isArray(groupBalances) && groupBalances.map((balance) => (
                    <article className="group-balance-card" key={balance?.groupId}>
                        <div className="group-balance-heading">
                            <div className="group-balance-avatar">
                                {balance?.groupName?.charAt(0)}
                            </div>
                            <h3>{balance?.groupName}</h3>
                        </div>

                        <div className="group-balance-values">
                            <div>
                                <span>Owed to you</span>
                                <strong className="balance-positive">{balance?.owedToYou}</strong>
                            </div>
                            <div>
                                <span>You owe</span>
                                <strong className="balance-negative">{balance?.youOwe}</strong>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}
