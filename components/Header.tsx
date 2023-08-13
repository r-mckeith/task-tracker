import React from 'react';
import { Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import styles from '../styles/screens/dailyScreen'

const currentDate = new Date();

const dateFormatted = currentDate.toLocaleDateString('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
});

const dateFormattedForWeek = currentDate.toLocaleDateString('en-US', {
  month: 'long',
  day: 'numeric',
});

const Header: React.FC = () => {
  const route = useRoute();

  return (
    <View>
    {route.name === 'DailyScreen' &&
      <Text style={styles.headerText}>{dateFormatted}</Text>
    }
    {route.name === 'ScopeDay' && 
      <Text style={styles.headerText}>Add tasks to your day</Text>
    }
    {route.name === 'ReviewDay' &&
      <Text style={styles.headerText}>Review your day</Text>
    }
    {route.name === 'WeeklyScreen' &&
      <Text style={styles.headerText}>Week of {dateFormattedForWeek}</Text>
    }
    {route.name === 'ScopeWeek' && 
      <Text style={styles.headerText}>Add tasks to your week</Text>
    }
    {route.name === 'ReviewWeek' &&
      <Text style={styles.headerText}>Review your week</Text>
    }
      {route.name === 'QuarterlyScreen' &&
      <Text style={styles.headerText}>Quarter of {dateFormattedForWeek}</Text>
    }
    {route.name === 'ScopeQuarter' && 
      <Text style={styles.headerText}>Add tasks to your quarter</Text>
    }
    {route.name === 'ReviewQuarter' &&
      <Text style={styles.headerText}>Review your quarter</Text>
    }
    </View>
  
  );
};

export default Header;