export const dummyDateTimeData = {
  "2025-08-08": [
    {
      time: "2025-07-24T01:00:00.000Z",
      showId: "68395b407f6329be2bb45bd1"
    },
    {
      time: "2025-07-24T03:00:00.000Z",
      showId: "68395b407f6329be2bb45bd2"
    },
    {
      time: "2025-07-24T05:00:00.000Z",
      showId: "68395b407f6329be2bb45bd3"
    }
  ],
  "2025-08-09": [
    {
      time: "2025-07-25T01:00:00.000Z",
      showId: "68395b407f6329be2bb45bd4"
    },
    {
      time: "2025-07-25T03:00:00.000Z",
      showId: "68395b407f6329be2bb45bd5"
    }
  ],
  "2025-08-13": [
    { time: "2025-07-27T01:00:00.000Z", showId: "new1" },
    { time: "2025-07-27T03:00:00.000Z", showId: "new2" }
  ],
};

const startDate = new Date("2025-08-14");
const endDate = new Date("2025-09-12");

for (
  let date = new Date(startDate);
  date <= endDate;
  date.setDate(date.getDate() + 1)
) {
  const key = date.toISOString().split("T")[0];
  dummyDateTimeData[key] = [
    { time: "2025-07-27T01:00:00.000Z", showId: "new1" },
    { time: "2025-07-27T0:00:00.000Z", showId: "new2" }
  ];
}

console.log(dummyDateTimeData);
