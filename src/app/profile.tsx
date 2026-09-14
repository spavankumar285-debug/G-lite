import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <View style={styles.topBar}>
          <Text style={styles.title}>Profile</Text>

          <Pressable style={styles.settings}>
            <Text style={styles.settingsText}>⚙</Text>
          </Pressable>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>P</Text>
          </View>

          <Text style={styles.name}>Your G-lite Profile</Text>

          <Text style={styles.username}>@yourprofile</Text>

          <Text style={styles.bio}>
            Bring the inner you out to the world.
          </Text>

          <View style={styles.stats}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>

            <View style={styles.stat}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>

            <View style={styles.stat}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>

          <Pressable style={styles.editButton}>
            <Text style={styles.editText}>Edit profile</Text>
          </Pressable>
        </View>

        <Text style={styles.sectionTitle}>Your interests</Text>

        <View style={styles.interests}>
          {["🏍️ Bikes", "🎵 Music", "🌿 Nature", "🎬 Movies"].map(
            (interest) => (
              <View style={styles.interest} key={interest}>
                <Text style={styles.interestText}>{interest}</Text>
              </View>
            )
          )}
        </View>

        <View style={styles.optionCard}>
          <Pressable style={styles.option}>
            <Text style={styles.optionIcon}>🔒</Text>

            <View style={styles.optionInfo}>
              <Text style={styles.optionTitle}>Privacy</Text>
              <Text style={styles.optionText}>
                Control who can see your content.
              </Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </Pressable>

          <Pressable style={styles.option}>
            <Text style={styles.optionIcon}>🔔</Text>

            <View style={styles.optionInfo}>
              <Text style={styles.optionTitle}>Notifications</Text>
              <Text style={styles.optionText}>
                Manage your G-lite notifications.
              </Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </Pressable>

          <Pressable style={styles.option}>
            <Text style={styles.optionIcon}>♡</Text>

            <View style={styles.optionInfo}>
              <Text style={styles.optionTitle}>Saved</Text>
              <Text style={styles.optionText}>
                Your saved posts and reels.
              </Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F7F8FA",
  },

  container: {
    padding: 18,
    paddingBottom: 35,
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  title: {
    fontSize: 29,
    fontWeight: "900",
    color: "#111827",
  },

  settings: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  settingsText: {
    fontSize: 20,
    color: "#111827",
  },

  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 22,
    alignItems: "center",
  },

  avatar: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  avatarText: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "900",
  },

  name: {
    fontSize: 19,
    fontWeight: "900",
    color: "#111827",
  },

  username: {
    marginTop: 3,
    fontSize: 12,
    color: "#8A8F98",
  },

  bio: {
    marginTop: 10,
    fontSize: 12,
    color: "#60656E",
    textAlign: "center",
  },

  stats: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    marginTop: 22,
    paddingTop: 17,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
  },

  stat: {
    alignItems: "center",
  },

  statNumber: {
    fontSize: 17,
    fontWeight: "900",
    color: "#111827",
  },

  statLabel: {
    marginTop: 3,
    fontSize: 10,
    color: "#8A8F98",
  },

  editButton: {
    width: "100%",
    height: 44,
    borderRadius: 13,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  editText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },

  sectionTitle: {
    marginTop: 26,
    marginBottom: 12,
    fontSize: 17,
    fontWeight: "900",
    color: "#111827",
  },

  interests: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  interest: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#E8E9EC",
  },

  interestText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#4F555E",
  },

  optionCard: {
    marginTop: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 15,
  },

  option: {
    minHeight: 70,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F1F2",
  },

  optionIcon: {
    width: 35,
    fontSize: 19,
  },

  optionInfo: {
    flex: 1,
  },

  optionTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#111827",
  },

  optionText: {
    marginTop: 3,
    fontSize: 10,
    color: "#8A8F98",
  },

  arrow: {
    fontSize: 24,
    color: "#A0A5AD",
  },
});