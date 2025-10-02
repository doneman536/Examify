import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { postJson } from '../api/client';

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
      const body = { name, email, password, confirmPassword, confirm_password: confirmPassword };
      const res = await postJson('/register', body);
      if (res && (res.message || res.msg)) {
        setSuccessMessage(res.message || res.msg);
      } else {
        setSuccessMessage('Registered successfully');
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
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      {fieldErrors.name && fieldErrors.name.map((m, i) => (
        <Text key={`name-${i}`} style={styles.errorText}>{m}</Text>
      ))}

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

      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      {fieldErrors.confirmPassword && fieldErrors.confirmPassword.map((m, i) => (
        <Text key={`confirm-${i}`} style={styles.errorText}>{m}</Text>
      ))}

      {generalError ? <Text style={styles.errorBadge}>{generalError}</Text> : null}
      {successMessage ? <Text style={styles.successBadge}>{successMessage}</Text> : null}

      <Pressable style={styles.button} onPress={onSubmit} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign Up</Text>}
      </Pressable>

      <Pressable onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, justifyContent: 'center' },
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