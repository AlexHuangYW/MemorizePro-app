import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  StatusBar,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import RoundIconBtn from 'react-native-vector-icons/AntDesign';
import { createText, createBox } from "@shopify/restyle";
import { ThemeProps } from "../../theme";

const Text = createText<ThemeProps>();
const Box = createBox<ThemeProps>();

const DeckInputModal = ({ visible, onClose, onSubmit, note, isEdit }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const handleModalClose = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (isEdit) {
      setTitle(note.title);
      setDesc(note.desc);
    }
  }, [isEdit]);

  const handleOnChangeText = (text: React.SetStateAction<string>, valueFor: string) => {
    if (valueFor === 'title') setTitle(text);
    if (valueFor === 'desc') setDesc(text);
  };

  const handleSubmit = () => {
    if (!title.trim() && !desc.trim()) return onClose();

    if (isEdit) {
      onSubmit(title, desc, Date.now());
    } else {
      onSubmit(title, desc);
      setTitle('');
      setDesc('');
    }
    onClose();
  };

  const closeModal = () => {
    if (!isEdit) {
      setTitle('');
      setDesc('');
    }
    onClose();
  };

  return (
    <>
      <StatusBar hidden />
      <Modal visible={visible} animationType='fade'>
        <View style={styles.container}>
        <Text variant='title' color='black'>
           New Deck
          </Text>
          <Box  borderBottomWidth={2} borderBottomColor="lightBlue" g='m'>
            <TextInput
              value={title}
              onChangeText={text => handleOnChangeText(text, 'title')}
              placeholder='Title'
              style={[styles.input, styles.title]}
            />
          </Box>
          <Box  borderBottomWidth={2} borderBottomColor="lightBlue" g='m'>
            <TextInput
              value={desc}
              multiline
              placeholder='Note'
              style={[styles.input, styles.desc]}
              onChangeText={text => handleOnChangeText(text, 'desc')}
            />
          </Box>
          
          <View style={styles.btnContainer}>
            <RoundIconBtn
              size={30}
              name='closecircle'
              onPress={closeModal}
            />
            {title.trim() || desc.trim() ? (
              <RoundIconBtn
                size={30}
                style={{ marginLeft: 15 }}
                name='checkcircle'
                onPress={handleSubmit}
              />
            ) : null}
          </View>
        </View>
        <TouchableWithoutFeedback onPress={handleModalClose}>
          <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  input: {
   
  },
  title: {
    height: 40,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  desc: {
    height: 100,
  },
  modalBG: {
    flex: 1,
    zIndex: -1,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
  },
});

export default DeckInputModal;
