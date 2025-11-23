import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
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
    <TouchableOpacity
      onPress={onRemove}
      className="flex-row justify-between items-center py-2 border-b border-zinc-800"
    >
      {/* Product Name with Quantity */}
      <View className="flex-1">
        <Text className="text-white text-sm">
          {item.name}
          <Text className="text-gray-500"> {item.quantity} X</Text>
        </Text>
        {item.notes ? (
          <Text className="text-gray-600 text-xs italic" numberOfLines={1}>
            {item.notes}
          </Text>
        ) : null}
      </View>

      {/* Price */}
      <Text className="text-white text-sm font-medium">
        ${(item.price * item.quantity).toFixed(2)}
      </Text>
    </TouchableOpacity>
  );
};
