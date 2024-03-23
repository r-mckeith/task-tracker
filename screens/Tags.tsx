import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
} from "react-native";
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
  const [habitTags, setHabitTags] = useState<TagProps[]>([]);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const { tags } = useTagContext();
  const selectedDateString = selectedDate.toISOString().split("T")[0];

  useEffect(() => {
    const habitTags = tags.filter((tag) => tag.section == "habits");

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
    setHabitTags(habitTags);
  }, [tags, selectedDate]);

  return (
    <>
      <Header
        title={""}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />
      <ScrollView style={styles.scrollView}>
        <TouchableWithoutFeedback
          onPress={() => isEditMode && setIsEditMode(false)}
        >
          <View style={styles.sectionsContainer}>
            {todayTags.length > 0 && (
              <Text style={styles.sectionTitle}>Today</Text>
            )}

            {todayTags.length > 0 && (
              <Section
                tags={todayTags}
                sectionName={"today"}
                isEditMode={isEditMode}
                setIsEditMode={setIsEditMode}
              />
            )}

            <Text style={styles.sectionTitle}>Habits</Text>
            <Section
              tags={habitTags}
              sectionName={"habits"}
              isEditMode={isEditMode}
              setIsEditMode={setIsEditMode}
            />
            <TouchableOpacity style={styles.addButton} onPress={() => {}}>
              <MaterialCommunityIcons name="plus-circle-outline" size={24} />
            </TouchableOpacity>

            <SelectedTagList />
          </View>
        </TouchableWithoutFeedback>
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
