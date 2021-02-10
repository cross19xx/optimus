import React, {useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {sendMessage} from 'react-native-watch-connectivity';

const DIRECTIONS = [
  'arrive',
  'arrive_left',
  'arrive_right',
  'arrive_straight',
  'close',
  'continue',
  'continue_left',
  'continue_right',
  'continue_slight_left',
  'continue_slight_right',
  'continue_straight',
  'continue_uturn',
  'depart',
  'depart_left',
  'depart_right',
  'depart_straight',
  'end_of_road_left',
  'end_of_road_right',
  'flag',
  'fork',
  'fork_left',
  'fork_right',
  'fork_slight_left',
  'fork_slight_right',
  'fork_straight',
  'invalid',
  'invalid_left',
  'invalid_right',
  'invalid_slight_left',
  'invalid_slight_right',
  'invalid_straight',
  'invalid_uturn',
  'merge_left',
  'merge_right',
  'merge_slight_left',
  'merge_slight_right',
  'merge_straight',
  'new_name_left',
  'new_name_right',
  'new_name_sharp_left',
  'new_name_sharp_right',
  'new_name_slight_left',
  'new_name_slight_right',
  'new_name_straight',
  'notificaiton_sharp_right',
  'notification_left',
  'notification_right',
  'notification_sharp_left',
  'notification_slight_left',
  'notification_slight_right',
  'notification_straight',
  'off_ramp_left',
  'off_ramp_right',
  'off_ramp_slight_left',
  'off_ramp_slight_right',
  'on_ramp_left',
  'on_ramp_right',
  'on_ramp_sharp_left',
  'on_ramp_sharp_right',
  'on_ramp_slight_left',
  'on_ramp_slight_right',
  'on_ramp_straight',
  'rotary',
  'rotary_left',
  'rotary_right',
  'rotary_sharp_left',
  'rotary_sharp_right',
  'rotary_slight_left',
  'rotary_slight_right',
  'rotary_straight',
  'roundabout',
  'roundabout_left',
  'roundabout_right',
  'roundabout_sharp_left',
  'roundabout_sharp_right',
  'roundabout_slight_left',
  'roundabout_slight_right',
  'roundabout_straight',
  'turn_left',
  'turn_right',
  'turn_sharp_left',
  'turn_sharp_right',
  'turn_slight_left',
  'turn_slight_right',
  'turn_straight',
  'updown',
  'uturn',
];

const Optimus = () => {
  const [description, setDescription] = useState('');
  const [distance, setDistance] = useState('');

  const getRadomDirection = () =>
    `${DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)]}`;

  const randomRequest = () => {
    const message = {
      description,
      distance,
      direction: getRadomDirection(),
      next: getRadomDirection(),
    };

    console.log(message);

    sendMessage({
      message: JSON.stringify(message),
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Description</Text>
      <TextInput
        editable
        value={description}
        style={styles.textInput}
        onChangeText={(e) => setDescription(e)}
        placeholder="Description"
      />

      <Text style={styles.label}>Distance</Text>
      <TextInput
        editable
        value={distance}
        style={styles.textInput}
        onChangeText={(e) => setDistance(e)}
        placeholder="Distance"
      />

      <Button title="Press to send a new request" onPress={randomRequest} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    paddingHorizontal: 24,
  },
  label: {
    width: '100%',
  },
  textInput: {
    width: '100%',
    marginBottom: 12,
    borderColor: '#AAAAAA',
    borderWidth: 1,
    padding: 12,
    borderRadius: 6,
  },
});

export default Optimus;
