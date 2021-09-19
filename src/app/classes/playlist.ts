export class Playlist {
    name!       : string;
    url!        : string;
    weathercode!: number | Array<number>;
    daytime!    : "morning" | "noon" | "night" | Array<"morning" | "noon" | "night">;
    score!      : number;
}