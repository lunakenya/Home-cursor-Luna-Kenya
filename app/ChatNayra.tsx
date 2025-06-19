import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ChatNayra() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image source={require('@/assets/images/condor.png')} style={styles.avatar} />
          <View>
            <Text style={styles.headerTitle}>Nayra UCE</Text>
            <Text style={styles.headerStatus}>● Online</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      {/* Chat Body */}
      <ScrollView style={styles.body} contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}>
        <View style={styles.messageContainer}>
          <View style={styles.messageBubble}>
            <Text style={styles.messageText}>
              ¡Hola!  Soy Nayra 🦉✈️, tu asistente{"\n"}
              virtual con alas de cóndor.{"\n\n"}
              Estoy aquí para ayudarte a volar alto y{"\n"}
              resolver cualquier duda que tengas.{"\n"}
              ¿En qué puedo ayudarte hoy?
            </Text>
            <Text style={styles.messageTime}>7:20</Text>
          </View>
          <Image source={require('@/assets/images/condor.png')} style={styles.condorImage} />
        </View>
      </ScrollView>
      {/* Suggestion Buttons */}
      <View style={styles.suggestions}>
        <TouchableOpacity style={styles.suggestionButton}>
          <Text style={styles.suggestionText}>🗓 ¿Cuándo son Matrículas?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.suggestionButton}>
          <Text style={styles.suggestionText}>💳 Pagos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.suggestionButton}>
          <Text style={styles.suggestionText}>📒 Notas</Text>
        </TouchableOpacity>
      </View>
      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escriba su mensaje aquí..."
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.sendButton}>
          <Ionicons name="send" size={22} color="#7B61FF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9e0f6',
    paddingTop: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#7B61FF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  headerTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  headerStatus: {
    color: '#b6f7c1',
    fontSize: 13,
    marginTop: 2,
  },
  body: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  messageBubble: {
    backgroundColor: '#3b5b7c',
    borderRadius: 16,
    padding: 14,
    maxWidth: '80%',
    marginBottom: 8,
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 6,
  },
  messageTime: {
    color: '#c7d0e0',
    fontSize: 12,
    textAlign: 'right',
  },
  condorImage: {
    width: 110,
    height: 110,
    alignSelf: 'center',
    marginTop: 10,
  },
  suggestions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 8,
    marginBottom: 6,
  },
  suggestionButton: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: '#e0d7f3',
  },
  suggestionText: {
    color: '#7B61FF',
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    margin: 10,
    paddingHorizontal: 12,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 8,
    backgroundColor: 'transparent',
  },
  sendButton: {
    padding: 6,
    marginLeft: 4,
  },
}); 