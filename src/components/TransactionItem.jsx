export default function TransactionItem({ amount, title, date }) {
  return (
    <div className="transaction">
      <div>
        <h4>{amount}</h4>
        <p>{title}</p>
      </div>
      <span className="date">{date}</span>
    </div>
  );
}
