import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import quizData from '../data/quiz.json';
import { QuizData, Question, Option } from '../types';
import { useRouter, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Button from '@/components/Button';

const QuizScreen = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponses, setUserResponses] = useState<Record<number, Option | null>>({});
  const [showResult, setShowResult] = useState(false);
  const [isRejected, setIsRejected] = useState<boolean | null>(null);
  const [isNextButtonEnabled, setIsNextButtonEnabled] = useState(false);

  const router = useRouter();
  const navigation = useNavigation();
  const questions = (quizData as QuizData).questions;
  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    navigation.setOptions({
      title: 'Quiz',
      headerLeft: currentQuestionIndex > 0 && !showResult ? () => (
        <TouchableOpacity style={{ marginLeft: 15 }} onPress={handlePrevious}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      ) : undefined,
    });
  }, [navigation, currentQuestionIndex, showResult]);

  const handleAnswer = (selectedOption: Option) => {
    setUserResponses({
      ...userResponses,
      [currentQuestionIndex]: selectedOption,
    });
    setIsNextButtonEnabled(true);
  };

  const handleNext = () => {
    const selectedOption = userResponses[currentQuestionIndex];
    if (selectedOption) {
      if (selectedOption.isRejection) {
        setIsRejected(true);
        setShowResult(true);
      } else if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setIsNextButtonEnabled(false); // Disable for the new question
      } else {
        setIsRejected(false);
        setShowResult(true);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setIsNextButtonEnabled(!!userResponses[currentQuestionIndex - 1]); // Enable if there was a previous response
    }
  };

  const handleOk = () => {
    router.push('/'); // Redirect to the landing page
  };

  if (showResult) {
    return (
      <View style={styles.container}>
        {isRejected === true && (
          <Text style={styles.result}>
            Unfortunately, we are unable to prescribe this medication for you. This is because
            finasteride can alter the PSA levels, which may be used to monitor for cancer. You should
            discuss this further with your GP or specialist if you would still like this medication.
          </Text>
        )}
        {isRejected === false && (
          <Text style={styles.successResult}>
            Great news! We have the perfect treatment for your hair loss. Proceed to{' '}
            <Text style={{ fontWeight: 'bold' }}>www.manual.co</Text>, and prepare to say hello to
            your new hair!
          </Text>
        )}
        <Button label="OK" onPress={handleOk} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{currentQuestion.question}</Text>
      <View style={styles.optionsContainer}>
        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              userResponses[currentQuestionIndex]?.value === option.value && styles.selectedOption,
              currentQuestion.type === 'ChoiceTypeImage' && styles.imageOptionButton,
            ]}
            onPress={() => handleAnswer(option)}
          >
            {currentQuestion.type === 'ChoiceTypeImage' && (
              <Image source={{ uri: option.display }} style={styles.imageOption} resizeMode="contain" />
            )}
            {currentQuestion.type === 'ChoiceTypeText' && (
              <Text style={styles.optionText}>{option.display}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
     
          <Button
            label="NEXT"
            onPress={handleNext}
            disabled={!isNextButtonEnabled}
          />
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ECF0EBFA',
    padding: 20,
  },
  question: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  optionsContainer: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  optionButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '45%',
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: 'lightblue',
    borderColor: 'blue',
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
  },
  imageOptionButton: {
    width: '30%',
    height: 120,
    justifyContent: 'center',
  },
  imageOption: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
  },
  navigation: {
    flexDirection: 'row',
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  result: {
    fontSize: 18,
    textAlign: 'center',
    color: 'red',
    marginBottom: 20,
  },
  successResult: {
    fontSize: 18,
    textAlign: 'center',
    color: 'green',
    marginBottom: 20,
  },
});

export default QuizScreen;