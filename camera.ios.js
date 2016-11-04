'use strict';

import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  TabBarIOS,
  Modal,
  View,
  Alert
} from 'react-native';
import ReactCamera from 'react-native-camera';
import firebaseApp from 'firebase/app';
import Icon from 'react-native-vector-icons/Ionicons';

var Clarifai = require('clarifai');
var app = new Clarifai.App(
  '8t2K0ZwH6nYRPcFJQ_JCyyqXCGQbQI0yiFtN5uA3',
  '_UnccE1iW1SXz5AM_hgn4TKo202uHz6NmhC5kVrb'
);
var listOfConcepts = [], listOfFruitsAndVegetables = ["no person", "apple","apricot","avocado","banana","bell pepper","bilberry","blackberry","blackcurrant","blood orange","blueberry","boysenberry","breadfruit","canary melon","cantaloupe","cherimoya","cherry","chili pepper","clementine","cloudberry","coconut","cranberry","cucumber","currant","damson","date","dragonfruit","durian","eggplant","elderberry","feijoa","fig","goji berry","gooseberry","grape","grapefruit","guava","honeydew","huckleberry","jackfruit","jambul","jujube","kiwi fruit","kumquat","lemon","lime","loquat","lychee","mandarine","mango","mulberry","nectarine","nut","olive","orange","pamelo","papaya","passionfruit","peach","pear","persimmon","physalis","pineapple","plum","pomegranate","pomelo","purple mangosteen","quince","raisin","rambutan","raspberry","redcurrant","rock melon","salal berry","satsuma","star fruit","strawberry","tamarillo","tangerine","ugli fruit","watermelon","acorn squash","alfalfa sprout","amaranth","anise","artichoke","arugula","asparagus","aubergine","azuki bean","banana squash","basil","bean sprout","beet","black bean","black-eyed pea","bok choy","borlotti bean","broad beans","broccoflower","broccoli","brussels sprout","butternut squash","cabbage","calabrese","caraway","carrot","cauliflower","cayenne pepper","celeriac","celery","chamomile","chard","chayote","chickpea","chives","cilantro","collard green","corn","corn salad","courgette","cucumber","daikon","delicata","dill","eggplant","endive","fennel","fiddlehead","frisee","garlic","gem squash","ginger","green bean","green pepper","habanero","herbs and spice","horseradish","hubbard squash","jalapeno","jerusalem artichoke","jicama","kale","kidney bean","kohlrabi","lavender","leek ","legume","lemon grass","lentils","lettuce","lima bean","mamey","mangetout","marjoram","mung bean","mushrooms","mustard green","navy bean","nettles","new zealand spinach","nopale","okra","onion","oregano","paprika","parsley","parsnip","patty pan","peas","pinto bean","potato","pumpkin","radicchio","radish","rhubarb","rosemary","runner bean","rutabaga","sage","scallion","shallot","skirret","snap pea","soy bean","spaghetti squash","spinach","squash ","sweet potato","tabasco pepper","taro","tat soi","thyme","tomato","topinambur","tubers","turnip","wasabi","water chestnut","watercress","white radish","yam","zucchini"];

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function sendImage(imageData) {
  app.models.predict(Clarifai.GENERAL_MODEL, {base64: imageData}).then(
    function(response) {
      for(var i = 0; i < response.data.outputs[0].data.concepts.length; i++) {
        if(listOfFruitsAndVegetables.indexOf(response.data.outputs[0].data.concepts[i].name) > -1) {
          listOfConcepts.push(response.data.outputs[0].data.concepts[i].name);
        }
      }
      if(!listOfConcepts.length) {
        var stringList = 'Could not find any ingredients';
      } else {
        var stringList = 'Found ';
      }
      for(var i = 0; i < listOfConcepts.length; i++) {
        stringList += listOfConcepts[i].capitalizeFirstLetter();
        if(listOfConcepts[i] > -1) {
          stringList += ', '
        }
        if(listOfConcepts[i] == 0) {
          stringList += ' and '
        }
        firebaseApp.database().ref().child('ingredients').push({ title: listOfConcepts[i] });
      }
      Alert.alert('Ingredients', stringList);
    },
    function(err) {
      console.warn(err);
    }
  );
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingBottom: 80,
  },
  capture: {
    flex: 0,
    width: 200,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureText: {
    fontSize: 18,
    color: '#fff'
  }
});

class Camera extends Component {
  constructor(props) {
    super(props);
    this.state = {modalVisible: false};
  }
  setModalVisible(visible) {
  this.setState({modalVisible: visible});
}
  render() {
    return (
      <View style={styles.container}>
      <ReactCamera
      ref={(cam) => {
        this.camera = cam;
      }}
      style={styles.preview}
      captureTarget={ReactCamera.constants.CaptureTarget.memory}
      aspect={ReactCamera.constants.Aspect.fill}>
      <Icon.Button name="ios-camera" style={styles.capture} onPress={this.takePicture.bind(this)}>
      <Text style={styles.captureText}>Add Ingredients</Text>
      </Icon.Button>
      </ReactCamera>
      </View>
    );
  }

  takePicture() {
    this.camera.capture()
    .then((data) => sendImage(data.data))
    .catch(err => console.error(err));
  }
}

module.exports = Camera;
