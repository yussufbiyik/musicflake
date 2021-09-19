export class Playlist {
    name!        : string;
    uri!         : string;
    url!         : string;
    weathercodes!: Array<Number>;
    timeofday!   : "morning" | "noon" | "night" | Array<"morning" | "noon" | "night">;
    score!       : number;
}