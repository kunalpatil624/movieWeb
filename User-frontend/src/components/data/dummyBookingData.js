import { movieData } from "./movieDataWithValidImages";

export const dummyBookingData = [
    {
        "_id": "68396334fb83252d82e17295",
        "user": { "name": "GreatStack", },
        "show": {
            _id: "68352363e96d99513e4221a4",
            movie: movieData[0],
            showDateTime: "2025-07-27T01:00:00.000Z",
            showPrice: 200,
        },
        "amount": 200,
        "bookedSeats": ["D1", "D2"],
        "isPaid": false,
    },
    {
        "_id": "68396334fb83252d82e17295",
        "user": { "name": "GreatStack", },
        "show": {
            _id: "68352363e96d99513e4221a4",
            movie: movieData[2],
            showDateTime: "2025-06-30T02:30:00.000Z",
            showPrice: 135,
        },
        "amount": 130,
        "bookedSeats": ["A1"],
        "isPaid": true,
    },
    {
        "_id": "68396334fb83252d82e17295",
        "user": { "name": "GreatStack", },
        "show": {
            _id: "68352363e96d99513e4221a4",
            movie: movieData[7],
            showDateTime: "2025-06-30T02:30:00.000Z",
            showPrice: 153,
        },
        "amount": 153,
        "bookedSeats": ["A1", "A2","A3"],
        "isPaid": true,
    },
]