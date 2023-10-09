import { ICard } from './card'

export interface IDeck {
    id: String,
    title: String,
    desc: String,
    time: number | Date,
    cards: ICard[]
}