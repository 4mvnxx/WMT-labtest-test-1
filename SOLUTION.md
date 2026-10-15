# Solutions (try first, peek after!)

## backend/models/Item.js
    price: { type: Number, default: 0 },
    category: { type: String, default: "" },

## backend/routes/items.js  (POST and PUT)
    const { name, description, price, category } = req.body;
    Item.create({ name, description, price, category })
    findByIdAndUpdate(req.params.id, { name, description, price, category }, ...)

## backend/routes/items.js  (new DELETE route, put above module.exports)
    router.delete("/:id", async (req, res) => {
      try {
        const item = await Item.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ message: "Item not found" });
        res.json({ message: "Item deleted" });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });

## frontend/src/App.jsx
    const emptyForm = { name: "", description: "", price: "", category: "" };
    // handleEdit:
    setForm({ name: item.name, description: item.description, price: item.price, category: item.category });
    // inputs:
    <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} />
    <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
    // list display:
    <p>Price: {item.price} | Category: {item.category}</p>
