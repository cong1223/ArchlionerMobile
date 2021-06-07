import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import styles from './styles';
import common from '../../styles/common';
import { useRoute } from '@react-navigation/native';
import { ListItem } from 'react-native-elements';
import { fileExt2Icon } from '../../utils/file';
import WorkFlowService from '../../services/WorkFlowService';
import ProjectService from '../../services/ProjectService';
import { WToast } from 'react-native-smart-tip';
import ImagePreview from '../../components/ImagePreview';

const Folder = props => {
  const route = useRoute();
  const { actId } = route.params;
  const [fileList, setFileList] = useState([]);
  const [images, setImages] = useState([]);
  const imagePreview = useRef();

  const handleClickListItem = item => {
    ProjectService.getPreviewUrl(item.recordId).then(res => {
      let fileExt;
      if (!res.previewUrl) {
        WToast.show({
          data: '文件打开失败',
          position: WToast.position.CENTER
        });
        return;
      }
      if (res.previewUrl.lastIndexOf('/jpeg/') !== -1) {
        fileExt = 'jpeg';
      } else if (res.previewUrl.lastIndexOf('/png/') !== -1) {
        fileExt = 'png';
      }
      const previewUrl = res.previewUrl + `400/transform1.${fileExt}`;
      setImages([{ url: previewUrl }]);
      imagePreview.current.open();
    });
  };
  useEffect(() => {
    WorkFlowService.getActResList(actId).then(res => {
      console.log('流程文件', res);
      setFileList(res);
    });
  }, [actId]);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {fileList.map(item => {
        return (
          <ListItem
            bottomDivider
            key={item.resId}
            onPress={() => handleClickListItem(item)}
          >
            <Image source={fileExt2Icon('0', item.fileExt)} />
            <ListItem.Content>
              <Text style={styles.listItemTitle} numberOfLines={1}>
                {item.resName}
              </Text>
              <Text style={styles.listItemSubTitle}>{item.createTime}</Text>
            </ListItem.Content>
          </ListItem>
        );
      })}
      <ImagePreview ref={imagePreview} images={images} />
    </ScrollView>
  );
};

export default Folder;
