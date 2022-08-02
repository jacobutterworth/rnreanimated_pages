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

interface Props {}

const TiltBox: React.FC<Props> = ({}) => {
  const boxDimensions = {
    height: 300,
    width: 300,
  };
  const size = useSharedValue({ width: 5, height: 5 });
  const originalSize = useSharedValue({ width: 10, height: 10 });

  const animatedSensor = useAnimatedSensor(SensorType.ROTATION, {
    interval: 100,
  });
  const animatedStyle = useAnimatedStyle(() => {
    const { pitch, yaw } = animatedSensor.sensor.value;
    return {
      transform: [
        {
          scaleX: withTiming(size.value.width, { duration: 50 }),
        },
        {
          scaleY: withTiming(size.value.height, { duration: 50 }),
        },
      ],
      height: size.value.width + yaw * 20,
      width: size.value.height + pitch * 20,
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
  console.log(animatedSensor.isAvailable);
  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={tapGesture}>
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
    backgroundColor: 'black',
    // height: 100,
    // width: 100,
    // borderColor: 'blue',
    // borderWidth: 5,
    // borderRadius: 10,
    // borderBottomLeftRadius: 10,
  },
});
export default TiltBox;
