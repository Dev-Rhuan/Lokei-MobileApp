import { StyleSheet, Text, View } from "react-native";

type Props = {
  currentStep: number;
  totalSteps: number;
};

export function Progress({ currentStep, totalSteps }: Props) {
  return (
    <View style={styles.stepsContainer}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.step,
            index < currentStep ? styles.completedStep : null,
            index + 1 === currentStep ? styles.activeStep : null,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  stepsContainer: {
    flexDirection: "row",
    gap: 8,
  },

  step: {
    width: 14,
    height: 6,
    borderRadius: 999,
    backgroundColor: "#C4C4C8",
  },

  completedStep: {
    backgroundColor: "#FDBA74",
  },

  activeStep: {
    backgroundColor: "#F97316",
    width: 24,
  },
});
