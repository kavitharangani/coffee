const express = require("express");
const Item = require("../models/Item");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

/** 
 * @desc Create a new item with an image
 * @route POST /api/items
 * @access Private (Admin Only)
 */
router.post("/", authMiddleware, adminMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    const image = req.file ? req.file.filename : null; // Get uploaded image filename

    const newItem = new Item({ name, description, price, category, stock, image });
    await newItem.save();

    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/** 
 * @desc Get all items
 * @route GET /api/items
 * @access Public
 */
router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/** 
 * @desc Get a single item by ID
 * @route GET /api/items/:id
 * @access Public
 */
router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });

    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/** 
 * @desc Update an item (with optional image)
 * @route PUT /api/items/:id
 * @access Private (Admin Only)
 */
router.put("/:id", authMiddleware, adminMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    const image = req.file ? req.file.filename : undefined; // Update image only if new file uploaded

    let item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });

    item.name = name || item.name;
    item.description = description || item.description;
    item.price = price || item.price;
    item.category = category || item.category;
    item.stock = stock !== undefined ? stock : item.stock;
    if (image) item.image = image;

    await item.save();
    res.json({ message: "Item updated successfully", item });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/** 
 * @desc Delete an item
 * @route DELETE /api/items/:id
 * @access Private (Admin Only)
 */
router.delete("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });

    await item.deleteOne();
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
