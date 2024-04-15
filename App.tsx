import React, { useState } from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface Card {
  id: number;
  symbol: string;
  matched: boolean;
  selected: boolean;
}

const symbols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

const MemoryGame = () => {
  const [board, setBoard] = useState<Card[]>(generateBoard());
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [attempts, setAttempts] = useState<number>(0);
  const [matches, setMatches] = useState<number>(0);

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
    // let currentIndex = array.length;
    // let temporaryValue: any, randomIndex: number;

    // while (currentIndex !== 0) {
    //   randomIndex = Math.floor(Math.random() * currentIndex);
    //   currentIndex -= 1;
    //   temporaryValue = array[currentIndex];
    //   array[currentIndex] = array[randomIndex];
    //   array[randomIndex] = temporaryValue;
    // }
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
            Alert.alert('Congratulations!', "You've matched all cards!", [
              {text: 'OK', onPress: restartGame},
            ]);
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
  }

  return (
    <View style={styles.container}>
      <View style={styles.board}>
        {board.map((card, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.card,
              card.selected && styles.selectedCard,
              card.matched && styles.matchedCard,
            ]}
            onPress={() => handleCardPress(index)}>
            {card.matched || card.selected ? (
              <Text style={styles.cardText}>{card.symbol}</Text>
            ) : null}
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.infoText}>Attempts: {attempts}</Text>
      <Text style={styles.infoText}>Matches: {matches}</Text>
      <Button title="Restart Game" onPress={restartGame} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  card: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
  cardText: {
    fontSize: 30,
  },
  selectedCard: {
    backgroundColor: '#34d5eb',
  },
  matchedCard: {
    backgroundColor: '#90ee90', // Light green for matched cards
  },
  infoText: {
    marginTop: 20,
    fontSize: 20,
  },
});

export default MemoryGame;
