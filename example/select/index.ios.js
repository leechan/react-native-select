'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Select from 'react-native-select';

const data = [
  {
    id: 1,
    name: 'test1',
    list: [
      {
        id: 11,
        name: 'test1-1',
        list: [
          {
            id: 111,
            name: 'test1-1-1',
          },
          {
            id: 112,
            name: 'test1-1-2',
          }
        ]
      },
      {
        id: 12,
        name: 'test1-1',
        list: [
          {
            id: 121,
            name: 'test1-2-1',
          },
          {
            id: 122,
            name: 'test1-2-2',
          },
          {
            id: 123,
            name: 'test1-2-3',
          },
          {
            id: 124,
            name: 'test1-2-4',
          }
        ]
      },
      {
        id: 13,
        name: 'test1-3',
        list: [
          {
            id: 131,
            name: 'test1-2-4',
          }
        ]
      },
      {
        id: 14,
        name: 'test1-4'
      }
    ]
  },
  {
    id: 2,
    name: 'test2',
    list: [
      {
        id: 21,
        name: 'test2-1',
        list: [
          {
            id: 211,
            name: 'test2-1-1',
          },
          {
            id: 212,
            name: 'test2-1-2',
          }
        ]
      },
      {
        id: 22,
        name: 'test2-2',
        list: [
          {
            id: 221,
            name: 'test2-2-1',
          },
          {
            id: 222,
            name: 'test2-2-2',
          },
          {
            id: 223,
            name: 'test2-2-3',
          },
          {
            id: 224,
            name: 'test2-2-4',
          }
        ]
      },
      {
        id: 23,
        name: 'test2-3',
        list: [
          {
            id: 231,
            name: 'test2-3-1',
          }
        ]
      },
      {
        id: 24,
        name: 'test2-4',
        list: [
          {
            id: 241,
            name: 'test2-4-1',
          }
        ]
      }
    ]
  }
]

class SelectApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: data
    }

    this.state.currentItem1 = this.state.data[0];
    this.state.currentItem2 = this.state.currentItem1.list[0];
    this.state.currentItem3 = this.state.currentItem2.list[0];
  }

  render() {
    return (
      <View style={styles.homePage} >
        <View style={styles.chooseArea}>
          <View style={styles.chooseItem}>
            <Text style={styles.chooseLabel}>item1</Text>
            <View style={styles.selectTrigger}>
              <Text 
               style={styles.selectedText}
               onPress={() => {
                  this.refs.select1.show();
                }
              }>
                {this.state.currentItem1.name}
              </Text>
            </View>
          </View>
          <View style={styles.chooseItem}>
            <Text style={styles.chooseLabel}>item2</Text>
            <View style={styles.selectTrigger}>
              <Text 
               style={styles.selectedText}
               onPress={() => {
                  this.refs.select2.show();
                }
              }>
                {this.state.currentItem2.name}
              </Text>
            </View>
          </View>
          <View style={styles.chooseItem}>
            <Text style={styles.chooseLabel}>item3</Text>
            <View style={styles.selectTrigger}>
              <Text 
                style={styles.selectedText}
                onPress={() => {
                  this.refs.select3.show();
                }
              }>
                {this.state.currentItem3.name}
              </Text>
             </View>
          </View>
        </View>
        <Select
          ref={'select1'}
          options={this.state.data}
          keyMapping={{
            lable: 'name',
            value: 'id'
          }}
          selectedIndex={0}
          onSubmit={(value, index) => {
            var currentItem1 = this.state.data[index];
            this.setState({
              currentItem1: currentItem1,
              currentItem2: currentItem1.list[0],
              currentItem3: currentItem1.list[0].list[0]
            });
            this.refs.select2.setSelectedValue(this.state.currentItem2.id);
            this.refs.select3.setSelectedValue(this.state.currentItem3.id);
          }}
        />
        <Select
          ref={'select2'}
          options={this.state.currentItem1.list}
          keyMapping={{
            lable: 'name',
            value: 'id'
          }}
          selectedIndex={0}
          onSubmit={(value, index) => {
            var currentItem2 = this.state.currentItem1.list[index];
            this.setState({
              currentItem2: currentItem2,
              currentItem3: currentItem2.list[0]
            });
            this.refs.select3.setSelectedValue(this.state.currentItem3.id);
          }}
        />
        <Select
          ref={'select3'}
          options={this.state.currentItem2.list}
          keyMapping={{
            lable: 'name',
            value: 'id'
          }}
          selectedIndex={0}
          onSubmit={(value, index) => {
            this.setState({
              currentItem3: this.state.currentItem2.list[index]
            })
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  homePage: {
    flex: 1,
    padding: 50,
    justifyContent: 'center',
    flexDirection: 'column'
  },
  chooseArea: {
    marginBottom: 30
  },
  chooseItem: {
    flex: 1,
    marginBottom: 15,
    flexDirection: 'row'
  },
  chooseLabel: {
    flex: 2,
    textAlign: 'right',
    paddingRight: 15,
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 16
  },
  selectTrigger: {
    flex: 8,
    borderBottomWidth: .5,
    borderBottomColor: '#ccc'
  },
  selectedText: {
    flex: 1,
    padding: 8,
    fontSize: 16,
    textAlign: 'left',
  }
});

AppRegistry.registerComponent('SelectApp', () => SelectApp);
