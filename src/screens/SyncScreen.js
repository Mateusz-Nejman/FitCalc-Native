import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Header, Left, Body, Title, Icon, Button, Content, Form, Item, Input, Picker, Grid, Row, Col, Label, Card, CardItem, Spinner } from 'native-base';
import { useSelector, useDispatch, connect } from 'react-redux';
import { setBmr, addProduct, addProducts } from '../actions';
import { existsFile } from '../fileStream';
import { StackedBarChart, YAxis, BarChart, XAxis, Grid as GridChart } from 'react-native-svg-charts';
import { calcKcal } from '../calories-helper';
import { parse } from 'react-native-svg';

const serverUrl = "https://fit-calc-server.herokuapp.com";

function SyncScreen({ navigation }) {
    const userData = useSelector(state => state.userData);
    const products = useSelector(state => state.products);
    const dispatch = useDispatch();

    const [sync, setSync] = React.useState(0);
    const [download, setDownload] = React.useState(0);

    const onSyncClick = () => {
        setSync(1);

        fetch(serverUrl + "/sync").then(response => setSync(2));
    }

    let syncError = <Text></Text>;
    let downloadError = <Text></Text>;

    const onDownloadClick = async () => {
        setDownload(1);

        try {
            console.log("Start respons " + new Date().toTimeString());
            let response = await fetch(serverUrl + "/download", {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Accept-Encoding': 'gzip;q=1.0, compress;q=0.5'
                },
                body: JSON.stringify({
                    data: products
                })

            });

            console.log("Start responseJson");
            setTimeout(() => null, 100);
            let responseJson = await response.json();
            console.log("End responseJson");

            const newProducts = responseJson.data;
            //dispatch(addProducts(newProducts,true));
            newProducts.forEach((element, index) => {
                dispatch(addProduct(element.name, element.protein, element.carbo, element.fat, element.portion, element.hash, false));

                if (index % 100 == 0)
                    console.log(index);
            });
            dispatch(addProducts());
            console.log("Stop respons " + new Date().toTimeString());
            setDownload(2);
        }
        catch (error) {
            console.error(error);
        }
    }

    const onDownloadClickWS = () => {
        setDownload(1);

        let xhr = new XMLHttpRequest();

        // 2. Configure it: GET-request for the URL /article/.../load
        xhr.open('POST', serverUrl + "/download");
        xhr.setRequestHeader('Content-Type', 'application/json');

        // 3. Send the request over the network
        xhr.send(JSON.stringify({
            data: products
        }));

        // 4. This will be called after the response is received
        xhr.onload = function () {
            if (xhr.status != 200) { // analyze HTTP status of the response
                console.log(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
                downloadError = <Text>Wystąpił błąd</Text>;
                setDownload(2);
            } else { // show the result
                console.log(`Done, got ${xhr.response.length} bytes`); // responseText is the server
                setTimeout(() => null, 100);
                const responseJson = xhr.responseText;

                const productStringArray = responseJson.substring(9,responseJson.length-3).split("},{");
                console.log(productStringArray.length);
                console.log(productStringArray[0]);

                productStringArray.forEach((item, index) => {
                    let itemString = item.replace("\",\"protein\":","[SEP]")
                    .replace(",\"carbo\":","[SEP]")
                    .replace(",\"fat\":","[SEP]")
                    .replace(",\"portion\":","[SEP]")
                    .replace(",\"hash\":\"","[SEP]");
                    itemString = itemString.substring(8,itemString.length-1);
                    const itemArray = itemString.split("[SEP]");

                    dispatch(addProduct(itemArray[0], parseFloat(itemArray[1]), parseFloat(itemArray[2]), parseFloat(itemArray[3]), parseFloat(itemArray[4]), itemArray[5], false));
                    if(index % 1000 == 0)
                        console.log(itemArray);
                });
                /*const newProducts = responseJson.data;
                //dispatch(addProducts(newProducts,true));
                newProducts.forEach((element, index) => {
                    dispatch(addProduct(element.name, element.protein, element.carbo, element.fat, element.portion, element.hash, false));

                    if (index % 100 == 0)
                        console.log(index);
                });
                */
               dispatch(addProducts());
                setDownload(2);
            }
        };

        xhr.onprogress = function (event) {
            if (event.lengthComputable) {
                console.log(`Received ${event.loaded} of ${event.total} bytes`);
            } else {
                console.log(`Received ${event.loaded} bytes`); // no Content-Length
            }

        };

        xhr.onerror = function () {
            console.log("Request failed");
            downloadError = <Text>Wystąpił błąd</Text>;
            setDownload(2);
        };

    }

    let syncButton = <Button style={styles.button} onPress={onSyncClick}><Text style={styles.buttonText}>Wyślij produkty na serwer</Text></Button>;
    let downloadButton = <Button style={styles.button} onPress={onDownloadClickWS}><Text style={styles.buttonText}>Pobierz produkty(ok 8000 pozycji)</Text></Button>;

    if (sync === 1) syncButton = <Spinner color='blue' />; else if (sync === 2) syncButton = <Text>Wysłano</Text>;
    if (download === 1) downloadButton = <Spinner color='blue' />; else if (download === 2) downloadButton = <Text>Pobrano</Text>;

    return (
        <Container>
            <Header style={styles.title}>
                <Left>
                    <Button onPress={() => navigation.openDrawer()} style={styles.title}>
                        <Icon name='menu' style={styles.title} />
                    </Button>
                </Left>
                <Body>
                    <Title style={styles.title}>Synchronizacja produktów</Title>
                </Body>
            </Header>
            <Content style={styles.container}>
                <Card>
                    <CardItem>
                        <View style={{ width: '100%' }}>
                            {syncButton}
                            {syncError}
                            {downloadButton}
                            {downloadError}
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
    tableRow: { borderBottomWidth: 1, borderColor: "#EEEEEE" },
    tableText: { marginRight: 4, paddingVertical: 10, textAlign: 'right', fontSize: 20, fontFamily: "Roboto" },
    tableCol: { marginLeft: 4, paddingVertical: 10, textAlign: 'left', fontSize: 20, fontFamily: "Roboto" }
});

const mapStateToProps = (state) => {
    const { userData } = state
    return { userData }
};

export default connect(mapStateToProps)(SyncScreen);