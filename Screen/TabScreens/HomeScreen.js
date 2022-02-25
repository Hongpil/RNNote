import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { theme } from '../../Config/Colors';
import * as localDB from '../../Config/LocalDB';



const Home = ({navigation}) => {

    const [working, setWorking] = useState(true);
    const [text, setText] = useState("");
    const [toDos, setToDos] = useState({});  // HashMap

    // 새로고침하면 실행
    useEffect(() => {
        /**
         * [useEffect 훅에서 async await 함수 사용하기]
         * useEffect 훅에서 async await 함수를 사용하는 한 가지 방법은 부수 효과 함수 내에서 async await 함수를 만들어서 호출하는 것
         * 1. useEffect 내에서 async await 함수를 만들고
         * 2. 그 함수를 바로 호출 한다.
            * [Ref]
            * https://velog.io/@he0_077/useEffect-%ED%9B%85%EC%97%90%EC%84%9C-async-await-%ED%95%A8%EC%88%98-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0
         */
        const fetchAndSetTodo = async () => {
            try {
                const s = await localDB.loadToDos()
                console.log('s : ', s);
                /**
                 * JSON.parse는 string을 Javascript object로 만들어줌
                 */
                if (s) setToDos(JSON.parse(s));
            } catch (error) {
            // saving error
            }
        }
        fetchAndSetTodo();
    }, []);

    // setting 함수
    const travel = () => setWorking(false);
    const work = () => setWorking(true);
    const onChangeText = (payload) => setText(payload);
    
    const addToDo = async () => {
        if (text === "") {
            return;
        }

        // Make ToDos
        const newToDos = {
            ...toDos,
            [Date.now()]: { text, work:working }
        };
        setToDos(newToDos);

        await localDB.addToDo2(newToDos);

        setText("");

    }; // End of addToDo()

    const deleteToDo = (id) => {
        Alert.alert(
        "Delete To Do",
        "Are you sure?",
        [
            { text: "Cancel"},
            { text: "I'm sure", onPress: async () => {
                /**
                 * 새로운 object 생성
                 * 기존 object를 수정/삭제 하는게 아니라, 새로운 object를 만들어서 사용
                 */
                const newToDos = { ...toDos }
                /**
                 * state는 절대 mutate 하면 안 됨 !
                 * 하지만 !
                 * 생성한 newToDos object는 아직 state에 있지 않기 때문에(setToDos(newToDos) 전 이기 때문)
                 * mutate 해도 되는 것 !
                 */
                delete newToDos[id]
                setToDos(newToDos);

                await localDB.deleteToDo(newToDos);
            }}
        ]
        )
    }; // End of deleteToDo()

    const _onPress = item => {
        navigation.navigate('DetailScreen', item)
        // navigation.navigate('Settings', item)
        
    }


    /**
     * UI 그리기 시작
     */
    return (
        <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={work}>
            <Text style={
                {
                ...styles.btnText,
                color: working
                ? theme.white   // if working, color is White
                : theme.grey    // if working, color is grey
                }
            }>Work</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={travel}>
            <Text style={
                {
                ...styles.btnText,
                color: !working
                ? theme.white   // if not working, color is white
                : theme.grey    // if not working, color is grey
                }
            }>Travel</Text>
            </TouchableOpacity>
        </View>

        <TextInput
            keyboardType='name-phone-pad'
            returnKeyType='done'
            style={styles.input}
            placeholder={
            working
            ? "Add a To Do"
            : "Where do you want to go?"
            }
            onChangeText={onChangeText}
            value={text}
            onSubmitEditing={addToDo}
        />

        <ScrollView>
            {
            Object.keys(toDos).map((key) => 
                toDos[key].work === working
                ? (
                    <TouchableOpacity 
                    activeOpacity={0.8}
                    onPress = {() => {
                        const clickedObj = {
                            id: key,
                            text: toDos[key].text,
                            work: toDos[key].work,
                        }
                        // console.log('clickedObj : ', clickedObj);
                        _onPress(clickedObj)
                    }}>
                        <View 
                        style={styles.toDo} 
                        key={key}
                        >
                            <Text style={styles.toDoText}>
                            { toDos[key].text }
                            </Text>
                            <TouchableOpacity 
                            hitSlop={{ top: 32, bottom: 32, left: 32, right: 32 }} //터치영역 확장
                            onPress={() => deleteToDo(key) }>
                            <Text style={{fontSize: 20, color: theme.grey}}>X</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )
                : null
            )
            }
        </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bg,
      paddingHorizontal: 30,
    },
    header: {
      justifyContent: "space-between",
      flexDirection: "row",
      marginTop: 30,
    },
    btnText: {
      fontWeight: "600",
      fontSize: 38,
    },
    input: {
      backgroundColor: "white",
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderRadius: 30,
      marginTop: 20,
      fontSize: 18,
      marginVertical: 20,
    },
    toDo: {
      backgroundColor: theme.toDoBg,
      marginBottom: 10,
      paddingVertical: 10,
      paddingHorizontal: 40,
      borderRadius: 15,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    toDoText: {
      color: "white",
      fontSize: 19,
      fontWeight: "500",
    },
});

export default Home;