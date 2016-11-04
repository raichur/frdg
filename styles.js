const React = require('react-native')
const {StyleSheet, Dimensions} = React

var styles = StyleSheet.create({
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 1,
    height: 40,
  },
  rowBack: {
    backgroundColor: '#cc4501',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
    alignItems: 'flex-end'
  },
  rowText: {
    color: '#fff',
    paddingRight: 10,
  },
  container: {
    backgroundColor: '#f2f2f2',
    flex: 1,
  },
  listview: {
    flex: 1
  },
  li: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  imageStyle: {
    zIndex: -1,
    marginTop: 1
  },
  recipeItem: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    margin: 0,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  liContainer: {
    flex: 2,
  },
  liText: {
    color: '#333',
    fontSize: 16,
  },
  navbar: {
    alignItems: 'center',
    backgroundColor: '#3f80e9',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  navbarTitle: {
    color: '#444',
    fontSize: 15,
    fontWeight: "500"
  },
  center: {
    textAlign: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  toolbar:{
        backgroundColor:'#fff',
        paddingTop:30,
        paddingBottom:10,
        flexDirection:'row',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
    toolbarButton:{
        width: 60,
        fontSize: 16,
        color:'#000',
        textAlign:'center',
        fontWeight: '600'
    },
    toolbarTitle:{
        color:'#000',
        textAlign:'center',
        fontSize: 16,
        flex:1
    },
  action: {
    backgroundColor: '#1d1d1d',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  tabContent: {
    flex: 1,
    alignItems: 'center',
  }
})

module.exports = styles
