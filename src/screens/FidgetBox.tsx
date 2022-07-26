import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View } from 'react-native';
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
} from 'react-native-gesture-handler';
import { ReactChild } from 'react';

interface Props {
  children: ReactChild;
}

const FidgetBox: React.FC<Props> = ({}) => {
  const size = useSharedValue({ width: 30, height: 30 });
  const originalSize = useSharedValue({ width: 30, height: 30 });
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scaleX: withTiming(size.value.width, {duration: 50}),
        },
        {
          scaleY: withTiming(size.value.height, {duration: 50}),
        },
      ],
    };
  });

  const tapGesture = Gesture.Tap()
    .onTouchesDown((e) => {
      size.value = {
        height: size.value.height + 10,
        width: size.value.width + 10,
      };
    })
    .onFinalize((e) => {
      size.value = {
        height: originalSize.value.height,
        width: originalSize.value.width,
      };
    });

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={tapGesture}>
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
    // width: 300,
    // height: 300,
    borderColor: 'blue',
    borderWidth: 5,
    borderRadius: 4,
  },
});

export default FidgetBox;
