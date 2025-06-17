import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Feather from '@expo/vector-icons/Feather'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import DialogueCard from './components/dialogueCard'
import { useRouter } from 'expo-router'
import { useUser } from '../../context/UserContext'

const convos = [
  {
    "title": "Ordenar un cafe",
    "id": 1,
    "language": "CN",
    "level": "beginner",
    "image": "https://img-cdn.inc.com/image/upload/f_webp,q_auto,c_fit/images/panoramic/GettyImages-1318950018_535375_uwicaq.jpg"
  },
  {
    "title": "Llegar tarde al trabajo",
    "id": 2,
    "language": "CN",
    "level": "intermediate",
    "image": "https://nypost.com/wp-content/uploads/sites/2/2025/01/office-worker-coming-late-meeting-97303488.jpg?quality=75&strip=all"
  },
  {
    "title": "Ordenar un cafe",
    "id": 3,
    "language": "CN",
    "level": "advanced",
    "image": "xd",
  },
  {
    "title": "Primer dia de clases",
    "id": 4,
    "language": "CN",
    "level": "beginner",
    "image": "https://www.parentmap.com/sites/default/files/styles/1180x660_scaled_cropped/public/2024-08/girl%20on%20first%20day%20of%20school%20holding%20a%20sign_istock.jpg?itok=5yOyTbBM"
  },
  {
    "title": "Conociendo nuevos colegas",
    "id": 5,
    "language": "CN",
    "level": "intermediate",
    "image": "https://www.rwrecruitment.com/wp-content/uploads/2019/09/Getting-to-know-your-colleagues-in-a-new-job.jpg"
  },
]

export default function Home() {
  const router = useRouter();
  const {userDataa} = useUser();
  console.log(userDataa)
  const [componentsLeft, setComponentsLeft] = useState([]);
  const [componentsRight, setComponentsRight] = useState([]);
  useEffect(() => {
    const left = [];
    const right = [];

    convos.forEach((convo) => {
      const card = <DialogueCard key={convo.id} dialogueData={convo} router={router} />;
      if (convo.id % 2 !== 0) {
        left.push(card);
      } else {
        right.push(card);
      }
    });

    setComponentsLeft(left);
    setComponentsRight(right);
  }, []);


  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 px-5">
        {/* Encabezado */}
        <View className="h-16 w-full flex-row justify-start items-center px-2 gap-x-2 border-b-fuchsia-500 border-2">
          <Feather name="user" size={28} color="white" />
          <Text className="text-white text-2xl">{userDataa.language == "cn" ? "你好" : userDataa.language == "pt" ? "Obrigado" : "Hello"} {userDataa.mail}!</Text>
        </View>

        {/* Contenido desplazable */}
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 30 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Sección del robot */}
          <View className="w-full h-48 bg-fuchsia-500 rounded-3xl mt-10 p-2 flex-row justify-center items-center gap-x-2">
            <View className="w-5/12 justify-center items-center">
              <MaterialCommunityIcons name="robot-happy-outline" size={120} color="white" />
            </View>
            <View className="w-7/12 pr-10">
              <Text className="text-white text-2xl font-extrabold">
                Practica Ahora!
              </Text>
              <Text className="text-white leading-relaxed text-lg font-light">
                Crea una conversacion sobre temas de tu interes de acuerdo con tu nivel
              </Text>
            </View>
          </View>

          {/* Título de conversaciones */}
          <View className='w-full my-10'>
            <Text className="text-white text-3xl font-bold mb-2">
              Conversaciones
            </Text>
            <Text className='text-white text-lg'>
              Practica tu pronunciacion con conversaciones de la vida cotidiana
            </Text>
          </View>

          {/* Grid de tarjetas */}
          <View className="w-full flex-row">
            <View className="w-1/2 pr-2">
              {componentsLeft}
            </View>
            <View className="w-1/2 pl-2">
              {componentsRight}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}