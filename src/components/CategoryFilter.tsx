import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Category } from "../types";

interface CategoryFilterProps {
  categories: Category[];
  activeCategoryId: string;
  onSelectCategory: (id: string) => void;
}

export const CategoryFilter = ({
  categories,
  activeCategoryId,
  onSelectCategory,
}: CategoryFilterProps) => {
  return (
    <View className="mb-4 flex-row">
      {categories.map((cat) => {
        const isActive = activeCategoryId === cat.id;
        return (
          <TouchableOpacity
            key={cat.id}
            onPress={() => onSelectCategory(cat.id)}
            className="flex-row items-center mr-6 py-2"
          >
            {/* Green/Blue dot indicator */}
            <View
              className={`w-2 h-2 rounded-full mr-2 ${
                isActive ? "bg-blue-500" : "bg-transparent"
              }`}
            />
            <Text
              className={`font-medium ${
                isActive ? "text-blue-400" : "text-gray-400"
              }`}
            >
              {cat.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
