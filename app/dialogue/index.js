import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

// Componente para mensajes del sistema (servidor)
const MessageSystem = ({ message, role }) => {
  return (
    <View className="flex-row justify-start mb-8">
      <View className="bg-fuchsia-100 p-3 rounded-xl rounded-tl-none max-w-[80%]">
        <Text className="font-bold text-gray-700 mb-1 text-lg">{role}:</Text>
        <Text className="text-gray-800 text-2xl">{message}</Text>
      </View>
    </View>
  );
};

// Componente para mensajes del usuario
const MessageUser = ({ message }) => {
  return (
    <View className="flex-row justify-end mb-8">
      <View className="bg-fuchsia-600 p-3 rounded-xl rounded-tr-none max-w-[80%]">
        <Text className="text-white text-2xl">{message}</Text>
      </View>
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
        <View className="absolute bottom-4 left-0 right-0 items-center">
          <TouchableOpacity 
            className="bg-fuchsia-500 py-3 px-6 rounded-full shadow-md"
            onPress={handleConfirm}
          >
            <Text className="text-white font-bold text-xl">Confirmado</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Dialogue;