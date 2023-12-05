import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isNotEmpty } from "../utils";

const initialValue = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    emailNotifications: {
        orderStatuses: false,
        passwordChanges: false,
        specialOffers: false,
        newsletter: false,
    }
};

const useFetchUser = function (setIsLoading = (val) => { }) {
    const [user, setUser] = useState(initialValue);

    useEffect(() => {
        setIsLoading(true);
        AsyncStorage
            .getItem("user")
            .then((value) => {
                let foundUser = JSON.parse(value);
                setUser({
                    ...user,
                    ...foundUser
                });
            })
            .catch((err) => {
                Alert.alert("Error", err.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const userValueValid = isNotEmpty(user.firstName)
        && isNotEmpty(user.lastName)
        && isNotEmpty(user.email)
        && isNotEmpty(user.phoneNumber);

    const onBoardingStatus = isNotEmpty(user.firstName) && isNotEmpty(user.email);

    const submitChanges = (onDone = (value) => { }, onError = (err) => { }) => {
        setIsLoading(true);
        AsyncStorage.setItem("user", JSON.stringify(user))
            .then(() => {
                setUser(user);
                onDone(user);
            })
            .catch(onError)
            .finally(() => {
                setIsLoading(false);
            });
    }

    const clearData = (onDone, onError) => {
        setIsLoading(true);
        AsyncStorage
            .removeItem("user")
            .then(() => {
                setUser(initialValue);
                onDone();
            })
            .catch(onError)
            .finally(() => {
                setIsLoading(false);
            });
    }

    return { user, setUser, userValueValid, submitChanges, clearData, onBoardingStatus };
}

export default useFetchUser;