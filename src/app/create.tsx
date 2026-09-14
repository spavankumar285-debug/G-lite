import React, { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Create() {
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [selectedInterest, setSelectedInterest] = useState("🏍️ Bikes");
  const [audience, setAudience] = useState("Public");

  const interests = [
    "🏍️ Bikes",
    "🎵 Music",
    "🌿 Nature",
    "🎬 Movies",
    "✈️ Travel",
    "🍳 Cooking",
  ];

  const pickVideo = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission needed",
        "Please allow G-lite to access your photos and videos."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["videos"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setVideoUri(result.assets[0].uri);
    }
  };

  const removeVideo = () => {
    setVideoUri(null);
  };

  const publishReel = () => {
    if (!videoUri) {
      Alert.alert("Add a video", "Choose a video before publishing.");
      return;
    }

    Alert.alert(
      "Ready to publish",
      "Your reel is prepared. Real cloud publishing will be connected next."
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>G-lite</Text>
            <Text style={styles.headerSub}>Create something worth sharing.</Text>
          </View>

          <View style={styles.createBadge}>
            <Text style={styles.createBadgeText}>CREATE</Text>
          </View>
        </View>

        <Text style={styles.title}>Create a Reel</Text>
        <Text style={styles.subtitle}>
          Bring your current interest out to the world.
        </Text>

        <Pressable style={styles.videoBox} onPress={pickVideo}>
          {videoUri ? (
            <>
              <Image
                source={{ uri: videoUri }}
                style={styles.preview}
                resizeMode="cover"
              />

              <View style={styles.previewOverlay}>
                <View style={styles.videoReady}>
                  <Text style={styles.videoReadyText}>✓ VIDEO SELECTED</Text>
                </View>
              </View>
            </>
          ) : (
            <>
              <View style={styles.uploadCircle}>
                <Text style={styles.uploadIcon}>＋</Text>
              </View>

              <Text style={styles.uploadTitle}>Add a video</Text>

              <Text style={styles.uploadSub}>
                Choose a video from your phone
              </Text>

              <View style={styles.chooseButton}>
                <Text style={styles.chooseButtonText}>Choose video</Text>
              </View>
            </>
          )}
        </Pressable>

        {videoUri && (
          <Pressable style={styles.removeButton} onPress={removeVideo}>
            <Text style={styles.removeText}>Remove video</Text>
          </Pressable>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Caption</Text>

          <TextInput
            value={caption}
            onChangeText={setCaption}
            placeholder="What do you want people to know?"
            placeholderTextColor="#9CA3AF"
            multiline
            maxLength={500}
            style={styles.captionInput}
          />

          <Text style={styles.characterCount}>
            {caption.length}/500
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What is this about?</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.interests}
          >
            {interests.map((interest) => {
              const active = selectedInterest === interest;

              return (
                <Pressable
                  key={interest}
                  onPress={() => setSelectedInterest(interest)}
                  style={[
                    styles.interestChip,
                    active && styles.activeInterest,
                  ]}
                >
                  <Text
                    style={[
                      styles.interestText,
                      active && styles.activeInterestText,
                    ]}
                  >
                    {interest}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.settingsCard}>
          <View>
            <Text style={styles.settingsTitle}>Audience</Text>
            <Text style={styles.settingsSub}>
              Who can discover this reel?
            </Text>
          </View>

          <View style={styles.audienceOptions}>
            {["Public", "Followers"].map((item) => {
              const active = audience === item;

              return (
                <Pressable
                  key={item}
                  onPress={() => setAudience(item)}
                  style={[
                    styles.audienceButton,
                    active && styles.activeAudience,
                  ]}
                >
                  <Text
                    style={[
                      styles.audienceText,
                      active && styles.activeAudienceText,
                    ]}
                  >
                    {item}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoIcon}>
            <Text>✦</Text>
          </View>

          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>G-lite discovery</Text>
            <Text style={styles.infoText}>
              Your selected interest helps G-lite understand who may enjoy
              your reel.
            </Text>
          </View>
        </View>

        <Pressable style={styles.publishButton} onPress={publishReel}>
          <Text style={styles.publishText}>Publish Reel</Text>
          <Text style={styles.publishArrow}>→</Text>
        </Pressable>

        <Text style={styles.bottomNote}>
          You can change your audience and interests later.
        </Text>
      </ScrollView>
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

  content: {
    padding: 18,
    paddingBottom: 120,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 28,
  },

  logo: {
    fontSize: 25,
    fontWeight: "900",
    color: "#111827",
  },

  headerSub: {
    marginTop: 3,
    fontSize: 10,
    color: "#8A8F98",
  },

  createBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 9,
    backgroundColor: "#111827",
  },

  createBadgeText: {
    color: "#FFFFFF",
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1,
  },

  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#111827",
  },

  subtitle: {
    marginTop: 5,
    marginBottom: 22,
    color: "#6B7280",
    fontSize: 13,
  },

  videoBox: {
    height: 390,
    borderRadius: 24,
    backgroundColor: "#E5E7EB",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#D9DDE3",
  },

  uploadCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },

  uploadIcon: {
    fontSize: 35,
    fontWeight: "300",
    color: "#111827",
  },

  uploadTitle: {
    fontSize: 19,
    fontWeight: "900",
    color: "#111827",
  },

  uploadSub: {
    marginTop: 5,
    color: "#6B7280",
    fontSize: 11,
  },

  chooseButton: {
    marginTop: 18,
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 12,
    backgroundColor: "#111827",
  },

  chooseButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
  },

  preview: {
    width: "100%",
    height: "100%",
  },

  previewOverlay: {
    position: "absolute",
    top: 15,
    left: 15,
  },

  videoReady: {
    backgroundColor: "rgba(17,24,39,0.85)",
    borderRadius: 9,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },

  videoReadyText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "900",
  },

  removeButton: {
    alignSelf: "flex-end",
    marginTop: 9,
  },

  removeText: {
    color: "#6B7280",
    fontSize: 11,
    fontWeight: "700",
  },

  section: {
    marginTop: 25,
  },

  sectionTitle: {
    color: "#111827",
    fontSize: 15,
    fontWeight: "900",
    marginBottom: 10,
  },

  captionInput: {
    minHeight: 105,
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#E4E6EA",
    padding: 15,
    color: "#111827",
    fontSize: 14,
    textAlignVertical: "top",
  },

  characterCount: {
    alignSelf: "flex-end",
    marginTop: 5,
    fontSize: 9,
    color: "#9CA3AF",
  },

  interests: {
    paddingRight: 15,
  },

  interestChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E4E6EA",
    marginRight: 8,
  },

  activeInterest: {
    backgroundColor: "#111827",
    borderColor: "#111827",
  },

  interestText: {
    color: "#555B65",
    fontSize: 11,
    fontWeight: "700",
  },

  activeInterestText: {
    color: "#FFFFFF",
  },

  settingsCard: {
    marginTop: 25,
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 19,
    borderWidth: 1,
    borderColor: "#E8E9EC",
  },

  settingsTitle: {
    fontSize: 14,
    fontWeight: "900",
    color: "#111827",
  },

  settingsSub: {
    marginTop: 3,
    fontSize: 10,
    color: "#8A8F98",
  },

  audienceOptions: {
    flexDirection: "row",
    marginTop: 14,
    gap: 8,
  },

  audienceButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 11,
    alignItems: "center",
    backgroundColor: "#F3F4F6",
  },

  activeAudience: {
    backgroundColor: "#111827",
  },

  audienceText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#6B7280",
  },

  activeAudienceText: {
    color: "#FFFFFF",
  },

  infoCard: {
    marginTop: 18,
    padding: 15,
    borderRadius: 18,
    backgroundColor: "#EAF0EA",
    flexDirection: "row",
    alignItems: "center",
  },

  infoIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  infoContent: {
    flex: 1,
  },

  infoTitle: {
    color: "#1E2A20",
    fontSize: 13,
    fontWeight: "900",
  },

  infoText: {
    marginTop: 4,
    color: "#617064",
    fontSize: 10,
    lineHeight: 15,
  },

  publishButton: {
    marginTop: 25,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#111827",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  publishText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
  },

  publishArrow: {
    marginLeft: 10,
    color: "#FFFFFF",
    fontSize: 19,
  },

  bottomNote: {
    textAlign: "center",
    marginTop: 12,
    color: "#9CA3AF",
    fontSize: 9,
  },
});