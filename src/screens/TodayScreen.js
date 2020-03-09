import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Header, Left, Body, Title, Icon, Button, Content, Form, Item, Input, Picker, Grid, Row, Col, Label, Card, CardItem } from 'native-base';
import { useSelector, useDispatch, connect } from 'react-redux';
import { setBmr } from '../actions';
import { existsFile } from '../fileStream';
import { StackedBarChart, YAxis, BarChart, XAxis, Grid as GridChart } from 'react-native-svg-charts';
import { calcKcal } from '../calories-helper';

function TodayScreen({ navigation }) {
    const userData = useSelector(state => state.userData);
    const dispatch = useDispatch();

    const dailyKcal = calcKcal(
        userData.bmr.gender,
        userData.bmr.age,
        userData.bmr.height,
        userData.bmr.mass,
        userData.bmr.activity,
        userData.bmr.target
    );

    const dailyProtein = dailyKcal * 0.15;
    const dailyCarbo = dailyKcal * 0.55;
    const dailyFat = dailyKcal * 0.3;

    const maxKcal = Math.max((dailyProtein + dailyCarbo + dailyFat), (userData.today.protein + userData.today.carbo + userData.today.fat));

    const colors = ['#4FC3F7', '#FFD54F', '#AED581']
    const keys = ['carbo', 'fat', 'protein']

    return (
        <Container>
            <Header style={styles.title}>
                <Left>
                    <Button onPress={() => navigation.openDrawer()} style={styles.title}>
                        <Icon name='menu' style={styles.title} />
                    </Button>
                </Left>
                <Body>
                    <Title style={styles.title}>Dzisiejsze spożycie</Title>
                </Body>
            </Header>
            <Content style={styles.container}>
                <Card>
                    <CardItem>
                        <View style={{ width: '100%' }}>
                            <View>
                                <View style={{ height: 200, flexDirection: 'row' }}>
                                    <YAxis
                                        data={[0, maxKcal]}
                                        contentInset={{ top: 30, bottom: 30 }}
                                        svg={{
                                            fill: 'grey',
                                            fontSize: 10,
                                        }}
                                        numberOfTicks={15}
                                        formatLabel={(value) => `${value}kcal`}
                                    />
                                    <StackedBarChart
                                        style={{ flex: 1, marginLeft: 16 }}
                                        keys={keys}
                                        colors={colors}
                                        data={[
                                            {
                                                protein: dailyProtein,
                                                carbo: dailyCarbo,
                                                fat: dailyFat
                                            },
                                            {
                                                protein: userData.today.protein,
                                                carbo: userData.today.carbo,
                                                fat: userData.today.fat
                                            },
                                        ]}
                                        showGrid={true}
                                        contentInset={{ top: 30, bottom: 30 }}
                                    ><GridChart /></StackedBarChart>
                                </View>
                                <XAxis data={[50, -80]}
                                    contentInset={{ left: 125, right: 50 }}
                                    svg={{
                                        fill: 'grey',
                                        fontSize: 10,
                                    }}
                                    formatLabel={(value) => value == 0 ? "Do zjedzenia" : "Zjedzone"} />
                            </View>
                        </View>
                    </CardItem>
                </Card>
                <Card>
                    <CardItem>
                        <View style={{ width: '100%' }}>
                            <Grid>
                                <Row style={styles.tableRow}>
                                    <Col><Text style={{ ...styles.tableCol, color: colors[0] }}>Węglowodany</Text></Col>
                                    <Col><Text style={{ ...styles.tableText, color: colors[0] }}>{userData.today.carbo}kcal</Text></Col>
                                </Row>
                                <Row style={styles.tableRow}>
                                    <Col><Text style={{ ...styles.tableCol, color: colors[1] }}>Tłuszcze</Text></Col>
                                    <Col><Text style={{ ...styles.tableText, color: colors[1] }}>{userData.today.fat}kcal</Text></Col>
                                </Row>
                                <Row style={styles.tableRow}>
                                    <Col><Text style={{ ...styles.tableCol, color: colors[2] }}>Białka</Text></Col>
                                    <Col><Text style={{ ...styles.tableText, color: colors[2] }}>{userData.today.protein}kcal</Text></Col>
                                </Row>
                                <Row style={styles.tableRow}>
                                    <Col><Text style={styles.tableCol}>Razem</Text></Col>
                                    <Col><Text style={styles.tableText}>{(userData.today.protein + userData.today.carbo + userData.today.fat)}kcal</Text></Col>
                                </Row>
                                <Row style={styles.tableRow}>
                                    <Col><Text style={styles.tableCol}>Brakuje</Text></Col>
                                    <Col><Text style={styles.tableText}>{parseInt(dailyKcal-(userData.today.protein + userData.today.carbo + userData.today.fat))}kcal</Text></Col>
                                </Row>
                            </Grid>
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

export default connect(mapStateToProps)(TodayScreen);