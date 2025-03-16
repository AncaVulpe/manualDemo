import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { 
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import logo from '../assets/svgs/logo.svg';
import Button from '@/components/Button';

const LandingScreen = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Be good </Text>
        <Text style={styles.title}>to yourself</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>We’re working around the clock to bring you a holistic approach to your wellness. From top to bottom, inside and out.</Text>
        </View>
      </View>
      <Link href="/learn-more" style={styles.link}>
        LEARN MORE
      </Link>
      <Button label="TAKE THE QUIZ" theme='primary' onPress={() => {router.push('/quiz')}}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A5B79F',
    alignItems: 'center',
    justifyContent:'flex-end'
  },
  logo: {
    width: hp(16.8),
    height: hp(16.8),
    marginTop: hp(9),
  },
  titleContainer: {
    marginTop: hp(4.1),
  },
  title: {
    fontSize: hp(8),
    fontFamily: 'TT Norms',
    color: '#0B3B3C',
    textAlign: 'center',  
    lineHeight: hp(9.1),
    fontWeight: 500,
    letterSpacing: -0.03,
  },
  subtitleContainer: {
    marginTop: hp(4.1),
    paddingLeft: wp(4.4),
    paddingRight: wp(4.4),
    marginBottom: hp(1.1),
  },
  subtitle: {
    fontSize: hp(2.1),
    fontFamily: 'TT Norms',
    color: '#0B3B3C',
    textAlign: 'center',  
    lineHeight: hp(3.4),
    fontWeight: 400,
    letterSpacing: 0,
  },
  link:{
    fontSize: hp(1.8),
    fontFamily: 'TT Norms',
    color: '#0B3B3C',
    textAlign: 'center',  
    lineHeight: hp(3.4),
    fontWeight: 400,
    letterSpacing: 0,
    textDecorationLine: 'underline',
    marginTop: hp(15.9),
  }
});

export default LandingScreen;