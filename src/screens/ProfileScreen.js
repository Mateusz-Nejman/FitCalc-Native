import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Container, Header, Left, Body, Title, Icon, Button, Content, Form, Item, Input, Picker, Grid, Label, Card, CardItem, Row, Col } from 'native-base';
import { connect, useSelector, useDispatch } from 'react-redux';
import { BarChart, XAxis, StackedBarChart, LineChart, Grid as GridChart, YAxis } from 'react-native-svg-charts';
import { ScrollView } from 'react-native-gesture-handler';
import { addProgress, setBmr, setMass } from '../actions';
import { getToday } from '../date-helper';
import Prompt from '../components/Prompt';
import { calcKcal } from '../calories-helper';

const activities = [
    {
        value: "1.2",
        text: "Brak aktywności, praca siedząca"
    },
    {
        value: "1.3",
        text: "Niska aktywność (praca siedząca, 1-2 treningi w tygodniu)"
    },
    {
        value: "1.5",
        text: "Średnia aktywność (praca siedząca, 3-4 treningi w tygodniu)"
    },
    {
        value: "1.7",
        text: "Wysoka aktywność (praca fizyczna, 3-4 treningi w tygodniu)"
    },
    {
        value: "1.9",
        text:
            "Bardzo wysoka aktywność (zawodowi sportowcy, osoby codziennie trenujące"
    }
];

const targets = [
    {
        value: "-500",
        text: "Utrata masy"
    },
    {
        value: "0",
        text: "Utrzymanie masy"
    },
    {
        value: "500",
        text: "Przybranie masy"
    },
];

function ProfileScreen({ navigation }) {
    const userData = useSelector(state => state.userData);
    const dispatch = useDispatch();
    const [promptVisible, setPromptVisible] = React.useState(false);

    const kcal = parseInt(calcKcal(userData.bmr.gender, userData.bmr.age, userData.bmr.height, userData.bmr.mass, userData.bmr.activity, userData.bmr.target));

    let progressData = [];
    let progressDate = [];

    userData.progress.forEach((element, index) => {
        if (index == 0 || index == userData.progress.length - 1)
            progressDate.push(element[0]);

        progressData.push(element[1]);
    });

    const progressView = userData.progress.length < 2 ? <Text>Brak postępu do wyświetlenia</Text> : <View>
        <View style={{ height: 200, flexDirection: 'row' }}>
            <YAxis
                data={progressData}
                contentInset={{ top: 20, bottom: 20 }}
                svg={{
                    fill: 'grey',
                    fontSize: 10,
                }}
                numberOfTicks={10}
                formatLabel={(value) => `${value}kg`}
            />
            <LineChart
                style={{ flex: 1, marginLeft: 16 }}
                data={progressData}
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
            formatLabel={(value) => progressDate[value]} />

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
                    <Title style={styles.title}>Profil</Title>
                </Body>
            </Header>
            <Content style={styles.container}>
                <ScrollView horizontal={false}>
                    <Card>
                        <CardItem>
                            <View style={{ width: '100%' }}>
                                {progressView}
                                <Button style={styles.button} onPress={() => { setPromptVisible(true) }}><Text style={styles.buttonText}>Dodaj postęp</Text></Button>
                            </View>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem>
                            <View style={{ width: '100%' }}>
                                <Grid>
                                    <Row style={styles.tableRow}>
                                        <Col><Text style={styles.tableCol}>Płeć</Text></Col>
                                        <Col><Text style={styles.tableText}>{userData.bmr.gender == 5 ? "Mężczyzna" : "Kobieta"}</Text></Col>
                                    </Row>
                                    <Row style={styles.tableRow}>
                                        <Col><Text style={styles.tableCol}>Wiek</Text></Col>
                                        <Col><Text style={styles.tableText}>{userData.bmr.age}</Text></Col>
                                    </Row>
                                    <Row style={styles.tableRow}>
                                        <Col><Text style={styles.tableCol}>Wzrost</Text></Col>
                                        <Col><Text style={styles.tableText}>{userData.bmr.height}</Text></Col>
                                    </Row>
                                    <Row style={styles.tableRow}>
                                        <Col><Text style={styles.tableCol}>Masa</Text></Col>
                                        <Col><Text style={styles.tableText}>{userData.bmr.mass}</Text></Col>
                                    </Row>
                                    <Row style={styles.tableRow}>
                                        <Col><Text style={styles.tableCol}>Aktywność</Text></Col>
                                        <Col><Text style={styles.tableText}>{activities.find(item => item.value == userData.bmr.activity).text}</Text></Col>
                                    </Row>
                                    <Row style={styles.tableRow}>
                                        <Col><Text style={styles.tableCol}>Cel</Text></Col>
                                        <Col><Text style={styles.tableText}>{targets.find(item => item.value == userData.bmr.target).text}</Text></Col>
                                    </Row>
                                    <Row style={styles.tableRow}>
                                        <Col><Text style={styles.tableCol}>Dzienne</Text></Col>
                                        <Col><Text style={styles.tableText}>{kcal}kcal</Text></Col>
                                    </Row>
                                </Grid>
                            </View>
                        </CardItem>
                    </Card>
                </ScrollView>

                <Prompt
                    title="Wprowadź aktualną masę"
                    placeholder={(typeof userData.bmr.mass == "number") ? userData.bmr.mass.toString() : userData.bmr.mass}
                    defaultValue={(typeof userData.bmr.mass == "number") ? userData.bmr.mass.toString() : userData.bmr.mass}
                    visible={promptVisible}
                    onCancel={() => {
                        setPromptVisible(false);
                    }}
                    onSubmit={value => {
                        setPromptVisible(false);
                        console.log(typeof value);
                        dispatch(addProgress(getToday(), parseFloat(value), true));
                        dispatch(setMass(parseFloat(value), true));
                    }} />
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
        fontSize: 16,
    },
    button: {
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

    tableWrapper: { flexDirection: 'row' },
    tableRow: { borderBottomWidth: 1, borderColor: "#EEEEEE" },
    tableText: { marginRight: 4, paddingVertical: 10, textAlign: 'right', fontSize: 20, fontFamily: "Roboto" },
    tableCol: { marginLeft: 4, paddingVertical: 10, textAlign: 'left', fontSize: 20, fontFamily: "Roboto" }
});

const mapStateToProps = (state) => {
    const { userData } = state
    return { userData }
};

export default connect(mapStateToProps)(ProfileScreen);