import { StyleSheet } from 'react-native';
import myTheme from '../../styles/myTheme';

const styles = StyleSheet.create({
  container: {
    paddingTop: 13,
    paddingLeft: 12,
    paddingRight: 12
  },
  detailCardContainer: {
    backgroundColor: '#fff',
    marginBottom: 8,
    overflow: 'hidden'
  },
  actNameText: {
    fontSize: 14,
    color: '#000'
  },
  descItemBox: {
    marginTop: 8,
    flexDirection: 'row'
  },
  userInfoContainer: {
    height: 34,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden'
  },
  userInfoNameText: {
    marginLeft: 15,
    fontSize: 14,
    color: myTheme.colors.text
  },
  userInfoTimeAgo: {
    fontSize: 11,
    color: myTheme.colors.infoText
  },
  descLabelText: {
    fontSize: 11,
    color: myTheme.colors.infoText
  },
  descText: {
    flex: 1,
    fontSize: 11,
    color: myTheme.colors.infoText
  },
  baseInfoContainer: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F5F9'
  },
  listItem: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff'
  },
  fileListItem: {
    height: 56,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  chevronText: {
    color: myTheme.colors.infoText,
    fontSize: 11,
    marginRight: 8
  },
  avatarTitleText: {
    fontSize: 12
  },
  avatarOverlayContainer: {
    backgroundColor: '#595959'
  },
  statusContainer: {
    width: 50,
    height: 18,
    borderRadius: 20,
    backgroundColor: '#595959'
  },
  statusText: {
    fontSize: 11,
    color: '#fff'
  }
});

export default styles;
