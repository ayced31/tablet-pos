import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { ArrowLeft, X, Minus, Plus, Check, UtensilsCrossed } from "lucide-react-native";
import { Product } from "../types";
import { useCartStore } from "../store/useCartStore";

interface ItemModalProps {
  product: Product | null;
  isVisible: boolean;
  onClose: () => void;
  initialQuantity?: number;
}

const MAX_NOTES_LENGTH = 80;

export const ItemModal = ({ product, isVisible, onClose, initialQuantity = 1 }: ItemModalProps) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [notes, setNotes] = useState("");

  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    if (isVisible) {
      setQuantity(initialQuantity);
      setNotes("");
    }
  }, [isVisible, product, initialQuantity]);

  if (!product || !isVisible) return null;

  const handleAddToOrder = () => {
    addToCart(product, quantity, notes);
    onClose();
  };

  const handleNotesChange = (text: string) => {
    if (text.length <= MAX_NOTES_LENGTH) {
      setNotes(text);
    }
  };

  const totalPrice = (product.price * quantity).toFixed(2);

  return (
    <View className="absolute inset-0 bg-black/80 justify-center items-center p-6 z-50">
      <View className="bg-zinc-900 w-full max-w-xl rounded-2xl overflow-hidden border border-zinc-700">
        {/* Header: Back to Menu, X, Done */}
        <View className="flex-row justify-between items-center px-5 py-3 border-b border-zinc-800">
          <TouchableOpacity
            onPress={onClose}
            className="flex-row items-center"
          >
            <ArrowLeft color="#9ca3af" size={18} />
            <Text className="text-gray-400 ml-2">Back to Menu</Text>
          </TouchableOpacity>

          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={onClose}
              className="w-9 h-9 bg-red-600 rounded-lg justify-center items-center mr-2"
            >
              <X color="#fff" size={18} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleAddToOrder}
              className="flex-row items-center bg-green-600 px-3 py-2 rounded-lg"
            >
              <Text className="text-white font-medium mr-1 text-sm">Done</Text>
              <Check color="#fff" size={14} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Product Info Row */}
          <View className="flex-row items-center px-5 py-4 border-b border-zinc-800">
            {product.image ? (
              <Image
                source={{ uri: product.image }}
                className="w-14 h-14 rounded-lg bg-zinc-800 mr-4"
                resizeMode="cover"
              />
            ) : (
              <View className="w-14 h-14 rounded-lg bg-zinc-800 mr-4 justify-center items-center">
                <UtensilsCrossed color="#6b7280" size={24} />
              </View>
            )}
            <View>
              <Text className="text-white text-lg font-bold">
                {product.name}
              </Text>
              <Text className="text-blue-400 font-medium">
                Base ${product.price.toFixed(2)}
              </Text>
            </View>
          </View>

          {/* Quantity Section */}
          <View className="px-5 py-4">
            <Text className="text-gray-400 mb-3 font-medium">Quantity</Text>
            <View className="flex-row items-center justify-center">
              <TouchableOpacity
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-11 h-11 bg-zinc-700 rounded-lg justify-center items-center border border-zinc-600"
              >
                <Minus color="#9ca3af" size={18} />
              </TouchableOpacity>

              <View className="w-14 h-11 bg-zinc-800 mx-3 rounded-lg justify-center items-center border border-zinc-600">
                <Text className="text-white text-lg font-bold">{quantity}</Text>
              </View>

              <TouchableOpacity
                onPress={() => setQuantity(quantity + 1)}
                className="w-11 h-11 bg-green-600 rounded-lg justify-center items-center"
              >
                <Plus color="#fff" size={18} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Notes Section */}
          <View className="px-5 py-4">
            <Text className="text-gray-400 mb-2 font-medium">Notes</Text>
            <TextInput
              className="bg-zinc-800 text-white p-3 rounded-lg h-16 border border-zinc-700"
              placeholder="No onions..."
              placeholderTextColor="#666"
              multiline
              value={notes}
              onChangeText={handleNotesChange}
              maxLength={MAX_NOTES_LENGTH}
              textAlignVertical="top"
            />
            <Text className="text-gray-600 text-xs text-right mt-1">
              {notes.length}/{MAX_NOTES_LENGTH}
            </Text>
          </View>

          {/* Total Row */}
          <View className="mx-5 mb-5 bg-zinc-800 rounded-lg p-3 flex-row justify-between items-center border border-zinc-700">
            <Text className="text-white font-bold text-base">Total</Text>
            <Text className="text-orange-500 font-bold text-lg">
              ${totalPrice}
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
