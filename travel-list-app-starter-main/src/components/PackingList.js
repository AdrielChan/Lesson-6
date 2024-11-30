import Item from "./Item";

function PackingList({ items, onDeleteItem, onUpdateItem }) {
  const packedItems = items.filter((item) => item.packed);
  const unpackedItems = items.filter((item) => !item.packed);

  return (
    <div className="list">
      <h2>Unpacked Items</h2>
      <ul>
        {unpackedItems.map((item) => (
          <Item
            key={item.id}
            item={item}
            onDeleteItem={onDeleteItem}
            onUpdateItem={onUpdateItem}
          />
        ))}
      </ul>
      <h2>Packed Items</h2>
      <ul>
        {packedItems.map((item) => (
          <Item
            key={item.id}
            item={item}
            onDeleteItem={onDeleteItem}
            onUpdateItem={onUpdateItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default PackingList;
