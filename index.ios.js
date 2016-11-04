'use strict';

var Camera = require('./camera.ios');
var Ingredients = require('./ingredients.ios');
var Recipes = require('./recipes.ios');

import React, { Component } from 'react';
const styles = require('./styles.js');

import {
  AppRegistry,
  TabBarIOS,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

class Frdg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'recipes'
    };
  }
  render() {
    return (
      <TabBarIOS
        translucent={false}
        selectedTab={this.state.selectedTab}>
      <Icon.TabBarItemIOS
      selected={this.state.selectedTab === 'recipes'}
      iconName="ios-book-outline"
      selectedIconName="ios-book"
      title='Recipes'
      onPress={() => {
        this.setState({
          selectedTab: 'recipes'
        });
      }}>
      <Recipes />
      </Icon.TabBarItemIOS>
      <Icon.TabBarItemIOS
      iconName="ios-camera-outline"
      selectedIconName="ios-camera"
      selected={this.state.selectedTab === 'camera'}
      title='Camera'
      onPress={() => {
        this.setState({
          selectedTab: 'camera'
        });
      }}>
      <Camera />
      </Icon.TabBarItemIOS>
      <Icon.TabBarItemIOS
          iconName="ios-basket-outline"
          selectedIconName="ios-basket"
          selected={this.state.selectedTab === 'ingredients'}
          title='Ingredients'
          onPress={() => {
            this.setState({
              selectedTab: 'ingredients'
            });
          }}>
          <Ingredients />
        </Icon.TabBarItemIOS>

      </TabBarIOS>
    )
  }
}

AppRegistry.registerComponent('Frdg', () => Frdg);
