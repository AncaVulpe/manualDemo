import quizData from '../../data/quiz.json';
import { QuizData } from '../../types';
import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';
import QuizScreen from '../quiz';
import { useNavigation, useRouter } from 'expo-router';
import { Linking } from 'react-native';

jest.mock('expo-router', () => ({
    useRouter: jest.fn(),
    useNavigation: jest.fn(),
}));

jest.mock('../../data/quiz.json', () => ({
    questions: [
      {
        question: 'Question 1',
        type: 'ChoiceTypeText',
        options: [
          { display: 'Answer A', value: 'a', isRejection: false },
          { display: 'Answer B', value: 'b', isRejection: true },
        ],
      },
      {
        question: 'Question 2',
        type: 'ChoiceTypeText',
        options: [
          { display: 'Answer C', value: 'c', isRejection: false },
        ],
      },
    ],
}));

describe('QuizScreen', () => {
    let mockNavigation;

    beforeEach(() => {
        mockNavigation = { setOptions: jest.fn(), goBack: jest.fn() };
        (useNavigation as jest.Mock).mockReturnValue(mockNavigation);
        (useRouter as jest.Mock).mockReturnValue({ push: jest.fn(), back: jest.fn() });
    });

    it('renders the first question and options', () => {
        const { getByText } = render(<QuizScreen />);
        expect(getByText('Question 1')).toBeTruthy();
        expect(getByText('Answer A')).toBeTruthy();
        expect(getByText('Answer B')).toBeTruthy();
        expect(getByText('NEXT')).toBeDisabled();
      });
    
    it('enables the NEXT button after an answer is selected', () => {
    const { getByText } = render(<QuizScreen />);
    const answerAButton = getByText('Answer A');
    fireEvent.press(answerAButton);
    expect(getByText('NEXT')).toBeEnabled();
    });

    it('navigates to the next question on NEXT press', () => {
    const { getByText } = render(<QuizScreen />);
    const answerAButton = getByText('Answer A');
    fireEvent.press(answerAButton);
    const nextButton = getByText('NEXT');
    fireEvent.press(nextButton);
    expect(getByText('Question 2')).toBeTruthy();
    expect(getByText('NEXT')).toBeDisabled();
    });

    it('shows rejection message if a rejecting answer is selected', () => {
    const { getByText } = render(<QuizScreen />);
    const answerBButton = getByText('Answer B');
    fireEvent.press(answerBButton);
    const nextButton = getByText('NEXT');
    fireEvent.press(nextButton);
    expect(getByText('Unfortunately, we are unable to prescribe this medication for you. This is because finasteride can alter the PSA levels, which may be used to monitor for cancer. You should discuss this further with your GP or specialist if you would still like this medication.')).toBeTruthy();
    });

    it('shows success message on completing the quiz without rejection', () => {
    const { getByText } = render(<QuizScreen />);
    const answerAButton = getByText('Answer A');
    fireEvent.press(answerAButton);
    const nextButton = getByText('NEXT');
    fireEvent.press(nextButton); // Go to question 2
    const answerCButton = getByText('Answer C');
    fireEvent.press(answerCButton);
    const finalNextButton = getByText('NEXT');
    fireEvent.press(finalNextButton);
    expect(getByText('www.manual.co')).toBeTruthy();
    });

    it('opens the website link on the success result page', () => {
    const { getByText } = render(<QuizScreen />);
    const answerAButton = getByText('Answer A');
    fireEvent.press(answerAButton);
    const nextButton = getByText('NEXT');
    fireEvent.press(nextButton); // Go to question 2
    const answerCButton = getByText('Answer C');
    fireEvent.press(answerCButton);
    const finalNextButton = getByText('NEXT');
    fireEvent.press(finalNextButton);
    const linkText = getByText('www.manual.co');
    fireEvent.press(linkText);
    expect(Linking.openURL).toHaveBeenCalledWith('https://www.manual.co');
    });
});