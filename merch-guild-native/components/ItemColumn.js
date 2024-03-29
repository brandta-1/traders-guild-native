import React, { useState, useEffect } from 'react';
import { Text, Pressable, View } from 'react-native';
import styles from '../utils/styles';
import { v4 as uuidv4 } from 'uuid';
import { ItemForm } from './ItemForm';
import PropTypes from 'prop-types';

export const ItemColumn = ({ column, sendToForm, reset, search }) => {
  const [hovering, setHovering] = useState(false);

  const [items, setItems] = useState([
    {
      //generate uuid for mapping components that can be re-ordered
      id: uuidv4()
    }
  ]);

  useEffect(() => {
    sendToForm(column, items);
  }, [items]);

  useEffect(() => {
    setItems([{ name: undefined, rarity: 'Uncommon', enchantments: [], id: uuidv4() }]);
  }, [reset]);

  //add a new empty item to the item array
  const addItem = () => {
    setItems((c) => {
      return [...c, { name: undefined, rarity: 'Uncommon', enchantments: [], id: uuidv4() }];
    });
  };

  //find and remove the item given its id
  const deleteItem = (id) => {
    setItems((c) => {
      const index = c.map((i) => i.id).indexOf(id);
      const newState = c.toSpliced(index, 1);
      return newState;
    });
  };

  const updateFromChild = (item, id) => {
    //get the item thats being changed

    setItems((c) => {
      const change = c.findIndex((i) => {
        return i.id === id;
      });

      //if it wasnt found then dont change state
      if (change === -1) {
        return c;
      }
      //otherwise safely rewrite all properties with spread
      c[change] = {
        ...c[change],
        name: item.name,
        rarity: item.rarity,
        enchantments: item.enchantments
      };

      return c;
    });
  };
  //delete an item from the item array

  return (
    <View style={styles.ItemColumn}>
      <Text style={[styles.text, { textAlign: 'center', fontSize: 16, fontWeight: 'bold' }]}>
        Items {search ? 'they' : 'you'} {column}:
      </Text>
      {items.map((i) => {
        return (
          <ItemForm
            key={i.id}
            id={i.id}
            updateToParent={updateFromChild}
            length={items.length}
            deleteItem={deleteItem}
          />
        );
      })}
      <Pressable
        onPress={addItem}
        onHoverIn={() => setHovering(true)}
        onHoverOut={() => setHovering(false)}>
        <Text style={[styles.text, styles.button(hovering)]}>Add Item</Text>
      </Pressable>
    </View>
  );
};

ItemColumn.propTypes = {
  column: PropTypes.string,
  sendToForm: PropTypes.func,
  reset: PropTypes.string,
  search: PropTypes.bool
};
