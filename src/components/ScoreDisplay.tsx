import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ScoreDisplay = ({title, score}: {title: String; score: any}) => {
  return (
    <View style={styles.container}>
      <View style={styles.attemptsContainer}>
        <Text style={styles.label}>{title}:</Text>
      </View>
      <View style={styles.scoreContainer}>
        <Text style={styles.score}>{score}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 30,
    width: 120,
    borderRadius: 5,
    borderWidth: 2.6,
    borderColor: 'black',
    flexDirection: 'row',
  },
  attemptsContainer: {
    flex: 4,
    backgroundColor: '#6bb36b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreContainer: {
    flex: 1.7,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: 'white',
  },
  score: {
    fontSize: 14,
    color: 'white',
  },
});

export default ScoreDisplay;
