import { useState } from "react";

// Logo Component
function Logo() {
  return <h1>My Travel List</h1>;
}

// Form Component
function Form({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description.trim()) {
      alert("Please enter an item description.");
      return;
    }

    const newItem = { id: Date.now(), description, quantity, packed: false };
    onAddItem(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need to pack?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}

// Item Component
function Item({ item, onTogglePacked, onDeleteItem }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => onTogglePacked(item.id)}
      />
      <span
        style={{
          textDecoration: item.packed ? "line-through" : "none",
        }}
      >
        {item.description} - Quantity: {item.quantity}
      </span>
      <button
        style={{
          marginLeft: "10px",
          backgroundColor: "red",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "30px",
          height: "30px",
          fontSize: "16px",
          cursor: "pointer",
          textAlign: "center",
          lineHeight: "30px",
        }}
        onClick={() => onDeleteItem(item.id)}
      >
        X
      </button>
    </li>
  );
}

// PackingList Component
function PackingList({ items, onTogglePacked, onDeleteItem }) {
  // Separate items into packed and unpacked groups
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
            onTogglePacked={onTogglePacked}
            onDeleteItem={onDeleteItem}
          />
        ))}
      </ul>
      <h2>Packed Items</h2>
      <ul>
        {packedItems.map((item) => (
          <Item
            key={item.id}
            item={item}
            onTogglePacked={onTogglePacked}
            onDeleteItem={onDeleteItem}
          />
        ))}
      </ul>
    </div>
  );
}

// Stats Component
function Stats({ items }) {
  const totalItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const percentage = totalItems > 0 ? Math.round((packedItems / totalItems) * 100) : 0;

  return (
    <footer className="stats">
      <em>
        You have {totalItems} items on your list, and {packedItems} packed (
        {percentage}%).
      </em>
    </footer>
  );
}

// App Component
function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(newItem) {
    setItems((prevItems) => [...prevItems, newItem]);
  }

  function handleTogglePacked(itemId) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleDeleteItem(itemId) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList
        items={items}
        onTogglePacked={handleTogglePacked}
        onDeleteItem={handleDeleteItem}
      />
      <Stats items={items} />
    </div>
  );
}

export default App;
