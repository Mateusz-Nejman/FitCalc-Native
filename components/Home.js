import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Header, Left, Body, Title, Icon, Button, Content, Form, Item, Input, Picker, Grid, Row, Col } from 'native-base';
export default function Home({ navigation }) {
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
            <Content>
                <Form>
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
                                        placeholderIconColor="#007aff">
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
                                <Item>
                                    <Input placeholder="Wiek" keyboardType="numeric" />
                                </Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col size={1} style={styles.flexCol}>
                                <Text style={styles.formText}>Wzrost</Text>
                            </Col>
                            <Col size={3}>
                                <Item>
                                    <Input placeholder="Wzrost" keyboardType="numeric" />
                                </Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col size={1} style={styles.flexCol}>
                                <Text style={styles.formText}>Masa</Text>
                            </Col>
                            <Col size={3}>
                                <Item>
                                    <Input placeholder="Masa" keyboardType="numeric" />
                                </Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col size={1} style={styles.flexCol}>
                                <Text style={styles.formText}>Płeć</Text>
                            </Col>
                            <Col size={3}>
                                <Item picker>
                                    <Picker mode="dropdown"
                                        placeholder="Aktywność"
                                        placeholderStyle={{ color: "#bfc6ea" }}
                                        placeholderIconColor="#007aff">
                                        <Picker.Item label="Mężczyzna" value="5" />
                                        <Picker.Item label="Kobieta" value="-161" />
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
                                        placeholderIconColor="#007aff">
                                        <Picker.Item label="Utrzymanie masy" value="0" />
                                        <Picker.Item label="Utrata masy" value="-500" />
                                        <Picker.Item label="Przybranie masy" value="500" />
                                    </Picker>
                                </Item>
                            </Col>
                        </Row>
                    </Grid>
                    <Button style={styles.submitCenter} primary><Text style={styles.buttonText}>Zapisz</Text></Button>
                </Form>
            </Content>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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
        fontSize: 20,
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
        color:"#01579B"
    }
});