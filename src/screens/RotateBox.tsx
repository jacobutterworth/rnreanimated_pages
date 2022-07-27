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

const RotateBox: React.FC<Props> = ({}) => {
//   const rotateShared = useSharedValue(0);
  const rotation = useSharedValue(1);
  const savedRotation = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
            rotateZ: `${(rotation.value / Math.PI) * 180}deg` 
        }
      ],
    };
  });

  const panGesture = Gesture.Pan()
    .onBegin(() => {})
    .onChange((e) => {
        console.log('change')
        rotation.value = savedRotation.value - (e.absoluteX/100);
        rotation.value = savedRotation.value + (e.absoluteY/100);
    }).onEnd(()=>{
        console.log('end')
        savedRotation.value = rotation.value

    });

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.box, animatedStyle]} />
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
