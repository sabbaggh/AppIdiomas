import { useState } from "react";
import { Text, View, SafeAreaView, TouchableOpacity, Image } from "react-native";
import SignUpScreen from "./pantallas/signUpScreen";
import Feather from '@expo/vector-icons/Feather';

export default function Index() {
  const [pantalla, setPantalla] = useState("main");
  return (
    <SafeAreaView className="flex-1 bg-black">
      {pantalla == "main" ? (
        <View className="p-4 bg-black min-h-screen flex-1 flex-col justify-between">
          {/* Logo y eslogan */}
          <View className="items-center justify-center flex-1">
            <Image 
              source={require('./assets/logo2.png')} // Asegúrate de tener tu logo en la carpeta assets
              className="w-64 h-64 mb-6"
              resizeMode="contain"
            />
            <Text className="text-white text-5xl font-black mb-2 text-center">
              Parlancio
            </Text>
            <Text className="text-gray-400 mt-4 text-center">
              Aprende, practica y habla con confianza
            </Text>
          </View>

          {/* Botones */}
          <View className="bg-gray-800 h-1/4 rounded-xl flex justify-center items-center gap-y-5 p-4">
            <TouchableOpacity 
              className="bg-blue-500 w-full h-16 rounded-2xl items-center justify-center flex-row gap-x-2"
              onPress={() => setPantalla("signUp")}
            >
              <Text className="text-xl text-white font-bold">Registrarse</Text>
              <Feather name="arrow-right" size={22} color="white" />
            </TouchableOpacity>
            
            <TouchableOpacity className="border border-blue-500 w-full h-16 rounded-2xl items-center justify-center">
              <Text className="text-xl text-blue-500 font-bold">Iniciar Sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <SignUpScreen setPantalla={setPantalla} />
      )}
    </SafeAreaView>
  );
}
