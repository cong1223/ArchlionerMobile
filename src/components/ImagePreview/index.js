import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { ActivityIndicator, Modal, View } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import styles from './styles';

const ImagePreview = forwardRef((props, ref) => {
  const { images } = props;
  const [showImagePreview, setShowImagePreview] = useState(false);
  useImperativeHandle(ref, () => ({
    open: () => setShowImagePreview(true),
    close: () => setShowImagePreview(false)
  }));
  const renderLoading = () => {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} size={'large'} />
      </View>
    );
  };
  return (
    <Modal
      visible={showImagePreview}
      transparent={true}
      onRequestClose={() => setShowImagePreview(false)}
    >
      <ImageViewer
        {...props}
        imageUrls={images}
        saveToLocalByLongPress={false}
        enableSwipeDown={true}
        loadingRender={renderLoading}
        onCancel={() => setShowImagePreview(false)}
        onClick={() => setShowImagePreview(false)}
      />
    </Modal>
  );
});

export default ImagePreview;
