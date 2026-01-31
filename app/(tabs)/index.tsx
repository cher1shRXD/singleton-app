import { View, Text, Button, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Link href="/login" asChild>
        <Button title="Go to Login" />
      </Link>
      <Link href="/register" asChild>
        <Button title="Go to Register" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10, // Add some space between buttons
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
