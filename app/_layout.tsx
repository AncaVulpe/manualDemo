import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const RootLayout = () => {
  return (
    <GestureHandlerRootView>
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="index" options={{headerShown: false}} />
        <Stack.Screen name="learn-more" options={{headerTitleAlign:'center', headerStyle: {backgroundColor:'#ECF0EBFA'}}}/>
        <Stack.Screen name="quiz" options={{headerTitleAlign:'center', headerStyle: {backgroundColor:'#ECF0EBFA'}}}/>
      </Stack>
      </SafeAreaProvider>
      <StatusBar style="light" />
    </GestureHandlerRootView>
  );
};

export default RootLayout;
