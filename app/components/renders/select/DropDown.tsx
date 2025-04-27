import { Pressable, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import React, { useEffect, useState } from "react"
import DropdownModal from "./dropDownComponents/DropdownModal"
import { BaseIcon, BaseText, TextFieldProps } from "../../baseComponents"
import { dropDownDataType } from "../../../utils/objectToArray"
import { iconSize } from "../../../theme/iconSize"
import { colors, spacing } from "../../../theme"

export interface DropDownProps
  extends Pick<
    TextFieldProps,
    "label" | "labelTx" | "labelTxOptions" | "LabelTextProps" | "containerStyle"
  > {
  /**
   * Data à afficher dans la liste
   */
  data?: dropDownDataType[]
  /**
   * Lors du changement pour définir la valeur sélectionnée de la liste déroulante
   */
  onChange?: (item: dropDownDataType) => void
  /**
   * Valeur de l'item prélevé
   */
  value: dropDownDataType | null
  /**
   * Style overrides pour la liste déroulante
   */
  pickerWrapperStyle?: StyleProp<ViewStyle>
}

/**
 * Liste déroulante pour définir un tableau d'éléments [chaîne] à afficher dans la liste
 */
export const DropDown = observer(function DropDown(props: DropDownProps) {
  const {
    label,
    labelTx,
    labelTxOptions,
    LabelTextProps,
    containerStyle,
    pickerWrapperStyle: $pickerWrapperStyleOverride,
    data,
    onChange,
    value = null,
  } = props

  const $labelStyles = [$labelStyle, LabelTextProps?.style]

  // State local du component
  const [selectedItem, setSelectedItem] = useState(value)
  const [isModalVisible, setModalVisible] = useState(false)

  // Fonction pour ouvrir le modal de la liste déroulante
  const openModal = () => {
    setModalVisible(true)
  }

  // Fonction pour fermer le modal de la liste déroulante
  const closeModal = () => {
    setModalVisible(false)
  }

  // Fonction pour gérer la selection d'un item
  const handleSelectItem = (item: dropDownDataType) => {
    setSelectedItem(item)
    onChange?.(item)
    setModalVisible(false)
  }

  // Whenever the value changes
  useEffect(() => {
    setSelectedItem(value)
  }, [value])

  const $pickerWrapperStyles = [$pickerWrapper, $pickerWrapperStyleOverride]

  return (
    <View style={containerStyle}>
      {!!(label || labelTx) && (
        <BaseText
          preset="formLabel"
          text={label}
          tx={labelTx}
          txOptions={labelTxOptions}
          {...LabelTextProps}
          style={$labelStyles}
        />
      )}
      <View style={$pickerWrapperStyles}>
        <Pressable onPress={openModal} style={$selectedItemContainer}>
          {selectedItem ? (
            <BaseText>{selectedItem.label}</BaseText>
          ) : (
            <BaseText tx="common.select" />
          )}
          <BaseIcon icon="arrow_down" size={iconSize.xsm} />
        </Pressable>

        <DropdownModal
          data={data as dropDownDataType[]}
          visible={isModalVisible}
          onClose={closeModal}
          onSelect={handleSelectItem}
        />
      </View>
    </View>
  )
})

const $pickerWrapper: ViewStyle = {
  justifyContent: "center",
  borderRadius: spacing.ds,
}

const $selectedItemContainer: ViewStyle = {
  flexDirection: "row",
  borderWidth: 1,
  borderRadius: spacing.ds,
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: colors.weatherAppPalette.primatyTextInputBgCouleur,
  borderColor: colors.weatherAppPalette.primaryBorderCouleur,
  paddingVertical: spacing.xs,
  paddingHorizontal: spacing.sm,
  overflow: "hidden",
}

const $labelStyle: TextStyle = {
  color: colors.weatherAppPalette.primaryLabelTextCouleur,
  marginBottom: spacing.xxxs,
}
