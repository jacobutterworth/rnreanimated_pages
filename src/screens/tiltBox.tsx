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

const TiltBox: React.FC<Props> = ({}) => {
  const boxDimensions = {
    height: 10,
    width: 10,
  };

  const animatedSensor = useAnimatedSensor(SensorType.ROTATION, {
    interval: 100,
  });
  const animatedStyle = useAnimatedStyle(() => {
    const { pitch, yaw } = animatedSensor.sensor.value;
    return {
      transform: [
        { translateX: pitch * 200 + 20 },
        { translateY: yaw * 200 + 20 },
      ],
    };
  });
  console.log(animatedSensor.isAvailable);
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedStyle]} />
    </View>
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
    backgroundColor: 'black',
    height: 100,
    width: 100,
    // borderColor: 'blue',
    // borderWidth: 5,
    // borderRadius: 10,
    // borderBottomLeftRadius: 10,
  },
});
export default TiltBox;
