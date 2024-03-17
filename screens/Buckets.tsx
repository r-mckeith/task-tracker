import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useTagContext } from '../src/contexts/tags/UseTagContext';
import { useDateContext } from '../src/contexts/date/useDateContext';
import { TagProps } from '../src/types/TagTypes';
import Header from '../components/Header';
import Section from '../components/buckets/Section';
import SelectedTagList from '../components/buckets/SelectedTagList';

export default function TagScreen() {
  const { selectedDate, setSelectedDate } = useDateContext();
  const [todayTags, setTodayTags] = useState<TagProps[]>([])
  const [goodTagsList, setGoodTagsList] = useState<TagProps[]>([]);
  const [neutralTagsList, setNeutralTagsList] = useState<TagProps[]>([]);
  const [badTagsList, setBadTagsList] = useState<TagProps[]>([]);
  const { tags, dispatch } = useTagContext();
  const selectedDateString = selectedDate.toISOString().split('T')[0];

  useEffect(() => {
    const goodTags = tags.filter(tag => tag.section === 'good');
    const neutralTags = tags.filter(tag => tag.section === 'neutral');
    const badTags = tags.filter(tag => tag.section === 'bad');
    const filteredTodayTags = tags.filter(tag => {
      const todayTags = tags.filter(tag => tag.section === 'today')
      const isScopedForTodayOrFuture = tag.inScopeDay === selectedDateString || tag.inScopeDay && tag.inScopeDay < selectedDateString;
      const isUncompletedOrCompletedAfter = !tag.completed || (tag.completed && tag.completed >= selectedDateString);
    
      return todayTags && isScopedForTodayOrFuture && isUncompletedOrCompletedAfter;
    });
    setTodayTags(filteredTodayTags)
    setGoodTagsList(goodTags);
    setNeutralTagsList(neutralTags);
    setBadTagsList(badTags);
  }, [tags, selectedDate]); 

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
