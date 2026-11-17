import { useState } from 'react';
import { Alert, Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { colors } from '../theme';

export default function Contato() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState('');
  const [focusedField, setFocusedField] = useState('');

  function submit() {
    const nextErrors = {};
    if (name.trim().length < 2) nextErrors.name = 'Informe seu nome com pelo menos 2 caracteres.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) nextErrors.email = 'Informe um e-mail válido.';
    if (message.trim().length < 10) nextErrors.message = 'Escreva uma mensagem com pelo menos 10 caracteres.';
    setErrors(nextErrors);
    setFeedback('');
    if (Object.keys(nextErrors).length > 0) {
      Alert.alert('Confira os campos', 'Corrija os campos indicados antes de enviar.');
      return;
    }
    Keyboard.dismiss();
    const confirmation = `Obrigado, ${name.trim()}! Sua mensagem foi recebida nesta demonstração. Nenhum dado foi enviado à lanchonete. Para atendimento, use o botão de telefone.`;
    setFeedback(confirmation);
    Alert.alert('Mensagem recebida — demonstração', confirmation);
    setName('');
    setEmail('');
    setMessage('');
  }

  return (
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}>
      <Text style={styles.kicker}>VAMOS CONVERSAR</Text>
      <Text accessibilityRole="header" style={styles.title}>Seu recado{ '\n' }tem lugar aqui.</Text>
      <Text style={styles.intro}>Dúvida, ideia ou um alô? Preencha os campos abaixo.</Text>
      <View style={styles.notice}><Text style={styles.noticeText}>Formulário demonstrativo: mostra uma confirmação no app, sem enviar dados. Para pedidos, use o telefone.</Text></View>
      <Text style={styles.label}>Nome</Text>
      <TextInput accessibilityLabel="Nome" value={name} onChangeText={(value) => { setName(value); setFeedback(''); }} maxLength={100}
        autoComplete="name" placeholder="Como podemos chamar você?" placeholderTextColor={colors.muted}
        onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField('')}
        style={[styles.input, focusedField === 'name' && styles.focused, errors.name && styles.invalid]} />
      {errors.name && <Text accessibilityRole="alert" style={styles.error}>{errors.name}</Text>}
      <Text style={styles.label}>E-mail</Text>
      <TextInput accessibilityLabel="E-mail" value={email} onChangeText={(value) => { setEmail(value); setFeedback(''); }} maxLength={254}
        keyboardType="email-address" autoCapitalize="none" autoCorrect={false} autoComplete="email" placeholder="voce@exemplo.com" placeholderTextColor={colors.muted}
        onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField('')}
        style={[styles.input, focusedField === 'email' && styles.focused, errors.email && styles.invalid]} />
      {errors.email && <Text accessibilityRole="alert" style={styles.error}>{errors.email}</Text>}
      <Text style={styles.label}>Mensagem</Text>
      <TextInput accessibilityLabel="Mensagem" value={message} onChangeText={(value) => { setMessage(value); setFeedback(''); }} maxLength={2000}
        multiline textAlignVertical="top" placeholder="Conte pra gente…" placeholderTextColor={colors.muted}
        onFocus={() => setFocusedField('message')} onBlur={() => setFocusedField('')}
        style={[styles.input, styles.message, focusedField === 'message' && styles.focused, errors.message && styles.invalid]} />
      {errors.message && <Text accessibilityRole="alert" style={styles.error}>{errors.message}</Text>}
      <TouchableOpacity accessibilityRole="button" onPress={submit} style={styles.submit} activeOpacity={0.8}><Text style={styles.submitText}>Enviar mensagem ↗</Text></TouchableOpacity>
      {feedback !== '' && <View style={styles.success}><Text accessibilityLiveRegion="polite" style={styles.successText}>{feedback}</Text></View>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 24, gap: 12 },
  kicker: { color: colors.teal, fontSize: 10, letterSpacing: 2, fontWeight: '800' },
  title: { color: colors.text, fontSize: 35, lineHeight: 40, fontWeight: '900', letterSpacing: -1 },
  intro: { color: colors.muted, fontSize: 15, lineHeight: 23 },
  notice: { padding: 16, backgroundColor: colors.surface, borderRadius: 14, borderLeftWidth: 3, borderLeftColor: colors.lilac, marginVertical: 8 },
  noticeText: { color: colors.muted, fontSize: 12, lineHeight: 19 },
  label: { color: colors.text, fontSize: 14, fontWeight: '700', marginTop: 9 },
  input: { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border, borderWidth: 1, borderRadius: 12, padding: 16, fontSize: 15, minHeight: 54 },
  focused: { borderColor: colors.teal, borderWidth: 2 },
  invalid: { borderColor: colors.coral },
  message: { minHeight: 140 },
  error: { color: colors.coral, fontSize: 12 },
  submit: { backgroundColor: colors.coral, padding: 18, borderRadius: 14, alignItems: 'center', marginTop: 12 },
  submitText: { color: colors.background, fontSize: 16, fontWeight: '800' },
  success: { borderWidth: 1, borderColor: colors.teal, borderRadius: 14, padding: 16 },
  successText: { color: colors.teal, fontSize: 14, lineHeight: 22 },
});
