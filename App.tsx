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

export default function App() {
  const isPressed = useSharedValue(false);
  const offset = useSharedValue({ x: 0, y: 0 });
  const start = useSharedValue({ x: 0, y: 0 });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: offset.value.x,
        },
        {
          translateY: offset.value.y,
        },
        {
          scale: withSpring(isPressed.value ? 1.5 : 1),
        },
      ],
      backgroundColor: isPressed.value ? 'orange' : 'blue',
    };
  });

  const gesture = Gesture.Pan()
    .onBegin(() => {
      isPressed.value = true;
    })
    .onUpdate((e) => {
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
    })
    .onFinalize(() => {
      isPressed.value = false;
    });

  const tapGesture = Gesture.Tap().onStart(() => {
    Alert.alert('Single tap!');
  });

  // const gesture = Gesture.Pan()
  //   .onStart(() => {
  //     console.log('here');
  //   })
  //   .onUpdate((event) => {
  //     console.log(event);
  //   })
  //   .onEnd(() => {
  //     console.log('endd');
  //   });

  // const tapGestureEvent =
  //   useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
  //     onStart: (tapEvent) => {
  //       console.log('in tap event');
  //     },
  //     onActive: () => {
  //       console.log('active');
  //     },
  //   });

  // const rBottomSheetStyle = useAnimatedStyle(() => {
  //   return {
  //     transform: [{ translateY: translateY.value }],
  //   };
  // });

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.ball, animatedStyles]} />
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    backgroundColor: 'blue',
    width: 300,
    height: 300,
    borderWidth: 4,
    borderColor: 'orange',
  },
  ball: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: 'blue',
    alignSelf: 'center',
  },
});
