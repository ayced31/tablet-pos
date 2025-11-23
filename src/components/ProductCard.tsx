import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { UtensilsCrossed, Settings } from "lucide-react-native";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
}

export const ProductCard = ({ product, onPress }: ProductCardProps) => {
  // Check if product has a valid image (not empty)
  const hasImage = product.image && product.image.length > 0;

  return (
    <TouchableOpacity
      onPress={() => onPress(product)}
      className="flex-1 bg-zinc-800 rounded-xl overflow-hidden border border-zinc-700"
      activeOpacity={0.7}
      style={{ minWidth: 140, maxWidth: 180 }}
    >
      {/* Image/Icon Section */}
      <View className="w-full h-24 bg-zinc-900 justify-center items-center relative">
        {hasImage ? (
          <Image
            source={{ uri: product.image }}
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : (
          <UtensilsCrossed color="#6b7280" size={32} />
        )}
        {/* Settings icon in corner (shown on some cards in reference) */}
        <TouchableOpacity className="absolute top-2 right-2 opacity-50">
          <Settings color="#6b7280" size={16} />
        </TouchableOpacity>
      </View>

      {/* Separator Line */}
      <View className="h-px bg-zinc-600" />

      {/* Details Section */}
      <View className="p-3">
        <Text
          className="text-white text-sm font-medium mb-1"
          numberOfLines={1}
        >
          {product.name}
        </Text>

        <Text className="text-blue-400 font-bold text-sm mb-2">
          ${product.price.toFixed(2)}
        </Text>

        {/* Stock Indicator */}
        <View className="flex-row items-center">
          <View
            className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
              product.inStock ? "bg-green-500" : "bg-red-500"
            }`}
          />
          <Text
            className={`text-xs ${
              product.inStock ? "text-green-500" : "text-red-500"
            }`}
          >
            {product.inStock ? "In Stock" : "Out of Stock"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
