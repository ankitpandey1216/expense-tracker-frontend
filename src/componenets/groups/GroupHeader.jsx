export default function GroupHeader({ title }) {
  return (
    <header className="group-detail-header">
      <div>
        <p className="group-detail-eyebrow">Group</p>
        <h1>{title}</h1>
      </div>
    </header>
  );
}
