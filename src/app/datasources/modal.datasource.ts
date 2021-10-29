import { Modal } from "src/app/classes/modal";

export const Modals:Array<Modal> = [
    {
        id:'faq',
        header:"🤔 How does this app work?",
        content:"First of all the app asks for your location to learn the weather conditions on your area using open-meteo.com API.<br><br> Then the app will match your weathercode with a playlist group from our database and send you the link of a random playlist from that group.",
    }
]
