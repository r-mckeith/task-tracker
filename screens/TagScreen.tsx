import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useTagContext } from '../src/contexts/tags/UseTagContext';
import { TagProps } from '../src/types/TagTypes';
import Section from '../components/tags/Section';
import SelectedTagList from '../components/tags/SelectedTagList';


const greenTagSeeds = ['Good tag', 'Great tag', 'Awesome tag', 'Really good tag', 'Amazing tag', 'The best tag', 'There are no better tags']
const yellowTagSeeds = ['OK tag', 'Not a bad tag', 'But not a great tag either', 'There have been better tags', 'But there have been worse']
const pinkTagSeeds = ['Horrible tag', 'Pink tag', 'Bad tag', 'Don\t do this again tag', 'The worst tag anyone has ever seen']

export default function TagScreen() {
  const [goodTagsList, setGoodTagsList] = useState<TagProps[]>([]);
  const [neutralTagsList, setNeutralTagsList] = useState<TagProps[]>([]);
  const [badTagsList, setBadTagsList] = useState<TagProps[]>([]);
  const [selectedTagList, setSelectedTagList] = useState<TagProps[]>([]);
  console.log(selectedTagList)

  const { tags, tagData } = useTagContext();

  useEffect(() => {
    const goodTags = tags.filter(tag => tag.section === 'good').map(tag => tag);
    const neutralTags = tags.filter(tag => tag.section === 'neutral').map(tag => tag);
    const badTags = tags.filter(tag => tag.section === 'bad').map(tag => tag);
    const selectedTags = tags.filter(tag => tag.tag_data && tag.tag_data.length > 0);

    setGoodTagsList(goodTags);
    setNeutralTagsList(neutralTags);
    setBadTagsList(badTags);
    setSelectedTagList(selectedTags)
  }, [tags]); 

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <Section color='lightgreen' tags={goodTagsList} sectionName={'good'} />
        <Section color='lightyellow' tags={neutralTagsList} sectionName={'neutral'} />
        <Section color='pink' tags={badTagsList} sectionName={'bad'} />
        <SelectedTagList selectedTags={selectedTagList}/>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
});
