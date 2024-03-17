import React from "react";
import { SafeAreaView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { MenuProvider } from "react-native-popup-menu";
import "react-native-url-polyfill/auto";
import Auth from "./components/auth/Auth";
import TagContextProvider from "./src/contexts/tags/TagContextProvider";
import TagDataContextProvider from "./src/contexts/tagData/TagDataContextProvider";
import DateProvider from "./src/contexts/date/Dateprovider";
import { MyTabs } from "./screens/TabNavigator";
import { useSession } from "./src/contexts/sessions/UseSessionHook";
import { StyleSheet } from "react-native";

export default function App() {
  const session = useSession();

  return (
    <DateProvider>
      <TagContextProvider>
        <TagDataContextProvider>
          <SafeAreaView style={styles.container}>
            <MenuProvider>
              <GestureHandlerRootView style={{ flex: 1 }}>
                {session && session.user ? (
                  <NavigationContainer>
                    <MyTabs />
                  </NavigationContainer>
                ) : (
                  <Auth />
                )}
              </GestureHandlerRootView>
            </MenuProvider>
          </SafeAreaView>
        </TagDataContextProvider>
      </TagContextProvider>
    </DateProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    marginTop: 20,
  },
});
