import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from './components/Home';
import { Provider, useDispatch, connect, useSelector } from 'react-redux';
import configureStore from './src/configureStore';
import NewProfileScreen from './src/screens/NewProfileScreen';
import { readFile } from './src/fileStream';
import { addProductId, addProgress, addHistory, setBmr, setToday, initUserData, setBlockMenu } from './src/actions';
import { getToday } from './src/date-helper';
import { AppLoading } from 'expo';
import ProfileScreen from './src/screens/ProfileScreen';
import ControlScreen from './src/screens/ControlScreen';
import TodayScreen from './src/screens/TodayScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import SyncScreen from './src/screens/SyncScreen';

const Drawer = createDrawerNavigator();
const store = configureStore();

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            blockMenu: true
        };
    }

    async componentDidMount() {
        const userDataString = await readFile("user_data.json");
        const productsString = await readFile("products.json");

        if (productsString !== false) {
            const productsArray = JSON.parse(productsString);
            productsArray.forEach(element => {
                dispatch(addProductId(element));
            });
        }

        if (userDataString !== false) {
            console.log(userDataString);
            this.props.setBlockMenu(false);
            const userData = JSON.parse(userDataString);

            userData.progress.forEach(element => {
                this.props.addProgress(element[0], element[1], false);
            });

            userData.history.forEach(element => {
                this.props.addHistory(element[0], element[1], false);
            });

            this.props.setBmr(userData.bmr, false);
            const nowDate = getToday();

            if (userData.today.date === nowDate || userData.today.date === "")
                this.props.setToday(
                    userData.today.protein,
                    userData.today.carbo,
                    userData.today.fat,
                    nowDate,
                    true
                );
            else {
                this.props.addHistory(
                    userData.today.date,
                    userData.today.protein * 4.0 +
                    userData.today.carbo * 4.0 +
                    userData.today.fat * 9.0,
                    true
                );
                this.props.setToday(0, 0, 0, nowDate);
            }
        }
        this.setState({ ...this.state, isReady: true });
    }


    render() {
        if (!this.state.isReady) {
            return <AppLoading />;
        }

        return (
            <NavigationContainer>
                <Drawer.Navigator drawerContent={props => MenuDrawer({
                    ...props,
                    blockMenu: this.props.app.block
                })} initialRouteName="Control">
                    <Drawer.Screen name="Control" component={ControlScreen} />
                    <Drawer.Screen name="NewProfile" component={NewProfileScreen} />
                    <Drawer.Screen name="Profile" component={ProfileScreen} />
                    <Drawer.Screen name="Today" component={TodayScreen} />
                    <Drawer.Screen name="History" component={HistoryScreen} />
                    <Drawer.Screen name="Sync" component={SyncScreen} />
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
        <DrawerItem label="Profil" onPress={() => props.blockMenu ? props.navigation.closeDrawer() : props.navigation.navigate("Profile")} />
        <DrawerItem label="Dzisiejsze spożycie" onPress={() => props.blockMenu ? props.navigation.closeDrawer() : props.navigation.navigate("Today")} />
        <DrawerItem label="Historia" onPress={() => props.blockMenu ? props.navigation.closeDrawer() : props.navigation.navigate("History")} />
        <DrawerItem label="Produkty" onPress={() => props.blockMenu ? props.navigation.closeDrawer() : props.navigation.navigate("NewProfile")} />
        <DrawerItem label="Synchronizuj" onPress={() => props.blockMenu ? props.navigation.closeDrawer() : props.navigation.navigate("Sync")} />
        <DrawerItem label="Strona autora" onPress={() => props.blockMenu ? props.navigation.closeDrawer() : props.navigation.navigate("NewProfile")} />
        <DrawerItem label="Nowy profil" onPress={() => props.blockMenu ? props.navigation.closeDrawer() : props.navigation.navigate("NewProfile")} />
        <DrawerItem
            label="Siup test"
            onPress={() => props.navigation.closeDrawer()} />
    </DrawerContentScrollView>);
}

const mapStateToProps = (state) => {
    const { userData, products, app } = state
    return { userData, products, app }
};

const mapDispatchToProps = dispatch => {
    return {
        setBmr: (bmr, localSave) => {
            dispatch(setBmr(bmr, localSave))
        },

        addProgress: (date, mass, localSave) => {
            dispatch(addProgress(date, mass, localSave))
        },

        addProduct: (name, protein, carbo, fat, portion, hash, localSave) => {
            dispatch(addProduct(name, protein, carbo, fat, portion, hash, localSave))
        },

        addProducts: () => { dispatch(addProducts()) },
        addProductId: product => { dispatch(addProductId(product)) },
        addHistory: (date, kcal, localSave) => { dispatch(addHistory(date, kcal, localSave)) },
        setToday: (protein, carbo, fat, date, localSave) => { dispatch(setToday(protein, carbo, fat, date, localSave)) },
        addToday: (protein, carbo, fat) => { dispatch(addToday(protein, carbo, fat)) },
        initUserData: () => { dispatch(initUserData()) },
        setBlockMenu: value => { dispatch(setBlockMenu(value)) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);