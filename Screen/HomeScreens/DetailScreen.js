import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    Button,
    TouchableOpacity,
    TouchableHighlight,
    TouchableWithoutFeedback,
    TextInput,
    ScrollView,
    Alert,
} from 'react-native';
import { theme } from '../../Config/Colors';
import * as localDB from '../../Config/LocalDB';


const DetailScreen = ({navigation, route}) => {

    const deleteToDo = (id) => {
        Alert.alert(
        "Delete To Do",
        "Are you sure?",
        [
            { text: "Cancel"},
            { text: "I'm sure", onPress: async () => {

                // change data type => string to object
                let toDos = JSON.parse(await localDB.loadToDos());
                delete toDos[id]

                await localDB.deleteToDo(toDos);

                /**
                 * [Home 화면으로 되돌아 갔을 때, 삭제된 내용 반영될 수 있도록 새로고침]
                 * reset - 화면 새로고침 (상태 초기화, route 초기화or변경)
                 */
                navigation.reset({index: 0, routes: [{ name: 'Home' }],})
            }}
        ]
        )
    };

    const editToDo = item => {
        navigation.navigate('EditScreen', item)
    };

    return (
        <View style={styles.Container}>
            <Text style={styles.Text}>ID: {route.params.id}</Text>
            <Text style={styles.Text}>Text: {route.params.text}</Text>
            <Text style={styles.Text}>Work: {route.params.work.toString()}</Text>
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress = {() => {
                    const clickedObj = {
                        id: route.params.id,
                        text: route.params.text,
                        work: route.params.work,
                    }
                    // console.log('clickedObj : ', clickedObj);
                    editToDo(clickedObj)
              }}
              >
              <Text style={styles.buttonTextStyle}>수정</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={() => deleteToDo(route.params.id) }
              >
              <Text style={styles.buttonTextStyle}>삭제</Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: theme.subBg,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Text: {
        fontSize: 30,
        marginBottom: 10
    },
    buttonStyle: {
        backgroundColor: theme.bg,
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: theme.bg,
        width: '80%',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 50,
        marginBottom: 5,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
});

export default DetailScreen;