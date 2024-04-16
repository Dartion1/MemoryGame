import React from 'react';
import { Button, Modal, StyleSheet, Text, View } from 'react-native';

interface ExitConfirmationModalProps {
  visible: boolean;
  onExitConfirmed: () => void;
  onExitCancelled: () => void;
}

const ExitConfirmationModal: React.FC<ExitConfirmationModalProps> = ({
  visible,
  onExitConfirmed,
  onExitCancelled,
}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Do you want to exit?</Text>
          <Text style={styles.modalText}>
            All your game progress will be lost.
          </Text>
          <View style={styles.buttonContainer}>
            <Button title="Yes, exit" onPress={onExitConfirmed} />
            <Button title="Cancel" onPress={onExitCancelled} />
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
    backgroundColor: '#d3cff8',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    margin: 20,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
});

export default ExitConfirmationModal;
