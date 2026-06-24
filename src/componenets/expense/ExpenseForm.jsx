import { useState } from "react"

const splitTypes = [
    { value: "EQUAL", label: "Equal" },
    { value: "CUSTOM", label: "Exact Amount" },
    //   { value: "PERCENTAGE", label: "Percentage" }
];
export default function ExpenseForm({ members, ownerId, addExpense, onClose }) {
    const [expenseData, setExpenseData] = useState({
        description: "",
        amount: 0,
        splitType: "EQUAL",
        userIds: [],
        customSplits: {},
        paidBy: ownerId
    });



    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log("handle change called name : ", name);
        setExpenseData((prev) => {
            if (name === "splitType") {
                return {
                    ...prev,
                    [name]: value,
                    userIds: [],
                    customSplits: {}
                }
            }
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleCustomSplit = (memberId) => {
        if (expenseData.splitType === "EQUAL") {
            setExpenseData((prev) => {
                const isAlreadySelected = prev.userIds.some((u) => u === memberId);
                if (isAlreadySelected) {
                    const users = prev.userIds.filter((u) => u !== memberId);
                    return {
                        ...prev,
                        userIds: [...users],
                        customSplits: {}
                    };
                }
                return {
                    ...prev,
                    userIds: [...prev.userIds, memberId],
                    customSplits: {}
                };
            })
        } else {
            setExpenseData(prev => {
                const splits = { ...prev.customSplits };

                if (memberId in splits) {
                    delete splits[memberId];
                } else {
                    splits[memberId] = "";
                }

                return {
                    ...prev,
                    customSplits: splits,
                    userIds: []
                };
            });
        }
    };

    const handleCustomSplitAmount = (e, memberId) => {
        const value = Number(e.target.value);

        setExpenseData(prev => ({
            ...prev,
            customSplits: {
                ...prev.customSplits,
                [memberId]: value
            }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Inside handleSubmit: data ", expenseData);
        const data = structuredClone(expenseData);
        data["amount"] = Number(data["amount"]);
        if (data.splitType === "CUSTOM") {
            const total = Object.values(data.customSplits).reduce((acc, curr) => {
                return acc + curr;
            }, 0)
            if (total < data.amount) {
                data.customSplits[ownerId] = data.amount - total;
            }
            if (validateData(data)) {
                addExpense(data);
                onClose();
            } else {
                alert("Data for expense is not valid please check");
                console.log("Error in adding custom split");
            }
        } else if (data.splitType === "EQUAL") {
            if (validateData(data)) {
                console.log("Data is : ", data);
                addExpense(data);
                onClose();
            } else {
                alert("Data for expense is not valid please check");
                console.log("Error in adding custom split");
            }
        }


    }

    const validateData = (expense) => {
        console.log("Inside validate data ; ", expense);
        if (expense.amount < 0 || !expense.description) {
            return false;
        }

        if (expense.splitType === "CUSTOM") {
            const keys = Object.keys(expense.customSplits);
            if (keys.length === 0) {
                return false;
            }
            if (keys.length > members.length) {
                console.log("More members in split than group");
                return false;
            }
            const values = Object.values(expense.customSplits);
            const hasNegativeAmount = values.some(
                value => Number(value) < 0
            );

            if (hasNegativeAmount) {
                return false;
            }
            const total = values.reduce((acc, curr) => {
                return acc + Number(curr);
            }, 0)
            if (Math.abs(total - expense.amount) > 0.01) {
                return false;
            }
            if (total > expense.amount) {
                return false;
            }
        } else if (expense.splitType === "EQUAL") {
            if (expense.userIds.length === 0) {
                alert("Please select at least one user to split the amout");
                return false;
            }

        }
        return true;
    }

    return (
        <form className="expense-form-container" onSubmit={handleSubmit}>
            <input className="expense-form-input" type="text" placeholder="Description" name="description" value={expenseData?.description} onChange={handleChange} minLength={2} />
            <input className="expense-form-input" type="number" placeholder="Amount" name="amount" value={expenseData?.amount} onChange={handleChange} required min={0} />
            <select className="expense-form-input" value={expenseData.splitType} onChange={handleChange} name="splitType" placeholder="Select split type" required>
                {
                    splitTypes.map((split) => {
                        return <option value={split.value} key={split.value} name={split.label}>{split.label}</option>
                    })
                }
            </select>
            {
                expenseData.splitType === "EQUAL" ? <span className="expense-form-note">Amount will be splitted equally among selected members</span> : <span className="expense-form-note">Exact amount will be added to selected users</span>
            }


            <div className="expense-member-list">
                {
                    members.map((member) => {
                        if (expenseData.splitType === "CUSTOM" && ownerId === member.userId) {
                            return null;
                        }

                        return <div className="expense-member-row" key={member?.userId}>
                            {
                                expenseData.splitType === "CUSTOM" && ownerId !== member.userId && <>
                                    <input className="expense-member-checkbox" type="checkbox" checked={expenseData.splitType === "CUSTOM" ? member.userId in expenseData.customSplits : expenseData.userIds.some((u) => u === member.userId)} onChange={() => handleCustomSplit(member?.userId)} />

                                    <span className="expense-member-name">{member.userName}</span>
                                </>
                            }
                            {
                                expenseData.splitType === "EQUAL" && <>
                                    <input className="expense-member-checkbox" type="checkbox" checked={expenseData.splitType === "CUSTOM" ? member.userId in expenseData.customSplits : expenseData.userIds.some((u) => u === member.userId)} onChange={() => handleCustomSplit(member?.userId)} />

                                    <span className="expense-member-name">{member.userName}</span>
                                </>
                            }
                            {
                                member.userId !== ownerId && member.userId in expenseData.customSplits && <input className="expense-form-input expense-custom-amount" type="number" placeholder="Enter amout" required name={member?.userId} value={expenseData?.customSplits[member?.userId]} onChange={(e) => handleCustomSplitAmount(e, member.userId)} />
                            }
                        </div>
                    })
                }
            </div>
            <button className="expense-form-submit" type="submit">Add</button>

        </form>
    )
}
