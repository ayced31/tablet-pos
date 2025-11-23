import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { X, Minus, Plus } from "lucide-react-native"; // Icons [cite: 15]
import { Product } from "../types";
import { useCartStore } from "../store/useCartStore";

interface ItemModalProps {
  product: Product | null; // Null means modal is closed
  isVisible: boolean;
  onClose: () => void;
}

export const ItemModal = ({ product, isVisible, onClose }: ItemModalProps) => {
  // Local state for the form
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");

  // Get the addToCart action from our Zustand store [cite: 14]
  const addToCart = useCartStore((state) => state.addToCart);

  // Reset state whenever a new product opens
  useEffect(() => {
    if (isVisible) {
      setQuantity(1);
      setNotes("");
    }
  }, [isVisible, product]);

  if (!product) return null;

  const handleAddToOrder = () => {
    addToCart(product, quantity, notes);
    onClose(); // Close modal after adding
  };

  // Calculate total for this specific item instance
  const totalPrice = (product.price * quantity).toFixed(2);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      {/* Backdrop: Dark semi-transparent overlay */}
      <View className="flex-1 bg-black/80 justify-center items-center p-8">
        {/* Modal Content Container */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="bg-zinc-900 w-full max-w-2xl rounded-2xl overflow-hidden border border-zinc-700"
        >
          {/* Header: Title & Close Button */}
          <View className="flex-row justify-between items-center p-6 border-b border-zinc-800">
            <Text className="text-2xl font-bold text-white">
              {product.name}
            </Text>
            <TouchableOpacity
              onPress={onClose}
              className="p-2 bg-zinc-800 rounded-full"
            >
              <X color="#fff" size={24} />
            </TouchableOpacity>
          </View>

          <View className="flex-row p-6">
            {/* Left Side: Image */}
            <View className="w-1/3 mr-6">
              <Image
                source={{ uri: product.image }}
                className="w-full h-48 rounded-xl bg-zinc-800"
                resizeMode="cover"
              />
              <Text className="text-blue-400 text-xl font-bold mt-4 text-center">
                ${product.price.toFixed(2)}
              </Text>
            </View>

            {/* Right Side: Controls */}
            <View className="flex-1">
              {/* Quantity Controller  */}
              <Text className="text-gray-400 mb-2 font-medium">Quantity</Text>
              <View className="flex-row items-center mb-6">
                <TouchableOpacity
                  onPress={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 bg-zinc-800 rounded-full justify-center items-center border border-zinc-700"
                >
                  <Minus color="#fff" size={20} />
                </TouchableOpacity>

                <Text className="text-white text-2xl font-bold mx-6">
                  {quantity}
                </Text>

                <TouchableOpacity
                  onPress={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 bg-blue-600 rounded-full justify-center items-center"
                >
                  <Plus color="#fff" size={20} />
                </TouchableOpacity>
              </View>

              {/* Notes Field  */}
              <Text className="text-gray-400 mb-2 font-medium">
                Notes / Special Instructions
              </Text>
              <TextInput
                className="bg-zinc-800 text-white p-4 rounded-xl h-24 mb-6 align-top border border-zinc-700"
                placeholder="e.g. No onions, Extra spicy..."
                placeholderTextColor="#666"
                multiline
                value={notes}
                onChangeText={setNotes}
              />
            </View>
          </View>

          {/* Footer: Total & Add Button */}
          <View className="p-6 bg-zinc-850 border-t border-zinc-800 flex-row justify-between items-center">
            <View>
              <Text className="text-gray-400 text-sm">Total Price</Text>
              <Text className="text-white text-3xl font-bold">
                ${totalPrice}
              </Text>
            </View>

            <TouchableOpacity
              onPress={handleAddToOrder}
              className="bg-blue-600 px-8 py-4 rounded-xl flex-row items-center"
            >
              <Text className="text-white font-bold text-lg mr-2">
                Add to Order
              </Text>
              <Text className="text-blue-200 font-bold text-lg">
                {" "}
                | ${totalPrice}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};
