import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type TabName = "Home" | "Reels" | "Connect" | "Messages" | "Profile";

export default function Index() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<TabName>("Home");
  const [selectedTime, setSelectedTime] = useState("1 hour");
  const [selectedInterest, setSelectedInterest] = useState("Bikes");
  const [liked, setLiked] = useState<number[]>([]);

  const interests = [
    ["🏍️", "Bikes"],
    ["🎵", "Music"],
    ["🌿", "Nature"],
    ["🎬", "Movies"],
    ["✈️", "Travel"],
  ];

  const toggleLike = (id: number) => {
    setLiked((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  if (!loggedIn) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.loginScroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.brandSection}>
              <View style={styles.logoCircle}>
                <Text style={styles.logoLetter}>G</Text>
              </View>

              <Text style={styles.brandName}>G-lite</Text>

              <Text style={styles.tagline}>
                BRING THE INNER YOU{"\n"}OUT TO THE WORLD.
              </Text>
            </View>

            <View style={styles.loginCard}>
              <Text style={styles.title}>
                {isSignUp ? "Create your account" : "Welcome back"}
              </Text>

              <Text style={styles.subtitle}>
                {isSignUp
                  ? "Create your space and discover what connects you."
                  : "Your interests. Your people. Your world."}
              </Text>

              {isSignUp && (
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Name</Text>
                  <TextInput
                    placeholder="Enter your name"
                    placeholderTextColor="#9CA3AF"
                    style={styles.input}
                  />
                </View>
              )}

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email or mobile</Text>
                <TextInput
                  placeholder="Enter email or mobile number"
                  placeholderTextColor="#9CA3AF"
                  style={styles.input}
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>

                <View style={styles.passwordBox}>
                  <TextInput
                    placeholder="Enter your password"
                    placeholderTextColor="#9CA3AF"
                    style={styles.passwordInput}
                    secureTextEntry={!showPassword}
                  />

                  <Pressable
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Text style={styles.showText}>
                      {showPassword ? "Hide" : "Show"}
                    </Text>
                  </Pressable>
                </View>
              </View>

              {!isSignUp && (
                <Pressable style={styles.forgot}>
                  <Text style={styles.forgotText}>Forgot password?</Text>
                </Pressable>
              )}

              <Pressable
                style={styles.primaryButton}
                onPress={() => setLoggedIn(true)}
              >
                <Text style={styles.primaryButtonText}>
                  {isSignUp ? "Create account" : "Log in"}
                </Text>
              </Pressable>

              <View style={styles.orRow}>
                <View style={styles.line} />
                <Text style={styles.orText}>OR</Text>
                <View style={styles.line} />
              </View>

              <Pressable style={styles.googleButton}>
                <Text style={styles.googleIcon}>G</Text>
                <Text style={styles.googleText}>
                  Continue with Google
                </Text>
              </Pressable>

              <View style={styles.switchRow}>
                <Text style={styles.switchText}>
                  {isSignUp
                    ? "Already have an account?"
                    : "Don't have an account?"}
                </Text>

                <Pressable
                  onPress={() => setIsSignUp(!isSignUp)}
                >
                  <Text style={styles.switchAction}>
                    {isSignUp ? " Log in" : " Create account"}
                  </Text>
                </Pressable>
              </View>
            </View>

            <Text style={styles.footer}>
              By continuing, you agree to G-lite's Terms & Privacy Policy.
            </Text>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  const renderHome = () => (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.homeScroll}
    >
      <View style={styles.welcomeCard}>
        <Text style={styles.welcomeSmall}>GOOD AFTERNOON</Text>

        <Text style={styles.welcomeTitle}>
          What are you into today?
        </Text>

        <Text style={styles.welcomeText}>
          G-lite changes with you. Choose what feels right now.
        </Text>
      </View>

      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>Your interests</Text>
          <Text style={styles.sectionSub}>
            Your current mood can change anytime.
          </Text>
        </View>

        <Pressable>
          <Text style={styles.editText}>Edit</Text>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.interestScroll}
      >
        {interests.map(([emoji, name]) => {
          const active = selectedInterest === name;

          return (
            <Pressable
              key={name}
              onPress={() => setSelectedInterest(name)}
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
                {emoji} {name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={styles.selectedCard}>
        <View style={styles.selectedIcon}>
          <Text style={styles.selectedEmoji}>
            {interests.find((item) => item[1] === selectedInterest)?.[0]}
          </Text>
        </View>

        <View style={styles.selectedInfo}>
          <Text style={styles.selectedLabel}>RIGHT NOW</Text>

          <Text style={styles.selectedTitle}>
            You're into {selectedInterest}
          </Text>

          <Text style={styles.selectedText}>
            Your feed will adapt as your interests change.
          </Text>
        </View>
      </View>

      <View style={styles.timeCard}>
        <Text style={styles.timeTitle}>
          How much time do you have?
        </Text>

        <Text style={styles.timeSub}>
          G-lite will shape your experience around your free time.
        </Text>

        <View style={styles.timeOptions}>
          {["30 min", "1 hour", "2 hours"].map((time) => (
            <Pressable
              key={time}
              onPress={() => setSelectedTime(time)}
              style={[
                styles.timeButton,
                selectedTime === time && styles.selectedTime,
              ]}
            >
              <Text
                style={[
                  styles.timeText,
                  selectedTime === time && styles.selectedTimeText,
                ]}
              >
                {time}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>For You</Text>

          <Text style={styles.sectionSub}>
            Built around your interests right now.
          </Text>
        </View>

        <Text style={styles.sparkle}>✦</Text>
      </View>

      <View style={styles.reelCard}>
        <View style={styles.reelVisual}>
          <Text style={styles.reelEmoji}>🏍️</Text>

          <Text style={styles.reelVisualText}>BIKE LIFE</Text>

          <View style={styles.reelBadge}>
            <Text style={styles.reelBadgeText}>REEL</Text>
          </View>

          <Pressable style={styles.playButton}>
            <Text style={styles.playText}>▶</Text>
          </Pressable>
        </View>

        <View style={styles.contentRow}>
          <View style={styles.smallAvatar}>
            <Text>R</Text>
          </View>

          <View style={styles.contentInfo}>
            <Text style={styles.creator}>Rohit Rides</Text>

            <Text style={styles.contentCaption}>
              Weekend ride? These roads are worth exploring.
            </Text>

            <Text style={styles.contentTime}>
              Liked by you 2 days ago
            </Text>
          </View>

          <Pressable onPress={() => toggleLike(1)}>
            <Text
              style={[
                styles.likeIcon,
                liked.includes(1) && styles.liked,
              ]}
            >
              {liked.includes(1) ? "♥" : "♡"}
            </Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>
            People who match you
          </Text>

          <Text style={styles.sectionSub}>
            People interested in similar things.
          </Text>
        </View>

        <Text style={styles.arrow}>›</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {[
          ["A", "Ananya", "Music • Travel"],
          ["V", "Vishal", "Bikes • Nature"],
          ["S", "Sneha", "Movies • Music"],
        ].map(([letter, name, interestsText]) => (
          <View style={styles.personCard} key={name}>
            <View style={styles.personAvatar}>
              <Text style={styles.personAvatarText}>
                {letter}
              </Text>
            </View>

            <Text style={styles.personName}>{name}</Text>

            <Text style={styles.personInterests}>
              {interestsText}
            </Text>

            <Pressable style={styles.connectButton}>
              <Text style={styles.connectText}>Connect</Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>

      <View style={styles.experienceCard}>
        <View style={styles.experienceIcon}>
          <Text style={styles.experienceEmoji}>🌿</Text>
        </View>

        <View style={styles.experienceInfo}>
          <Text style={styles.experienceLabel}>
            PERSONALIZED FOR YOU
          </Text>

          <Text style={styles.experienceTitle}>
            Something you may enjoy
          </Text>

          <Text style={styles.experienceText}>
            Explore a nature experience this weekend based on your
            interests.
          </Text>

          <Pressable>
            <Text style={styles.exploreText}>Explore →</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.postCard}>
        <View style={styles.postHeader}>
          <View style={styles.smallAvatar}>
            <Text>M</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.creator}>Maya Creates</Text>

            <Text style={styles.postTime}>
              2h ago • Music
            </Text>
          </View>

          <Text style={styles.more}>•••</Text>
        </View>

        <Text style={styles.postText}>
          Sometimes the best way to find yourself is to try something
          new.
        </Text>

        <View style={styles.postStats}>
          <Pressable onPress={() => toggleLike(2)}>
            <Text
              style={[
                styles.stat,
                liked.includes(2) && styles.liked,
              ]}
            >
              {liked.includes(2) ? "♥" : "♡"} 248
            </Text>
          </Pressable>

          <Pressable>
            <Text style={styles.stat}>◯ 32</Text>
          </Pressable>

          <Pressable>
            <Text style={styles.stat}>↗ Share</Text>
          </Pressable>

          <Pressable>
            <Text style={styles.stat}>⌑</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );

  const renderReels = () => (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.pageScroll}
    >
      <Text style={styles.pageTitle}>Reels</Text>

      <Text style={styles.pageSubtitle}>
        Videos changing with your interests.
      </Text>

      {[
        ["🏍️", "Weekend Ride", "Bikes"],
        ["🎵", "Music that matches your mood", "Music"],
        ["🌿", "A peaceful place to explore", "Nature"],
      ].map(([emoji, title, category], index) => (
        <View style={styles.fullReel} key={title}>
          <View style={styles.fullReelVisual}>
            <Text style={styles.fullReelEmoji}>{emoji}</Text>

            <View style={styles.reelBadge}>
              <Text style={styles.reelBadgeText}>REEL</Text>
            </View>

            <Pressable style={styles.bigPlay}>
              <Text style={styles.playText}>▶</Text>
            </Pressable>
          </View>

          <View style={styles.reelInfo}>
            <Text style={styles.reelCreator}>
              G-lite creator • {category}
            </Text>

            <Text style={styles.reelTitle}>{title}</Text>

            <View style={styles.reelActions}>
              <Pressable onPress={() => toggleLike(index + 10)}>
                <Text style={styles.actionText}>
                  {liked.includes(index + 10) ? "♥" : "♡"} Like
                </Text>
              </Pressable>

              <Pressable>
                <Text style={styles.actionText}>💬 Comment</Text>
              </Pressable>

              <Pressable>
                <Text style={styles.actionText}>↗ Share</Text>
              </Pressable>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );

  const renderConnect = () => (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.pageScroll}
    >
      <Text style={styles.pageTitle}>Connect</Text>

      <Text style={styles.pageSubtitle}>
        Meet people who are into the same things as you.
      </Text>

      <View style={styles.searchBox}>
        <Text style={styles.searchIcon}>⌕</Text>
        <TextInput
          placeholder="Search people or interests"
          placeholderTextColor="#9CA3AF"
          style={styles.searchInput}
        />
      </View>

      <Text style={styles.connectHeading}>
        Matches for you
      </Text>

      {[
        ["A", "Ananya", "Music • Travel", "92% match"],
        ["V", "Vishal", "Bikes • Nature", "88% match"],
        ["S", "Sneha", "Movies • Music", "81% match"],
        ["K", "Karthik", "Bikes • Travel", "78% match"],
      ].map(([letter, name, interest, match]) => (
        <View style={styles.matchCard} key={name}>
          <View style={styles.largeAvatar}>
            <Text style={styles.largeAvatarText}>{letter}</Text>
          </View>

          <View style={styles.matchInfo}>
            <Text style={styles.matchName}>{name}</Text>
            <Text style={styles.matchInterest}>{interest}</Text>
            <Text style={styles.matchPercent}>{match}</Text>
          </View>

          <Pressable style={styles.matchButton}>
            <Text style={styles.matchButtonText}>Connect</Text>
          </Pressable>
        </View>
      ))}
    </ScrollView>
  );

  const renderMessages = () => (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.pageScroll}
    >
      <Text style={styles.pageTitle}>Messages</Text>

      <Text style={styles.pageSubtitle}>
        Your conversations and connection requests.
      </Text>

      <View style={styles.messageSearch}>
        <Text style={styles.searchIcon}>⌕</Text>

        <TextInput
          placeholder="Search messages"
          placeholderTextColor="#9CA3AF"
          style={styles.searchInput}
        />
      </View>

      {[
        ["A", "Ananya", "Hey! Are you joining the ride?", "2m"],
        ["V", "Vishal", "That place looks amazing!", "18m"],
        ["S", "Sneha", "Loved your post ❤️", "1h"],
        ["K", "Karthik", "Let's plan something this weekend.", "3h"],
      ].map(([letter, name, message, time]) => (
        <Pressable style={styles.messageCard} key={name}>
          <View style={styles.largeAvatar}>
            <Text style={styles.largeAvatarText}>{letter}</Text>
          </View>

          <View style={styles.messageInfo}>
            <Text style={styles.messageName}>{name}</Text>

            <Text style={styles.messageText}>
              {message}
            </Text>
          </View>

          <Text style={styles.messageTime}>{time}</Text>
        </Pressable>
      ))}

      <View style={styles.mentionsCard}>
        <Text style={styles.mentionsIcon}>@</Text>

        <View style={{ flex: 1 }}>
          <Text style={styles.mentionsTitle}>
            Mentions
          </Text>

          <Text style={styles.mentionsText}>
            People mentioning you will appear here.
          </Text>
        </View>

        <Text style={styles.arrow}>›</Text>
      </View>
    </ScrollView>
  );

  const renderProfile = () => (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.pageScroll}
    >
      <View style={styles.profileTop}>
        <View style={styles.profileAvatar}>
          <Text style={styles.profileAvatarText}>P</Text>
        </View>

        <Text style={styles.profileName}>Your G-lite profile</Text>

        <Text style={styles.profileHandle}>@yourprofile</Text>

        <Pressable style={styles.editProfileButton}>
          <Text style={styles.editProfileText}>
            Edit profile
          </Text>
        </Pressable>
      </View>

      <View style={styles.statsCard}>
        <View style={styles.profileStat}>
          <Text style={styles.statNumber}>128</Text>
          <Text style={styles.statLabel}>Connections</Text>
        </View>

        <View style={styles.profileDivider} />

        <View style={styles.profileStat}>
          <Text style={styles.statNumber}>42</Text>
          <Text style={styles.statLabel}>Posts</Text>
        </View>

        <View style={styles.profileDivider} />

        <View style={styles.profileStat}>
          <Text style={styles.statNumber}>15</Text>
          <Text style={styles.statLabel}>Interests</Text>
        </View>
      </View>

      <Text style={styles.profileSectionTitle}>
        Your interests
      </Text>

      <View style={styles.profileInterestBox}>
        <Text style={styles.profileInterestTitle}>
          Default interests
        </Text>

        <Text style={styles.profileInterestText}>
          Bikes • Music • Nature • Travel
        </Text>

        <Pressable>
          <Text style={styles.profileAction}>
            Manage interests →
          </Text>
        </Pressable>
      </View>

      <Text style={styles.profileSectionTitle}>
        Account
      </Text>

      {[
        ["🔒", "Privacy", "Private / Public account"],
        ["👤", "Personal information", "Age and gender"],
        ["🔔", "Notifications", "Manage notifications"],
        ["⚙️", "Settings", "App preferences"],
      ].map(([icon, title, subtitle]) => (
        <Pressable style={styles.settingRow} key={title}>
          <View style={styles.settingIcon}>
            <Text>{icon}</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.settingTitle}>{title}</Text>
            <Text style={styles.settingSubtitle}>{subtitle}</Text>
          </View>

          <Text style={styles.arrow}>›</Text>
        </Pressable>
      ))}

      <Pressable
        style={styles.logoutButton}
        onPress={() => setLoggedIn(false)}
      >
        <Text style={styles.logoutText}>Log out</Text>
      </Pressable>
    </ScrollView>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "Reels":
        return renderReels();

      case "Connect":
        return renderConnect();

      case "Messages":
        return renderMessages();

      case "Profile":
        return renderProfile();

      default:
        return renderHome();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.homeContainer}>
        <View style={styles.header}>
          <View>
            <Text style={styles.homeLogo}>G-lite</Text>
            <Text style={styles.headerSub}>
              BRING THE INNER YOU OUT TO THE WORLD.
            </Text>
          </View>

          <View style={styles.headerActions}>
            <Pressable style={styles.headerIcon}>
              <Text style={styles.headerIconText}>⌕</Text>
            </Pressable>

            <Pressable style={styles.headerIcon}>
              <Text style={styles.headerIconText}>♡</Text>
            </Pressable>

            <Pressable
              style={styles.avatar}
              onPress={() => setActiveTab("Profile")}
            >
              <Text style={styles.avatarText}>P</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.contentArea}>
          {renderContent()}
        </View>

        <View style={styles.bottomNav}>
          {[
            ["Home", "⌂"],
            ["Reels", "▶"],
            ["Connect", "◎"],
            ["Messages", "◇"],
            ["Profile", "○"],
          ].map(([name, icon]) => (
            <Pressable
              key={name}
              style={styles.navItem}
              onPress={() => setActiveTab(name as TabName)}
            >
              <View
                style={[
                  styles.navIconBox,
                  activeTab === name && styles.activeNavBox,
                ]}
              >
                <Text
                  style={[
                    styles.navIcon,
                    activeTab === name && styles.activeNav,
                  ]}
                >
                  {icon}
                </Text>
              </View>

              <Text
                style={[
                  styles.navText,
                  activeTab === name && styles.activeNav,
                ]}
              >
                {name}
              </Text>
            </Pressable>
          ))}
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
  },

  loginScroll: {
    flexGrow: 1,
    paddingHorizontal: 22,
    paddingTop: 35,
    paddingBottom: 30,
    justifyContent: "center",
  },

  brandSection: {
    alignItems: "center",
    marginBottom: 28,
  },

  logoCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  logoLetter: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "900",
  },

  brandName: {
    fontSize: 31,
    fontWeight: "900",
    color: "#111827",
  },

  tagline: {
    marginTop: 8,
    textAlign: "center",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.5,
    lineHeight: 16,
    color: "#6B7280",
  },

  loginCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 26,
    padding: 22,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },

  title: {
    fontSize: 25,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 7,
  },

  subtitle: {
    fontSize: 14,
    lineHeight: 21,
    color: "#6B7280",
    marginBottom: 24,
  },

  inputGroup: {
    marginBottom: 17,
  },

  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 8,
  },

  input: {
    height: 54,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    color: "#111827",
    backgroundColor: "#FAFAFA",
  },

  passwordBox: {
    height: 54,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    backgroundColor: "#FAFAFA",
  },

  passwordInput: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 16,
    fontSize: 15,
    color: "#111827",
  },

  showText: {
    paddingHorizontal: 14,
    fontSize: 13,
    fontWeight: "700",
    color: "#111827",
  },

  forgot: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },

  forgotText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111827",
  },

  primaryButton: {
    height: 54,
    borderRadius: 14,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },

  orRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 22,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },

  orText: {
    marginHorizontal: 12,
    fontSize: 11,
    color: "#9CA3AF",
  },

  googleButton: {
    height: 54,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  googleIcon: {
    fontSize: 19,
    fontWeight: "800",
    color: "#4285F4",
    marginRight: 9,
  },

  googleText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#374151",
  },

  switchRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },

  switchText: {
    color: "#6B7280",
    fontSize: 13,
  },

  switchAction: {
    color: "#111827",
    fontSize: 13,
    fontWeight: "800",
  },

  footer: {
    textAlign: "center",
    fontSize: 11,
    lineHeight: 17,
    color: "#9CA3AF",
    marginTop: 20,
  },

  homeContainer: {
    flex: 1,
    backgroundColor: "#F7F8FA",
  },

  header: {
    minHeight: 74,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 18,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },

  homeLogo: {
    fontSize: 25,
    fontWeight: "900",
    color: "#111827",
  },

  headerSub: {
    fontSize: 8,
    color: "#9CA3AF",
    marginTop: 2,
    letterSpacing: 0.4,
  },

  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },

  headerIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#F4F5F7",
    alignItems: "center",
    justifyContent: "center",
  },

  headerIconText: {
    fontSize: 21,
    color: "#111827",
  },

  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    color: "#FFFFFF",
    fontWeight: "800",
  },

  contentArea: {
    flex: 1,
  },

  homeScroll: {
    padding: 18,
    paddingBottom: 110,
  },

  pageScroll: {
    padding: 18,
    paddingBottom: 120,
  },

  welcomeCard: {
    backgroundColor: "#111827",
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
  },

  welcomeSmall: {
    color: "#9CA3AF",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.4,
  },

  welcomeTitle: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "900",
    marginTop: 7,
  },

  welcomeText: {
    color: "#C9CDD5",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 7,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 13,
    marginTop: 4,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
  },

  sectionSub: {
    fontSize: 12,
    color: "#8A8F98",
    marginTop: 4,
    maxWidth: 285,
  },

  editText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#111827",
  },

  interestScroll: {
    marginBottom: 15,
  },

  interestChip: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#E8E9EC",
  },

  activeInterest: {
    backgroundColor: "#111827",
    borderColor: "#111827",
  },

  interestText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#555B65",
  },

  activeInterestText: {
    color: "#FFFFFF",
  },

  selectedCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ECEDEF",
  },

  selectedIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#F1F2F4",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },

  selectedEmoji: {
    fontSize: 24,
  },

  selectedInfo: {
    flex: 1,
  },

  selectedLabel: {
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1,
    color: "#9CA3AF",
  },

  selectedTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#111827",
    marginTop: 2,
  },

  selectedText: {
    fontSize: 10,
    color: "#7B808A",
    marginTop: 3,
  },

  timeCard: {
    backgroundColor: "#111827",
    borderRadius: 22,
    padding: 18,
    marginBottom: 25,
  },

  timeTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  timeSub: {
    fontSize: 11,
    color: "#AEB4BF",
    marginTop: 4,
    marginBottom: 15,
  },

  timeOptions: {
    flexDirection: "row",
    gap: 8,
  },

  timeButton: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 12,
    backgroundColor: "#2A2F38",
  },

  selectedTime: {
    backgroundColor: "#FFFFFF",
  },

  timeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#D1D5DB",
  },

  selectedTimeText: {
    color: "#111827",
  },

  sparkle: {
    fontSize: 22,
    color: "#111827",
  },

  arrow: {
    fontSize: 27,
    color: "#9CA3AF",
  },

  reelCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    overflow: "hidden",
    marginBottom: 26,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },

  reelVisual: {
    height: 250,
    backgroundColor: "#DDE2E7",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  reelEmoji: {
    fontSize: 70,
  },

  reelVisualText: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 2,
    color: "#111827",
  },

  reelBadge: {
    position: "absolute",
    top: 15,
    left: 15,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "#111827",
  },

  reelBadgeText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "900",
  },

  playButton: {
    position: "absolute",
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "rgba(255,255,255,0.9)",
    alignItems: "center",
    justifyContent: "center",
  },

  bigPlay: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: "rgba(255,255,255,0.92)",
    alignItems: "center",
    justifyContent: "center",
  },

  playText: {
    fontSize: 19,
    color: "#111827",
    marginLeft: 3,
  },

  contentRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },

  smallAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  contentInfo: {
    flex: 1,
  },

  creator: {
    fontSize: 13,
    fontWeight: "800",
    color: "#111827",
  },

  contentCaption: {
    fontSize: 11,
    color: "#6B7280",
    marginTop: 3,
  },

  contentTime: {
    fontSize: 9,
    color: "#9CA3AF",
    marginTop: 4,
  },

  likeIcon: {
    fontSize: 27,
    color: "#555B65",
  },

  liked: {
    color: "#111827",
  },

  personCard: {
    width: 122,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 12,
    alignItems: "center",
    marginRight: 9,
    borderWidth: 1,
    borderColor: "#ECEDEF",
    marginBottom: 26,
  },

  personAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E9EBEF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },

  personAvatarText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
  },

  personName: {
    fontSize: 12,
    fontWeight: "800",
    color: "#111827",
  },

  personInterests: {
    fontSize: 9,
    color: "#8A8F98",
    textAlign: "center",
    marginTop: 4,
    marginBottom: 9,
  },

  connectButton: {
    backgroundColor: "#111827",
    borderRadius: 9,
    paddingVertical: 7,
    paddingHorizontal: 11,
  },

  connectText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "800",
  },

  experienceCard: {
    backgroundColor: "#E9F0EA",
    borderRadius: 20,
    padding: 17,
    flexDirection: "row",
    marginBottom: 25,
  },

  experienceIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },

  experienceEmoji: {
    fontSize: 23,
  },

  experienceInfo: {
    flex: 1,
  },

  experienceLabel: {
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1,
    color: "#728075",
  },

  experienceTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#1E2A20",
    marginTop: 3,
  },

  experienceText: {
    fontSize: 11,
    color: "#617064",
    marginTop: 4,
    lineHeight: 16,
  },

  exploreText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#1E2A20",
    marginTop: 7,
  },

  postCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 17,
    marginBottom: 20,
  },

  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  postTime: {
    fontSize: 10,
    color: "#9CA3AF",
    marginTop: 2,
  },

  more: {
    color: "#9CA3AF",
    fontWeight: "800",
  },

  postText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
    color: "#252932",
    marginBottom: 18,
  },

  postStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#F0F1F2",
    paddingTop: 13,
  },

  stat: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "600",
  },

  pageTitle: {
    fontSize: 29,
    fontWeight: "900",
    color: "#111827",
    marginTop: 5,
  },

  pageSubtitle: {
    fontSize: 13,
    color: "#7B808A",
    marginTop: 5,
    marginBottom: 22,
  },

  fullReel: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    overflow: "hidden",
    marginBottom: 20,
    elevation: 3,
  },

  fullReelVisual: {
    height: 390,
    backgroundColor: "#DDE2E7",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  fullReelEmoji: {
    fontSize: 95,
  },

  reelInfo: {
    padding: 16,
  },

  reelCreator: {
    fontSize: 11,
    color: "#8A8F98",
    fontWeight: "700",
  },

  reelTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#111827",
    marginTop: 4,
  },

  reelActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    paddingTop: 13,
    borderTopWidth: 1,
    borderTopColor: "#F0F1F2",
  },

  actionText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#555B65",
  },

  searchBox: {
    height: 52,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    marginBottom: 24,
  },

  messageSearch: {
    height: 52,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    marginBottom: 20,
  },

  searchIcon: {
    fontSize: 22,
    color: "#6B7280",
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#111827",
  },

  connectHeading: {
    fontSize: 17,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 12,
  },

  matchCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ECEDEF",
  },

  largeAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#E9EBEF",
    alignItems: "center",
    justifyContent: "center",
  },

  largeAvatarText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
  },

  matchInfo: {
    flex: 1,
    marginLeft: 12,
  },

  matchName: {
    fontSize: 14,
    fontWeight: "800",
    color: "#111827",
  },

  matchInterest: {
    fontSize: 10,
    color: "#7B808A",
    marginTop: 3,
  },

  matchPercent: {
    fontSize: 9,
    fontWeight: "800",
    color: "#111827",
    marginTop: 4,
  },

  matchButton: {
    backgroundColor: "#111827",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },

  matchButtonText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "800",
  },

  messageCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    padding: 13,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 9,
  },

  messageInfo: {
    flex: 1,
    marginLeft: 12,
  },

  messageName: {
    fontSize: 14,
    fontWeight: "800",
    color: "#111827",
  },

  messageText: {
    fontSize: 11,
    color: "#7B808A",
    marginTop: 4,
  },

  messageTime: {
    fontSize: 9,
    color: "#9CA3AF",
  },

  mentionsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  mentionsIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#F1F2F4",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
    marginRight: 12,
  },

  mentionsTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#111827",
  },

  mentionsText: {
    fontSize: 10,
    color: "#8A8F98",
    marginTop: 3,
  },

  profileTop: {
    alignItems: "center",
    paddingVertical: 10,
  },

  profileAvatar: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
  },

  profileAvatarText: {
    fontSize: 32,
    fontWeight: "900",
    color: "#FFFFFF",
  },

  profileName: {
    fontSize: 21,
    fontWeight: "900",
    color: "#111827",
    marginTop: 12,
  },

  profileHandle: {
    fontSize: 12,
    color: "#8A8F98",
    marginTop: 3,
  },

  editProfileButton: {
    borderWidth: 1,
    borderColor: "#D9DCE1",
    borderRadius: 11,
    paddingHorizontal: 18,
    paddingVertical: 8,
    marginTop: 12,
  },

  editProfileText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#111827",
  },

  statsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 22,
  },

  profileStat: {
    alignItems: "center",
    flex: 1,
  },

  statNumber: {
    fontSize: 18,
    fontWeight: "900",
    color: "#111827",
  },

  statLabel: {
    fontSize: 9,
    color: "#8A8F98",
    marginTop: 3,
  },

  profileDivider: {
    width: 1,
    height: 30,
    backgroundColor: "#E5E7EB",
  },

  profileSectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 10,
    marginTop: 5,
  },

  profileInterestBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 24,
  },

  profileInterestTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#111827",
  },

  profileInterestText: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 6,
  },

  profileAction: {
    fontSize: 11,
    fontWeight: "800",
    color: "#111827",
    marginTop: 12,
  },

  settingRow: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 13,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: "#F1F2F4",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  settingTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#111827",
  },

  settingSubtitle: {
    fontSize: 10,
    color: "#8A8F98",
    marginTop: 3,
  },

  logoutButton: {
    height: 50,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E1E3E6",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },

  logoutText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#111827",
  },

  bottomNav: {
    position: "absolute",
    left: 10,
    right: 10,
    bottom: 10,
    height: 67,
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 5 },
    elevation: 8,
  },

  navItem: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 55,
  },

  navIconBox: {
    width: 34,
    height: 28,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  activeNavBox: {
    backgroundColor: "#F0F1F3",
  },

  navIcon: {
    fontSize: 18,
    color: "#9CA3AF",
  },

  navText: {
    fontSize: 8,
    color: "#9CA3AF",
    fontWeight: "700",
    marginTop: 2,
  },

  activeNav: {
    color: "#111827",
  },
});