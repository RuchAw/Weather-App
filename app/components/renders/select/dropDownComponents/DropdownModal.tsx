import React from "react"
import { Modal, Pressable, TextStyle, View, ViewStyle, TouchableWithoutFeedback } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { dropDownDataType } from "../../../../utils/objectToArray"
import { BaseText } from "../../../baseComponents"
import { spacing } from "../../../../theme"
import { windowsHeight, windowsWidth } from "../../../../utils/constante"

export interface DropdownModalProps {
  /**
   * le tableau des elements du drop down liste
   */
  data: dropDownDataType[]
  /**
   * La visibilté du modal boolean
   */
  visible: boolean
  /**
   * Fonction à executer pour fermer le modal
   */
  onClose(): void
  /**
   * Fonction pour selectionner un item
   */
  onSelect(item: dropDownDataType): void
}

const DropdownModal = ({ data, visible, onClose, onSelect }: DropdownModalProps) => {
  // L'affichage de l'item
  const renderItem = ({ item }) => (
    <Pressable onPress={() => onSelect(item)}>
      <View style={$dropdownItemContainer}>
        <BaseText style={$dropdownItemText}>{item.label}</BaseText>
      </View>
    </Pressable>
  )

  // Handle the tap outside the modal content
  const handlePressOutside = () => {
    // Prevent closing the modal if the user is pressing on the modal content
    onClose()
  }

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={handlePressOutside}>
        <View style={$modalContainer}>
          <Pressable>
            <View style={$modalContent}>
              <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.valeur as string}
                style={$dropdownList}
              />
              <BaseText preset="bold" tx="common.close" style={$closeButton} onPress={onClose} />
            </View>
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

export default DropdownModal

const $modalContainer: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#00000080",
}

const $modalContent: ViewStyle = {
  backgroundColor: "white",
  borderRadius: spacing.ds,
  padding: spacing.df,
  width: 0.73 * windowsWidth,
}

const $dropdownList: ViewStyle = {
  maxHeight: 0.235 * windowsHeight,
}

const $dropdownItemContainer: ViewStyle = {
  padding: spacing.ds,
  borderBottomWidth: 1,
  borderBottomColor: "#CCC",
}

const $dropdownItemText: TextStyle = {}

const $closeButton: ViewStyle = {
  marginTop: spacing.sm,
  alignItems: "center",
  alignSelf: "center"
}
