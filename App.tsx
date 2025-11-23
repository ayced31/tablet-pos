import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Trash2, ShoppingBag } from "lucide-react-native";

// Components
import { CategoryFilter } from "./src/components/CategoryFilter";
import { ProductCard } from "./src/components/ProductCard";
import { ItemModal } from "./src/components/ItemModal";
import { CartItem } from "./src/components/CartItem";

// Data & Types
import { CATEGORIES, PRODUCTS } from "./src/data/data";
import { Product } from "./src/types";
import { useCartStore } from "./src/store/useCartStore";

export default function App() {
  // --- STATE ---
  const [activeCategory, setActiveCategory] = useState<string>(
    CATEGORIES[0].id
  );
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // --- STORE (Zustand) ---
  // Get cart state and actions
  const { cart, updateQuantity, removeFromCart, clearCart } = useCartStore();

  // --- CALCULATIONS (Derived State) ---
  // Recalculate totals whenever the cart changes
  const { subtotal, tax, total } = useMemo(() => {
    const sub = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tx = sub * 0.1; // 10% Tax
    return {
      subtotal: sub,
      tax: tx,
      total: sub + tx,
    };
  }, [cart]);

  // --- HANDLERS ---
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => p.categoryId === activeCategory);
  }, [activeCategory]);

  const handleProductPress = (product: Product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedProduct(null);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-black flex-row">
        <StatusBar hidden />

        {/* ============================================================
            LEFT COLUMN: THE CART (Completed Phase 4)
           ============================================================ */}
        <View className="w-[35%] bg-zinc-900 border-r border-zinc-800 flex-1">
          {/* Cart Header */}
          <View className="p-4 border-b border-zinc-800 flex-row justify-between items-center">
            <View>
              <Text className="text-white text-2xl font-bold">
                Current Order
              </Text>
              <Text className="text-gray-500 text-sm">Order #001</Text>
            </View>

            {/* Clear Cart Button (Only shows if cart has items) */}
            {cart.length > 0 && (
              <TouchableOpacity
                onPress={clearCart}
                className="p-2 bg-zinc-800 rounded-lg"
              >
                <Trash2 color="#ef4444" size={20} />
              </TouchableOpacity>
            )}
          </View>

          {/* Cart List */}
          <View className="flex-1 p-2">
            {cart.length === 0 ? (
              <View className="flex-1 justify-center items-center opacity-40">
                <ShoppingBag size={48} color="#fff" />
                <Text className="text-gray-400 mt-2 text-lg">No items yet</Text>
              </View>
            ) : (
              <FlatList
                data={cart}
                keyExtractor={(item) => item.id + item.notes} // Unique key even for same items with diff notes
                renderItem={({ item }) => (
                  <CartItem
                    item={item}
                    onIncrease={() => updateQuantity(item.id, 1)}
                    onDecrease={() => {
                      if (item.quantity === 1) {
                        removeFromCart(item.id);
                      } else {
                        updateQuantity(item.id, -1);
                      }
                    }}
                    onRemove={() => removeFromCart(item.id)}
                  />
                )}
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
              />
            )}
          </View>

          {/* Calculation Footer */}
          <View className="bg-zinc-850 p-4 border-t border-zinc-800">
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-400">Subtotal</Text>
              <Text className="text-white font-medium">
                ${subtotal.toFixed(2)}
              </Text>
            </View>
            <View className="flex-row justify-between mb-4">
              <Text className="text-gray-400">Tax (10%)</Text>
              <Text className="text-white font-medium">${tax.toFixed(2)}</Text>
            </View>

            <View className="border-t border-zinc-700 my-2" />

            <View className="flex-row justify-between mb-4 items-center">
              <Text className="text-gray-300 text-lg font-bold">Total</Text>
              <Text className="text-white text-2xl font-bold">
                ${total.toFixed(2)}
              </Text>
            </View>

            <TouchableOpacity
              className={`py-4 rounded-xl items-center ${
                cart.length === 0 ? "bg-zinc-700" : "bg-blue-600"
              }`}
              disabled={cart.length === 0}
            >
              <Text className="text-white font-bold text-lg">
                {cart.length === 0
                  ? "Add Items to Pay"
                  : `Pay $${total.toFixed(2)}`}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ============================================================
            RIGHT COLUMN: THE MENU (Same as Phase 2)
           ============================================================ */}
        <View className="w-[65%] bg-black pt-4 px-4">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-white text-3xl font-bold">Menu</Text>
            <View className="bg-zinc-800 px-4 py-2 rounded-full">
              <Text className="text-gray-300 font-medium">
                {filteredProducts.length} Items
              </Text>
            </View>
          </View>

          <CategoryFilter
            categories={CATEGORIES}
            activeCategoryId={activeCategory}
            onSelectCategory={setActiveCategory}
          />

          <FlatList
            key={activeCategory}
            data={filteredProducts}
            renderItem={({ item }) => (
              <ProductCard product={item} onPress={handleProductPress} />
            )}
            keyExtractor={(item) => item.id}
            numColumns={3}
            contentContainerStyle={{ paddingBottom: 20 }}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* MODAL LAYER */}
        <ItemModal
          product={selectedProduct}
          isVisible={isModalVisible}
          onClose={handleCloseModal}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
