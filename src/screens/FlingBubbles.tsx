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
import Bubble from '../components/Bubble';

export type Props = {};

let bubbleArray: React.ReactElement[] = [];
for (let i = 0; i > 40; i++) {
  bubbleArray.push(<Bubble></Bubble>);
}

// const FlingBubbles: React.FC<Props> = ({}) => {
//   return (
//     <GestureHandlerRootView style={styles.container}>
//       <GestureDetector>
//         <>
//           {bubbleArray.map(function (bubble) {
//             console.log(bubble);
//             return bubble;
//           })}
//         </>
//       </GestureDetector>
//     </GestureHandlerRootView>
//   );
// };
const FlingBubbles: React.FC<Props> = ({}) => {
  return (
    <View style={styles.container}>
      <Text>PLACEHOLDER</Text>
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
});

export default FlingBubbles;
