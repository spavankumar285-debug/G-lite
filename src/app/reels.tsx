import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { VideoView, useVideoPlayer } from "expo-video";
import * as ImagePicker from "expo-image-picker";

const { width, height } = Dimensions.get("window");

const DEMO_VIDEO =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4";

type ReelVideoProps = {
  uri: string;
  paused: boolean;
};

function ReelVideo({ uri, paused }: ReelVideoProps) {
  const player = useVideoPlayer(uri, (videoPlayer) => {
    videoPlayer.loop = true;
    videoPlayer.play();
  });

  useEffect(() => {
    if (paused) {
      player.pause();
    } else {
      player.play();
    }
  }, [paused, player]);

  return (
    <VideoView
      player={player}
      style={styles.video}
      contentFit="cover"
      nativeControls={false}
    />
  );
}

export default function Reels() {
  const [videoUri, setVideoUri] = useState(DEMO_VIDEO);
  const [paused, setPaused] = useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const chooseVideo = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["videos"],
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setVideoUri(result.assets[0].uri);
      setPaused(false);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={[videoUri]}
        keyExtractor={(item) => item}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.reel}>

            {/* VIDEO */}
            <Pressable
              style={styles.videoContainer}
              onPress={() => setPaused((current) => !current)}
            >
              <ReelVideo uri={item} paused={paused} />

              {paused && (
                <View style={styles.playOverlay}>
                  <Text style={styles.playIcon}>▶</Text>
                </View>
              )}
            </Pressable>

            {/* TOP BAR */}
            <View style={styles.topBar}>
              <Text style={styles.logo}>G-lite</Text>

              <Pressable
                onPress={chooseVideo}
                style={({ pressed }) => [
                  styles.addButton,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.addText}>＋</Text>
              </Pressable>
            </View>

            {/* BOTTOM INFORMATION */}
            <View style={styles.bottomInfo}>
              <View style={styles.creatorRow}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>G</Text>
                </View>

                <View>
                  <Text style={styles.creator}>G-lite</Text>

                  <Text style={styles.interest}>
                    🏍️ Bikes • Suggested for you
                  </Text>
                </View>
              </View>

              <Text style={styles.description}>
                Some roads are meant to be explored.
              </Text>
            </View>

            {/* RIGHT ACTIONS */}
            <View style={styles.actions}>

              {/* LIKE */}
              <Pressable
                onPress={() => setLiked((current) => !current)}
                style={styles.action}
              >
                <Text
                  style={[
                    styles.actionIcon,
                    liked && styles.liked,
                  ]}
                >
                  {liked ? "♥" : "♡"}
                </Text>

                <Text style={styles.count}>
                  {liked ? "2481" : "2480"}
                </Text>
              </Pressable>

              {/* COMMENT */}
              <Pressable style={styles.action}>
                <Text style={styles.actionIcon}>💬</Text>
                <Text style={styles.count}>186</Text>
              </Pressable>

              {/* SHARE */}
              <Pressable style={styles.action}>
                <Text style={styles.actionIcon}>↗</Text>
                <Text style={styles.count}>Share</Text>
              </Pressable>

              {/* SAVE */}
              <Pressable
                onPress={() => setSaved((current) => !current)}
                style={styles.action}
              >
                <Text
                  style={[
                    styles.actionIcon,
                    saved && styles.saved,
                  ]}
                >
                  {saved ? "◆" : "◇"}
                </Text>

                <Text style={styles.count}>
                  {saved ? "Saved" : "Save"}
                </Text>
              </Pressable>

            </View>

          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  reel: {
    width: width,
    height: height,
    backgroundColor: "#000",
  },

  videoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#000",
  },

  video: {
    width: "100%",
    height: "100%",
  },

  playOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },

  playIcon: {
    color: "#fff",
    fontSize: 60,
    textShadowColor: "#000",
    textShadowRadius: 10,
  },

  topBar: {
    position: "absolute",
    top: 45,
    left: 18,
    right: 18,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logo: {
    color: "#fff",
    fontSize: 27,
    fontWeight: "900",
    textShadowColor: "#000",
    textShadowRadius: 8,
  },

  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  addText: {
    color: "#111827",
    fontSize: 29,
    lineHeight: 32,
  },

  pressed: {
    opacity: 0.6,
    transform: [{ scale: 0.94 }],
  },

  bottomInfo: {
    position: "absolute",
    left: 18,
    right: 85,
    bottom: 40,
    zIndex: 10,
  },

  creatorRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  avatarText: {
    color: "#111827",
    fontSize: 17,
    fontWeight: "900",
  },

  creator: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "900",
  },

  interest: {
    color: "#fff",
    fontSize: 10,
    marginTop: 3,
  },

  description: {
    color: "#fff",
    fontSize: 13,
    marginTop: 12,
  },

  actions: {
    position: "absolute",
    right: 14,
    bottom: 38,
    zIndex: 20,
    alignItems: "center",
    gap: 24,
  },

  action: {
    alignItems: "center",
    minWidth: 48,
  },

  actionIcon: {
    color: "#fff",
    fontSize: 30,
    textShadowColor: "#000",
    textShadowRadius: 6,
  },

  liked: {
    color: "#ff3158",
  },

  saved: {
    color: "#ffd700",
  },

  count: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "800",
    marginTop: 3,
  },
});