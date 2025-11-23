import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Minus, Plus, Trash2 } from "lucide-react-native";
import { CartItem as CartItemType } from "../types";

interface CartItemProps {
  item: CartItemType;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export const CartItem = ({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps) => {
  return (
    <View className="flex-row justify-between items-center bg-zinc-800 p-3 mb-2 rounded-lg border border-zinc-700">
      {/* Product Info */}
      <View className="flex-1">
        <Text className="text-white font-bold text-base">{item.name}</Text>
        <Text className="text-blue-400 text-sm font-bold">
          ${(item.price * item.quantity).toFixed(2)}
        </Text>
        {item.notes ? (
          <Text className="text-gray-500 text-xs italic mt-1" numberOfLines={1}>
            Note: {item.notes}
          </Text>
        ) : null}
      </View>

      {/* Quantity Controls */}
      <View className="flex-row items-center bg-zinc-900 rounded-lg p-1 ml-2">
        <TouchableOpacity onPress={onDecrease} className="p-1">
          <Minus
            size={16}
            color={item.quantity === 1 ? "#ef4444" : "#9ca3af"}
          />
        </TouchableOpacity>

        <Text className="text-white font-bold mx-3">{item.quantity}</Text>

        <TouchableOpacity onPress={onIncrease} className="p-1">
          <Plus size={16} color="#9ca3af" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
