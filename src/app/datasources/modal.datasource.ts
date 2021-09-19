import { Modal } from "src/app/modal";

export const Modals:Array<Modal> = [
    {
        id:'faq',
        header:"🤔 How does this app work?",
        content:"First of all the app asks for your location to learn the weather conditions on your area using open-meteo.com API.\n\nSecond, if you choose to get an already existing playlist the app will match your weathercode with a playlist group from our database and sends you the link of a random playlist from that group but if you choose to get a personal playlist based on your liked songs, the app will go through your last few hundred liked songs and make a playlist based on songs with matching characteristics with your weathercode.",
    }
]
