import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Section from '../components/tags/Section';
import AddTagModal from '../components/tags/AddTagModal';


const greenTagSeeds = ['Good tag', 'Great tag', 'Awesome tag', 'Really good tag', 'Amazing tag', 'The best tag', 'There are no better tags']
const yellowTagSeeds = ['OK tag', 'Not a bad tag', 'But not a great tag either', 'There have been better tags', 'But there have been worse']
const pinkTagSeeds = ['Horrible tag', 'Pink tag', 'Bad tag', 'Don\t do this again tag', 'The worst tag anyone has ever seen']

const TagScreen: React.FC = () => {
  const [timeframe, setTimeframe] = useState('Day');
  const [goodTags, setGoodTags] = useState<string[]>(greenTagSeeds);
  const [neutralTags, setNeutralTags] = useState<string[]>(yellowTagSeeds);
  const [badTags, setBadTags] = useState<string[]>(pinkTagSeeds);
  const [selectedTags, setSelectedTags] = useState<{ name: string, count: number }[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentSection, setCurrentSection] = useState<'good' | 'neutral' | 'bad' | null>(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const addTag = (color: string, tag: string) => {
    console.log("Adding tag: ", tag, " to ", color);
    switch (color) {
      case 'good':
        setGoodTags((prev) => [...prev, tag]);
        break;
      case 'neutral':
        setNeutralTags((prev) => [...prev, tag]);
        break;
      case 'bad':
        setBadTags((prev) => [...prev, tag]);
        break;
    }
  };

  const handleTagSelect = (tag: string) => {
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

  function handleRemoveTag(color: string, tag: string) {
    console.log("Removing tag", tag, "from section", color);
    switch (color) {
      case 'good':
        setGoodTags((prev) => prev.filter((t) => t !== tag));
        break;
      case 'neutral':
        setNeutralTags((prev) => prev.filter((t) => t !== tag));
        break;
      case 'bad':
        setBadTags((prev) => prev.filter((t) => t !== tag));
        break;
    }
  }  

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <Section title="" color='lightgreen' tags={goodTags} addTag={() => { setShowModal(true); setCurrentSection('good') }} onSelect={(tag) => handleTagSelect(tag)} onRemove={(tag) => handleRemoveTag('good', tag)} />
        <Section title="" color='lightyellow' tags={neutralTags} addTag={() => { setShowModal(true); setCurrentSection('neutral'); }} onSelect={(tag) => handleTagSelect(tag)} onRemove={(tag) => handleRemoveTag('neutral', tag)} />
        <Section title="" color='pink' tags={badTags} addTag={() => { setShowModal(true); setCurrentSection('bad'); }} onSelect={(tag) => handleTagSelect(tag)} onRemove={(tag) => handleRemoveTag('bad', tag)} />

    
        <View style={styles.selectedTagList}>
        <TouchableOpacity style={styles.dropdownButton} onPress={() => setDropdownVisible(!dropdownVisible)}>
          <Text>{timeframe}</Text>
          <MaterialCommunityIcons name={dropdownVisible ? "chevron-up" : "chevron-down"} size={24} />
        </TouchableOpacity>
        {dropdownVisible && (
          <View style={styles.dropdownList}>
            {['Day', 'Week', 'Month', 'Year'].map(option => (
              <TouchableOpacity key={option} style={styles.dropdownItem} onPress={() => { setTimeframe(option); setDropdownVisible(false); }}>
                <Text>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {selectedTags.map((tagObj, index) => (
          <View style={styles.selectedTag} key={index}>
            <Text style={styles.tagName}>{tagObj.name}</Text>
            {tagObj.count > 1 && <Text style={styles.tagCount}>{`x${tagObj.count}`}</Text>}
          </View>
        ))}
        </View>
        <AddTagModal
          visible={showModal}
          onClose={() => setShowModal(false)}
          onAddTag={(color, tag) => addTag(color, tag)}
          currentSection={currentSection}
          color={currentSection}
        />
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
  selectedTagList: {
    flex: 1,
    padding: 10,
    minHeight: 250,
    backgroundColor: '#eee',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  selectedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    // borderRadius: 16,
    // backgroundColor: '#e1e1e1', 
    margin: 4,
    alignSelf: 'flex-start',
    // paddingHorizontal: 16,
},
  tagName: {
      marginRight: 8,
      fontSize: 16,
  },
  tagCount: {
      fontSize: 16,
      color: '#555',
  },
  defaultAddButton: {
    borderRadius: 25, 
    padding: 2,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
  },
  addButtonContainer: {
    alignSelf: 'center',
    width: '90%',
    marginBottom: 20,
  },
  addButton2: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 10,
  },
  addButtonText: {
    color: '#000',
    fontSize: 16,
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  dropdownList: {
    backgroundColor: '#f9f9f9',
    borderColor: '#ddd',
    borderWidth: 1,
    position: 'absolute', // This makes it float on top
    top: 50,  // Adjust based on your layout
    left: 10,
    right: 10,
    zIndex: 1,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderRadius: 16,
    backgroundColor: '#e1e1e1',
    margin: 4,
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1, // Add a border to separate rows
    borderBottomColor: '#ddd', // Border color
  },

  tableCell: {
    flex: 1, // Make the cells flex to fill the available space
    fontSize: 16,
  },

  tableCellCount: {
    marginLeft: 8, // Add margin to push the count to the right
    fontSize: 16,
    color: '#555', // Adjust the color of the count
  },
});


export default TagScreen;
