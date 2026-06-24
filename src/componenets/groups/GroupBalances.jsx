export default function GroupBalances({ balances }) {
  console.log("Inside balance : ",balances);
  return (
    <section className="group-detail-section">
      <h2>Balances</h2>

      <div className="balance-list">
        {balances?.youOwe.map((balance) => (
          <div className="balance-row" key={balance?.userName}>
            <div>
              <p className="balance-status">You Owe</p>
              <p className="balance-name">{balance?.userName}</p>
             
            </div>

            <span className="balance-amount balance-negative">
              ₹{balance?.amount}
            </span>
          </div>
        ))}
        {balances?.youAreOwed.map((balance) => (
          <div className="balance-row" key={balance?.userName}>
            <div>
              
              <p className="balance-name">{balance?.userName}</p>
              <p className="balance-status">Owes you</p>
             
            </div>

            <span className="balance-amount balance-positive">
              ₹{balance?.amount}
            </span>
          </div>
        ))}
        {
          balances?.youOwe.length === 0 && balances?.youAreOwed.length === 0 && <p className="group-empty-state">No balances to show</p>
        }
      </div>
    </section>
  );
}
