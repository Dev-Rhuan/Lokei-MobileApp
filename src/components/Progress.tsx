import { StyleSheet, Text, View } from "react-native";

type Props = {
  currentStep: number;
  totalSteps: number;
};

export function Progress({ currentStep, totalSteps }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.stepsContainer}>
        {Array.from({ length: totalSteps }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.step,
              index + 1 === currentStep && styles.activeStep,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },

  stepsContainer: {
    flexDirection: "row",
    gap: 8,
  },

  step: {
    width: 24,
    height: 6,
    borderRadius: 999,
    backgroundColor: "#D4D4D8",
  },

  activeStep: {
    backgroundColor: "#F97316",
  },

  counter: {
    fontSize: 14,
    color: "#737373",
    fontWeight: "500",
  },
});
