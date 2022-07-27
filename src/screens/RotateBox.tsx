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
  useAnimatedSensor,
  SensorType,
} from 'react-native-reanimated';
import {
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { ReactChild } from 'react';

interface Props {}
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const RotateBox: React.FC<Props> = ({}) => {
  //   const rotateShared = useSharedValue(0);
  const rotationX = useSharedValue(1);
  const rotationY = useSharedValue(1);
  // const savedRotation = useSharedValue({ x: 1, y: 1 });

  const rotation = useSharedValue(1);
  const savedRotation = useSharedValue(1);

  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);

  const animatedStyleRotate = useAnimatedStyle(() => {
    return {
      transform: [
        // {
        //   rotateZ: `${(rotationX.value / Math.PI) * 180}deg`,
        // },
        // {
        //   rotateZ: `${(rotationY.value / Math.PI) * 180}deg`,
        // },
        { rotateZ: `${(rotation.value / Math.PI) * 180}deg` },
        { scale: scale.value },
      ],
    };
  });
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  // const panGesture = Gesture.Pan()
  //   .onBegin(() => {})
  //   .onChange((e) => {
  //     if (e.absoluteX > SCREEN_WIDTH / 2) {
  //       rotationX.value = savedRotation.value.x - e.absoluteX / 100;
  //     } else {
  //       const rotateVar = -e.absoluteX;
  //       savedRotation.value.x = rotationX.value;
  //       rotationX.value = savedRotation.value.x - rotateVar / 100;
  //     }
  //     rotationY.value = savedRotation.value.y + e.absoluteY / 100;
  //   })
  //   .onEnd(() => {
  //     savedRotation.value.x = rotationX.value;
  //     savedRotation.value.y = rotationY.value;
  //   });

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = savedScale.value * e.scale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const rotateGesture = Gesture.Rotation()
    .onBegin((e) => {
      console.log('in begin');
    })
    .onUpdate((e) => {
      console.log(e);
      rotation.value = savedRotation.value + e.rotation;
    })
    .onEnd(() => {
      savedRotation.value = rotation.value;
    });

  const rotatePinch = Gesture.Simultaneous(pinchGesture, rotateGesture);
  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={rotatePinch}>
        <Animated.View style={[styles.box, animatedStyleRotate]} />
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
    backgroundColor: 'orange',
    height: 300,
    width: 300,
    // borderColor: 'blue',
    // borderWidth: 5,
    // borderRadius: 10,
    // borderBottomLeftRadius: 10,
  },
});
export default RotateBox;
