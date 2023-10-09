import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import { createText, createBox } from "@shopify/restyle";
import { ThemeProps } from "../../theme";
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import { useAppDispatch } from '../../hooks/useRedux';
import { removeDeck } from '../../redux/slices/deck';

export type PopUpMenuProps = {
    showMenu: Function, 
    hideMenu: Function, 
    visible: boolean | undefined,
    deleteDeck: Function,
    navigateToNewCard: Function
};
const Text = createText<ThemeProps>();
const Box = createBox<ThemeProps>();


const PopUpMenu: React.FC<PopUpMenuProps> = ({showMenu, hideMenu, visible, deleteDeck, navigateToNewCard}) => {
    const dispatch = useAppDispatch();

    const handleDelete = () => {
        hideMenu();
        displayDeleteAlert();
    };

    const handleCreateCard = () => {
        hideMenu();
        navigateToNewCard();
    }


    const displayDeleteAlert = () => {
        Alert.alert(
          'Are You Sure?',
          'This action will delete your deck permanently!',
          [
            {
              text: 'Delete',
              onPress: () => deleteDeck(),
            },
            {
              text: 'No Thanks',
              onPress: () => console.log('no thanks'),
            },
          ],
          {
            cancelable: true,
          }
        );
      };
    
    
  return (
    <SafeAreaView>
        <Box >
        <Menu
            visible={visible}
            onRequestClose={()=>hideMenu()}
          >
            <Box flexDirection='row' alignItems='center' m='s'>
            <MaterialIcon name="add-circle-outline" size={20}/>
            <MenuItem onPress={handleCreateCard}>New Card</MenuItem>

            </Box>
            
            <MenuDivider />
            <Box flexDirection='row' alignItems='center' m='s'>
                <AntDesignIcon name="edit" size={20}/>
                <MenuItem onPress={()=>hideMenu()}>Edit Deck</MenuItem>
            </Box>

            <MenuDivider />

            <Box flexDirection='row' alignItems='center' m='s'>
                <AntDesignIcon name="delete" size={20}/>
                <MenuItem onPress={handleDelete}>Remove</MenuItem>
            </Box>

            
        </Menu>

        </Box>
        
      
    </SafeAreaView>
  );
}
 export default PopUpMenu;