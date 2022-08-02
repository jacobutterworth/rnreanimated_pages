import { StatusBar } from 'expo-status-bar';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
} from 'react-native';
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
import { ReactChild, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';

interface Props {
  children: ReactChild;
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const FidgetBox2: React.FC<Props> = ({}) => {
  const size = useSharedValue({ height: 100, width: 100 });
  const originalSize = useSharedValue({ width: 30, height: 30 });
  const offset = useSharedValue({ x: 0, y: 0 });
  const start = useSharedValue({ x: 0, y: 0 });
  const isPressed = useSharedValue(false);
  const position = useSharedValue(0);

  const [weight, setWeight] = useState(0.8);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(offset.value.x, {
            damping: 10,
            mass: weight,
            stiffness: 200,
            // overshootClamping: true,
          }),
        },
        {
          translateY: withSpring(offset.value.y, {
            damping: 10,
            mass: weight,
            stiffness: 200,
            // overshootClamping: true,
          }),
        },
        {
          translateY: position.value,
        },
        {
          scale: withSpring(isPressed.value ? 0.75 : 1),
        },
      ],
      height: size.value.height,
      width: size.value.width,
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
    })
    .onFinalize(() => {
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
    });

  const dragFling = Gesture.Simultaneous(panGesture);

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={dragFling}>
        <Animated.View style={[styles.box, animatedStyle]}></Animated.View>
      </GestureDetector>
      <View style={styles.bottomButton}>
        <Text style={{ fontSize: 18 }}> Current weight:</Text>
        <View style={styles.weightAdjust}>
          {/* <View></View> */}
          <AntDesign
            name="minus"
            size={40}
            color="black"
            style={styles.adjustButton}
            onPress={() => {
              if (weight < 0.1) {
                setWeight(0.000001);
              } else {
                setWeight(weight - 0.2);
              }
            }}
          />
          <Text style={{ fontSize: 18 }}> {weight.toFixed(1)}</Text>
          <AntDesign
            name="plus"
            size={40}
            color="black"
            style={styles.adjustButton}
            onPress={() => {
              setWeight(weight + 0.2);
            }}
          />
        </View>
      </View>
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
    marginTop: SCREEN_HEIGHT / 2,
    borderColor: 'blue',
    borderWidth: 5,
    borderRadius: 10,
    // borderBottomLeftRadius: 10,
    overflow: 'hidden',
  },
  bottomButton: {
    marginHorizontal: 40,
    justifyContent: 'flex-end',
    flex: 1,
    marginBottom: 20,
    // borderColor: 'red',
    // borderWidth: 2,
    alignItems: 'center',
  },
  weightAdjust: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    flexBasis: 'auto',
    // borderColor: 'blue',
    // borderWidth: 2
  },
  adjustButton: {
    // borderColor: 'red',
    // borderWidth: 2,
    paddingHorizontal: 20,
  },
  debug: {
    borderColor: 'red',
    borderWidth: 2,
  },
});

export default FidgetBox2;
