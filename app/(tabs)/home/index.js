import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Feather from '@expo/vector-icons/Feather'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import DialogueCard from './components/dialogueCard'
import { useRouter } from 'expo-router'
import { useUser } from '../../context/UserContext'

export default function Home() {
  const router = useRouter();
  const { userDataa } = useUser();
  console.log(userDataa)
  const [componentsLeft, setComponentsLeft] = useState([]);
  const [componentsRight, setComponentsRight] = useState([]);
  const [convos, setConvos] = useState([]);

  useEffect(() => {
    fetchConvosFront();
  }, []);

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
  }, [convos])

  const fetchConvosFront = async () => {
    try {
      const response = await fetch(`https://back-parlancio.yellowcoast-a71c2fa8.westus2.azurecontainerapps.io/convos/get-front?language=${userDataa.language}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error al obtener las conversaciones:", errorText);
        alert("Error al obtener las conversaciones");
        return;
      }
      const result = await response.json();
      console.log(result);
      setConvos(result);

    }
    catch (error) {
      console.error("Error de red o servidor:", error);
      alert("Error de conexión con el servidor");
    }
  }

  const fetchConvosAI = async () => {
    try {
      const transformUserData = (rawData) => {
        return {
          mail: rawData.mail,
          password: rawData.password,
          level: rawData.level,
          corrections: rawData.corrections,
          language: rawData.language,
          interests: Object.keys(rawData).filter(
            key => rawData[key] === true &&
              !['mail', 'password', 'level', 'corrections', 'language', 'id'].includes(key)
          )
        };
      };

      const transformedData = transformUserData(userDataa);

      const response = await fetch(`https://back-parlancio.yellowcoast-a71c2fa8.westus2.azurecontainerapps.io/convos/create-convo`, {
        method: "POST",
        body: JSON.stringify(transformedData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error al obtener las conversaciones:", errorText);
        alert("Error al obtener las conversaciones");
        return;
      }
      const result = await response.json();
      //console.log(result);
      router.navigate({
        pathname: "../../dialogue",
        params: { dialogueData:JSON.stringify({conversation: result, language: userDataa.language}), bot: true } // Envías todo el objeto
      });

    }
    catch (error) {
      console.error("Error de red o servidor:", error);
      alert("Error de conexión con el servidor");
    }
  }


  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 px-5">
        {/* Encabezado */}
        <View className="h-16 w-full flex-row justify-start items-center px-2 gap-x-2 border-b-blue-500 border-2">
          <Feather name="user" size={28} color="white" />
          <Text className="text-white text-2xl">{userDataa.language == "cn" ? "你好" : userDataa.language == "pt" ? "Olá" : "Hello"} {userDataa.mail}!</Text>
        </View>

        {/* Contenido desplazable */}
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 30 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Sección del robot */}
          <TouchableOpacity className="w-full h-48 bg-blue-500 rounded-3xl mt-10 p-2 flex-row justify-center items-center gap-x-2" onPress={() => { fetchConvosAI() }}>
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
          </TouchableOpacity>

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