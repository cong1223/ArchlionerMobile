import React, { useState, memo } from 'react';
import { View, FlatList, TouchableHighlight, Text, ActivityIndicator } from 'react-native';
import styles from './styles';
import { SearchBar } from 'react-native-elements';
import common from '../../../styles/common';
import { colors } from '../../../styles/variable';

const Project = memo(() => {
  const [keyword, setKeyword] = useState('');
  const handleSearch = value => {
    setKeyword(value);
  };
  return (
    <View style={styles.container}>
      <SearchBar
        containerStyle={styles.searchBarContainer}
        inputStyle={styles.searchInput}
        inputContainerStyle={styles.searchInputContainer}
        lightTheme={true}
        placeholder="搜索"
        onChangeText={handleSearch}
        value={keyword}
      />
      <FlatList
        style={styles.flatListContainer}
        data={[
          { title: 'Title Text', key: 'item1' },
          { title: 'Title Text', key: 'item1' },
          { title: 'Title Text', key: 'item1' },
          { title: 'Title Text', key: 'item1' },
          { title: 'Title Text', key: 'item1' },
          { title: 'Title Text', key: 'item1' },
          { title: 'Title Text', key: 'item1' },
          { title: 'Title Text', key: 'item1' },
          { title: 'Title Text', key: 'item1' },
          { title: 'Title Text', key: 'item1' },
          { title: 'Title Text', key: 'item1' },
          { title: 'Title Text', key: 'item1' },
          { title: 'Title Text', key: 'item1' },
          { title: 'Title Text', key: 'item1' },
          { title: 'Title Text', key: 'item1' },
          { title: 'Title Text', key: 'item1' },
          { title: 'Title Text', key: 'item1' },
          { title: 'Title Text', key: 'item1' },
          { title: 'Title Text', key: 'item1' },
          { title: 'Title Text', key: 'item1' },
          { title: 'Title Text', key: 'item1' },
          { title: 'Title Text', key: 'item1' }
        ]}
        numColumns="2"
        renderItem={({ item, index, separators }) => (
          <TouchableHighlight
            // onPress={() => this._onPress(item)}
            onShowUnderlay={separators.highlight}
            onHideUnderlay={separators.unhighlight}
          >
            <View style={styles.listItem}>
              <Text
                style={[
                  common.iconStyle,
                  { color: colors.themeColor, fontSize: 80 }
                ]}
              >
                {'\ue74f'}
              </Text>
              <Text style={styles.projectName}>碧桂园一期</Text>
              <Text style={styles.createTimeText}>08-08 15:36</Text>
            </View>
          </TouchableHighlight>
        )}
        ItemSeparatorComponent={
          // eslint-disable-next-line no-undef
          Platform.OS !== 'android' &&
          (({ highlighted }) => (
            <View
              style={[styles.separator, highlighted && { marginLeft: 0 }]}
            />
          ))
        }
      />
    </View>
  );
});

export default Project;
