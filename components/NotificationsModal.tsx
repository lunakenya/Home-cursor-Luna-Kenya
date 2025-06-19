import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface NotificationsModalProps {
  visible: boolean;
  onClose: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({ visible, onClose }) => {
  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Notificaciones</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="remove-circle-outline" size={24} color="#A0A0A0" />
            </TouchableOpacity>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Matrícula abierta:</Text>
            <Text style={styles.cardText}>
              El periodo de matrícula ordinaria está abierto hasta el 30 de abril
            </Text>
            <View style={styles.divider} />
            <Text style={styles.cardTime}>Hace 2 días</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Evaluación docente:</Text>
            <Text style={styles.cardText}>
              Recuerda completar la evaluación docente antes del 15 de mayo
            </Text>
            <View style={styles.divider} />
            <Text style={styles.cardTime}>Hace 2 días</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#113D7C',
  },
  closeButton: {
    padding: 5,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#D0D0D0',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#113D7C',
    marginBottom: 5,
  },
  cardText: {
    fontSize: 14,
    color: '#666',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 10,
  },
  cardTime: {
    fontSize: 12,
    color: '#A0A0A0',
    textAlign: 'right',
  },
}); 