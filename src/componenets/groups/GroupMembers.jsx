import AddMember from "./AddMember";

export default function GroupMembers({ members=[], ownerId, handleAddMember }) {
  return (
    <section className="group-detail-section">
      <div style={{display: "flex",justifyContent: "space-between"}}>
        <h2>Members</h2>
      </div>

      <div className="member-list">
        {Array.isArray(members) && members.map((member) => (
          <div className="member-chip" key={member.userId}>
            <span className="member-avatar">{member.userName.charAt(0)}</span>
            <span>{member.userId === ownerId ? "You" : member?.userName}</span>
          </div>
        ))}
      </div>
      <AddMember ownerId={ownerId} exitingMembers={members} handleAddMember={handleAddMember}/>
    </section>
  );
}
