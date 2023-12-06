import * as SQLite from "expo-sqlite";

export default class MenuService {
    #db = null;
    #url = "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json";

    constructor() {
        this.#db = SQLite.openDatabase("littleLemon.db");
        this.#createDBIfNotExists();
    }

    #createDBIfNotExists() {
        this.#db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS MENU (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description VARCHAR, price FLOAT, image TEXT, category TEXT)'
            )
        });
        this.#addDataIfEmpty();
    }

    #addDataIfEmpty() {

        const onDataFetched = (data) => {
            if (data.length <= 0) {
                this.#getMenuItemsFromURL((items) => {
                    this.#createMenuItems(items, (menuItems) => { }, (err) => { });
                }, (err) => { });
            }
        }


        this.#db.transaction(tx => {
            tx.executeSql("SELECT * FROM MENU", null,
                (txObj, { rows: { _array } }) => onDataFetched(_array),
                (txObj, error) => { console.log(error) }
            )
        });
    }


    #getMenuItemsFromURL(onDataFetched = (items) => { }, onError = (err) => { }) {
        fetch(this.#url)
            .then((response) => response.json())
            .then((response) => onDataFetched(response.menu))
            .catch(onError);
    }

    getMenuItems(catagory = "all", searchQuery = "") {
        let query = "SELECT * FROM MENU";
        let params = null;

        if (catagory !== "all" || searchQuery !== "") {
            query = query + " WHERE";
            params = [];

            if (catagory !== "all") {
                query = query + " category = ?";
                params.push(catagory);
            }

            if (searchQuery !== "") {
                if (catagory !== "all") {
                    query = query + " AND"
                }
                query = query + " name LIKE ?";
                params.push(`%${searchQuery}%`);
            }
        }

        return new Promise((resolve, reject) => {
            try {
                this.#db.transaction(tx => {
                    tx.executeSql(query, params,
                        (txObj, { rows: { _array } }) => resolve(_array),
                        (txObj, error) => { throw new Error(error) }
                    )
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    #createMenuItems(items = []) {
        for (let item of items) {
            this.#createMenuItem(item);
        }
    }

    #createMenuItem(item, onSuccess = (menuItems) => { }, onError = (error) => { }) {
        let values = [item.name, item.description, item.price, item.image, item.category]
        this.#db.transaction(tx => {
            tx.executeSql('INSERT INTO MENU (name, description, price, image, category) values (?, ?, ?, ?, ?)', values,
                (txObj, resultSet) => onSuccess(resultSet),
                (txObj, error) => onError(error))
        })
    }
}