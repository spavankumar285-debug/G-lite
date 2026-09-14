import React, { useEffect, useRef } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

export default function IntroScreen() {
  const logoScale = useRef(new Animated.Value(0.75)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          friction: 7,
          tension: 55,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(taglineOpacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      router.replace("/");
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.brand,
            {
              opacity: logoOpacity,
              transform: [{ scale: logoScale }],
            },
          ]}
        >
          <View style={styles.logoCircle}>
            <Text style={styles.logoLetter}>G</Text>
          </View>

          <Text style={styles.logoName}>G-lite</Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.taglineContainer,
            { opacity: taglineOpacity },
          ]}
        >
          <Text style={styles.tagline}>
            BRING THE INNER YOU
          </Text>

          <Text style={styles.tagline}>
            OUT TO THE WORLD.
          </Text>

          <View style={styles.line} />

          <Text style={styles.smallText}>
            Discover • Connect • Express
          </Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },

  brand: {
    alignItems: "center",
  },

  logoCircle: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  logoLetter: {
    color: "#FFFFFF",
    fontSize: 48,
    fontWeight: "900",
  },

  logoName: {
    fontSize: 40,
    fontWeight: "900",
    letterSpacing: -1.5,
    color: "#111827",
  },

  taglineContainer: {
    alignItems: "center",
    marginTop: 28,
  },

  tagline: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 2,
    color: "#4B5563",
  },

  line: {
    width: 38,
    height: 1,
    backgroundColor: "#D1D5DB",
    marginVertical: 14,
  },

  smallText: {
    fontSize: 11,
    letterSpacing: 1,
    color: "#9CA3AF",
  },
});