import { Tabs } from "expo-router";
import Feather from '@expo/vector-icons/Feather';

export default () => {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: '#1E90FF', // Color cuando está activo
            tabBarInactiveTintColor: '#808080', // Color cuando está inactivo
        }}>
            <Tabs.Screen name="home" options={{
                headerShown: false, tabBarLabel: 'Inicio', tabBarIcon: ({ color, size }) => (
                    <Feather name="home" size={size} color={color} />
                ),
            }} />
            <Tabs.Screen name="profile" options={{
                headerShown: false, tabBarLabel: 'Perfil', tabBarIcon: ({ color, size }) => (
                    <Feather name="user" size={size} color={color} />
                ),
            }} />
        </Tabs>
    )
}