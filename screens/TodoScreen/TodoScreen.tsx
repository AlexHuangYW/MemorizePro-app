import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  TextInput,
  Button
} from 'react-native';

import { createBox, createText } from "@shopify/restyle";
import { ThemeProps } from "../../theme";


import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Todos, createTodo, deleteTodo, getTodos, updateTodo } from '../../api/todo';
import IconAntDesign  from 'react-native-vector-icons/AntDesign';

export type TodoScreenProps = {
  navigation: NativeStackNavigationProp<any,any>
};

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

const TodoScreen: React.FC<TodoScreenProps> = ({ navigation }) => {
  const [todo, setTodo] = useState('');
  const queryClient = useQueryClient();

  const todosQuery = useQuery({
      queryKey: ['todos'],
      queryFn: getTodos,
    });
  const addMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: (data) => {
      console.log('su', data);
      queryClient.invalidateQueries({ queryKey: ['todos']});
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: (data) => {
      console.log('su', data);
      queryClient.invalidateQueries({ queryKey: ['todos']});
    }
  });

  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: (data) => {
      //notify the data is outdated and needs to be refreshed.
      queryClient.invalidateQueries({ queryKey: ['todos']});
      
      //updateQueryClient: 
      // update the cache without waiting for the next fetch (manually update the cache)
    }
  });

  const updateQueryClient = (updateTodo: Todos) => {
    queryClient.setQueriesData(['todos'], (data: any) => {
      return data.map((todo:Todos) => {
        if(todo.id === updateTodo.id) {
          return updateTodo;
        }
        return todo;
      });
    });
  };

  const addTodo = () => {
    addMutation.mutate(todo);
    setTodo("");
  }


  const renderTodo: ListRenderItem<Todos> = ({ item }) => {
    const deleteTodo = () => {
      deleteMutation.mutate(item.id)

    };

    const toggleDone = () => {
      updateMutation.mutate({...item, done: !item.done})
    }
    return (
      <Box flexDirection='row' alignItems='center' justifyContent='space-between' p='s'>
        <TouchableOpacity onPress={toggleDone}>
        <Box alignItems='center' flexDirection='row' g='s' >
          {item.done && <IconAntDesign name="checkcircle" color="green"  size={24}/>}
          {!item.done && <IconAntDesign name="checkcircleo" color="black" size={24}/>}
          <Text variant='body'>{item.text}</Text>
        </Box>
        </TouchableOpacity>
        <IconAntDesign name="delete" size={22} onPress={deleteTodo} />
      </Box>
    )
    
  }

  return (
    <View>
      <Box flexDirection='row' justifyContent='space-between' g='m' borderWidth={1} borderColor='lightGray'>
        <Box pl='s'>
          <TextInput placeholder="Add Todo" onChangeText={setTodo} value={todo} />
        </Box>
        <Box alignItems='center' pt="s">
          <Button title="Add" onPress={addTodo} />
        </Box>
      </Box>
        {
            todosQuery.isLoading ? <Text variant='title'>isLoading</Text>: null
        }
        {
            todosQuery.isError ? <Text variant='title'>error</Text>: null
        }
        <FlatList data={todosQuery.data} renderItem={renderTodo} keyExtractor={(item) => item.id.toString()}/>



    </View>
  );
}
 export default TodoScreen;