import plusIcon from "../../images/plus.svg";

export default function AddExpenseButton({handleOpenExpenseForm}) {
  return (
    <button className="add-expense-btn" type="button" onClick={() => handleOpenExpenseForm()} style={{position: "fixed",bottom: "2rem",right: "1.5rem",zIndex: "9999"}}>
      <span
        className="add-expense-icon"
        style={{ "--add-expense-icon": `url(${plusIcon})` }}
        aria-hidden="true"
      />
      Add Expense
    </button>
  );
}
