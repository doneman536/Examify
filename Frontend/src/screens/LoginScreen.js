import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { postJson } from '../api/client';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  async function onSubmit() {
    setLoading(true);
    setFieldErrors({});
    setGeneralError('');
    setSuccessMessage('');

    try {
      const res = await postJson('/login', { email, password });
      if (res && typeof res.message === 'string') {
        setSuccessMessage(res.message);
        navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
      }
    } catch (err) {
      if (err && Array.isArray(err.errors)) {
        const map = {};
        err.errors.forEach(e => {
          if (e && e.path) {
            if (!map[e.path]) map[e.path] = [];
            map[e.path].push(e.msg);
          }
        });
        setFieldErrors(map);
      } else if (err && typeof err.error === 'string') {
        setGeneralError(err.error);
      } else {
        setGeneralError('Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      {fieldErrors.email && fieldErrors.email.map((m, i) => (
        <Text key={`email-${i}`} style={styles.errorText}>{m}</Text>
      ))}

      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />
      {fieldErrors.password && fieldErrors.password.map((m, i) => (
        <Text key={`password-${i}`} style={styles.errorText}>{m}</Text>
      ))}

      {generalError ? <Text style={styles.errorBadge}>{generalError}</Text> : null}
      {successMessage ? <Text style={styles.successBadge}>{successMessage}</Text> : null}

      <Pressable style={styles.button} onPress={onSubmit} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
      </Pressable>

      <Pressable onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.link}>Create an account</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 16, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 6
  },
  button: {
    backgroundColor: '#111827',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12
  },
  buttonText: { color: '#fff', fontWeight: '600' },
  link: { color: '#2563eb', marginTop: 12, textAlign: 'center' },
  errorText: { color: '#b91c1c', marginBottom: 4 },
  errorBadge: {
    backgroundColor: '#fee2e2',
    color: '#991b1b',
    padding: 8,
    borderRadius: 6,
    marginTop: 6
  },
  successBadge: {
    backgroundColor: '#dcfce7',
    color: '#166534',
    padding: 8,
    borderRadius: 6,
    marginTop: 6
  }
}); 