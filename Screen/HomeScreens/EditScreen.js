import React, { useEffect, useState } from 'react';
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



const EditScreen = ({navigation, route}) => {

    const _id = route.params.id;
    const [text, setText] = useState("");

    const onChangeText = (payload) => setText(payload);

    const updateToDo = async () => {
        if (text === "") {
            return;
        }

        // load ToDos
        // change data type => string to object
        const toDos = JSON.parse(await localDB.loadToDos());
        
        // Make ToDos
        const newToDos = {
            ...toDos,
            [_id] : {text, work:route.params.work},
        };

        await localDB.updateToDo(newToDos);

        // Home 화면으로 이동 후 새로고침
        navigation.reset({index: 0, routes: [{ name: 'Home' }],})
        
    }

    return (
        <View style={styles.Container}>
            <TextInput
                keyboardType='name-phone-pad'
                returnKeyType='done'
                style={styles.input}
                placeholder={route.params.text}
                onChangeText={onChangeText}
                value={text}
                onSubmitEditing={updateToDo}
            />
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
    input: {
        width: '70%',
        backgroundColor: "white",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 30,
        fontSize: 18,
    },
});

export default EditScreen;