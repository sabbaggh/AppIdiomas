import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Feather from '@expo/vector-icons/Feather'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

const convos = [
  {
    "title": "Ordenar un cafe",
    "id": 1,
    "language": "CN",
    "level": "beginner",
    "component_height": 32
  },
  {
    "title": "Llegar tarde al trabajo",
    "id": 2,
    "language": "CN",
    "level": "intermediate",
    "component_height": 32
  },
  {
    "title": "Ordenar un cafe",
    "id": 3,
    "language": "CN",
    "level": "advanced",
    "component_height": 32
  },
  {
    "title": "Primer dia de escuela",
    "id": 4,
    "language": "CN",
    "level": "beginner",
    "component_height": 32
  },
  {
    "title": "Conociendo nuevos colegas",
    "id": 5,
    "language": "CN",
    "level": "intermediate",
    "component_height": 32
  },
]

export default function Home() {
  return (
    <SafeAreaView>
      <View className="p-4 bg-black min-h-screen flex-1 flex-col justify-between px-5">
        <View className="h-16 w-full flex flex-row justify-start items-center px-2 gap-x-2 border-b-fuchsia-500 border-2">
          <Feather name="user" size={28} color="white" />
          <Text className="text-white text-2xl">你好 Usuario!</Text>
        </View>

        <ScrollView>
          <View className="">
            <View className="w-full h-48 bg-fuchsia-500 rounded-3xl mt-10 p-2 flex flex-row justify-center items-center gap-x-2">
              <View className = "w-5/12 justify-center items-center">
                <MaterialCommunityIcons name="robot-happy-outline" size={120} color="white" />
              </View>
              <View className  = "w-7/12 pr-10">
                <Text className="text-white text-2xl font-extrabold">
                  Chatea Ahora!
                </Text>
                <Text className="text-white leading-relaxed text-lg font-light">
                  Chatea sobre temas de tu interes de acuerdo con tu nivel
                </Text>
              </View>
              
            </View>
            <View className= 'w-full my-10'>
              <Text className = "text-white text-3xl font-bold mb-2">
                Conversaciones
              </Text>
              <Text className = 'text-white text-lg'>
                Practica tu pronunciacion con conversaciones de la vida cotidiana
              </Text>
            </View>

          </View>
        </ScrollView>


      </View>


    </SafeAreaView>
  )
}