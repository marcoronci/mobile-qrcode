import React, {useEffect, useState} from 'react';
import {Button, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, View} from '../components/Themed';
import {BarCodeScanner, BarCodeScannerResult} from 'expo-barcode-scanner';
import BarcodeMask from 'react-native-barcode-mask';
import {Picker} from '@react-native-picker/picker';
import FAwesomeIcon from 'react-native-vector-icons/FontAwesome5';

const finderWidth: number = 280;
const finderHeight: number = 230;
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const viewMinX = (width - finderWidth) / 2;
const viewMinY = (height - finderHeight) / 2;


export default function BarCodeScanScreen() {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [type, setType] = useState<any>(BarCodeScanner.Constants.Type.back);
    const [scanned, setScanned] = useState<boolean>(false);
    const [select,selectValue]=useState<any>('');

    useEffect(() => {
        (async () => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = (scanningResult: BarCodeScannerResult) => {


        if (!scanned) {


            const {type, data, bounds: {origin} = {}} = scanningResult;
            // @ts-ignore
            const {x, y} = origin;
            if (x >= viewMinX && y >= viewMinY && x <= (viewMinX + finderWidth / 2) && y <= (viewMinY + finderHeight / 2)) {
                setScanned(true);


                alert(`http://polis.ipernetwork.net:8080?cantiere=${select}&${data}`);
                // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
            }
        }
           
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
		
        <View style={{flex: 1
          
        }}>
            <View style={{

                alignItems:'center',
                backgroundColor: "#00b5ec",
               margin:5,
              
            }}
		  
          >
              
            <Picker
                 mode='dropdown'
                selectedValue={select}
                style={{ height: 50, width: 300,
                alignContent:'center',
                justifyContent:'center',
                paddingBottom:20,
            
            }}
              onValueChange={(itemValue, itemIndex) => selectValue(itemValue)}
            >
                <Picker.Item label="seleziona il cantiere...." value='' />
                <Picker.Item label="cantiere 1" value="1" />
                <Picker.Item label="cantiere 2" value="2" />
          
              
            </Picker>
            </View>

           {select ? 
           <BarCodeScanner onBarCodeScanned={handleBarCodeScanned}
                            type={type}
                            barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                            style={[styles.container]}>
                {/* <View
                    style={{
                        flex: 1,
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
                    }}> */}
                   {/*  <TouchableOpacity
                        style={{
                            flex: 1,
                            alignItems: 'flex-end',
                        }}
                        onPress={() => {
                            setType(
                                type === BarCodeScanner.Constants.Type.back
                                    ? BarCodeScanner.Constants.Type.front
                                    : BarCodeScanner.Constants.Type.back
                            );
                        }}>
                        <Text style={{fontSize: 18, margin: 5, color: 'white'}}> Flip </Text>
                    </TouchableOpacity> */}
                {/* </View> */}
                <BarcodeMask edgeColor="#62B1F6" showAnimatedLine/>
                {scanned && 
               
                 <Button  title="Scansiona di nuovo" onPress={() => setScanned(false)}/>
                
                }
                
	  
            </BarCodeScanner>
                :
                <View style={styles.container}>
                <FAwesomeIcon  name="qrcode" color={'#E6E6E1'} size={200}/>
               </View>
               
                
                }
       
       
       
        </View>
		
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin:5
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    buttonScan:{

        marginBottom:10
    },
    
});
