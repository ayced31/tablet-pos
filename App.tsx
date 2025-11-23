import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {
  Plus,
  ChevronDown,
  Tag,
  Send,
  ShoppingBag,
  LayoutGrid,
  Search,
  Settings,
  CalendarDays,
  List,
} from "lucide-react-native";

// Components
import { Navbar } from "./src/components/Navbar";
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
  const { cart, updateQuantity, removeFromCart } = useCartStore();

  // --- CALCULATIONS (Derived State) ---
  const { subtotal, tax, total } = useMemo(() => {
    const sub = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tx = sub * 0.1;
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

  // Get existing quantity in cart for selected product
  const getExistingQuantity = (productId: string): number => {
    const existingItem = cart.find((item) => item.id === productId);
    return existingItem ? existingItem.quantity : 1;
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-app-bg">
        <StatusBar hidden />

        <Navbar />

        {/* CART SECTION */}
        <View className="flex-1 flex-row">
          <View className="w-[35%] h-full bg-app-bg border-r border-zinc-800">
            {/* Customer & Order Type Section */}
            <View className="flex-row px-4 py-3">
              {/* Customer */}
              <View className="flex-1 mr-3">
                <Text className="text-gray-500 text-xs mb-1 text-center">
                  Customer
                </Text>
                <TouchableOpacity className="border border-dashed border-zinc-600 rounded-lg py-2 px-3 flex-row items-center justify-center">
                  <Plus color="#9ca3af" size={14} />
                  <Text className="text-gray-400 text-sm ml-1">
                    Add Customer
                  </Text>
                </TouchableOpacity>
              </View>
              {/* Order Type */}
              <View className="flex-1">
                <Text className="text-gray-500 text-xs mb-1 text-center">
                  Order Type
                </Text>
                <TouchableOpacity className="flex-row items-center justify-between bg-zinc-800 px-3 py-2 rounded-lg">
                  <Text className="text-white text-sm">Takeaway</Text>
                  <ChevronDown color="#9ca3af" size={14} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Order ID */}
            <Text className="text-gray-600 text-xs px-4 pb-2">
              order_1763661833981
            </Text>

            {/* Cart Title with Item Count */}
            <View className="px-4 py-2 flex-row justify-between items-center">
              <View>
                <Text className="text-white text-lg font-bold">Cart</Text>
                <View className="w-8 h-0.5 bg-blue-500 mt-1" />
              </View>
              <View className="bg-zinc-800 px-3 py-1 rounded-full">
                <Text className="text-gray-400 text-sm">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)} Items
                </Text>
              </View>
            </View>

            {/* Course Badge & Status */}
            {cart.length > 0 && (
              <View className="px-4 py-1 flex-row items-center justify-between">
                <View className="bg-zinc-800 px-2 py-0.5 rounded-full">
                  <Text className="text-gray-400 text-xs">Course 1</Text>
                </View>
                <View className="flex-row items-center">
                  <View className="bg-red-900/50 px-2 py-0.5 rounded-full mr-1">
                    <Text className="text-red-400 text-xs">Unpaid</Text>
                  </View>
                  <View className="bg-blue-900/50 px-2 py-0.5 rounded-full mr-1">
                    <Text className="text-blue-400 text-xs">Building</Text>
                  </View>
                  <View className="bg-green-900/50 px-2 py-0.5 rounded-full">
                    <Text className="text-green-400 text-xs">Opened</Text>
                  </View>
                </View>
              </View>
            )}

            {/* Cart List */}
            <View className="flex-1 px-4 py-2">
              {cart.length === 0 ? (
                <View className="flex-1 justify-center items-center opacity-40">
                  <ShoppingBag size={48} color="#fff" />
                  <Text className="text-gray-400 mt-2 text-lg">
                    No items yet
                  </Text>
                </View>
              ) : (
                <FlatList
                  data={cart}
                  keyExtractor={(item) => item.id + item.notes}
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
            <View className="bg-app-bg px-4 py-3">
              <View className="flex-row justify-between mb-1">
                <Text className="text-gray-400 text-sm">Subtotal</Text>
                <Text className="text-white text-sm">
                  ${subtotal.toFixed(2)}
                </Text>
              </View>
              <View className="flex-row justify-between mb-1">
                <Text className="text-gray-400 text-sm">Tax</Text>
                <Text className="text-white text-sm">${tax.toFixed(2)}</Text>
              </View>
              <View className="flex-row justify-between mb-1">
                <Text className="text-gray-400 text-sm">Voucher</Text>
                <Text className="text-white text-sm">$0.00</Text>
              </View>

              <View className="flex-row justify-between mb-3 items-center">
                <Text className="text-white font-bold">Total</Text>
                <Text className="text-white font-bold">
                  ${total.toFixed(2)}
                </Text>
              </View>

              {/* Action Buttons Row */}
              <View className="flex-row mb-3 justify-between border-b border-zinc-800 pb-3">
                <TouchableOpacity className="flex-row items-center bg-zinc-800 px-3 py-2 rounded-lg border border-zinc-700">
                  <Tag color="#9ca3af" size={14} />
                  <Text className="text-gray-300 text-sm ml-1">Discounts</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center bg-zinc-900 px-3 py-2 rounded-lg border border-zinc-700">
                  <Text className="text-gray-300 text-sm">
                    Send to Kitchen (
                    {cart.reduce((sum, item) => sum + item.quantity, 0)})
                  </Text>
                  <Send color="#9ca3af" size={14} style={{ marginLeft: 4 }} />
                </TouchableOpacity>
              </View>

              {/* Pay Buttons Row */}
              <View className="flex-row">
                <TouchableOpacity className="flex-1 bg-zinc-800 py-3 rounded-lg mr-2 border border-zinc-700 items-center">
                  <Text className="text-white font-medium">More</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`flex-1 py-3 rounded-lg items-center ${
                    cart.length === 0 ? "bg-zinc-700" : "bg-blue-600"
                  }`}
                  disabled={cart.length === 0}
                >
                  <Text className="text-white font-bold">
                    Pay ${total.toFixed(2)}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* MENU SECTION */}
          <View className="w-[65%] h-full bg-app-bg">
            {/* Order Line Header */}
            <View className="flex-row justify-between items-center px-4 py-3 border-b border-zinc-800">
              <Text className="text-white text-lg font-medium">Order Line</Text>
              <ChevronDown color="#9ca3af" size={20} />
            </View>

            {/* Menu Tab & Toolbar Row */}
            <View className="flex-row justify-between items-center px-4 py-3">
              {/* Left: Menu Tab with Order Type */}
              <View className="flex-row items-center">
                <Text className="text-white font-bold mr-3">Menu</Text>
                <View className="bg-zinc-800 px-3 py-1 rounded flex-row items-center">
                  <Text className="text-white text-sm">Order Type: </Text>
                  <Text className="text-blue-400 text-sm">Takeaway</Text>
                </View>
              </View>

              {/* Right: Icon Toolbar */}
              <View className="flex-row items-center">
                <TouchableOpacity className="w-10 h-10 bg-zinc-800 rounded-lg justify-center items-center mr-2 border border-blue-900">
                  <LayoutGrid color="#fff" size={18} />
                </TouchableOpacity>
                <TouchableOpacity className="w-10 h-10 bg-zinc-800 rounded-lg justify-center items-center mr-2">
                  <Search color="#9ca3af" size={18} />
                </TouchableOpacity>
                <TouchableOpacity className="w-10 h-10 bg-zinc-800 rounded-lg justify-center items-center mr-2">
                  <Settings color="#9ca3af" size={18} />
                </TouchableOpacity>
                <TouchableOpacity className="w-10 h-10 bg-zinc-800 rounded-lg justify-center items-center mr-2">
                  <CalendarDays color="#9ca3af" size={18} />
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center bg-zinc-800 px-3 py-2 rounded-lg">
                  <List color="#9ca3af" size={16} />
                  <Text className="text-gray-300 text-sm ml-2">Orders</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center bg-zinc-800 px-3 py-2 rounded-lg ml-2">
                  <Text className="text-gray-300 text-sm">Main Menu</Text>
                  <ChevronDown
                    color="#9ca3af"
                    size={14}
                    style={{ marginLeft: 4 }}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Category Filter */}
            <View className="bg-zinc-800 px-4 py-1">
              <CategoryFilter
                categories={CATEGORIES}
                activeCategoryId={activeCategory}
                onSelectCategory={setActiveCategory}
              />
            </View>

            {/* Product Grid */}
            <View className="flex-1 px-4 pt-4">
              <FlatList
                key={activeCategory}
                data={filteredProducts}
                renderItem={({ item }) => (
                  <ProductCard product={item} onPress={handleProductPress} />
                )}
                keyExtractor={(item) => item.id}
                numColumns={4}
                contentContainerStyle={{ paddingBottom: 20 }}
                columnWrapperStyle={{ gap: 12, marginBottom: 12 }}
                showsVerticalScrollIndicator={false}
              />
            </View>

            {/* MODAL - Positioned above menu section only */}
            <ItemModal
              product={selectedProduct}
              isVisible={isModalVisible}
              onClose={handleCloseModal}
              initialQuantity={
                selectedProduct ? getExistingQuantity(selectedProduct.id) : 1
              }
            />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
