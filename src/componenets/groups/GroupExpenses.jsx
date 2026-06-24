export default function GroupExpenses({ expenses = [], ownerId }) {
  return (
    <section className="group-detail-section">
      <h2>Expenses</h2>

      <div className="expense-list">
        {expenses.length > 0 && expenses.map((expense) => (
          <article className="expense-row" key={`${expense.paidBy}-${expense.description}`}>
            <div>
              <p className="expense-title">
                {expense.paidById === ownerId ? "You" : expense.paidBy} paid {expense.amount} for {expense.description}
              </p>
              <p className="expense-meta">
                {new Date(expense.createdAt).toLocaleString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit"
                })}
              </p>
            </div>
          </article>
        ))}
        {
          expenses.length === 0 && <p className="group-empty-state">No expenses to show</p>
        }
      </div>
    </section>
  );
}
