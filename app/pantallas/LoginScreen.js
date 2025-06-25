import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import Feather from '@expo/vector-icons/Feather';
import React, { useState } from 'react'
import { useUser } from '../context/UserContext';
import { useRouter } from 'expo-router';

export default function LoginScreen({ setPantalla }) {
  const router = useRouter();
  const { setUserDataa } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState(<></>);


  const handleLogin = async () => {
    try {
      const response = await fetch("https://back-parlancio.yellowcoast-a71c2fa8.westus2.azurecontainerapps.io/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {
            "mail": email,
            "password": password
          }
        ),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error al registrar usuario:", errorText);
        setAlerta(<View className='bg-red-500 border-red-700 border-2 mb-5 rounded-xl p-5 w-full'>
          <Text className='text-white text-center'>
            Usuario no encontrado
          </Text>
        </View>)
        return;
      }

      const result = await response.json();
      console.log("Login existoso", result);
      setUserDataa(result);
      router.navigate("/(tabs)/home");
    } catch (error) {
      console.error("Error de red o servidor:", error);
      alert("Error de conexión con el servidor");
    }
  }

  return (
    <>
      <View className="bg-black p-4 min-h-screen items-center justify-center">
        <Text className='text-3xl text-white'>Inicia Sesión</Text>

        <View className='h-4/6 justify-center items-center px-7 w-full'>
          {alerta}
          <Text className='text-white mb-5 text-lg text-left w-full'>Ingresa tu nombre de usuario</Text>
          <View className='border-slate-300 h-14 bg-gray-800 rounded-xl w-full mb-7 flex-row items-center overflow-hidden px-2'>
            <Feather name='user' size={23} color="white" />
            <TextInput className='text-white text-lg px-2 w-full' placeholder='usuario123' placeholderTextColor={"#CCC"} onChangeText={(text) => setEmail(text)} value={email} />
          </View>


          <Text className='text-white mb-5 text-lg text-left w-full'>Ingresa tu contraseña</Text>
          <View className='border-slate-300 h-14 bg-gray-800 rounded-xl w-full mb-7 flex-row items-center overflow-hidden px-2'>
            <Feather name='lock' size={23} color="white" />
            <TextInput className='text-white text-lg px-2 w-full' secureTextEntry={true} placeholder='Contraseña' placeholderTextColor={"#CCC"} onChangeText={(text) => setPassword(text)} value={password} />
          </View>

          <TouchableOpacity className="bg-blue-500 w-full h-14 rounded-2xl text-center items-center justify-center flex-row gap-x-2 mb-3" onPress={handleLogin}>
            <Text className="text-xl text-white">Iniciar Sesión</Text>
            <Feather name="check" size={22} color="white" />
          </TouchableOpacity>
          <TouchableOpacity className='h-14 w-full rounded-xl justify-center items-center' onPress={() => setPantalla('main')}>
            <Text className='text-white text-xl'>Volver</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

