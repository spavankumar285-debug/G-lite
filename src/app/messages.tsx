import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const chats = [
  ["A", "Ananya", "That music recommendation was nice!"],
  ["V", "Vishal", "Ready for the weekend ride?"],
  ["S", "Sneha", "Did you see that new movie?"],
];

export default function Messages() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Messages</Text>
            <Text style={styles.subtitle}>
              Stay connected with your people.
            </Text>
          </View>

          <Pressable style={styles.compose}>
            <Text style={styles.composeText}>+</Text>
          </Pressable>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
        >
          {chats.map(([letter, name, message]) => (
            <Pressable style={styles.chat} key={name}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{letter}</Text>
              </View>

              <View style={styles.chatInfo}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.message}>{message}</Text>
              </View>

              <Text style={styles.arrow}>›</Text>
            </Pressable>
          ))}

          <View style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>◇</Text>
            <Text style={styles.emptyTitle}>
              Your conversations live here
            </Text>
            <Text style={styles.emptyText}>
              Connect through shared interests and start a conversation.
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F7F8FA",
  },

  container: {
    flex: 1,
    paddingHorizontal: 18,
  },

  header: {
    paddingTop: 18,
    paddingBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    fontSize: 29,
    fontWeight: "900",
    color: "#111827",
  },

  subtitle: {
    marginTop: 5,
    fontSize: 12,
    color: "#6B7280",
  },

  compose: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
  },

  composeText: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "500",
  },

  list: {
    paddingBottom: 30,
  },

  chat: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 13,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E8EAED",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    fontSize: 17,
    fontWeight: "900",
    color: "#111827",
  },

  chatInfo: {
    flex: 1,
    marginLeft: 12,
  },

  name: {
    fontSize: 14,
    fontWeight: "800",
    color: "#111827",
  },

  message: {
    marginTop: 4,
    fontSize: 11,
    color: "#737983",
  },

  arrow: {
    fontSize: 24,
    color: "#A0A5AD",
  },

  emptyCard: {
    marginTop: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 28,
    alignItems: "center",
  },

  emptyIcon: {
    fontSize: 35,
    color: "#111827",
    marginBottom: 12,
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#111827",
    textAlign: "center",
  },

  emptyText: {
    marginTop: 7,
    fontSize: 12,
    lineHeight: 18,
    color: "#777D86",
    textAlign: "center",
  },
});