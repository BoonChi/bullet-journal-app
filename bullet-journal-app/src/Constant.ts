const itemTypeOptions = [
    {
        label: "Event",
        value: "event",
    },
    {
        label: "Note",
        value: "note",
    },
    {
        label: "Task",
        value: "task",
    },
];
  
const logTypeOptions = [
    {
        label: "Daily",
        value: "daily",
    },
    {
        label: "Monthly",
        value: "monthly",
    },
    {
        label: "Future",
        value: "future",
    },
];
const daysNumber: number[] = []
for (let i = 1; i <= 31; i++) {
    daysNumber.push(i);
}

const dateType = {
    "daily": "day",
    "monthly": "month",
    "future": "year"
}
export default {itemTypeOptions, logTypeOptions, daysNumber, dateType};