import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from './components/Home';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <NavigationContainer>
        <Drawer.Navigator drawerContent={props => MenuDrawer(props)} initialRouteName="Home">
          <Drawer.Screen name="Home" component={Home} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTitle: {
    fontSize: 44,
    fontFamily: 'Roboto_medium',
    textAlign: 'center'
  }
});


function MenuDrawer(props) {
  return (<DrawerContentScrollView {...props}>
    <Text style={styles.menuTitle}>FitCalc</Text>
    <DrawerItemList {...props} />
    <DrawerItem
      label="Siup test"
      onPress={() => props.navigation.closeDrawer()} />
  </DrawerContentScrollView>);
}