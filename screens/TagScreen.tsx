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
  const [selectedTags, setSelectedTags] = useState<{ name: string, count: number }[]>([]);

  const { tags, tagData } = useTagContext();

  console.log(tags)

  useEffect(() => {
    const goodTags = tags.filter(tag => tag.section === 'good').map(tag => tag);
    const neutralTags = tags.filter(tag => tag.section === 'neutral').map(tag => tag);
    const badTags = tags.filter(tag => tag.section === 'bad').map(tag => tag);

    setGoodTagsList(goodTags);
    setNeutralTagsList(neutralTags);
    setBadTagsList(badTags);
  }, [tags]);

  function handleTagSelect(tag: string) {
    setSelectedTags((prev) => {
      const foundTag = prev.find((t) => t.name === tag);
      if (foundTag) {
        return prev.map((t) =>
          t.name === tag ? { ...t, count: t.count + 1 } : t
        );
      } else {
        return [...prev, { name: tag, count: 1 }];
      }
    });
  };  

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <Section color='lightgreen' tags={goodTagsList} sectionName={'good'} onSelect={(tag) => handleTagSelect(tag)} />
        <Section color='lightyellow' tags={neutralTagsList} sectionName={'neutral'} onSelect={(tag) => handleTagSelect(tag)} />
        <Section color='pink' tags={badTagsList} sectionName={'bad'} onSelect={(tag) => handleTagSelect(tag)} />
        <SelectedTagList selectedTags={selectedTags}/>
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
