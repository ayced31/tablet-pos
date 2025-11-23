import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ChevronLeft, Plus } from "lucide-react-native";

export const Navbar = () => {
  return (
    <View className="bg-zinc-950 px-4 py-3 flex-row justify-between items-center border-b border-zinc-800">
      {/* Left: Back to Menu */}
      <TouchableOpacity className="flex-row items-center">
        <View className="w-8 h-8 bg-zinc-800 rounded-lg justify-center items-center mr-2">
          <ChevronLeft color="#22c55e" size={18} />
        </View>
        <Text className="text-white text-base font-medium">Back to Menu</Text>
      </TouchableOpacity>

      {/* Right: Philippe badge + icons */}
      <View className="flex-row items-center bg-zinc-800 rounded-full px-1 py-1">
        <View className="bg-blue-600 px-2.5 py-1.5 rounded-full flex-row items-center">
          <Text className="text-white text-xs font-bold">PE</Text>
          <Text className="text-white text-sm ml-2">Philippe</Text>
        </View>
        <TouchableOpacity className="w-8 h-8 justify-center items-center ml-1">
          <Plus color="#9ca3af" size={18} />
        </TouchableOpacity>
        <TouchableOpacity className="w-8 h-8 justify-center items-center">
          <ChevronLeft color="#9ca3af" size={18} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
