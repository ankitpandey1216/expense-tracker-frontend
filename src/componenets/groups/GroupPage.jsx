import "../../styles/groupPage.css";
import plusIcon from "../../images/plus.svg";
import { useContext, useEffect, useState } from "react";
import groupApi from "../../services/groupService";
import { AuthContext } from "../../contexts/AuthContext";
import GroupDetail from "./GroupDetail";
import { groupMemberApi } from "../../services/groupMemberService";
import { addGroupExpense } from "../../services/expenseService";
import ModalComponent from "../common/ModalComponent";


export default function GroupPage() {
    const [groups, setGroups] = useState([]);
    const [openGroupAddForm, setOpenGroupAddForm] = useState(false);
    const [groupData, setGroupData] = useState({
        groupTitle: "",
        createdBy: ""
    });
    const [selectGroup, setSelectedGroup] = useState(null);
    const [groupDetail, setGroupDetail] = useState(null);

    const { userId } = useContext(AuthContext);



    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await groupApi.get();
                if (response.data.length !== 0) {
                    setGroups(response.data);
                }

            } catch (error) {

            }
        }
        fetchGroups();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setGroupData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleAddGroup = async (event) => {
        event.preventDefault();
        try {
            const data = { ...groupData };
            data.createdBy = userId;
            await groupApi.post("", data);
            setGroups((prev) => ([
                ...prev,
                response.data
            ]))
            setGroupData({});
            closeAddGroupModal();
        } catch (error) {
        }
    }

    const openGroupForm = () => {
        setOpenGroupAddForm((prev) => !prev);
    }

    // to show detailed view of a group

    const showGroupDetail = async (groupId) => {
        if (groupId) {
            setSelectedGroup(groupId);
            try {
                const response = await groupApi.get(`/${groupId}`);
                setGroupDetail(response.data);
            } catch (error) {
            }

        }
    }

    // api to add memebers to a group
    const addMembersToGroup = async (memeberIds) => {
        try {
            await groupMemberApi.post(`/${selectGroup}/members`, {
                userIds: memeberIds
            });
            await showGroupDetail(selectGroup);

        } catch (error) {
        }
    }

    // api for adding expense to group
    const addExpense = async (expenseData) => {
        try {
            await addGroupExpense(selectGroup, expenseData);
        } catch (error) {
        }
    }

    const closeAddGroupModal = () => {
        setOpenGroupAddForm(false);
    }


    return (
        <section className="group-page">
            <div className="group-list-panel">
                <div className="group-page-header" >
                    <div className="group-page-title">
                        <h1>Groups</h1>
                        <p>Track balances across shared expenses.</p>
                    </div>

                    {/* <button className="create-group-btn" type="button" onClick={openGroupForm}>
                        <span
                            className="create-group-icon"
                            style={{ "--create-group-icon": `url(${plusIcon})` }}
                            aria-hidden="true"
                        />
                        Create Group
                    </button> */}
                </div>

                {/* {
                    openGroupAddForm && <form style={{display: "flex",flexDirection: "column",gap: "1rem",marginBottom: "1.5rem"}} onSubmit={handleAddGroup}>
                        <input placeholder="Enter group name here " name="groupTitle" value={groupData.groupTitle} onChange={handleChange}/>
                        <button style={{background: "green"}} type="submit">Submit</button>
                    </form>
                } */}
                {
                    <ModalComponent open={openGroupAddForm} onClose={closeAddGroupModal} children={<form style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }} onSubmit={handleAddGroup}>
                        <input className="expense-form-input" placeholder="Enter group name here " name="groupTitle" value={groupData.groupTitle} onChange={handleChange} />
                        <button className="expense-form-submit" type="submit">Submit</button>
                    </form>} />
                }

                <div className="group-list">
                    {groups.map((group) => (
                        <li className="group-card" key={group.groupId} onClick={() => showGroupDetail(group.groupId)} style={{ border: group.groupId === selectGroup ? "1.5px solid blue" : null }}>
                            <div className="group-info">
                                <h2 className="group-title">{group.groupTitle}</h2>
                                <p className="group-meta">{group.members}</p>
                            </div>

                            <div className={`group-balance group-balance-${group.type}`}>
                                <span className="group-balance-label">Balance</span>
                                <span className="group-balance-amount">{group.balance}</span>
                            </div>
                        </li>
                    ))}
                </div>
                <button className="create-group-btn" type="button" onClick={openGroupForm}>
                        <span
                            className="create-group-icon"
                            style={{ "--create-group-icon": `url(${plusIcon})` }}
                            aria-hidden="true"
                        />
                        Create Group
                    </button>

            </div>
            {/* <main className="group-detail-panel">
                <Outlet />
            </main> */}
            {
                selectGroup && <GroupDetail groupDetail={groupDetail} ownerId={userId} handleAddMember={addMembersToGroup} addExpense={addExpense} />
            }
        </section>
    );
}
