import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Slot, usePathname, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const navigationItems = [
  { name: "index", label: "Home", icon: "⌂" },
  { name: "reels", label: "Reels", icon: "▶" },
  { name: "create", label: "Create", icon: "+" },
  { name: "connect", label: "Connect", icon: "◎" },
  { name: "messages", label: "Messages", icon: "◇" },
  { name: "profile", label: "Profile", icon: "○" },
];

export default function AppTabs() {
  const router = useRouter();
  const pathname = usePathname();

  const currentScreen =
    pathname === "/"
      ? "index"
      : pathname.replace("/", "");

  return (
    <SafeAreaView style={styles.safeArea} edges={["bottom"]}>
      <View style={styles.container}>
        {/* CURRENT SCREEN */}
        <View style={styles.screen}>
          <Slot />
        </View>

        {/* G-LITE NAVIGATION */}
        <View style={styles.bottomNav}>
          {navigationItems.map((item) => {
            const active = currentScreen === item.name;

            return (
              <Pressable
                key={item.name}
                style={styles.navItem}
                onPress={() => router.push(`/${item.name}`)}
              >
                <View
                  style={[
                    styles.iconContainer,
                    active && styles.activeIconContainer,
                  ]}
                >
                  <Text
                    style={[
                      styles.navIcon,
                      active && styles.activeIcon,
                      item.name === "create" && styles.createIcon,
                    ]}
                  >
                    {item.icon}
                  </Text>
                </View>

                <Text
                  style={[
                    styles.navLabel,
                    active && styles.activeLabel,
                  ]}
                >
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7F8FA",
  },

  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
  },

  screen: {
    flex: 1,
  },

  bottomNav: {
    minHeight: 72,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E9EAED",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 4,
    paddingTop: 6,
    paddingBottom: 5,
  },

  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 50,
  },

  iconContainer: {
    width: 34,
    height: 30,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  activeIconContainer: {
    backgroundColor: "#F0F1F3",
  },

  navIcon: {
    fontSize: 20,
    color: "#9CA3AF",
    fontWeight: "700",
  },

  activeIcon: {
    color: "#111827",
  },

  createIcon: {
    fontSize: 25,
    fontWeight: "900",
  },

  navLabel: {
    fontSize: 8,
    fontWeight: "700",
    color: "#9CA3AF",
    marginTop: 2,
  },

  activeLabel: {
    color: "#111827",
    fontWeight: "900",
  },
});