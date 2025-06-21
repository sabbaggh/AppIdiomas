import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Feather from '@expo/vector-icons/Feather'

export default function Profile() {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className = "w-full border-b-2 border-b-blue-600">
        
      </View>
      <View className = "w-full flex-col gap-y-3">
        <View className = "flex-1 flex-row justify-between items-center">
          <View className = "gap-x-2">
            <Text className = "text-white font-medium text-lg">
              Datos Personales
            </Text>
            <Feather name="user" size={28} color="white" />
          </View>

        </View>
      </View>
    </SafeAreaView>
  )
}