import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';

const languages = [
    "🇺🇸 Ingles",
    "🇨🇳 Chino",
    "🇵🇹 Portugues"
]
const interests = [
    "🎮 Videojuegos",
    "🎥 Peliculas",
    "⛩️ Anime",
    "👟 Moda",
    "✈️ Viajes",
    "🤖 AI",
    "🖥️ Tecnologia"
]

const levels = [
    "Principante",
    "Intermedio",
    "Avanzado",
]

const corrections = [
    "Siempre",
    "De vez en cuando",
    "Nunca"
]

export default function UserDataForm({ password, email, setViewMain }) {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [view, setView] = useState("lenguaje");
    const totalSteps = 4;
    const [userData, setUserData] = useState({
        "password": password,
        "language": null,
        "email": email,
        "interests": [],
        "level": null,
        "correction": null,
    })


    const selectLanguageView = () => {
        return (
            <>
                <Text className='text-white text-2xl text-center'>
                    Selecciona el idioma que quieres aprender
                </Text>

                <View className='bg-black w-full h-full justify-center   items-center gap-y-12'>
                    {languages.map((language) => {
                        return (<TouchableOpacity className={`w-11/12 h-14 justify-center items-center rounded-xl ${userData.language == language ? "bg-fuchsia-500" : "bg-slate-800"}`} key={language} onPress={() => {
                            setUserData(prevState => ({
                                ...prevState, // Mantén todos los demás campos igual
                                language: language // Actualiza solo el campo 'language'
                            }));
                        }}>
                            <Text className='text-3xl text-white leading-relaxed'>{language}</Text>
                        </TouchableOpacity>)
                    })}
                </View>
            </>
        )
    }

    const selectInterestsView = () => {
        return (
            <View>
                <Text className='text-white text-2xl text-center'>
                    Selecciona tus intereses
                </Text>
                <View className='bg-black w-full h-full justify-start items-center gap-y-6 gap-x-4 flex-wrap flex-row pt-8'>
                    {interests.map((interest) => {
                        return (
                            <TouchableOpacity key={interest} className={`p-3 justify-center items-center rounded-xl ${userData.interests.includes(interest) ? "bg-fuchsia-500" : "bg-slate-800"}`} onPress={() => {
                                setUserData(prevState => {
                                    // Si el interés ya está seleccionado, lo quitamos
                                    if (prevState.interests.includes(interest)) {
                                        return {
                                            ...prevState,
                                            interests: prevState.interests.filter(item => item !== interest),
                                        };
                                    }
                                    // Si no está, lo agregamos
                                    else {
                                        return {
                                            ...prevState,
                                            interests: [...prevState.interests, interest],
                                        };
                                    }
                                });
                            }}>
                                <Text className='text-lg text-white leading-relaxed'>{interest}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>
        )
    }

    const selectFluencyLevel = () => {
        return (
            <>
                <Text className='text-white text-2xl text-center'>
                    Selecciona tu nivel de experencia en {userData.language}
                </Text>

                <View className='bg-black w-full h-full justify-center   items-center gap-y-12'>
                    {levels.map((level) => {
                        return (<TouchableOpacity className={`w-11/12 h-14 justify-center items-center rounded-xl ${userData.level == level ? "bg-fuchsia-500" : "bg-slate-800"}`} key={level} onPress={() => {
                            setUserData(prevState => ({
                                ...prevState, // Mantén todos los demás campos igual
                                level: level // Actualiza solo el campo 'language'
                            }));
                        }}>
                            <Text className='text-3xl text-white leading-relaxed'>{level}</Text>
                        </TouchableOpacity>)
                    })}
                </View>
            </>
        )
    }

    const selectCorrectionsAgent = () => {
        return (
            <>
                <Text className='text-white text-2xl text-center'>
                    Selecciona la frecuencia en que te gustaria ser corregido
                </Text>

                <View className='bg-black w-full h-full justify-center   items-center gap-y-12'>
                    {corrections.map((correction) => {
                        return (<TouchableOpacity className={`w-11/12 h-14 justify-center items-center rounded-xl ${userData.correction == correction ? "bg-fuchsia-500" : "bg-slate-800"}`} key={correction} onPress={() => {
                            setUserData(prevState => ({
                                ...prevState, // Mantén todos los demás campos igual
                                correction: correction // Actualiza solo el campo 'language'
                            }));
                        }}>
                            <Text className='text-3xl text-white leading-relaxed'>{correction}</Text>
                        </TouchableOpacity>)
                    })}
                </View>
            </>
        )
    }

    const renderViews = () => {
        switch (view) {
            case "lenguaje":
                return selectLanguageView();
            case "interests":
                return selectInterestsView();
            case "levels":
                return selectFluencyLevel();
            case "corrections":
                return selectCorrectionsAgent();
        }
    }

    const handleStepsUp = () => {
        if (view === "lenguaje" && userData.language != null) {
            setStep(step => step + 1);
            setView("interests");
        }
        else if (view === "interests" && userData.interests.length != 0) {
            setStep(step => step + 1);
            setView("levels");
        }
        else if (view === "levels" && userData.level != null) {
            setStep(step => step + 1);
            setView("corrections");
        }
    }

    const handleStepsDown = () => {
        if (view === "interests") {
            setStep(step => step - 1);
            setView("lenguaje");
        }
        else if (view === "lenguaje") {
            setStep(step => step - 1);
            setViewMain("form");
        }
        else if (view === "levels") {
            setStep(step => step - 1);
            setView("interests");
        }
        else if (view === "corrections") {
            setStep(step => step - 1);
            setView("levels");
        }
    }

    const handleRegistration = () => {
        //llamada a api
        router.navigate('/(tabs)/home')
    }

    return (
        <View className="bg-black min-h-screen items-center justify-center">
            <View className='h-1/6 w-full justify-start items-center'>
                <View className={`h-4 w-full bg-gray-800 rounded-full`}>
                    <View
                        style={{ width: `${(step / totalSteps) * 100}%` }} // Estilo dinámico
                        className='h-full bg-fuchsia-500 rounded-full'
                    />
                </View>
            </View>
            <View className="bg-black px-2 py-1 items-center justify-start h-5/6 w-full ">

                <View className='justify-between flex-col'>

                    <View className='h-4/6'>
                        {renderViews()}
                    </View>
                    <View className='h-1/6 w-full bg-black flex flex-row justify-around items-center'>
                        <TouchableOpacity className='h-3/6 w-5/12 bg-gray-800  rounded-2xl text-center items-center justify-center flex-row gap-x-2' onPress={() => handleStepsDown()}>

                            <Text className="text-lg text-white">Volver</Text>
                        </TouchableOpacity>
                        {view == "corrections" ?
                            <TouchableOpacity className='h-3/6 w-5/12 bg-fuchsia-500 rounded-2xl text-center items-center justify-center flex-row gap-x-2' onPress={() => handleRegistration()}>
                                <Text className="text-lg text-white">Finalizar</Text>
                                <Feather name="check" size={22} color="white" />

                            </TouchableOpacity>
                            : <TouchableOpacity className='h-3/6 w-5/12 bg-fuchsia-500 rounded-2xl text-center items-center justify-center flex-row gap-x-2' onPress={() => handleStepsUp()}>
                                <Text className="text-lg text-white">Siguiente</Text>
                                <Feather name="arrow-right" size={22} color="white" />

                            </TouchableOpacity>}
                    </View>
                </View>

            </View>
        </View>
    )
}