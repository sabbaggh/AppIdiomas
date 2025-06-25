import { View, Text, TouchableOpacity, ScrollView, Image, Pressable, Alert } from 'react-native';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';
import * as Speech from 'expo-speech';
import { useRoute } from '@react-navigation/native';
import { Audio } from 'expo-av';
import axios from 'axios';



const MessageSystem = ({ message, role, language }) => {
  const speak = (message) => {
    Speech.speak(message, { "language": `${language == "cn" ? "zh" : language == "en" ? "en" : "pt"}`, "rate": 0.8, "pitch": 1 });
  };
  useEffect(() => {
    speak(message)
  }, [])
  return (
    <View className="flex-row justify-start mb-8">
      <Image
        source={require('../assets/logo3.png')}
        className="w-12 h-12 rounded-full mt-1"
        resizeMode="fill"
      />
      <View className="bg-blue-100 p-3 rounded-xl rounded-tl-none max-w-[80%] ml-2">
        <View className='flex-row items-center gap-x-2'>
          <Pressable onPress={() => { speak(message) }}>
            <Feather name='volume-2' color={"#000"} size={24} />
          </Pressable>
          <Text className="font-bold text-gray-700 mb-1 text-lg">{role}:</Text>
        </View>
        <Text className="text-gray-800 text-2xl">{message}</Text>
      </View>
    </View>
  );
};

const MessageUser = ({ message, language }) => {
  const speak = (message) => {
    Speech.speak(message, { "language": `${language == "cn" ? "zh" : language == "en" ? "en" : "pt"}`, "rate": 0.8, "pitch": 1 });
  };
  return (
    <View className="flex-row justify-end mb-8">
      <View className="bg-blue-600 p-3 rounded-xl rounded-tr-none max-w-[80%] mr-2">
        <Pressable onPress={() => { speak(message) }}>
          <Feather name='volume-2' color={"#FFF"} size={24} />
        </Pressable><Text className="text-white text-2xl">{message}</Text>
      </View>
      <Feather name='user' color={"#FFFF"} size={32} className="mt-1" />
    </View>
  );
};

const Dialogue = () => {
  const [conversation, setConversation] = useState([]);
  const scrollViewRef = useRef();
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUri, setAudioUri] = useState(null);
  const route = useRoute();
  const { dialogueData, bot } = route.params || {};

  const xdd = JSON.parse(dialogueData);
  //console.log(typeof(bot));
  const getCurrentMessage = useCallback(() => {
    return conversation.find(msg => msg.state === "wait");
  }, [conversation]);

  useEffect(() => {
    fetchConversation();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access microphone was denied');
      }
    })();
  }, []);

  const fetchConversation = async () => {
    if (bot === "true") {
      console.log("ffefsfesfesfsfesfesfesfesfesfes bot")
      console.log(xdd.conversation)
      setConversation(JSON.parse(xdd.conversation))
    }
    if (xdd?.id) {
      try {

        const response = await fetch(`https://back-parlancio.yellowcoast-a71c2fa8.westus2.azurecontainerapps.io/convos/get-conversation?id_conversaciones_front=${xdd.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error al obtener las conversaciones:", errorText);
          alert("Error al obtener la conversacion");
          return;
        }

        const result = await response.json();
        console.log(result);
        setConversation(result);
      } catch (error) {
        console.error("Error de red o servidor:", error);
        alert("Error de conexión con el servidor");
      }
    }
  };

  const advanceConversation = useCallback(() => {
    setConversation(prevConversation => {
      const currentIndex = prevConversation.findIndex(msg => msg.state === "wait");
      if (currentIndex === -1) return prevConversation;

      const newConversation = [...prevConversation];

      // 1. Marcar el mensaje actual (usuario) como done
      newConversation[currentIndex] = {
        ...newConversation[currentIndex],
        state: "done"
      };

      // 2. Buscar el próximo mensaje del sistema para saltarlo (marcarlo como done)
      const nextSystemIndex = newConversation.findIndex(
        (msg, idx) => idx > currentIndex && msg.agent_type === "system" && msg.state === "hide"
      );

      if (nextSystemIndex !== -1) {
        newConversation[nextSystemIndex] = {
          ...newConversation[nextSystemIndex],
          state: "done" // Marcamos como done sin mostrarlo
        };
      }

      // 3. Buscar el próximo mensaje de usuario después del sistema saltado
      const nextUserIndex = newConversation.findIndex(
        (msg, idx) => idx > (nextSystemIndex !== -1 ? nextSystemIndex : currentIndex) &&
          msg.agent_type === "user" &&
          msg.state === "hide"
      );

      // 4. Si encontramos un mensaje de usuario, lo mostramos
      if (nextUserIndex !== -1) {
        newConversation[nextUserIndex] = {
          ...newConversation[nextUserIndex],
          state: "wait"
        };
      } else {
        // Si no hay más mensajes de usuario, mostrar el siguiente mensaje disponible
        const nextAnyIndex = newConversation.findIndex(
          (msg, idx) => idx > (nextSystemIndex !== -1 ? nextSystemIndex : currentIndex) &&
            msg.state === "hide"
        );
        if (nextAnyIndex !== -1) {
          newConversation[nextAnyIndex] = {
            ...newConversation[nextAnyIndex],
            state: "wait"
          };
        }
      }

      return newConversation;
    });

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, []);

  const evaluatePronunciation = async (audioUri) => {
    try {
      console.log('Evaluating pronunciation...');
      const currentMessageObj = getCurrentMessage();

      if (!currentMessageObj) {
        throw new Error("No hay mensaje pendiente para evaluar");
      }

      const currentMessage = currentMessageObj.message;
      console.log("Evaluando mensaje:", currentMessage);

      const languageCode = xdd.language === "cn" ? "zh-CN" :
        xdd.language === "en" ? "en-US" : "pt-PT";

      const formData = new FormData();
      formData.append('file', {
        uri: audioUri,
        name: 'audio.m4a',
        type: 'audio/m4a'
      });
      formData.append('reference_text', currentMessage);
      formData.append('language', languageCode);

      const response = await axios.post(
        'https://back-parlancio.yellowcoast-a71c2fa8.westus2.azurecontainerapps.io/convos/evaluate',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Resultado de evaluación:', response.data);

      Alert.alert(
        "Resultados de Pronunciación",
        `Precisión general: ${response.data.general_scores.accuracy_score}%\n` +
        `Fluidez general: ${response.data.general_scores.fluency_score}%\n` +
        "Precisiones por palabra:\n" +
        response.data.word_results.map(word =>
          `• ${word.word}: ${word.accuracy_score}%`
        ).join('\n'),
        [
          {
            text: "Continuar",
            onPress: () => {
              if (response.data.general_scores.accuracy_score >= -1) {
                advanceConversation();
              } else {
                Alert.alert("Practica más", "Intenta mejorar tu pronunciación");
              }
            }
          }
        ]
      );

    } catch (error) {
      console.error('Error en evaluación:', error);
      Alert.alert("Error", error.response?.data?.detail || "Error al evaluar");
    }
  };

  const startRecording = async () => {
    try {
      console.log('Starting recording...');
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(recording);
      setIsRecording(true);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
      Alert.alert("Error", "No se pudo iniciar la grabación");
    }
  };

  const stopRecording = async () => {
    try {
      console.log('Stopping recording...');
      setIsRecording(false);

      if (recording) {
        await recording.stopAndUnloadAsync();
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
        });

        const uri = recording.getURI();
        console.log('Recording stopped and stored at', uri);
        setAudioUri(uri);
        await evaluatePronunciation(uri);
      }

      setRecording(null);
    } catch (err) {
      console.error('Failed to stop recording', err);
      Alert.alert("Error", "No se pudo detener la grabación");
    }
  };


  // Función separada para actualizar estados
  const updateConversationState = (currentMessageObj) => {
    const currentIndex = conversation.findIndex(msg => msg.id === currentMessageObj.id);

    if (currentIndex === -1) return;

    const updatedConversation = [...conversation];

    // 1. Marcar el actual como "done"
    updatedConversation[currentIndex] = {
      ...updatedConversation[currentIndex],
      state: "done"
    };

    // 2. Revelar el siguiente mensaje del sistema (si existe)
    const nextSystemIndex = updatedConversation.findIndex(
      (msg, index) => index > currentIndex && msg.agent_type === "system" && msg.state === "hide"
    );

    if (nextSystemIndex !== -1) {
      updatedConversation[nextSystemIndex] = {
        ...updatedConversation[nextSystemIndex],
        state: "wait"
      };
    }

    // 3. Revelar el siguiente mensaje del usuario (si existe)
    const nextUserIndex = updatedConversation.findIndex(
      (msg, index) => index > currentIndex && msg.agent_type === "user" && msg.state === "hide"
    );

    if (nextUserIndex !== -1) {
      updatedConversation[nextUserIndex] = {
        ...updatedConversation[nextUserIndex],
        state: "wait"
      };
    }

    setConversation(updatedConversation);

    // Scroll automático
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleConfirm = () => {
    // Primero actualizamos el estado de la conversación
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

    // Solo avanzamos el paso si no hemos llegado al final
    if (currentStep < conversation.length - 1) {
      setCurrentStep(prevStep => prevStep + 1);
    }

    // Scroll al final después de la actualización
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
              key={`${item.id}-${item.state}`} // Usar una key más única
              role={item.role}
              message={item.message}
              language={xdd.language}
            />
          ) : (
            <MessageUser
              key={`${item.id}-${item.state}`}
              message={item.message}
              language={xdd.language}
            />
          );
        })}
      </ScrollView>

      {getCurrentMessage() && (
        <View className="absolute bottom-10 left-0 right-0 items-center">
          <TouchableOpacity
            className="bg-blue-500 py-6 px-6 rounded-full shadow-md"
            onPress={isRecording ? stopRecording : startRecording}
          >
            <Feather name={isRecording ? 'pause' : 'mic'} color={"#FFF"} size={38} />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Dialogue;