import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { clsx } from "clsx";
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
    <View className="mb-4">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 4 }}
      >
        {categories.map((cat) => {
          const isActive = activeCategoryId === cat.id;
          return (
            <TouchableOpacity
              key={cat.id}
              onPress={() => onSelectCategory(cat.id)}
              className={clsx(
                "px-6 py-2 rounded-full mr-3 border",
                isActive
                  ? "bg-blue-600 border-blue-500"
                  : "bg-zinc-800 border-zinc-700"
              )}
            >
              <Text
                className={clsx(
                  "font-medium",
                  isActive ? "text-white" : "text-gray-400"
                )}
              >
                {cat.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
