function Stats({ items }) {
  const totalItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const percentagePacked = totalItems
    ? Math.round((packedItems / totalItems) * 100)
    : 0;

  return (
    <footer className="stats">
      <em>
        {totalItems === 0
          ? "Start adding items to your list!"
          : percentagePacked === 100
          ? "You got everything!"
          : `You have ${totalItems} items on your list, and ${packedItems} packed (${percentagePacked}%).`}
      </em>
    </footer>
  );
}

export default Stats;
