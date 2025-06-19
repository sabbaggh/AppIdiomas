import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const DialogueCard = ({ dialogueData, router }) => {
  // Determine badge color based on level
  const getBadgeColor = () => {
    switch (dialogueData.level.toLowerCase()) {
      case 'beginner':
        return 'bg-green-500';
      case 'intermediate':
        return 'bg-yellow-500';
      case 'advanced':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <TouchableOpacity className={`h-64 mb-4 rounded-xl overflow-hidden`} onPress={() => {
      router.navigate({
        pathname: "../../dialogue",
        params: { dialogueData: dialogueData } // Envías todo el objeto
      });
    }}>
      <ImageBackground
        source={{ uri: dialogueData.image }}
        className="flex-1"
        resizeMode="cover"
      >
        {/* Overlay with opacity */}
        <LinearGradient
          colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.5)']}
          className="flex-1 p-4 justify-between"
        >
          {/* Badge at the top right */}
          <View className="flex-row justify-end">
            <View className={`${getBadgeColor()} px-3 py-1 rounded-full`}>
              <Text className="text-white font-bold text-xs">
                {dialogueData.level == "beginner" ? "PRINCIPIANTE" : dialogueData.level == "intermediate" ? "INTERMEDIO" : 'AVANZADO'}
              </Text>
            </View>
          </View>

          {/* Title at the bottom */}
          <View>
            <Text className="text-white text-xl font-bold">
              {dialogueData.title}
            </Text>
            <Text className="text-white text-sm">
              Dialogo {dialogueData.language == "en" ? "EN" : dialogueData.language == "cn" ? "CN" : "PT"}
            </Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default DialogueCard;