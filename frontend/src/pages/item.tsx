import React, { useState, useEffect } from "react";
import axios from "axios";

interface StockItem {
  _id?: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  category: string;
}

const StockManagement: React.FC = () => {
  const [stockItems, setStockItems] = useState<StockItem[]>([]);
  const [formData, setFormData] = useState<Omit<StockItem, "_id">>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    image: "",
    category: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // 🔹 Fetch Stock Items from Backend
  useEffect(() => {
    const fetchStockItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/items");
        setStockItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchStockItems();
  }, []);

  // 🔹 Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Handle Image Selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  // 🔹 Handle Form Submission (Upload to Backend)
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!formData.name || !formData.category || !formData.price || !formData.stock) {
    alert("Please fill in all required fields!");
    return;
  }

  const token = localStorage.getItem("token"); // Get auth token

  const formDataToSend = new FormData();
  formDataToSend.append("name", formData.name);
  formDataToSend.append("description", formData.description);
  formDataToSend.append("price", formData.price.toString());
  formDataToSend.append("category", formData.category);
  formDataToSend.append("stock", formData.stock.toString());

  if (selectedFile) {
    formDataToSend.append("image", selectedFile);
  }

  try {
    const response = await axios.post("http://localhost:5000/api/items", formDataToSend, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`, // Include authentication token
      },
    });

    setStockItems([...stockItems, response.data]); // Update UI with new item
    setFormData({ name: "", description: "", price: 0, stock: 0, image: "", category: "" });
    setSelectedFile(null);
  } catch (error) {
    console.error("Error adding item:", error);
    alert("Failed to add item. Please try again.");
  }
};

const handleDelete = async (itemId: string) => {
  if (!window.confirm("Are you sure you want to delete this item?")) return;

  console.log("Deleting item with ID:", itemId); // Debugging

  const token = localStorage.getItem("token");
  if (!token) {
    alert("No token found! Please log in again.");
    return;
  }

  try {
    const response = await axios.delete(`http://localhost:5000/api/items/${itemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Delete Response:", response.data);

    setStockItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
  } catch (error) {
    console.error("Error deleting item:", error);

    if (axios.isAxiosError(error)) {
      alert(error.response?.data?.error || "Failed to delete item.");
    } else {
      alert("Failed to delete item. Please try again.");
    }
  }
};



  return (
    <div className="min-h-screen p-20 bg-gray-50 flex flex-col items-center">
      {/* Summary Section */}
      <div className="w-full max-w-4xl bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-xl shadow-xl flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold">Total Stock Items: {stockItems.length}</h3>
          <h4 className="text-lg">Total Value: Rs.{stockItems.reduce((sum, item) => sum + item.price * item.stock, 0).toFixed(2)}</h4>
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
            <input type="number" name="stock" placeholder="Stock Quantity" value={formData.stock} onChange={handleChange} className="w-full p-3 border rounded-lg" required />
            <select name="category" value={formData.category} onChange={handleChange} className="w-full p-3 border rounded-lg" required>
              <option value="">Select Category</option>
              <option value="Coffee">Coffee</option>
              <option value="Chocalate">Chocalate</option>
              <option value="Cake">Cake</option>
              <option value="Soft Drinks">Soft Drinks</option>
              <option value="Bun">Bun</option>
              <option value="Side Dishes">Side Dishes</option>
            </select>
          </div>
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full p-3 border rounded-lg" />
          <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-3 border rounded-lg" />
          {formData.image && <img src={formData.image} alt="Preview" className="w-32 h-32 mx-auto mt-2 rounded-lg shadow-md" />}
          <button type="submit" className="w-full bg-yellow-500 text-white p-3 rounded-lg hover:bg-yellow-600 transition">Add Stock Item</button>
        </form>
      </div>

      {/* Stock Items Table */}
      <div className="mt-10 max-w-5xl w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800 text-center">Stock Items</h3>
        {stockItems.length === 0 ? (
          <p className="text-gray-600 text-center">No stock items added yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white border-gray-300 rounded-lg shadow-lg">
              <thead>
                <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
                  <th className="p-4 border">Image</th>
                  <th className="p-4 border">Name</th>
                  <th className="p-4 border">Category</th>
                  <th className="p-4 border">Price</th>
                  <th className="p-4 border">Stock</th>
                </tr>
              </thead>
              <tbody>
                {stockItems.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="p-4 border">{item.image && <img src={`http://localhost:5000/uploads/${item.image}`} alt={item.name} className="w-16 h-16 rounded-lg shadow-md" />}</td>
                    <td className="p-4 border text-center">{item.name}</td>
                    <td className="p-4 border text-center">{item.category}</td>
                    <td className="p-4 border text-center">Rs.{item.price.toFixed(2)}</td>
                    <td className="p-4 border text-center">{item.stock}</td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleDelete(item._id!)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
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
