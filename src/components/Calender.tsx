import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Calendar, LocaleConfig } from "react-native-calendars";

LocaleConfig.locales["pt-br"] = {
  monthNames: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ],
  monthNamesShort: [
    "Jan.",
    "Fev.",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul.",
    "Ago",
    "Set.",
    "Out.",
    "Nov.",
    "Dez.",
  ],
  dayNames: [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ],
  dayNamesShort: ["D", "S", "T", "Q", "Q", "S", "S"],
  today: "Hoje",
};
LocaleConfig.defaultLocale = "pt-br";

export const getDatesInRange = (start: string, end: string): string[] => {
  const dates = [];
  let curr = new Date(start + "T12:00:00Z");
  let stop = new Date(end + "T12:00:00Z");

  if (curr > stop) {
    const temp = curr;
    curr = stop;
    stop = temp;
  }

  while (curr <= stop) {
    dates.push(curr.toISOString().split("T")[0]);
    curr.setDate(curr.getDate() + 1);
  }
  return dates;
};

type Props = {
  startDate: string | null;
  endDate: string | null;
  onDayPress: (day: any) => void;
  daysCount: number;
  minDate?: string;
};

export function RentalCalendar({
  startDate,
  endDate,
  onDayPress,
  daysCount,
  minDate,
}: Props) {
  const selectedRange =
    startDate && endDate
      ? getDatesInRange(startDate, endDate)
      : startDate
        ? [startDate]
        : [];

  const markedDates: any = {};
  selectedRange.forEach((date) => {
    markedDates[date] = {
      selected: true,
      selectedColor: "#F97316",
    };
  });

  return (
    <View>
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Selecione os dias</Text>
        {daysCount > 0 && (
          <View style={styles.daysBadge}>
            <Text style={styles.daysBadgeText}>
              {daysCount} dia{daysCount > 1 ? "s" : ""}
            </Text>
          </View>
        )}
      </View>

      <Calendar
        minDate={minDate ?? new Date().toISOString().split("T")[0]}
        style={{ marginBottom: 16, borderRadius: 16 }}
        theme={{
          calendarBackground: "#ffffff",
          textSectionTitleColor: "#A3A3A3",
          selectedDayBackgroundColor: "#F97316",
          selectedDayTextColor: "#ffffff",
          todayTextColor: "#F97316",
          dayTextColor: "#171717",
          textDisabledColor: "#D1D5DB",
          arrowColor: "#F97316",
          monthTextColor: "#171717",
          textDayFontWeight: "500",
          textMonthFontWeight: "bold",
          textDayHeaderFontWeight: "600",
          textDayFontSize: 16,
          textMonthFontSize: 18,
        }}
        onDayPress={onDayPress}
        markedDates={markedDates}
        renderArrow={(direction: string) => (
          <View style={styles.arrowContainer}>
            <Feather
              name={direction === "left" ? "chevron-left" : "chevron-right"}
              size={18}
              color="#F97316"
            />
          </View>
        )}
      />

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: "#F97316" }]} />
          <Text style={styles.legendText}>Selecionado</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: "#F3F4F6" }]} />
          <Text style={styles.legendText}>Indisponível</Text>
        </View>
        <View style={styles.legendItem}>
          <View
            style={[
              styles.legendDot,
              {
                borderWidth: 1,
                borderColor: "#F97316",
                backgroundColor: "transparent",
              },
            ]}
          />
          <Text style={styles.legendText}>Hoje</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#171717",
  },
  daysBadge: {
    backgroundColor: "#FFF7ED",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  daysBadgeText: { color: "#F97316", fontWeight: "bold", fontSize: 14 },
  arrowContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FFF7ED",
    justifyContent: "center",
    alignItems: "center",
  },
  legend: { flexDirection: "row", gap: 16, marginBottom: 24 },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  legendDot: { width: 12, height: 12, borderRadius: 6 },
  legendText: { fontSize: 12, color: "#737373" },
});
