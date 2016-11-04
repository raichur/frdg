'use strict';

import React, { Component } from 'react';
const ListItem = require('./listitem.ios');
import firebaseApp from 'firebase/app';
const ActionButton = require('./actionbutton.ios');

import {
  StyleSheet,
  View,
  Text,
  ListView,
  AlertIOS
} from 'react-native';
const styles = require('./styles.js');


import { SwipeListView } from 'react-native-swipe-list-view';


  String.prototype.capitalizeFirstLetter = function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
  }

class Ingredients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
    this.itemsRef = this.getRef().child('ingredients');
  }

  getRef() {
    return firebaseApp.database().ref();
  }


  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [], itemString = '';
      snap.forEach((child) => {
        items.push({
          title: child.val().title.capitalizeFirstLetter(),
          _key: child.key
        });
      });
      for(var i = 0; i < items.length; i++) {
        itemString += items[i].title.toString();
        if(i != items.length-1) {
          itemString += ',';
        }
      }
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });

    });
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }

  render() {
    return (
      <View style={styles.container} automaticallyAdjustContentInsets={false}>
      <View style={styles.toolbar} automaticallyAdjustContentInsets={false}>
                    <Text style={styles.toolbarButton} onPress={this._addItem.bind(this)}>Add</Text>
                    <Text style={styles.toolbarTitle}>Ingredients</Text>
                    <Text style={styles.toolbarButton}></Text>
                </View>
      <SwipeListView
       contentInset={{top:1,bottom:49}}
      automaticallyAdjustContentInsets={false}
      dataSource={this.state.dataSource}
      renderRow={this._renderItem.bind(this)}
      enableEmptySections={true}
      renderHiddenRow={ data => (
                <View style={styles.rowBack}>
                    <Text style={styles.rowText}>Remove</Text>
                </View>
            )}
            rightOpenValue={-75}
      style={styles.listview}/>

      </View>
    )
  }

  _addItem() {
    AlertIOS.prompt(
      'Add New Item',
      null,
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {
          text: 'Add',
          onPress: (text) => {
            this.itemsRef.push({ title: text })
          }
        },
      ],
      'plain-text'
    );
  }

  _renderItem(item) {

    const onPress = () => {
      AlertIOS.alert(
        'Remove Ingredient',
        null,
        [
          {text: 'Remove', onPress: (text) => this.itemsRef.child(item._key).remove()},
          {text: 'Cancel', onPress: (text) => console.log('Cancelled')}
        ]
      );
    };

    return (
      <ListItem item={item} onPress={onPress} />
    );
  }
}

module.exports = Ingredients;
