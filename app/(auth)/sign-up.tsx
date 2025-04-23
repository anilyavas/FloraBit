import { useSignUp } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  View,
  Pressable,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';

export default function SignUp() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState('');

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace('/');
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (pendingVerification) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Verify your email</Text>
        <TextInput
          style={[styles.textInput, { width: Dimensions.get('window').width / 2 }]}
          value={code}
          placeholder="Verification code"
          placeholderTextColor="#6C6C6C" // Adjusted color
          onChangeText={(code) => setCode(code)}
          keyboardType="numeric"
        />
        <Pressable
          onPress={onVerifyPress}
          style={{
            backgroundColor: '#6C47FF', // Purple color for the button
            paddingVertical: 14,
            paddingHorizontal: 28,
            borderRadius: 10,
            marginTop: 20,
          }}>
          <Text style={{ color: '#FFF', fontWeight: '600' }}>Verify</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.bodyContainer}>
          <Text style={styles.title}>Sign Up</Text>
          <Text style={styles.inputText}>Email</Text>

          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            value={emailAddress}
            placeholder="email@email.com"
            placeholderTextColor="#6C6C6C" // Adjusted placeholder color
            onChangeText={(email) => setEmailAddress(email)}
          />
          <Text style={styles.inputText}>Password</Text>
          <TextInput
            style={styles.textInput}
            value={password}
            placeholder="**********"
            placeholderTextColor="#6C6C6C" // Adjusted placeholder color
            secureTextEntry
            onChangeText={(password) => setPassword(password)}
          />
          {password.length < 8 && (
            <Text style={styles.warningMessage}>Password must be minimum of 8 characters!</Text>
          )}
          <View style={styles.button}>
            <Pressable onPress={onSignUpPress} style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Continue</Text>
            </Pressable>
          </View>
          <View style={styles.button}>
            <Text style={[styles.buttonText, { color: '#6C6C6C' }]}>Already have an account?</Text>
            <Link asChild href="/(auth)/sign-in">
              <Pressable style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Sign In</Text>
              </Pressable>
            </Link>
          </View>
        </View>
        <StatusBar style="dark" />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C8D8C4', // Main background color
    justifyContent: 'center',
  },
  bodyContainer: {
    width: '100%',
    padding: 10,
  },
  title: {
    color: '#2A2A2A', // Darker text color for titles
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 30,
  },
  textInput: {
    backgroundColor: '#F8F8F8', // Light grey background for inputs
    color: '#2A2A2A', // Dark text color
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#B1B1B1', // Light grey border color
  },
  inputText: {
    color: '#2A2A2A', // Dark text color for input labels
    fontSize: 14,
    marginLeft: 8,
    marginTop: 16,
    marginBottom: 4,
  },
  warningMessage: {
    color: '#FF6347', // Red color for warning messages
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  button: {
    alignItems: 'center',
    padding: 10,
    gap: 10,
  },
  buttonText: {
    color: '#FFF', // White text for buttons
    fontWeight: 'bold',
    padding: 5,
    textAlign: 'center',
  },
  buttonContainer: {
    backgroundColor: '#6C47FF', // Purple button color
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
});
