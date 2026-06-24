import GroupHeader from "./GroupHeader";
import GroupMembers from "./GroupMembers";
import GroupBalances from "./GroupBalances";
import GroupExpenses from "./GroupExpenses";
import AddExpenseButton from "../expense/AddExpenseButton";
import "../../styles/groupDetail.css";
import { useState } from "react";
import ModalComponent from "../common/ModalComponent";
import ExpenseForm from "../expense/ExpenseForm";


const group = {
  title: "Goa Trip",
  members: ["You", "Aryan", "Chandan", "Rohit", "Priya"],
  balances: [
    { name: "Aryan", status: "owes you", amount: "₹450", type: "positive" },
    { name: "Chandan", status: "you owe", amount: "₹120", type: "negative" },
    { name: "Rohit", status: "owes you", amount: "₹780", type: "positive" },
  ],
  expenses: [
    { paidBy: "You", amount: "₹200", title: "dinner", date: "Today" },
    { paidBy: "Aryan", amount: "₹1,200", title: "hotel booking", date: "Yesterday" },
    { paidBy: "Priya", amount: "₹650", title: "cab ride", date: "Apr 28" },
  ],
};

export default function GroupDetail({ groupDetail, ownerId, handleAddMember, addExpense }) {
  const [openExpenseForm, setOpenExpenseForm] = useState(false);

  console.log("groupDetails: ", groupDetail);

  const handleOpenExpenseForm = () => {
    setOpenExpenseForm(true);
  }

  const handleClose = () => {
    setOpenExpenseForm(false);
  }

  return (
    <section className="group-detail-page">
      <GroupHeader title={groupDetail?.groupName} />
      <GroupMembers members={groupDetail?.members} ownerId={ownerId} handleAddMember={handleAddMember} />
      <GroupBalances balances={groupDetail?.balances} />
      <GroupExpenses expenses={groupDetail?.expenses} ownerId={ownerId} />
      <AddExpenseButton handleOpenExpenseForm={handleOpenExpenseForm} />
      <ModalComponent onClose={handleClose} open={openExpenseForm} children={<>
        <h1>Add Expense</h1>
        <ExpenseForm members={groupDetail?.members} ownerId={ownerId} addExpense={addExpense} onClose={handleClose} />
      </>} />
    </section>
  );
}
