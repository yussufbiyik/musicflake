export class Playlist {
    name!       : string;
    url!        : string;
    weathercode!: Array<Number>;
    timeofday!  : "morning" | "noon" | "night" | Array<"morning" | "noon" | "night">;
    score!      : number;
}