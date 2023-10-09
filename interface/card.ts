export interface ICard {
    id: String,
    title: String,
    front: String,
    back: String,
    level: Number,
    interval: Number,
    lastReviewDate: number | Date,
    currentDate: number | Date,
}