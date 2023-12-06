import { useEffect, useState } from "react";
import MenuService from "../db/MenuService";

export function useGetMenuItems(category = "all", searchQuery = "", setIsLoading = (val) => { }) {
    const menuService = new MenuService();
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        menuService.getMenuItems(category, searchQuery)
            .then((values) => {
                setMenuItems(values);
            })
            .catch((err) => {
                Alert.alert("Error", err.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [category, searchQuery]);

    return { menuItems };
}