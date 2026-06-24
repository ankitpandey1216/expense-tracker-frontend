import "../../styles/dashboard.css";

// const recentExpenses = [
//     {
//         id: 1,
//         title: "Weekend dinner",
//         date: "Jun 21, 2026",
//         amount: "INR 2,450",
//         group: "Goa Trip",
//     },
//     {
//         id: 2,
//         title: "Monthly groceries",
//         date: "Jun 18, 2026",
//         amount: "INR 4,180",
//         group: "Flatmates",
//     },
//     {
//         id: 3,
//         title: "Cab to airport",
//         date: "Jun 16, 2026",
//         amount: "INR 1,120",
//         group: "Office Travel",
//     },
//     {
//         id: 4,
//         title: "Movie tickets",
//         date: "Jun 12, 2026",
//         amount: "INR 900",
//         group: "Friends",
//     },
// ];

export default function RecentExpense({recentExpenses=[]}) {
    return (
        <section className="dashboard-panel">
            <div className="dashboard-panel-header">
                <div>
                    <h2>Recent expenses</h2>
                    <p>Latest payments made by you.</p>
                </div>
            </div>

            <div className="recent-expense-list">
                {recentExpenses.map((expense) => (
                    <article className="recent-expense-item" key={expense?.createdAt}>
                        <div className="recent-expense-icon">
                            {expense?.description?.charAt(0)}
                        </div>
                        <div className="recent-expense-content">
                            <div className="recent-expense-main">
                                <h3>You paid {expense?.amountPaid}</h3>
                                <strong>{expense.date}</strong>
                            </div>
                            <p>For {expense?.description} in {expense?.groupName}</p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}
