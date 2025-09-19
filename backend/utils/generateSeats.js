// utils/generateSeats.js
export const generateRandomSeats = () => {
  const rows = ["A","B","C","D","E","F","G","H","I","J"];
  const seats = [];
  rows.forEach(row => {
    for (let i = 1; i <= 9; i++) {
      seats.push(`${row}${i}`);
    }
  });

  // 60% seats random book
  const bookedCount = Math.floor(seats.length * 0.6);
  const bookedSeats = [];
  while (bookedSeats.length < bookedCount) {
    const randomSeat = seats[Math.floor(Math.random() * seats.length)];
    if (!bookedSeats.includes(randomSeat)) {
      bookedSeats.push(randomSeat);
    }
  }
  return bookedSeats;
};
