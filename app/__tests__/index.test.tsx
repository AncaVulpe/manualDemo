import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useRouter } from 'expo-router';
import LandingScreen from '../index';

jest.mock('expo-router');

describe('LandingScreen', () => {
    const mockPush = jest.fn();

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the logo, title, subtitle, and buttons correctly', () => {
        const { getByText, getByTestId } = render(<LandingScreen />);

        expect(getByText('Be good')).toBeTruthy();
        expect(getByText('to yourself')).toBeTruthy();
        expect(getByText('TAKE THE QUIZ')).toBeTruthy();
    });

    it('navigates to /quiz when the "TAKE THE QUIZ" button is pressed', () => {
        const { getByText } = render(<LandingScreen />);
        const takeQuizButton = getByText('TAKE THE QUIZ');

        fireEvent.press(takeQuizButton);

        expect(mockPush).toHaveBeenCalledWith('/quiz');
    });
});
