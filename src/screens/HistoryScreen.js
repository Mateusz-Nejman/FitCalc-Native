import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Header, Left, Body, Title, Icon, Button, Content, Form, Item, Input, Picker, Grid, Row, Col, Label, Card, CardItem } from 'native-base';
import { useSelector, useDispatch, connect } from 'react-redux';
import { setBmr } from '../actions';
import { existsFile } from '../fileStream';
import { StackedBarChart, YAxis, BarChart, XAxis, Grid as GridChart } from 'react-native-svg-charts';
import { calcKcal } from '../calories-helper';

function HistoryScreen({ navigation }) {
    const userData = useSelector(state => state.userData);
    const dispatch = useDispatch();

    let historyData = [];
    let historyDate = [];

    userData.history.forEach((element, index) => {
        if (index == 0 || index == userData.history.length - 1)
            historyDate.push(element[0]);

        historyData.push(element[1]);
    });

    const historyView = userData.history.length < 2 ? <Text>Brak danych do historii(mniej niż 2 pozycje)</Text> : <View>
        <View style={{ height: 200, flexDirection: 'row' }}>
            <YAxis
                data={historyData}
                contentInset={{ top: 20, bottom: 20 }}
                svg={{
                    fill: 'grey',
                    fontSize: 10,
                }}
                numberOfTicks={10}
                formatLabel={(value) => `${value}kcal`}
            />
            <LineChart
                style={{ flex: 1, marginLeft: 16 }}
                data={historyData}
                svg={{ stroke: 'rgb(134, 65, 244)' }}
                contentInset={{ top: 20, bottom: 20 }}

            >
                <GridChart />
            </LineChart>
        </View>
        <XAxis data={[50, -80]}
            contentInset={{ left: 50, right: 25 }}
            svg={{
                fill: 'grey',
                fontSize: 10,
            }}
            formatLabel={(value) => historyDate[value]} />

    </View>;

    return (
        <Container>
            <Header style={styles.title}>
                <Left>
                    <Button onPress={() => navigation.openDrawer()} style={styles.title}>
                        <Icon name='menu' style={styles.title} />
                    </Button>
                </Left>
                <Body>
                    <Title style={styles.title}>Historia</Title>
                </Body>
            </Header>
            <Content style={styles.container}>
                <Card>
                    <CardItem>
                        <View style={{ width: '100%' }}>
                            {historyView}
                        </View>
                    </CardItem>
                </Card>
            </Content>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 5
    },
    title: {
        color: 'black',
        backgroundColor: 'white'
    },
    flexCol: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    formText: {
        fontSize: 14,
    },
    submitCenter: {
        marginLeft: 10,
        marginRight: 10,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#B3E5FC",
        borderRadius: 4,
        height: 32, marginTop: 10
    },
    buttonText: {
        color: "#01579B"
    },
    tableRow: { borderBottomWidth: 1, borderColor: "#EEEEEE" },
    tableText: { marginRight: 4, paddingVertical: 10, textAlign: 'right', fontSize: 20, fontFamily: "Roboto" },
    tableCol: { marginLeft: 4, paddingVertical: 10, textAlign: 'left', fontSize: 20, fontFamily: "Roboto" }
});

const mapStateToProps = (state) => {
    const { userData } = state
    return { userData }
};

export default connect(mapStateToProps)(HistoryScreen);