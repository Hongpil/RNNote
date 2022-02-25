import AsyncStorage from '@react-native-async-storage/async-storage';



const TODO_KEY = "@toDos";
const USER_KEY = "$user";

export const addToDo2 = async (mNewToDos) => {
    await saveToDos(mNewToDos);
};

export const updateToDo = async (mNewToDos) => {
    await saveToDos(mNewToDos);
};

export const deleteToDo = async (mNewToDos) => {
    await saveToDos(mNewToDos);
};

export const loadToDos = async () => {
    try {
    const s = await AsyncStorage.getItem(TODO_KEY)
    return s;
    } catch (error) {
    // saving error
    }
};

const saveToDos = async (toSave) => {
    try {
    /**
     * JSON.stringify는 object를 string으로 바꿔줌
     * string으로 바꿔주는 이유는 setItem() 안에 string타입으로 저장해야 하기 때문
     */
    await AsyncStorage.setItem(TODO_KEY, JSON.stringify(toSave))
    } catch (error) {
    // saving error
    }
}; // End of saveToDos()




export const addUser = async (mUser) => {
    await saveUserInfo(mUser);
}
export const loadUser = async () => {
    try {
        const s = await AsyncStorage.getItem(USER_KEY);
        return s;
    } catch (error) {
        // saving error
    }
}
export const logOutUser = async (mUser) => {
    await saveUserInfo(mUser);
}

const saveUserInfo = async (toSave) => {
    try {
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(toSave))
    } catch (error) {
        // saving error
    }
}