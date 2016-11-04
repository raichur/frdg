'use strict';

import React, { Component } from 'react';
const ListItem = require('./listitem.ios');
const ActionButton = require('./actionbutton.ios');

import {
  StyleSheet,
  View,
  Text,
  ListView,
  AlertIOS,
  Dimensions,
  Alert,
  Image,
  TouchableHighlight
} from 'react-native';
const styles = require('./styles.js');

import * as firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyD4bGTKw2TJ20kMMT0KT-KfKDvfAUxEitc",
  authDomain: "adept-now-130923.firebaseapp.com",
  databaseURL: "https://adept-now-130923.firebaseio.com",
  storageBucket: "adept-now-130923.appspot.com",
  messagingSenderId: "451820905019"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
module.exports.firebaseApp = firebaseApp;

var items = [];
var recipeArray = [];


class Recipes extends Component {
  constructor(props) {
    super(props);
    var dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      isLoading: true,
      dataSource: dataSource.cloneWithRows(recipeArray)
    }
  }


  renderRow(rowData, sectionID, rowID) {
    var recipeImage = "https://spoonacular.com/recipeImages/" + rowData.id + "-312x150.jpg";
    recipeImage = recipeImage.toString();
    return (
      <TouchableHighlight underlayColor='#dddddd'>
      <View>
      <View style={styles.recipeItem}>
      <Text style={{fontSize: 15, fontWeight: '500', color: '#000000'}} numberOfLines={1}>{rowData.title}</Text>
      <Text style={{fontSize: 12, fontWeight: '200', color: '#1d1d1d'}} numberOfLines={1}><Text style={{fontWeight: '600'}}>{rowData.likes} likes</Text> {rowData.usedIngredientCount} used ingredients</Text>
      </View>
      <Image
      source={{uri: recipeImage}}
          resizeMode={Image.resizeMode.cover}
          style={[styles.imageStyle, {overflow: 'visible', width: Dimensions.get('window').width, height: 150}]}
        />
      </View>
      </TouchableHighlight>
    );
  }

  render() {
    firebaseApp.database().ref().child("ingredients").on("value", function(snap) {
      if(snap.val()){
        snap.forEach(function(childSnap){
          console.log(childSnap.val().title);
          items.push(childSnap.val().title);
        });
      }
    });
    var joined = items.join('%2C');
    var url = `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=` + joined + `&limitLicense=false&number=50&ranking=1`;
    // var url = "https://api.nasa.gov/planetary/earth/imagery?lon=100.75&lat=1.5&date=2014-02-01&cloud_score=True&api_key=DEMO_KEY";
    var api = {
      getRecipes() {
        return fetch(url, {
          headers: {
            'X-Mashape-Key': 'KXenI9y4Gnmsh7yjWWb9olngkehop14bk6Sjsn1P5wmh0Tht7P',
            'Accept': 'application/json'
          }
        }).then((res) => res.json());
      }
    };
    api.getRecipes().then((res) => {
      this.setState({
        isLoading: false,
        dataSource: this.state.dataSource.cloneWithRows(res)
      })
    });
    return(
      <View style={styles.container} automaticallyAdjustContentInsets={false}>
      <View style={styles.toolbar} automaticallyAdjustContentInsets={false}>
      <Text style={styles.toolbarButton}></Text>
      <Text style={styles.toolbarTitle}>Recipes</Text>
      <Text style={styles.toolbarButton}></Text>
      </View>
      <ListView contentInset={{top:1,bottom:49}} automaticallyAdjustContentInsets={false} style={styles.listview} dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)} enableEmptySections={true}/>
      </View>
    );
  }
}

module.exports = Recipes;
