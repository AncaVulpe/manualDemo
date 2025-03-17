import { StyleSheet, View, Pressable, Text } from 'react-native';
import { 
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from 'react-native-responsive-screen';

type Props = {
  label: string;
  theme?: 'primary';
  onPress?: () => void;
  disabled?: boolean;
};

const Button = ({ label, theme, disabled, onPress }: Props)  => {
  if (theme === 'primary') {
    return (
      <View
        style={styles.buttonContainer}>
        <Pressable style={[styles.button, { backgroundColor: '#7E0707' }]} onPress={onPress} disabled={disabled === undefined ? false : disabled}>
          <Text style={[styles.buttonLabel, { color: '#FFFFFF' }]}>{label}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.buttonContainer}>
      <Pressable style={[styles.button, disabled === true && {opacity: 0.5}]} onPress={onPress} disabled={disabled === undefined ? false : disabled}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: wp(100),
    height: hp(13.7),
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: hp(3.4),
    paddingBottom: hp(3.4),
    paddingLeft: wp(4.4),
    paddingRight: wp(4.4),
  },
  button: {
    borderRadius: 100,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0B3B3C',
  },
  buttonLabel: {
    color: '#FFFFFF',
    fontSize: hp(1.8),
    fontFamily: 'TT Norms',
    textAlign: 'center',  
    fontWeight: 500,
  },
});

export default Button;
