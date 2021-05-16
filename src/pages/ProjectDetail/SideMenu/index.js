import React from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import styles from './styles';
const Title = ({ title }) => {
  return <Text style={styles.title}>{title}</Text>;
};

const SwitchText = ({ text }) => {
  return <Text style={styles.switchText}>{text}</Text>;
};

const Description = ({ text }) => {
  return <Text style={styles.description}>{text}</Text>;
};
const SideMenu = props => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <Title title="Timeline" />

        <View>
          <View style={styles.swithBlock}>
            <SwitchText text="Ratings with reviews only" />
          </View>
          <Description text="When enabled, on your timeline we will only show ratings with reviews." />
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.link}>Press to call parent function</Text>
      </View>
    </SafeAreaView>
  );
};

export default SideMenu;
