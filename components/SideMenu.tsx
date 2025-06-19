import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SideMenuProps {
  visible: boolean;
  onClose: () => void;
}

export const SideMenu: React.FC<SideMenuProps> = ({ visible, onClose }) => {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <SafeAreaView style={styles.menuContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Image source={require('../assets/images/logo.png')} style={styles.logo} />
          <Text style={styles.title}>Sistema Académico</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#113D7C" />
          </TouchableOpacity>
        </View>
        {/* Menu Items */}
        <View style={styles.menuItems}>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="grid" size={20} color="#113D7C" style={styles.menuIcon} />
            <Text style={styles.menuTextBold}>Inicio</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="document-text-outline" size={20} color="#113D7C" style={styles.menuIcon} />
            <Text style={styles.menuText}>Procesos académicos</Text>
            <Ionicons name="chevron-down" size={16} color="#113D7C" style={styles.chevronIcon} />
          </TouchableOpacity>
          <View style={styles.subMenu}>
            <TouchableOpacity style={styles.menuItemSub}>
              <Text style={styles.menuTextSub}>Suficiencia</Text>
              <Ionicons name="chevron-down" size={14} color="#113D7C" style={styles.chevronIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItemSub}>
              <Text style={styles.menuTextSub}>Grado</Text>
              <Ionicons name="chevron-down" size={14} color="#113D7C" style={styles.chevronIcon} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="calendar-outline" size={20} color="#113D7C" style={styles.menuIcon} />
            <Text style={styles.menuText}>Evaluación docente</Text>
            <Ionicons name="chevron-down" size={16} color="#113D7C" style={styles.chevronIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="stats-chart-outline" size={20} color="#113D7C" style={styles.menuIcon} />
            <Text style={styles.menuText}>Reportes de Grado</Text>
            <Ionicons name="chevron-down" size={16} color="#113D7C" style={styles.chevronIcon} />
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="notifications-outline" size={20} color="#113D7C" style={styles.menuIcon} />
            <Text style={styles.menuText}>Notificaciones</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="settings-outline" size={20} color="#113D7C" style={styles.menuIcon} />
            <Text style={styles.menuText}>Configuraciones</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="help-circle-outline" size={20} color="#113D7C" style={styles.menuIcon} />
            <Text style={styles.menuText}>Ayuda</Text>
          </TouchableOpacity>
        </View>
        {/* Footer */}
        <View style={styles.footer}>
          <Image source={require('../assets/images/usuario.png')} style={styles.avatar} />
          <View style={styles.footerTextContainer}>
            <Text style={styles.footerWelcome}>Bienvenido de nuevo <Text style={styles.wave}>👋</Text></Text>
            <Text style={styles.footerName}>Kenya Luna</Text>
          </View>
          <TouchableOpacity style={styles.footerButton}>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 1000,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  menuContainer: {
    width: 300,
    height: '100%',
    backgroundColor: '#fff',
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    paddingTop: 60,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#113D7C',
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  menuItems: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  menuIcon: {
    marginRight: 12,
  },
  menuText: {
    fontSize: 16,
    color: '#113D7C',
    flex: 1,
  },
  menuTextBold: {
    fontSize: 16,
    color: '#113D7C',
    fontWeight: 'bold',
    flex: 1,
  },
  chevronIcon: {
    marginLeft: 8,
  },
  subMenu: {
    marginLeft: 32,
  },
  menuItemSub: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  menuTextSub: {
    fontSize: 15,
    color: '#113D7C',
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
    marginTop: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  footerTextContainer: {
    flex: 1,
  },
  footerWelcome: {
    fontSize: 14,
    color: '#113D7C',
  },
  wave: {
    fontSize: 14,
  },
  footerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#113D7C',
  },
  footerButton: {
    backgroundColor: '#113D7C',
    borderRadius: 20,
    padding: 8,
    marginLeft: 8,
  },
});

export default SideMenu; 