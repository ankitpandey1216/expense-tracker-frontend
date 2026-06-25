import { useEffect, useMemo, useState } from "react";
import useDebounce from "../../customHooks/useDebounce";
import { userApi } from "../../services/userService";

export default function AddMember({ ownerId, exitingMembers, handleAddMember }) {
    const [memberName, setMemberName] = useState("");
    const [suggestedMember, setSuggestedMember] = useState([]);
    const [selectedMemberIds, setSelectedMemberIds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const debouncedValue = useDebounce(memberName, 800);

    const handleInputChange = (e) => {
        setMemberName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(selectedMemberIds.length > 0){
            handleAddMember(selectedMemberIds);
            setSuggestedMember([]);
            setMemberName("");
        }
        
    };

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSuggestedMember([]);
            setError(null);
            return;
        }

        const searchMembers = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await userApi.get(`/search?query=${debouncedValue}`);
                setSuggestedMember(response?.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        searchMembers();
    }, [debouncedValue]);

    const handleMemberSelection = (memberId) => {
        setSelectedMemberIds((prev) => {
            const alredySelected = prev.some((m) => m === memberId);
            const alreadyMember = exitingMembers.some((m) => m.userId === memberId);
            if (alredySelected || alreadyMember) {
                return prev.filter(
                    (m) => m !== memberId
                );
            }

            return [...prev, memberId];
        })
    }

    const members = useMemo(() => {
        const alreadyMembers = new Set(exitingMembers.map(member => member.userId));
        return suggestedMember.filter((member) => !alreadyMembers.has(member.userId));
    }, [exitingMembers, suggestedMember])

    return (
        <div className="add-member">
            <form className="add-member-form" onSubmit={handleSubmit}>
                <input
                    className="add-member-input"
                    type="text"
                    placeholder="Enter member name"
                    aria-label="Member name"
                    value={memberName}
                    onChange={handleInputChange}
                />
                <button className="add-member-btn" type="submit" disabled={selectedMemberIds.length === 0} style={{ opacity: selectedMemberIds.length === 0 ? 0.5 : 1 }}>
                    Add Members
                </button>
            </form>

            {(!loading && !error && members.length > 0) && (
                <ul className="add-member-suggestion-container">
                    {
                        members.map((member) => {
                            return (
                                <li className="add-member-suggestion" key={member?.userId}>
                                    <span>
                                        <span><input type="checkbox" checked={selectedMemberIds.includes(member.userId)} onChange={() => handleMemberSelection(member.userId)} /></span>
                                        <span className="add-member-suggestion-name" style={{ marginLeft: "1rem" }}>{member?.userName}</span>
                                    </span>
                                    <span className="add-member-suggestion-email">{member?.email}</span>
                                </li>
                            );
                        })}
                </ul>
            )}
        </div>
    );
}
