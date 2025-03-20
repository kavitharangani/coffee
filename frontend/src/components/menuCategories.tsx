import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";

// Import images
import drinksImage from "../../public/img/icons8-fruit-juice-64.png";
import coffeeImage from "../../public/img/hot-coffee-rounded-cup-on-a-plate-from-side-view.png";

const categories = [
  { id: 1, label: "Drinks" as keyof typeof menuItems, image: drinksImage },
  { id: 2, label: "Coffee" as keyof typeof menuItems, image: coffeeImage },
];

const sizes = ["S", "M", "L"];

const menuItems = {
  Drinks: Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    image: drinksImage,
    label: `Drink ${i + 1}`,
    price: 1.5,
  })),
  Coffee: Array.from({ length: 10 }, (_, i) => ({
    id: i + 11,
    image: coffeeImage,
    label: `Coffee ${i + 1}`,
    price: 2,
  })),
};

const Menu = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] =
    useState<keyof typeof menuItems>("Drinks");
  const [cart, setCart] = useState<
    {
      id: number;
      image: string;
      label: string;
      price: number;
      size: string;
      quantity: number;
      finalPrice: string;
    }[]
  >([]);
  const [selectedSize, setSelectedSize] = useState<{ [key: number]: string }>(
    {}
  );
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out" });

    // Load cart data from localStorage if available
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: {
    id: number;
    price: number;
    image: string;
    label: string;
  }) => {
    const size = selectedSize[item.id] || "M";
    const quantity = quantities[item.id] || 1;
    const priceMultiplier = size === "S" ? 0.8 : size === "L" ? 1.2 : 1;
    const finalPrice = (item.price * priceMultiplier * quantity).toFixed(2);

    setCart((prevCart) => [
      ...prevCart,
      { ...item, size, quantity, finalPrice },
    ]);
  };

  const removeFromCart = (itemId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const totalPrice = cart.reduce(
    (total, item) => total + parseFloat(item.finalPrice),
    0
  );

  return (
    <div className="text-center py-10">
      <div className="text-center mb-20">
        <h1
          style={{ fontFamily: "Pacifico, Sriracha, cursive" }}
          className="text-5xl font-bold text-gray-800"
        >
          Menu Categories{" "}
        </h1>
      </div>
      <div className="flex justify-center gap-8 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.label)}
            className="p-3 bg-yellow-500 hover:bg-yellow-400 text-white rounded-lg"
          >
            <img
              src={category.image}
              alt={category.label}
              className="w-10 h-10 mb-2"
            />
            <p>{category.label}</p>
          </button>
        ))}
      </div>

      <div className="flex justify-center gap-20 flex-wrap">
        {menuItems[selectedCategory]?.map((item) => {
          // Check if the item is already in the cart
          const isItemInCart = cart.some((cartItem) => cartItem.id === item.id);

          return (
            <div
              key={item.id}
              className="flex flex-col items-center"
              data-aos="zoom-in-up"
            >
              <img src={item.image} alt={item.label} className="w-20 h-20" />
              <p className="mt-2 text-lg font-medium">{item.label}</p>
              <p className="text-sm font-semibold text-gray-700">
                ${item.price.toFixed(2)}
              </p>

              <select
                onChange={(e) =>
                  setSelectedSize({
                    ...selectedSize,
                    [item.id]: e.target.value,
                  })
                }
                className="mt-2 p-2 border rounded"
              >
                {sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>

              <input
                type="number"
                min="1"
                value={quantities[item.id] || 1}
                onChange={(e) =>
                  setQuantities({
                    ...quantities,
                    [item.id]: Number(e.target.value),
                  })
                }
                className="mt-2 p-2 border rounded w-16 text-center"
              />

              {!isItemInCart && (
                <button
                  onClick={() => addToCart(item)}
                  className="mt-4 p-2 bg-green-500 hover:bg-green-400 text-white rounded-lg"
                >
                  Add
                </button>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-10 flex justify-center">
        <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
            🛒 Your Cart
          </h2>
          {cart.length > 0 ? (
            <ul className="space-y-4">
              {cart.map((cartItem, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={cartItem.image}
                      alt={cartItem.label}
                      className="w-12 h-12 rounded-md"
                    />
                    <div>
                      <p className="font-semibold text-gray-700">
                        {cartItem.label} ({cartItem.size})
                      </p>
                      <p className="text-gray-500 text-sm">
                        Qty: {cartItem.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => removeFromCart(cartItem.id)}
                      className="text-red-600 hover:text-red-500"
                    >
                      Remove
                    </button>
                    <p className="text-green-600 font-bold">
                      ${parseFloat(cartItem.finalPrice).toFixed(2)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center">Your cart is empty.</p>
          )}
          <div className="mt-6 flex justify-between text-lg font-semibold text-gray-800">
            <p>Total:</p>
            <p className="text-green-600">${totalPrice.toFixed(2)}</p>
          </div>
          {cart.length > 0 && (
            <button
              onClick={() => navigate("/payment")}
              className="mt-6 w-full p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg"
            >
              Proceed to Payment
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
