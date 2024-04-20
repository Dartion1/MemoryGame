import LottieView from 'lottie-react-native';
import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface WinModalProps {
  visible: boolean;
  onClose: () => void;
  onRestart: () => void;
}
const celibrationAnimation = require('../assets/animation/winningAnimation.json');

const WinModal: React.FC<WinModalProps> = ({visible, onClose, onRestart}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <LottieView
            source={celibrationAnimation}
            loop
            autoPlay
            style={{
              width: 300,
              height: 300,
            }}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={onClose}
              style={{
                backgroundColor: '#1d8ce0',
                borderRadius: 8,
                marginEnd: 20,
              }}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onRestart}
              style={{
                backgroundColor: '#1d8ce0',
                borderRadius: 8,
                marginStart: 8,
              }}>
              <Text style={styles.buttonText}>Restart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
   // backgroundColor: '#EEDCF2',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonText: {
    padding: 10,
    fontWeight: 'bold',
    fontSize: 15,
    color: '#FFFF',
  },
});

export default WinModal;
