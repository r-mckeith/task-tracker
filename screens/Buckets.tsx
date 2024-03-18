import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-gesture-handler";
import { useTagContext } from "../src/contexts/tags/UseTagContext";
import { useDateContext } from "../src/contexts/date/useDateContext";
import { TagProps } from "../src/types/TagTypes";
import Header from "../components/DateHeader";
import Section from "../components/buckets/Section";
import SelectedTagList from "../components/buckets/SelectedTagList";

export default function TagScreen() {
  const { selectedDate, setSelectedDate } = useDateContext();
  const [todayTags, setTodayTags] = useState<TagProps[]>([]);
  const [goodTagsList, setGoodTagsList] = useState<TagProps[]>([]);
  const { tags, dispatch } = useTagContext();
  const selectedDateString = selectedDate.toISOString().split("T")[0];

  useEffect(() => {
    const generalTags = tags.filter((tag) => tag.section !== "today");

    const filteredTodayTags = tags.filter((tag) => {
      const todayTags = tags.filter((tag) => tag.section === "today");
      const isScopedForTodayOrFuture =
        tag.inScopeDay === selectedDateString ||
        (tag.inScopeDay && tag.inScopeDay < selectedDateString);
      const isUncompletedOrCompletedAfter =
        !tag.completed ||
        (tag.completed && tag.completed >= selectedDateString);
      return (
        todayTags && isScopedForTodayOrFuture && isUncompletedOrCompletedAfter
      );
    });
    setTodayTags(filteredTodayTags);
    setGoodTagsList(generalTags);
  }, [tags, selectedDate]);

  return (
    <>
      <Header
        title={""}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />
      <ScrollView style={styles.scrollView}>
        <View style={styles.sectionsContainer}>
          <Text style={styles.sectionTitle}>Habits</Text>
          <Section tags={goodTagsList} sectionName={"good"} />
          {todayTags.length > 0 && (
            <Text style={styles.sectionTitle}>Today</Text>
          )}
          {todayTags.length > 0 && (
            <Section tags={todayTags} sectionName={"today"} />
          )}
          <TouchableOpacity style={styles.addButton} onPress={() => {}}>
            <MaterialCommunityIcons name="plus-circle-outline" size={24} />
          </TouchableOpacity>
          <SelectedTagList />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  sectionsContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  addButton: {
    alignSelf: "flex-end",
    padding: 16,
  },
});
