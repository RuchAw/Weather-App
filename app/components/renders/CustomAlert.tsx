import {Modal, View, ViewStyle, TextStyle, TouchableWithoutFeedback, Keyboard} from "react-native";
import {colors, spacing} from "../../theme";
import {FC} from "react";
import {BaseText, IconTypes} from "../baseComponents";
import InteractionButton from "./boutons/InteractionButton";

interface CustomModalProps {
    visible: boolean;
    message: string;
    onCancel: () => void;
    onConfirm: () => void;
    confirmButtonText?: string;
    cancelButtonText?: string;
    confirmButtonIcon?: IconTypes;
    cancelButtonIcon?: IconTypes;
}

const CustomAlert: FC<CustomModalProps> = (props) => {

    const {
        visible,
        message,
        onCancel,
        onConfirm,
        confirmButtonText = "Confirmer",
        cancelButtonText = "Annuler",
        confirmButtonIcon = "check",
        cancelButtonIcon = "cancel"
    } = props

    const handleBackdropPress = () => {
        // Dismiss the keyboard and close the modal when tapping outside
        Keyboard.dismiss();
        onCancel();
    };

    return (
        <Modal transparent={true} visible={visible} animationType="fade" onRequestClose={onCancel}>
            <TouchableWithoutFeedback onPress={handleBackdropPress}>
                <View style={$modalOverlay}>
                    <TouchableWithoutFeedback>
                        <View style={$modalContainer}>
                            <BaseText text={message} style={$modalMessage} />
                            <View style={$buttonContainer}>
                                <InteractionButton
                                    text={confirmButtonText}
                                    buttonIcon={confirmButtonIcon}
                                    onPress={onConfirm}
                                />
                                <InteractionButton
                                    text={cancelButtonText}
                                    buttonIcon={cancelButtonIcon}
                                    onPress={onCancel}
                                    backgroundColor={colors.weatherAppPalette.deleteButtonBgColor}
                                    pressedColor={colors.weatherAppPalette.deleteButtonBgColorPressed}
                                    textColor="white"
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const $modalOverlay: ViewStyle = {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
}

const $modalContainer: ViewStyle = {
    width: 300,
    padding: spacing.sm,
    borderRadius: spacing.xs,
    backgroundColor: "white",
    alignItems: "center",
    elevation: 5,
}

const $modalMessage: TextStyle = {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.weatherAppPalette.primaryTitlesColor,
    marginBottom: spacing.sm,
}

const $buttonContainer: ViewStyle = {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
}
export default CustomAlert;
