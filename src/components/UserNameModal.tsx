import React, { useState } from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

interface UserNameModalProps {
  visible: boolean;
  onClose: () => void;
}

const UserNameModal: React.FC<UserNameModalProps> = ({visible, onClose}) => {
  const [username, setUsername] = useState<string>('');

  const handleNext = async () => {
    if (username.trim() !== '') {
      onClose(username);
    } else {
      alert('Please enter your name.');
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Welcome to the Game!</Text>
          <Text style={styles.subtitle}>
            Enter your name and let the adventure begin!
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Your adventurous name..."
            placeholderTextColor="#AFAFAF"
            onChangeText={text => setUsername(text)}
            value={username}
            maxLength={10}
          />
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Start the Adventure</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFE6D3', // Creamy background color
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#FF8682', // Yellow border color
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FA4C44', // Red title color
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6bb36b', // Green subtitle color
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#F9D342', // Yellow border color for input
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    color: '#6bb36b', // Green text color
  },
  button: {
    backgroundColor: '#FA4C44', // Red color for button
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UserNameModal;
