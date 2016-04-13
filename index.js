'use strict';

import React, {
  StyleSheet,
  Text,
  View,
  Component,
  TouchableOpacity,
  Modal,
  Picker,
  Dimensions
} from 'react-native';

var SCREEN_WIDTH = Dimensions.get('window').width;

export default class Select extends Component {
  constructor(props) {
    super(props);
    this.keyMapping = this.props.keyMapping || {
      'lable': 'lable',
      'value': 'value'
    }

    var selectedIndex = this.props.selectedIndex <= this.props.options.length ? this.props.selectedIndex : 0;
    var selectedValue = this.props.selectedValue || this.props.options[selectedIndex][this.keyMapping.value];

    this.selectedChangeSubmitValue = selectedValue;
    this.selectedChangeSubmitIndex = selectedIndex;

    this.state = {
      selectedIndex: selectedIndex,
      selectedValue: selectedValue,
      modalVisible: false
    }
  }

  show() {
    this.setState({
      modalVisible: true,
      selectedValue: this.selectedChangeSubmitValue,
      selectedIndex: this.selectedChangeSubmitIndex
    });
  }

  setSelectedIndex(index) {
    var option = index <= this.props.options.length ? this.props.options[index] : this.props.options[0];
    var value = option.value;
    this.setSelectedValue(value);
  }

  getIndexByValue(value) {
    var index = 0;
    var that = this;
    this.props.options.map(function(option, i) {
      if(option[that.keyMapping['value']] === value) {
        index = i;
        return;
      }
    })
    return index;
  }

  setSelectedValue(value) {
    this.setState({
      selectedValue: value
    });
    this.selectedChangeSubmitValue = value;
    this.selectedChangeSubmitIndex = this.getIndexByValue(value);
  }

  render() {
    return (
      <Modal
        animated={true}
        transparent={true}
        visible={this.state.modalVisible}>
        <View style={styles.basicContainer}>
          <View style={styles.modalContainer}>
            <View style={styles.buttonView}>
              <TouchableOpacity 
                onPress={() => {
                  this.setState({
                    modalVisible: false,
                    selectedValue: this.selectedChangeSubmitValue,
                    selectedIndex: this.selectedChangeSubmitIndex
                  });
                }}>
                  <Text style={styles.button}>取消</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                if(this.props.onSubmit) this.props.onSubmit(this.state.selectedValue, this.state.selectedIndex);
                this.setState({
                  modalVisible: false
                });
                this.selectedChangeSubmitValue = this.state.selectedValue;
                this.selectedChangeSubmitIndex = this.state.selectedIndex;
              }}>
                <Text style={styles.button}>确定</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.mainBox}>
              <Picker
                style={styles.picker}
                selectedValue={this.state.selectedValue}
                onValueChange={(value, index) => {
                  this.setState({
                    selectedValue: value,
                    selectedIndex: index
                  });
                }}>
                {
                  this.props.options.map((option, i) => {
                    var label = option[this.keyMapping['lable']];
                    var value = option[this.keyMapping['value']];
                    return (
                      <Picker.Item style={styles.pickerItem} key={i} label={label} value={value} />
                    )
                  })
                }
              </Picker>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

var styles = StyleSheet.create({
  basicContainer:{
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContainer:{
    width:SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    borderTopColor: '#CCC',
    borderTopWidth: .5,
    backgroundColor: '#FFF',
  },
  buttonView:{
    width:SCREEN_WIDTH,
    padding: 10,
    borderBottomWidth: .5,
    borderBottomColor: '#CCC',
    justifyContent: 'space-between',
    flexDirection:'row',
    backgroundColor: '#FFF'
  },
  button: {
    color: '#007AFF',
    fontSize: 16
  },
  picker: {
    width:SCREEN_WIDTH
  },
  mainBox: {
    backgroundColor: '#F5FCFF'
  }
});