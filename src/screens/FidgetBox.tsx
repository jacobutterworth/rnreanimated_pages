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
} from 'react-native-gesture-handler';
import { ReactChild } from 'react';

interface Props {
  children: ReactChild;
}

const SCREEN_WIDTH = Dimensions.get('window').width;

const FidgetBox: React.FC<Props> = ({}) => {
  const size = useSharedValue({ height: 100, width: 100 });
  const originalSize = useSharedValue({ width: 30, height: 30 });
  const bottomCurve = useSharedValue({
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  });

  const topCurve = useSharedValue({
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      borderBottomLeftRadius: bottomCurve.value.borderBottomLeftRadius,
      borderBottomRightRadius: bottomCurve.value.borderBottomRightRadius,
      borderTopLeftRadius: topCurve.value.borderTopLeftRadius,
      borderTopRightRadius: topCurve.value.borderTopRightRadius,
    };
  });

  const distance = (a: number, b: number) => {
    'worklet';
    return Math.sqrt(a * a + b * b);
  };

  const panGesture = Gesture.Pan()
    .hitSlop({ vertical: 100, horizontal: 100 })
    .onBegin(() => {
      bottomCurve.value = {
        borderBottomLeftRadius: bottomCurve.value.borderBottomLeftRadius / 1.2,
        borderBottomRightRadius:
          bottomCurve.value.borderBottomRightRadius / 1.2,
      };
    })
    .onChange((e) => {
      let changeDistance = distance(e.changeX, e.changeY);
      e.changeX = e.changeX * 2;
      e.changeY = e.changeY * 4;
      bottomCurve.value = {
        borderBottomLeftRadius:
          bottomCurve.value.borderBottomLeftRadius - e.changeY,
        borderBottomRightRadius:
          bottomCurve.value.borderBottomRightRadius - e.changeY,
      };
      bottomCurve.value = {
        borderBottomLeftRadius:
          bottomCurve.value.borderBottomLeftRadius + e.changeX,
        borderBottomRightRadius:
          bottomCurve.value.borderBottomRightRadius - e.changeX,
      };

      topCurve.value = {
        borderTopRightRadius: topCurve.value.borderTopRightRadius + e.changeY,
        borderTopLeftRadius: topCurve.value.borderTopLeftRadius + e.changeY,
      };
      topCurve.value = {
        borderTopRightRadius: topCurve.value.borderTopRightRadius - e.changeX,
        borderTopLeftRadius: topCurve.value.borderTopLeftRadius + e.changeX,
      };
    });

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={panGesture}>
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
    height: 550,
    width: 350,
    borderColor: 'blue',
    borderWidth: 5,
    // borderRadius: 10,
    // borderBottomLeftRadius: 10,
    overflow: 'hidden'
  },
});

export default FidgetBox;
