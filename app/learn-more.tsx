import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import learnMoreData from '../data/learn-more.json';
import { LearnMoreData, LearnMoreItem } from '../types';
import { useRouter, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Button from '@/components/Button';

const { width } = Dimensions.get('window');

const LearnMoreCarousel = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const flatListRef = useRef<FlatList<LearnMoreItem>>(null);
  const infoItems = (learnMoreData as LearnMoreData).data;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => router.back()}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
      ),
      title: 'What can we help with',
      headerShown: true,
    });
  }, [navigation, router]);

  const handleNext = () => {
    if (currentIndex < infoItems.length - 1) {
      flatListRef.current?.scrollToOffset({
        offset: (currentIndex + 1) * width,
        animated: true,
      });
      setCurrentIndex(currentIndex + 1);
    } else {
      router.push('/'); // Go back to landing page when on the last item
    }
  };

  const renderItem = ({ item }) => (
    <View style={[styles.itemContainer, { width }]}>
      <Text style={styles.header}>{item.header}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>
    </View>
  );

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
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.floor(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(newIndex);
        }}
      />
    <Button
        label={currentIndex < infoItems.length - 1 ? 'Next' : 'Done'}
        onPress={handleNext}
    />
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
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
});

export default LearnMoreCarousel;