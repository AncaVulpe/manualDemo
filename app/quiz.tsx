import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import quizData from '../data/quiz.json';
import { QuizData, Question, Option } from '../types';
import { useRouter, useNavigation, Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Button from '@/components/Button';
import { 
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

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
          <Text style={[styles.text, {marginTop: hp(12), textAlign: 'left'}]}>
            Unfortunately, we are unable to prescribe this medication for you. This is because
            finasteride can alter the PSA levels, which may be used to monitor for cancer. You should
            discuss this further with your GP or specialist if you would still like this medication.
          </Text>
        )}
        {isRejected === false && (
          <Text style={[styles.text, {marginTop: hp(12), textAlign: 'left'}]}>
            Great news! We have the perfect treatment for your hair loss. Proceed to{' '}
            <TouchableOpacity onPress={() => Linking.openURL('https://www.manual.co')}>
                <Text style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}>
                    www.manual.co
                </Text>
            </TouchableOpacity>, and prepare to say hello to
            your new hair!
          </Text>
        )}
        <Button label="OK" onPress={handleOk} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <Text style={[styles.text, {marginTop: hp(12)}]}>{currentQuestion.question}</Text>
        <View style={[styles.optionsContainer, currentQuestion.type === 'ChoiceTypeImage' && { flexDirection: 'row' }]}>
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
                <Image source={{ uri: option.display }} alt={option.value as string} style={styles.imageOption} resizeMode="contain" />
                )}
                {currentQuestion.type === 'ChoiceTypeText' && (
                <Text style={styles.text}>{option.display}</Text>
                )}
            </TouchableOpacity>
            ))}
        </View>
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
    padding: hp(2.2),
  },
  questionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },    
  text: {
    fontSize: hp(3.2),
    fontFamily: 'TT Norms',
    color: '#0B3B3C',
    textAlign: 'center',  
    lineHeight: hp(4.5),
    fontWeight: 500,
    letterSpacing: -0.03,
    padding: hp(2.2),
  },
  optionsContainer: {
    width: '100%',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: hp(2.2),
  },
  optionButton: {
    borderWidth: 1,
    borderColor: '#A5B79F',
    borderRadius: hp(2.8),
    width: wp(96),
    alignItems: 'center',
    marginBottom: hp(2),
  },
  selectedOption: {
    backgroundColor: '#A5B79F',
    borderRadius: hp(2.8),
  },
  imageOptionButton: {
    width: wp(30),
    height: wp(30),
    justifyContent: 'center',
    marginTop: wp(3),
    borderColor: '#ECF0EBFA',
  },
  imageOption: {
    width: wp(30),
    height: wp(30),
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