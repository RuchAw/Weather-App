import React, { ErrorInfo } from "react"
import { ScrollView, TextStyle, View, ViewStyle } from "react-native"
import { BaseButton, BaseIcon, BaseScreen, BaseText } from "../../components/baseComponents"
import { colors, spacing } from "../../theme"

export interface ErrorDetailsProps {
  error: Error | null
  errorInfo: ErrorInfo | null
  onReset(): void
}

export function ErrorDetails(props: ErrorDetailsProps) {
  return (
    <BaseScreen
      preset="fixed"
      safeAreaEdges={["top", "bottom"]}
      contentContainerStyle={$contentContainer}
    >
      <View style={$topSection}>
        <BaseIcon icon="ladybug" size={64} />
        <BaseText style={$heading} preset="subheading" tx="errorScreen.title" />
        <BaseText tx="errorScreen.friendlySubtitle" />
      </View>

      <ScrollView style={$errorSection} contentContainerStyle={$errorSectionContentContainer}>
        <BaseText style={$errorContent} weight="bold" text={`${props.error}`.trim()} />
        <BaseText
          selectable
          style={$errorBacktrace}
          text={`${props.errorInfo?.componentStack}`.trim()}
        />
      </ScrollView>

      <BaseButton
        preset="reversed"
        style={$resetButton}
        onPress={props.onReset}
        tx="errorScreen.reset"
      />
    </BaseScreen>
  )
}

const $contentContainer: ViewStyle = {
  alignItems: "center",
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.xl,
  flex: 1,
}

const $topSection: ViewStyle = {
  flex: 1,
  alignItems: "center",
}

const $heading: TextStyle = {
  color: colors.error,
  marginBottom: spacing.md,
}

const $errorSection: ViewStyle = {
  flex: 2,
  backgroundColor: colors.separator,
  marginVertical: spacing.md,
  borderRadius: 6,
}

const $errorSectionContentContainer: ViewStyle = {
  padding: spacing.md,
}

const $errorContent: TextStyle = {
  color: colors.error,
}

const $errorBacktrace: TextStyle = {
  marginTop: spacing.md,
  color: colors.textDim,
}

const $resetButton: ViewStyle = {
  backgroundColor: colors.error,
  paddingHorizontal: spacing.xxl,
}
