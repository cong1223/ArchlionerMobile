export function fileExt2Icon(isFolder, fileExt) {
  // isFolder 是否为文件夹,0为文件;fileExt为文件扩展名
  fileExt = fileExt ? fileExt.toLowerCase() : fileExt;
  if (isFolder === '0') {
    if (fileExt === 'dwg') {
      return require('@/assets/icons/dwg.png');
    } else if (fileExt === 'dwf') {
      return require('@/assets/icons/dwf.png');
    } else if (fileExt === 'pdf') {
      return require('@/assets/icons/pdf.png');
    } else if (fileExt === 'jpeg' || fileExt === 'jpg' || fileExt === 'png') {
      return require('@/assets/icons/picture.png');
    } else if (fileExt === 'doc' || fileExt === 'docx') {
      return require('@/assets/icons/docx.png');
    } else if (fileExt === 'mp3') {
      return require('@/assets/icons/audio.png');
    } else if (
      fileExt === 'mp4' ||
      fileExt === 'wmv' ||
      fileExt === 'dat' ||
      fileExt === 'flv' ||
      fileExt === 'mov' ||
      fileExt === 'avi'
    ) {
      return require('@/assets/icons/video.png');
    } else if (fileExt === 'ppt' || fileExt === 'pptx') {
      return require('@/assets/icons/ppt.png');
    } else if (fileExt === 'xls' || fileExt === 'xlsx' || fileExt === 'csv') {
      return require('@/assets/icons/xls.png');
    } else if (fileExt === 'txt') {
      return require('@/assets/icons/txt.png');
    } else if (fileExt === 'zip' || fileExt === 'rar' || fileExt === 'z') {
      return require('@/assets/icons/zip.png');
    } else {
      return require('@/assets/icons/other.png');
    }
  } else {
    return require('@/assets/icons/folder.png');
  }
}
