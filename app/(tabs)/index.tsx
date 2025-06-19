import { StyleSheet, Dimensions, View as RNView } from 'react-native';
import { View } from '../../components/Themed';
import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, Image, TextInput, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native';
import { Animated, Easing } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Svg, { Path, G, Text as SvgText, Circle } from 'react-native-svg';
import { arc } from 'd3-shape';
import CircularProgress from 'react-native-circular-progress-indicator';
import * as Progress from 'react-native-progress';
import SideMenu from '../../components/SideMenu';
import { NotificationsModal } from '../../components/NotificationsModal';
import { useRouter } from 'expo-router';
import ChatNayra from '../../app/ChatNayra';

const GaugeProgress = ({ percent }: { percent: number }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const width = Dimensions.get('window').width - 80;
  const height = width / 2;
  const borderRadius = width / 2;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: percent,
      duration: 1000,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [percent]);

  const progressWidth = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={[styles.gaugeContainer, { width, height: height + 40 }]}>
      <View style={[styles.gaugeBackground, { width, height, borderRadius }]}>
        <Animated.View 
          style={[
            styles.gaugeFill, 
            { 
              width: progressWidth,
              height,
              borderRadius,
            }
          ]} 
        />
      </View>
      <View style={styles.gaugeTextContainer}>
        <Text style={styles.gaugePercentage}>{percent}%</Text>
        <Text style={styles.gaugeLabel}>Completado</Text>
      </View>
    </View>
  );
};

const GaugeSegment = ({ rotation, color }: { rotation: number, color: string }) => (
  <RNView
    style={[
      styles.gaugeSegment,
      {
        transform: [{ rotate: `${rotation}deg` }],
        backgroundColor: color,
      },
    ]}
  />
);

const Speedometer = ({ value }: { value: number }) => {
  const radius = 100;
  const strokeWidth = 30;
  
  const createArc = (radius: number, startAngle: number, endAngle: number) => {
    const start = {
      x: radius + radius * Math.cos(startAngle),
      y: radius + radius * Math.sin(startAngle)
    };
    const end = {
      x: radius + radius * Math.cos(endAngle),
      y: radius + radius * Math.sin(endAngle)
    };
    const largeArcFlag = endAngle - startAngle <= Math.PI ? 0 : 1;
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
  };

  const startAngle = -Math.PI;
  const progressAngle = startAngle + (Math.PI * value) / 100;
  const backgroundPath = createArc(radius, startAngle, 0);
  const progressPath = createArc(radius, startAngle, progressAngle);

  return (
    <View style={styles.speedometerContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.cardTitle}>Eficiencia académica</Text>
      </View>
      <View style={styles.gaugeContainer}>
        <Svg 
          width={radius * 2 + strokeWidth} 
          height={(radius + strokeWidth) * 1.2}
          style={styles.gauge}
        >
          <G transform={`translate(${strokeWidth / 2},${strokeWidth / 2})`}>
            <Path
              d={backgroundPath}
              stroke="#E8E8E8"
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
            />
            <Path
              d={progressPath}
              stroke="#4B7BE5"
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
            />
          </G>
        </Svg>
        <View style={styles.textOverlay}>
          <Text style={styles.completedText}>Completado</Text>
          <Text style={styles.percentageText}>{value}%</Text>
        </View>
        <Text style={styles.creditsText}>
          <Text style={styles.creditsHighlight}>220</Text>
          /240 créditos
        </Text>
      </View>
    </View>
  );
};

const SubjectsDonut = () => {
  const total = 49 + 2 + 8;
  const approvedPercentage = (49 / total) * 100;
  const failedPercentage = (2 / total) * 100;
  const extraPercentage = (8 / total) * 100;

  return (
    <View style={styles.subjectsContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.cardTitle}>Asignaturas</Text>
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.donutContainer}>
          <Svg height={160} width={160}>
            <Circle
              cx={80}
              cy={80}
              r={60}
              stroke="#7B61FF"
              strokeWidth={15}
              fill="none"
              strokeDasharray={2 * Math.PI * 60}
              strokeDashoffset={0}
              rotation={0}
              origin={`${80}, ${80}`}
              strokeLinecap="round"
            />
            <Circle
              cx={80}
              cy={80}
              r={60}
              stroke="#FF5252"
              strokeWidth={15}
              fill="none"
              strokeDasharray={2 * Math.PI * 60}
              strokeDashoffset={2 * Math.PI * 60 * (1 - failedPercentage / 100)}
              rotation={approvedPercentage * 3.6}
              origin={`${80}, ${80}`}
              strokeLinecap="round"
            />
            <Circle
              cx={80}
              cy={80}
              r={60}
              stroke="#FFA726"
              strokeWidth={15}
              fill="none"
              strokeDasharray={2 * Math.PI * 60}
              strokeDashoffset={2 * Math.PI * 60 * (1 - extraPercentage / 100)}
              rotation={(approvedPercentage + failedPercentage) * 3.6}
              origin={`${80}, ${80}`}
              strokeLinecap="round"
            />
          </Svg>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <View style={styles.statHeader}>
                <View style={[styles.dot, { backgroundColor: '#7B61FF' }]} />
                <Text style={styles.statNumber}>49</Text>
              </View>
              <Text style={styles.statLabel}>Aprobadas</Text>
              <Text style={styles.statPercentage}>100%</Text>
            </View>
            
            <View style={styles.statItem}>
              <View style={styles.statHeader}>
                <View style={[styles.dot, { backgroundColor: '#FF5252' }]} />
                <Text style={styles.statNumber}>2</Text>
              </View>
              <Text style={styles.statLabel}>Reprobadas</Text>
              <Text style={styles.statPercentage}>100%</Text>
            </View>
            
            <View style={styles.statItem}>
              <View style={styles.statHeader}>
                <View style={[styles.dot, { backgroundColor: '#FFA726' }]} />
                <Text style={styles.statNumber}>8</Text>
              </View>
              <Text style={styles.statLabel}>Extracurricular</Text>
              <Text style={styles.statPercentage}>100%</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default function HomeScreen() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [nayraVisible, setNayraVisible] = useState(false);
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <SideMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
      <NotificationsModal visible={notificationsVisible} onClose={() => setNotificationsVisible(false)} />
      {/* Header */}
      <LinearGradient
        colors={['#113D7C', '#113D7C']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerLeftContainer}>
            <TouchableOpacity style={styles.menuButton} onPress={() => setMenuVisible(true)}>
              <Ionicons name="menu" size={24} color="white" />
            </TouchableOpacity>
            <Image 
              source={require('../../assets/images/logo.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitleUCE}>UCE</Text>
            <Text style={styles.headerTitle}>Sistema Académico</Text>
          </View>
          <View style={styles.headerRightContainer}>
            <TouchableOpacity style={styles.iconButton} onPress={() => setNotificationsVisible(true)}>
              <Ionicons name="notifications" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Image 
                source={require('../../assets/images/usuario.png')}
                style={styles.userImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      {/* Content */}
      <ScrollView style={styles.content}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Bienvenida, Kenya</Text>
          <Text style={styles.semesterText}>Semestre actual: 2024-2025</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar..."
              placeholderTextColor="#666"
            />
          </View>
        </View>

        {/* Promedio General */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Promedio General</Text>
          <View style={styles.averageContainer}>
            <Text style={styles.averageNumber}>17.05</Text>
            <Text style={styles.averageTotal}>/20</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: '71.3%' }]} />
          </View>
          <Text style={styles.progressText}>71.3%</Text>
        </View>

        {/* Eficiencia académica */}
        <View style={[styles.card, styles.efficiencyCard]}>
          <Speedometer value={96} />
        </View>

        {/* Asignaturas */}
        <View style={[styles.card, styles.subjectsCard]}>
          <SubjectsDonut />
          <TouchableOpacity
            style={styles.fabChat}
            onPress={() => setNayraVisible(true)}
            activeOpacity={0.8}
          >
            <View style={styles.fabChatBg}>
              <Ionicons name="chatbox-ellipses-outline" size={28} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>
        <Modal
          visible={nayraVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setNayraVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.closeModalBtn} onPress={() => setNayraVisible(false)}>
                <Ionicons name="close" size={28} color="#7B61FF" />
              </TouchableOpacity>
              <ChatNayra />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  headerLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    padding: 5,
    marginRight: 5,
  },
  logoImage: {
    height: 35,
    width: 35,
  },
  headerTitleContainer: {
    flex: 1,
    marginLeft: 10,
  },
  headerTitleUCE: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: '400',
  },
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 5,
    marginLeft: 15,
  },
  userImage: {
    width: 24,
    height: 24,
  },
  content: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  averageContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  averageNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF8B8B',
  },
  averageTotal: {
    fontSize: 18,
    color: '#666',
    marginLeft: 4,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginTop: 8,
  },
  progress: {
    height: '100%',
    backgroundColor: '#FF8B8B',
    borderRadius: 4,
  },
  progressText: {
    textAlign: 'right',
    color: '#666',
    marginTop: 4,
  },
  gaugeContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gauge: {
    transform: [{ scale: 0.9 }],
  },
  textOverlay: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    top: '40%',
  },
  percentageText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
  },
  completedText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  creditsText: {
    fontSize: 16,
    color: '#666',
    marginTop: -10,
  },
  creditsHighlight: {
    color: '#4B7BE5',
  },
  efficiencyCard: {
    padding: 0,
    marginVertical: 10,
  },
  subjectsContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 16,
    position: 'relative',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#7B61FF',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  donutContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  statsContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  statItem: {
    alignItems: 'center',
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  statNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 2,
  },
  statPercentage: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  subjectsCard: {
    marginTop: 10,
  },
  icon: {
    marginLeft: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    gap: 10,
  },
  welcomeSection: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  semesterText: {
    fontSize: 16,
    color: '#666',
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    height: '100%',
  },
  speedometerContainer: {
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  gaugeBackground: {
    position: 'absolute',
  },
  gaugeFill: {
    position: 'absolute',
  },
  gaugeTextContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  gaugePercentage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  gaugeLabel: {
    fontSize: 16,
    color: '#666',
  },
  gaugeSegment: {
    position: 'absolute',
  },
  fabChat: {
    position: 'absolute',
    top: -20,
    right: 10,
    zIndex: 10,
  },
  fabChatBg: {
    backgroundColor: '#7B61FF',
    borderRadius: 30,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '95%',
    height: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  closeModalBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 2,
    elevation: 2,
  },
});
