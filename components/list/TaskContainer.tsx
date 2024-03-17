import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { TagProps } from '../../src/types/TagTypes';
import NestedList from '../NestedList';
import { ScrollView } from 'react-native-gesture-handler';

type TaskContainerProps = {
  tags: TagProps[];
  filter: string;
};

export default function TaskContainer({ tags, filter }: TaskContainerProps) {

  return (
    <View style={styles.container}>
      {tags.length > 0 ? (
        <ScrollView style={styles.taskList}>
          <NestedList tags={tags} filter={filter} />
        </ScrollView>
      ) : (
        <View style={styles.emptyContainer} />
      )}
    </View>
  );
}

const styles=StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  taskList: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
