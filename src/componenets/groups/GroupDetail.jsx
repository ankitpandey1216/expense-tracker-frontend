import GroupHeader from "./GroupHeader";
import GroupMembers from "./GroupMembers";
import GroupBalances from "./GroupBalances";
import GroupExpenses from "./GroupExpenses";
import AddExpenseButton from "../expense/AddExpenseButton";
import "../../styles/groupDetail.css";
import { useState } from "react";
import ModalComponent from "../common/ModalComponent";
import ExpenseForm from "../expense/ExpenseForm";

export default function GroupDetail({ groupDetail, ownerId, handleAddMember, addExpense }) {
  const [openExpenseForm, setOpenExpenseForm] = useState(false);

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
