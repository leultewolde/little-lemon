import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isNotEmpty } from "../utils";

const initialValue = {
    name: "",
    description: "",
    price: "",
    image: ""
};

const url = "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json";

const useFetchMenuItems = function (setIsLoading = (val) => { }) {
    const [menuItems, setMenuItems] = useState(initialValue);

    useEffect(() => {
        setIsLoading(true);
        fetch(url)
            .then((response) => response.json())
            .then((response) => {
                setMenuItems(response.menu);
            })
            .catch((err) => {
                Alert.alert("Error", err.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return { menuItems };
}

export default useFetchMenuItems;