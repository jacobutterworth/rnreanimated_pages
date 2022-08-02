import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

export type Props = {};

const Bubble: React.FC<Props> = ({}) => {
  const SCREEN_WIDTH = Dimensions.get('window').width;
  const SCREEN_HEIGHT = Dimensions.get('window').height;
  const circleSize = Math.floor(Math.random() * 300);
  const size = useSharedValue({
    height: circleSize,
    width: circleSize,
  });
  console.log(size.value.height);

  console.log(size.value.width);
  const bubbleStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: circleSize / 2 },
        { translateY: circleSize / 1.4 },
      ],
      height: size.value.height,
      width: size.value.width,
    };
  });

  return <Animated.View style={[styles.bubble, bubbleStyle]}></Animated.View>;
};

const styles = StyleSheet.create({
  bubble: {
    borderRadius: 100,
    borderWidth: 2,
    backgroundColor: 'grey',
  },
});

export default Bubble;
