import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import learnMoreData from '../data/learn-more.json';
import { LearnMoreData, LearnMoreItem } from '../types';
import { useRouter, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Button from '@/components/Button';
import hairLoss from '../assets/images/hairLossInfoIllustration.png';
import erectileDysfunction from '../assets/images/erectileDysfunctionInfoIllustration.png';
import { 
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const { width } = Dimensions.get('window');

const LearnMoreCarousel = () => {
  //hooks region
  const router = useRouter();
  const navigation = useNavigation();
  const flatListRef = useRef<FlatList<LearnMoreItem>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={{ marginLeft: 12 }} onPressOut={() => router.back()}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
      ),
      title: 'What can we help with',
    });
  }, [navigation, router]);
  //endregion

  const infoItems = (learnMoreData as LearnMoreData).data;

  const handleNext = () => {
    if (currentIndex < infoItems.length - 1) {
      flatListRef.current?.scrollToOffset({
        offset: (currentIndex + 1) * width,
        animated: true,
      });
    } else {
      router.push('/');
    }
  };

  const renderItem = ({ item }: { item: LearnMoreItem }) => {
    const imageSrc = item.id %2 === 1 ? hairLoss : erectileDysfunction;
    const imageId = item.id < 10? `0${item.id}`: item.id;

    return (
    <View style={[styles.itemContainer, { width }]}>
      {item.id %2 === 1 && (<View style={styles.imageContainer}>
        <Image source={imageSrc} alt={item.assetID} style={styles.image} resizeMode="contain"/>
        <Text style={styles.imageText}>{imageId}</Text>
      </View>)}
      {item.id %2 === 0 && (<View style={styles.imageContainer}>
        <Text style={styles.imageText}>{imageId}</Text>
        <Image source={imageSrc} alt={item.assetID} style={styles.image} resizeMode="contain"/>
      </View>)}
      <View style={styles.contentContainer}>
        <Text style={styles.headerText}>{item.header}</Text>
        <Text style={styles.titleText}>{item.title}</Text>
        <Text style={styles.subtitleText}>{item.subtitle}</Text>
      </View>
    </View>
  )};

  const renderPageIndicator = () => {
    return (
      <View style={styles.pageIndicatorContainer}>
        {infoItems.map((_, index) => (
          <View
            key={index}
            style={[
              styles.pageIndicatorDot,
              index === currentIndex && styles.activePageIndicatorDot,
            ]}
          />
        ))}
      </View>
    );
  };

  const handleScrollEnd = (event) => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(newIndex);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={infoItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
      />
      <View style={styles.controlsContainer}>
        {renderPageIndicator()}
        <Button
          label={currentIndex < infoItems.length - 1 ? 'NEXT' : 'DONE'}
          onPress={handleNext}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECF0EBFA',
    
  },
  itemContainer: {
    flex: 1,
    padding: hp(2.2),
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: hp(4),
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  image: {
    height: hp(23.1),
    borderRadius: 10,
  },
  imageText:{
    fontSize: hp(20.6),
    fontFamily: 'TT Norms',
    color: '#FFFFFF',
    textAlign: 'center',  
    lineHeight: hp(20.6),
    fontWeight: 500,
    letterSpacing: -0.02,
  },
  contentContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: hp(2.2),
  },
  headerText: {
    fontSize: hp(1.3),
    fontFamily: 'TT Norms',
    color: '#6D8A83',
    textAlign: 'left',  
    lineHeight: hp(1.7),
    fontWeight: 700,
    letterSpacing: 0.15,
  },
  titleText: {
    fontSize: hp(3.2),
    fontFamily: 'TT Norms',
    color: '#0B3B3C',
    textAlign: 'left',  
    lineHeight: hp(4.5),
    fontWeight: 500,
    letterSpacing: -0.03,
    marginTop: hp(1.1),
  },
  subtitleText: {
    fontSize: hp(2.1),
    fontFamily: 'TT Norms',
    color: '#0B3B3C',
    textAlign: 'left',  
    lineHeight: hp(3.4),
    fontWeight: 400,
    marginTop: hp(1.1),
    letterSpacing: 0,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  pageIndicatorContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  pageIndicatorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activePageIndicatorDot: {
    backgroundColor: '#0B3B3C', 
  },
});

export default LearnMoreCarousel;