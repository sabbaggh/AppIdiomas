import { useState } from "react";
import { Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import SignUpScreen from "./pantallas/signUpScreen";
import Feather from '@expo/vector-icons/Feather';

export default function Index() {
  const [pantalla, setPantalla] = useState("main");
  return (
    <SafeAreaView>
      {pantalla == "main" ?
        <View className="p-4 bg-black min-h-screen flex-1 flex-col justify-between">
          <View className="h-1/4">
            <Text className="text-white">Edit app/index.tsx to edit this screen.</Text>
          </View>

          <View className="bg-gray-800 h-1/4 rounded-xl flex justify-center items-center gap-y-5">
            <TouchableOpacity className="bg-fuchsia-500 w-11/12 h-1/4 rounded-2xl text-center items-center justify-center flex-row gap-x-2" onPress={() => setPantalla("signUp")}>
              <Text className="text-xl text-white">Registrarse</Text>
              <Feather name="arrow-right" size={22} color="white" />
            </TouchableOpacity>
            <TouchableOpacity className=" w-11/12 h-1/4 shadow-fuchsia-700 drop-shadow-3xl items-center justify-center">
              <Text className="text-xl text-white">Iniciar Sesion</Text>

            </TouchableOpacity>
          </View>
        </View> :
        <SignUpScreen setPantalla={setPantalla} />}
    </SafeAreaView>
  );
}
