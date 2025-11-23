import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void; // Will open modal later
}

export const ProductCard = ({ product, onPress }: ProductCardProps) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(product)}
      className="flex-1 bg-zinc-850 rounded-xl p-3 m-2 border border-zinc-800"
      activeOpacity={0.7}
    >
      {/* Image Section */}
      <View className="w-full h-32 bg-zinc-900 rounded-lg mb-3 overflow-hidden">
        <Image
          source={{ uri: product.image }}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>

      {/* Details Section */}
      <View>
        <Text
          className="text-white text-lg font-semibold mb-1"
          numberOfLines={1}
        >
          {product.name}
        </Text>

        <Text className="text-blue-400 font-bold text-base">
          ${product.price.toFixed(2)}
        </Text>

        {/* Stock Indicator */}
        <View className="mt-2 flex-row items-center">
          <View
            className={`w-2 h-2 rounded-full mr-2 ${
              product.inStock ? "bg-green-500" : "bg-red-500"
            }`}
          />
          <Text className="text-gray-500 text-xs uppercase tracking-wider">
            {product.inStock ? "In Stock" : "Out of Stock"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
