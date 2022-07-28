import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View, Dimensions } from 'react-native';
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  useAnimatedGestureHandler,
  withSpring,
} from 'react-native-reanimated';
import {
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
  Directions,
} from 'react-native-gesture-handler';
import { ReactChild } from 'react';

interface Props {
  children: ReactChild;
}

const SCREEN_WIDTH = Dimensions.get('window').width;

const FidgetBox2: React.FC<Props> = ({}) => {
  const size = useSharedValue({ height: 100, width: 100 });
  const originalSize = useSharedValue({ width: 30, height: 30 });
  const offset = useSharedValue({ x: 0, y: 0 });
  const start = useSharedValue({ x: 0, y: 0 });
  const isPressed = useSharedValue(false);
  const position = useSharedValue(0);


  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(offset.value.x, {
            damping: 10,
            mass: 0.8,
            stiffness: 200,
            // overshootClamping: true,
          }),
        },
        {
          translateY: withSpring(offset.value.y, {
            damping: 10,
            mass: 0.8,
            stiffness: 200,
            // overshootClamping: true,
          }),
        },
        {
            translateY: position.value
        },
        {
          scale: withSpring(isPressed.value ? 0.75 : 1),
        },
      ],
      height: size.value.height,
      width: size.value.width
    };
  });

  const distance = (a: number, b: number) => {
    'worklet';
    return Math.sqrt(a * a + b * b);
  };

  const panGesture = Gesture.Pan()
    .hitSlop({ vertical: 100, horizontal: 100 })
    .onBegin(() => {
      isPressed.value = true;
    })
    .onChange((e) => {
      offset.value = {
        x: e.translationX + start.value.x,
        y: e.translationY + start.value.y,
      };
    })
    .onEnd(() => {
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
      };
      isPressed.value = false;
    });

  const flingGesture = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onStart((e) => {
        console.log('in fkd');
        
      position.value = withTiming(position.value + 300, { duration: 100 });
    }).onEnd();


    const dragFling = Gesture.Simultaneous(panGesture, flingGesture);


  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={dragFling}>
        <Animated.View style={[styles.box, animatedStyle]}></Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {

    borderColor: 'blue',
    borderWidth: 5,
    borderRadius: 10,
    // borderBottomLeftRadius: 10,
    overflow: 'hidden',
  },
});

export default FidgetBox2;