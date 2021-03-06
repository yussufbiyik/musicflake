import { Modal } from "src/app/classes/modal";

export const Modals:Array<Modal> = [
    {
        shorthand:'faq',
        header:"<span class='emoji'>🤔</span> How does this app work?",
        content:"First of all the app asks for your location to learn the weather conditions on your area using open-meteo.com's API.<br>Then the app will try to match your weathercode with a playlist group from our database and send you the link of a random playlist from that group.",
    },
    {
        shorthand:'credits',
        header:"<span class='emoji'>📜</span> Credits",
        content:`<ul>
            <li><a href="https://open-meteo.com/">Weather data by Open-Meteo.com</a></li>
            <li><a href="https://css.glass">Glass effects by css.glass</a></li>
        </ul>`,
    },
    {
        shorthand:'error',
        header:"<span class='emoji'>😱</span> Something happened!",
        content:`A problem just occured, can you share us how to reproduce this problem, you can do this by repeating what you just did and sharing it with us.<br><br>{{param0}}`,
    },
    {
        shorthand:'playlist',
        header:"<span class='emoji'>🎁</span> Here is your playlist!",
        content:`
        <iframe src="{{param0}}" width="100%" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
        <br>
        <div class="grid-row grid-columns modal-buttons">
            <a id="openInSpotifyLink" href="{{param1}}" rel="noopener"><button class="glass" id="spotify-button">Open in Spotify 🎵</button></a>
        </div>`,
    },
    {
        shorthand:'form',
        header:"<span class='emoji'>📩</span> Fill the form to reccomend your playlist!",
        content:`
        <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScE0AEVqaUycrTCoVWB0IbQoIdRAbKZPqAHxiYBIngip_QZRw/viewform?embedded=true" width="100%" height="380" frameborder="0" marginheight="0" marginwidth="0">Yükleniyor…</iframe>
        <br>
        <div class="modal-buttons">
            <a target="_blank" href="https://forms.gle/efjcvta5acjizhAg8" rel="noopener"><button>Open in a new tab 🔗</button></a>
        </div>`,
    },
    // Voting feature is disabled until further update
    // {
    //     shorthand:'playlist',
    //     header:"<span class='emoji'>🎁</span> Here is your playlist!",
    //     content:`
    //     <iframe src="{{param0}}" width="100%" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
    //     <br>
    //     <div class="grid-row grid-columns modal-buttons">
    //         <a id="openInSpotifyLink" href="{{param1}}" rel="noopener"><button class="glass" id="spotify-button">Open in Spotify 🎵</button></a>
    //         <div class="vote-buttons">
    //             <div>
    //                 <button id="upVoteButton" class="glass vote-button">👍</button>
    //                 <button id="downVoteButton" class="glass vote-button">👎</button>
    //             </div>
    //         </div>
    //     </div>`,
    // },
]
