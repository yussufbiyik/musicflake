import { Modal } from "src/app/classes/modal";

export const Modals:Array<Modal> = [
    {
        shorthand:'faq',
        header:"How does this app work? 🤔",
        content:"First of all the app asks for your location to learn the weather conditions on your area using open-meteo.com API.<br><br> Then the app will match your weathercode with a playlist group from our database and send you the link of a random playlist from that group.",
    },
    {
        shorthand:'error',
        header:"Something happened. 🧰",
        content:`A problem just occured, can you share us how to reproduce this problem, you can do this by repeating what you just did and sharing it with us.<br><br>{{param0}}`,
    },
    {
        shorthand:'playlist',
        header:'Here is your playlist. 🎧',
        content:`<iframe src="{{param0}}" width="100%" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe><br><a href="{{param1}}" rel="noopener"><button>Open in Spotify 🎵</button></a>`,
    },
]
