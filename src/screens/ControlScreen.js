import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Header, Left, Body, Title, Icon, Button, Content, Form, Item, Input, Picker, Grid, Row, Col, Label, Card, CardItem } from 'native-base';
import { useSelector, useDispatch, connect } from 'react-redux';
import { setBmr, blockMenu } from '../actions';
import { existsFile, readFile } from '../fileStream';
import { AppLoading } from 'expo';

function ControlScreen({ navigation }) {
    const appData = useSelector(state => state.app);
    const dispatch = useDispatch();

    existsFile("user_data.json").then(value => {
        if (value)
            navigation.navigate("Profile");
        else
            navigation.navigate("NewProfile");
    });

    return <AppLoading />
}

export default ControlScreen;