import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
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
    <View className="flex-row">
      {categories.map((cat) => {
        const isActive = activeCategoryId === cat.id;
        return (
          <TouchableOpacity
            key={cat.id}
            onPress={() => onSelectCategory(cat.id)}
            className={`flex-row items-center mr-4 py-1.5 px-2 rounded ${
              isActive ? "bg-zinc-900" : ""
            }`}
          >
            {/* Green dot indicator */}
            <View
              className={`w-2 h-2 rounded-full mr-2 ${
                isActive ? "bg-green-500" : "bg-transparent"
              }`}
            />
            <Text
              className={`text-sm ${
                isActive ? "text-sky-500" : "text-gray-400"
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
