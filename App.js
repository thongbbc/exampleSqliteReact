/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
var SQLite = require('react-native-sqlite-storage')

export default class App extends Component<{}> {
    constructor(props){
      super(props)
      this.db = SQLite.openDatabase({name : "test.db", createFromLocation : "~test.db"}, ()=>{
              console.log("Database OPENED");
      },()=>{
              console.log("SQL Error: " + err);
      });
    }
    errorCB(err) {
      console.log("SQL Error: " + err);
    }

    successCB() {
      console.log("SQL executed fine");
    }

    openCB() {
      console.log("Database OPENED");
    }

    componentDidMount() {
      this.db.transaction((tx) => {
        var promise= new Promise(function(resolve,reject) {
          tx.executeSql('SELECT * FROM Thong where Name = ? AND  Age = ?', ['Thong',12], (tx, results) => {
            var len = results.rows.length;
            for (let i = 0; i < len; i++) {
              let row = results.rows.item(i);
              console.log(`Employee name: ${row.Name}, Dept Name: ${row.Age}`);
            }
            resolve(len);
          },(error)=>{
            reject(error)
          });
        })
        promise.then((data)=>{
            console.log("Da lay du lieu thanh cong "+ data);
        }).catch(function(error) {
          console.log('Error occurred!', error);
          alert("error"+ JSON.stringify(error));
        });

      });     
    }
    


  render() {
    return (
      <View style={styles.container}>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
