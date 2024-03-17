import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useTagContext } from '../src/contexts/tags/UseTagContext';
import { useDateContext } from '../src/contexts/date/useDateContext';
import { TagProps, TagDataProps } from '../src/types/TagTypes';
import Header from '../components/Header';
import Section from '../components/tags/Section';
import SelectedTagList from '../components/tags/SelectedTagList';
import { useTaskContext } from '../src/contexts/tasks/UseTaskContext';
import { todayFormatted } from '../helpers/taskHelpers';

export default function TagScreen() {
  const { selectedDate, setSelectedDate } = useDateContext();
  const [todayTags, setTodayTags] = useState<any>([])
  const [goodTagsList, setGoodTagsList] = useState<TagProps[]>([]);
  const [neutralTagsList, setNeutralTagsList] = useState<TagProps[]>([]);
  const [badTagsList, setBadTagsList] = useState<TagProps[]>([]);
  const { tags } = useTagContext();
  const { state: tasks } = useTaskContext();

  useEffect(() => {
    const todayTasks = tasks.filter(task => task.inScopeDay === todayFormatted);
    const goodTags = tags.filter(tag => tag.section === 'good');
    const neutralTags = tags.filter(tag => tag.section === 'neutral');
    const badTags = tags.filter(tag => tag.section === 'bad');
    setTodayTags(todayTasks)
    setGoodTagsList(goodTags);
    setNeutralTagsList(neutralTags);
    setBadTagsList(badTags);
  }, [tags, tasks]); 

  return (
    <>
      <Header
        title={''}
        selectedDate={selectedDate} 
        onDateChange={setSelectedDate}
      />
      <ScrollView style={styles.container}>
        <View style={styles.container}>
          <Section tags={todayTags} sectionName={'today'} />
          <Section tags={goodTagsList} sectionName={'good'} />
          <Section tags={neutralTagsList} sectionName={'neutral'} />
          <Section tags={badTagsList} sectionName={'bad'} />
          <SelectedTagList />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
});
