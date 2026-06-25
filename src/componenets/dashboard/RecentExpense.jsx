import "../../styles/dashboard.css";


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
                {Array.isArray(recentExpenses) && recentExpenses.map((expense) => (
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
