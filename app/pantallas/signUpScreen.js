import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import Feather from '@expo/vector-icons/Feather';
import React, { useState } from 'react'
import UserDataForm from "./UserDataForm"

export default function SignUpScreen({ setPantalla }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [alerta, setAlerta] = useState(<></>);
	const [view, setView] = useState("form");

	const verifyData = () => {
		if (!email || !password) {
			setAlerta(<View className='bg-red-500 border-red-700 border-2 mb-5 rounded-xl p-5 w-full'>
				<Text className='text-white text-center'>
					No puedes dejar campos vacios
				</Text>
			</View>)
		}
		else if (password.length < 8) {
			setAlerta(<View className='bg-red-500 border-red-700 border-2 mb-5 rounded-xl p-5 w-full'>
				<Text className='text-white text-center'>
					La contraseña debe tener por lo menos 8 caracteres
				</Text>
			</View>)
		}
		else {
			setAlerta(<></>);
			setView("userDataForm");
		}
	}

	return (
		<>
			{view === "form" ? <View className="bg-black p-4 min-h-screen items-center justify-center">
				<Text className='text-3xl text-white'>Registro</Text>

				<View className='h-4/6 justify-center items-center px-7 w-full'>
					{alerta}
					<Text className='text-white mb-5 text-lg text-left w-full'>Ingresa tu nombre de usaurio</Text>
					<View className='border-slate-300 h-14 bg-gray-800 rounded-xl w-full mb-7 flex-row items-center overflow-hidden px-2'>
						<Feather name='mail' size={23} color="white" />
						<TextInput className='text-white text-lg px-2 w-full' placeholder='usuario123' placeholderTextColor={"#CCC"} onChangeText={(text) => setEmail(text)} value={email} />
					</View>


					<Text className='text-white mb-5 text-lg text-left w-full'>Ingresa tu contraseña</Text>
					<View className='border-slate-300 h-14 bg-gray-800 rounded-xl w-full mb-7 flex-row items-center overflow-hidden px-2'>
						<Feather name='lock' size={23} color="white" />
						<TextInput className='text-white text-lg px-2 w-full' secureTextEntry={true} placeholder='Contraseña' placeholderTextColor={"#CCC"} onChangeText={(text) => setPassword(text)} value={password} />
					</View>

					<TouchableOpacity className="bg-blue-500 w-full h-14 rounded-2xl text-center items-center justify-center flex-row gap-x-2 mb-3" onPress={verifyData}>
						<Text className="text-xl text-white">Continuar</Text>
						<Feather name="arrow-right" size={22} color="white" />
					</TouchableOpacity>
					<TouchableOpacity className='h-14 w-full rounded-xl justify-center items-center' onPress={() => setPantalla('main')}>
						<Text className='text-white text-xl'>Volver</Text>
					</TouchableOpacity>
				</View>
			</View> : <UserDataForm password={password} email={email} setViewMain = {setView}/>}
		</>
	)
}

