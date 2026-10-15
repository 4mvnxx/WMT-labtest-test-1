import { useEffect, useState } from "react";
import { getItems, createItem, updateItem, deleteItem } from "./api";

// TODO (TASK 1): add your new fields (price, category) to this empty form
const emptyForm = { name: "", description: "" , price: "", category: "" };



export default function App() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setItems(await getItems());
    } catch {
      setError("Cannot reach backend. Check the API URL.");
    }
  };
  useEffect(() => { load(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) await updateItem(editId, form);
    else await createItem(form);
    setForm(emptyForm);
    setEditId(null);
    load();
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    // TODO (TASK 1): copy your new fields here too
    setForm({ name: item.name, price: item.price, category: item.category });
  };

  const handleDelete = async (id) => {
    await deleteItem(id);
    load();
  };

  return (
    <div className="container">
      <h1>Item Manager</h1>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <input name="price" placeholder="Price" value={form.price} onChange={handleChange} />
        <input name="category" placeholder="Category" value={form.categor} onChange={handleChange} />
        {/* TODO (TASK 1): add inputs for price and category */}
        <button type="submit">{editId ? "Update" : "Add"} Item</button>
        {editId && <button type="button" onClick={() => { setEditId(null); setForm(emptyForm); }}>Cancel</button>}
      </form>

      <ul>
        {items.map((item) => (
          <li key={item._id}>
            <div>
              <strong>{item.name}</strong>
              <p>{item.description}</p>
              <p>{item.price}</p>
              <p>{item.category}</p>
            </div>
            <div>
              <button onClick={() => handleEdit(item)}>Edit</button>
              <button onClick={() => handleDelete(item._id)}>Delete</button>
            </div>
          </li>
        ))}
        {items.length === 0 && <p>No items yet.</p>}
      </ul>
    </div>
  );
}
