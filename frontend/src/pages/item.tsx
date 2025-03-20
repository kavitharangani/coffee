import React, { useState, useEffect } from "react";

interface StockItem {
  name: string;
  description: string;
  price: number;
  qty: number;
  image: string | File;
  category: string;
}

const StockManagement: React.FC = () => {
  const [stockItems, setStockItems] = useState<StockItem[]>([]);
  const [formData, setFormData] = useState<StockItem>({
    name: "",
    description: "",
    price: 0,
    qty: 0,
    image: "",
    category: "",
  });

  // Fetch all stock items on component mount
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch("/api/items");
      const data = await response.json();
      setStockItems(data);
    } catch (error) {
      console.error("Error fetching stock items:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.category || !formData.price || !formData.qty) {
      alert("Please fill in all required fields!");
      return;
    }
  
    // Create a new FormData object for image upload
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price.toString());
    data.append("category", formData.category);
    data.append("stock", formData.qty.toString());
  
    if (formData.image) {
      data.append("image", formData.image); // Send the image file
    }
  
    try {
      const response = await fetch(`http://localhost:5000/api/items`, {
        method: "POST",
        body: data,
      });
  
      const newItem = await response.json();
      setStockItems((prev) => [...prev, newItem]); // Add new item to the stockItems state
      setFormData({ name: "", description: "", price: 0, qty: 0, image: "", category: "" }); // Reset the form
    } catch (error) {
      console.error("Error adding stock item:", error);
    }
  };
  

  return (
    <div className="min-h-screen p-20 bg-gray-50 flex flex-col items-center">
      {/* Summary Section */}
      <div className="w-full max-w-4xl bg-gradient-to-r bg-[#FFB22C] text-white p-6 rounded-xl shadow-xl flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold">Total Stock Items: {stockItems.length}</h3>
          <h4 className="text-lg">Total Value: ${stockItems.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2)}</h4>
        </div>
        <span className="text-6xl">📦</span>
      </div>

      {/* Form Section */}
      <div className="max-w-3xl w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Stock Management</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" name="name" placeholder="Stock Name" value={formData.name} onChange={handleChange} className="w-full p-3 border rounded-lg" required />
            <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="w-full p-3 border rounded-lg" required />
            <input type="number" name="qty" placeholder="Quantity" value={formData.qty} onChange={handleChange} className="w-full p-3 border rounded-lg" required />
            <select name="category" value={formData.category} onChange={handleChange} className="w-full p-3 border rounded-lg" required>
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Groceries">Groceries</option>
              <option value="Clothing">Clothing</option>
            </select>
          </div>
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full p-3 border rounded-lg" />
          <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-3 border rounded-lg" />
          {formData.image instanceof File && <img src={URL.createObjectURL(formData.image)} alt="Preview" className="w-32 h-32 mx-auto mt-2 rounded-lg shadow-md" />}
          <button type="submit" className="w-full bg-[#FFB22C] text-white p-3 rounded-lg transition">Add Stock Item</button>
        </form>
      </div>

      {/* Stock Items Table */}
      <div className="mt-10 max-w-5xl w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800 text-center">Stock Items</h3>
        {stockItems.length === 0 ? (
          <p className="text-gray-600 text-center">No stock items added yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white border border-gray-300 rounded-lg shadow-lg">
              <thead>
                <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
                  <th className="p-4 border">Image</th>
                  <th className="p-4 border">Name</th>
                  <th className="p-4 border">Category</th>
                  <th className="p-4 border">Price</th>
                  <th className="p-4 border">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {stockItems.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-4 border">{item.image && <img src={`/uploads/${item.image}`} alt={item.name} className="w-16 h-16 rounded-lg shadow-md" />}</td>
                    <td className="p-4 border text-center">{item.name}</td>
                    <td className="p-4 border text-center">{item.category}</td>
                    <td className="p-4 border text-center">${item.price.toFixed(2)}</td>
                    <td className="p-4 border text-center">{item.qty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockManagement;
