import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#212f3d',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="home" options={{}} />
      <Stack.Screen name="login" options={{}} />
      <Stack.Screen name="signup" options={{}} />
    </Stack>
  );
}
