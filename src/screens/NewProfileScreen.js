import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Header, Left, Body, Title, Icon, Button, Content, Form, Item, Input, Picker, Grid, Row, Col, Label, Card, CardItem } from 'native-base';
import { useSelector, useDispatch, connect } from 'react-redux';
import { setBmr, setBlockMenu } from '../actions';
import { existsFile } from '../fileStream';

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

function NewProfileScreen({ navigation }) {
    const userData = useSelector(state => state.userData);
    const app = useSelector(state => state.app);
    const dispatch = useDispatch();

    const [gender, setGender] = React.useState(userData.bmr.gender);
    const [age, setAge] = React.useState(userData.bmr.age);
    const [mass, setMass] = React.useState(userData.bmr.mass);
    const [height, setHeight] = React.useState(userData.bmr.height);
    const [activity, setActivity] = React.useState(userData.bmr.activity);
    const [target, setTarget] = React.useState(userData.bmr.target);

    const [errorAge, setErrorAge] = React.useState(false);
    const [errorHeight, setErrorHeight] = React.useState(false);
    const [errorMass, setErrorMass] = React.useState(false);

    const submit = () => {
        setErrorAge(age == "" || age == "0");
        setErrorMass(mass == "" || mass == "0");
        setErrorHeight(height == "" || height == "0");

        if (!errorAge && !errorMass && !errorHeight) {
            dispatch(
                setBmr(
                    {
                        gender: parseInt(gender),
                        age: parseInt(age),
                        mass: parseFloat(mass),
                        height: parseFloat(height),
                        activity: parseFloat(activity),
                        target: parseInt(target)
                    },
                    true
                )
            );
            dispatch(setBlockMenu(false));
            navigation.navigate("Profile");
        }

    };

    var errorAgeIcon = errorAge ? <Icon name='close-circle' /> : null;
    var errorMassIcon = errorMass ? <Icon name='close-circle' /> : null;
    var errorHeightIcon = errorHeight ? <Icon name='close-circle' /> : null;

    return (
        <Container>
            <Header style={styles.title}>
                <Left>
                    <Button onPress={() => navigation.openDrawer()} style={styles.title}>
                        <Icon name='menu' style={styles.title} />
                    </Button>
                </Left>
                <Body>
                    <Title style={styles.title}>Nowy profil</Title>
                </Body>
            </Header>
            <Content style={styles.container}>
                <Card>
                    <CardItem>
                        <Form style={{width:'100%'}}>
                            <Grid>
                                <Row>
                                    <Col size={1} style={styles.flexCol}>
                                        <Text style={styles.formText}>Płeć</Text>
                                    </Col>
                                    <Col size={3}>
                                        <Item picker>
                                            <Picker mode="dropdown"
                                                placeholder="Płeć"
                                                placeholderStyle={{ color: "#bfc6ea" }}
                                                placeholderIconColor="#007aff" selectedValue={gender}
                                                onValueChange={setGender}>
                                                <Picker.Item label="Mężczyzna" value="5" />
                                                <Picker.Item label="Kobieta" value="-161" />
                                            </Picker>
                                        </Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col size={1} style={styles.flexCol}>
                                        <Text style={styles.formText}>Wiek</Text>
                                    </Col>
                                    <Col size={3}>
                                        <Item error={errorAge}>
                                            <Input placeholder="Wiek" keyboardType="numeric" value={(typeof age == "number") ? age.toString() : age} onChangeText={setAge} />
                                            {errorAgeIcon}
                                        </Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col size={1} style={styles.flexCol}>
                                        <Text style={styles.formText}>Wzrost</Text>
                                    </Col>
                                    <Col size={3}>
                                        <Item error={errorHeight}>
                                            <Input placeholder="Wzrost" keyboardType="numeric" value={(typeof height == "number") ? height.toString() : height} onChangeText={setHeight} />
                                            {errorHeightIcon}
                                        </Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col size={1} style={styles.flexCol}>
                                        <Text style={styles.formText}>Masa</Text>
                                    </Col>
                                    <Col size={3}>
                                        <Item error={errorMass}>
                                            <Input placeholder="Masa" keyboardType="numeric" value={(typeof mass == "number") ? mass.toString() : mass} onChangeText={setMass} />
                                            {errorMassIcon}
                                        </Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col size={1} style={styles.flexCol}>
                                        <Text style={styles.formText}>Aktywność</Text>
                                    </Col>
                                    <Col size={3}>
                                        <Item picker>
                                            <Picker mode="dropdown"
                                                placeholder="Aktywność"
                                                placeholderStyle={{ color: "#bfc6ea" }}
                                                placeholderIconColor="#007aff" onValueChange={setActivity} selectedValue={activity}>

                                                {activities.map(element => <Picker.Item label={element.text} value={element.value} key={element.value} />
                                                )}
                                            </Picker>
                                        </Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col size={1} style={styles.flexCol}>
                                        <Text style={styles.formText}>Cel</Text>
                                    </Col>
                                    <Col size={3}>
                                        <Item picker last>
                                            <Picker mode="dropdown"
                                                placeholder="Cel"
                                                placeholderStyle={{ color: "#bfc6ea" }}
                                                placeholderIconColor="#007aff" onValueChange={(value, index) => setTarget(value)} selectedValue={target}>
                                                <Picker.Item label="Utrzymanie masy" value="0" />
                                                <Picker.Item label="Utrata masy" value="-500" />
                                                <Picker.Item label="Przybranie masy" value="500" />
                                            </Picker>
                                        </Item>
                                    </Col>
                                </Row>
                            </Grid>
                            <Button style={styles.submitCenter} primary onPress={submit}><Text style={styles.buttonText}>Zapisz</Text></Button>
                        </Form>
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
    }
});

const mapStateToProps = (state) => {
    const { userData } = state
    return { userData }
};

export default connect(mapStateToProps)(NewProfileScreen);