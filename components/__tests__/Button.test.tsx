import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../Button';

describe('Button Component', () => {
    it('renders correctly with default props', () => {
        const { getByText } = render(<Button label="Click Me" />);
        expect(getByText('Click Me')).toBeTruthy();
    });

    it('renders with primary theme', () => {
        const { getByText } = render(<Button label="Primary" theme="primary" />);
        const button = getByText('Primary');
        expect(button).toBeTruthy();
    });

    it('calls onPress when pressed', () => {
        const onPressMock = jest.fn();
        const { getByText } = render(<Button label="Press Me" onPress={onPressMock} />);
        const button = getByText('Press Me');
        fireEvent.press(button);
        expect(onPressMock).toHaveBeenCalledTimes(1);
    });

    it('does not call onPress when disabled', () => {
        const onPressMock = jest.fn();
        const { getByText } = render(<Button label="Disabled" onPress={onPressMock} disabled={true} />);
        const button = getByText('Disabled');
        fireEvent.press(button);
        expect(onPressMock).not.toHaveBeenCalled();
    });
});
