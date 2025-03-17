import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const RootLayout = () => {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="index" options={{headerShown: false}} />
        <Stack.Screen name="learn-more" options={{headerTitleAlign:'center', headerStyle: {backgroundColor:'#ECF0EBFA'}}}/>
        <Stack.Screen name="quiz" options={{headerTitleAlign:'center', headerStyle: {backgroundColor:'#ECF0EBFA'}}}/>
      </Stack>
    </SafeAreaProvider>
  );
};

export default RootLayout;
