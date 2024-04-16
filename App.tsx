import React, { useEffect, useState } from 'react';
import {
  BackHandler,
  Button,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ExitConfirmationModal from './src/components/ExitConfirmationModal';
import ScoreDisplay from './src/components/ScoreDisplay';
import WinModal from './src/components/WinModal';
interface Card {
  id: number;
  symbol: string;
  matched: boolean;
  selected: boolean;
}

const symbols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const backgroundImg = require('./src/assets/images/SnowBI.jpeg');
const celibrationAnimation = require('./src/assets/animation/winningAnimation.json');

const MemoryGame = () => {
  const [board, setBoard] = useState<Card[]>(generateBoard());
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [attempts, setAttempts] = useState<number>(0);
  const [matches, setMatches] = useState<number>(0);
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [exitConfirmationVisible, setExitConfirmationVisible] =
    useState<boolean>(false);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (exitConfirmationVisible) {
          setExitConfirmationVisible(false);
          return true; // Prevent default behavior (exit app)
        } else if (modalVisible) {
          setModalVisible(false);
          return true; // Prevent default behavior (close modal)
        } else {
          setExitConfirmationVisible(true);
          return true; // Prevent default behavior (show exit confirmation modal)
        }
      },
    );

    return () => backHandler.remove();
  }, [exitConfirmationVisible, modalVisible]);

  function generateBoard(): Card[] {
    const shuffledSymbols = shuffle([...symbols, ...symbols]);
    const initialBoard: Card[] = [];
    for (let i = 0; i < 16; i++) {
      initialBoard.push({
        id: i,
        symbol: shuffledSymbols[i],
        matched: false,
        selected: false,
      });
    }
    return initialBoard;
  }

  function shuffle(array: any[]): any[] {
    return array.sort(() => Math.random() - 0.5);
  }

  function handleCardPress(index: number) {
    if (selectedCards.length === 2) {
      return;
    }

    const updatedBoard = [...board];
    const card = updatedBoard[index];

    if (
      card.matched ||
      selectedCards.find(selected => selected.id === card.id)
    ) {
      return;
    }

    card.selected = true;
    setSelectedCards([...selectedCards, card]);

    if (selectedCards.length === 1) {
      setAttempts(attempts + 1);
      if (selectedCards[0].symbol === card.symbol) {
        setMatches(matches + 1);
        setTimeout(() => {
          updatedBoard[selectedCards[0].id].matched = true;
          updatedBoard[card.id].matched = true;
          setBoard(updatedBoard);
          setSelectedCards([]);
          if (matches === 7) {
            setModalVisible(true);
            setGameWon(true);
          }
        }, 500);
      } else {
        setTimeout(() => {
          updatedBoard[selectedCards[0].id].selected = false;
          updatedBoard[card.id].selected = false;
          setBoard(updatedBoard);
          setSelectedCards([]);
        }, 1000);
      }
    }
  }

  function restartGame() {
    setBoard(generateBoard());
    setSelectedCards([]);
    setAttempts(0);
    setMatches(0);
    setModalVisible(false);
  }

  function handleExitConfirmed() {
    BackHandler.exitApp();
  }

  function handleExitCancelled() {
    setExitConfirmationVisible(false);
  }

  const renderCard = ({item, index}: {item: Card; index: number}) => (
    <TouchableOpacity
      style={[
        styles.card,
        item.selected && styles.selectedCard,
        item.matched && styles.matchedCard,
      ]}
      onPress={() => handleCardPress(index)}>
      {item.matched || item.selected ? (
        <Text style={styles.cardText}>{item.symbol}</Text>
      ) : null}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImg}>
        <View style={styles.top}>
          <ScoreDisplay title={'Attempts'} score={attempts} />
          <ScoreDisplay title={'Matches'} score={matches} />
        </View>
        <FlatList
          style={{flex: 1}}
          data={board}
          renderItem={renderCard}
          keyExtractor={item => item.id.toString()}
          numColumns={4}
          contentContainerStyle={styles.board}
        />
        <Button title="Restart Game" onPress={restartGame} color={'#2ca8ce'} />
        <WinModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onRestart={restartGame}
        />
        <ExitConfirmationModal
          visible={exitConfirmationVisible}
          onExitConfirmed={handleExitConfirmed}
          onExitCancelled={handleExitCancelled}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  counter: {
    fontSize: 14,
  },
  board: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  card: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    backgroundColor: '#136bad',
    borderRadius: 5,
  },
  cardText: {
    fontSize: 30,
    color: '#f0dff2',
    fontWeight: 'bold',
  },
  selectedCard: {
    backgroundColor: '#87ceeb',
  },
  matchedCard: {
    backgroundColor: '#6bb36b',
  },
});

export default MemoryGame;
