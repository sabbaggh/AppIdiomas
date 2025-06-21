import { View, Text, TouchableOpacity, ScrollView, Image, Pressable } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';
import * as Speech from 'expo-speech';

const speak = (message) => {
  Speech.speak(message, { "language": "zh", "rate": 0.8, "pitch": 1 });
};

// Componente para mensajes del sistema (servidor)
const MessageSystem = ({ message, role }) => {
  useEffect(() => {
    speak(message)
  }, [])
  return (
    <View className="flex-row justify-start mb-8">
      <Image
        source={require('../assets/logo3.png')} // Asegúrate de tener tu logo en la carpeta assets
        className="w-12 h-12 rounded-full mt-1"
        resizeMode="fill"
      />
      <View className="bg-blue-100 p-3 rounded-xl rounded-tl-none max-w-[80%] ml-2">
        <View className='flex-row items-center gap-x-2'>
          <Pressable onPress={() => {speak(message)}}>
            <Feather name='volume-2' color={"#000"} size={24} />
          </Pressable>
          <Text className="font-bold text-gray-700 mb-1 text-lg">{role}:</Text>
        </View>

        <Text className="text-gray-800 text-2xl">{message}</Text>
      </View>
    </View>
  );
};

// Componente para mensajes del usuario
const MessageUser = ({ message }) => {
  return (
    <View className="flex-row justify-end mb-8">
      <View className="bg-blue-600 p-3 rounded-xl rounded-tr-none max-w-[80%] mr-2">
        <Text className="text-white text-2xl">{message}</Text>
      </View>
      <Feather name='user' color={"#FFFF"} size={32} className="mt-1" />
    </View>
  );
};

const initialConversation = [
  {
    "role": "服务员",
    "agent_type": "system",
    "message": "你好，欢迎光临！请问你要点什么？",
    "state": "done"
  },
  {
    "role": "顾客",
    "agent_type": "user",
    "message": "你好，我想要一杯咖啡。",
    "state": "wait"
  },
  {
    "role": "服务员",
    "agent_type": "system",
    "message": "好的，请问你要热的还是冰的？",
    "state": "hide"
  },
  {
    "role": "顾客",
    "agent_type": "user",
    "message": "我要热的，谢谢。",
    "state": "hide"
  },
  {
    "role": "服务员",
    "agent_type": "system",
    "message": "好的，请稍等。",
    "state": "hide"
  },
  {
    "role": "顾客",
    "agent_type": "user",
    "message": "好的，谢谢！",
    "state": "hide"
  }
];

const Dialogue = () => {
  const [conversation, setConversation] = useState(initialConversation);
  const [currentStep, setCurrentStep] = useState(1);
  const scrollViewRef = useRef();
  const [pressedMic, setPressedMic] = useState(false);

  const handleConfirm = () => {
    // Primero actualizamos el mensaje actual de "wait" a "done"
    const updatedConversation = conversation.map((msg, index) => {
      if (index === currentStep - 1 && msg.state === "wait") {
        return { ...msg, state: "done" };
      }
      if (index === currentStep && msg.state === "hide") {
        return { ...msg, state: "wait" };
      }
      return msg;
    });

    setConversation(updatedConversation);

    // Solo incrementamos el paso si hay más mensajes por mostrar
    if (currentStep < conversation.length - 1) {
      setCurrentStep(currentStep + 1);
    }

    // Auto-scroll al final
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <SafeAreaView className="flex-1 p-3 bg-black">
      <ScrollView
        ref={scrollViewRef}
        className="flex-1 mb-16"
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {conversation.map((item, index) => {
          if (item.state === "hide") return null;

          return item.agent_type === "system" ? (
            <MessageSystem
              key={index}
              role={item.role}
              message={item.message}
            />
          ) : (
            <MessageUser
              key={index}
              message={item.message}
            />
          );
        })}
      </ScrollView>

      {conversation.some(msg => msg.state === "wait") && (
        <View className="absolute bottom-10 left-0 right-0 items-center">
          <TouchableOpacity
            className="bg-blue-500 py-6 px-6 rounded-full shadow-md"
            onPress={handleConfirm}
          >
            {pressedMic ? <Feather name='pause' color={"#FFF"} size={42} /> : <Feather name='mic' color={"#FFF"} size={38} /> }
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Dialogue;