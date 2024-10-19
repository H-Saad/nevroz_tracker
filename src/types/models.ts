"use client"
export interface AccountDTO{
    puuid : string
    gameName : string
    tagLine: string
}

export interface SummonerDTO{
    accountID : string
    profileIconID : string
    revisionDate : Number
    id : string
    puuid : string
    summonerLevel : Number
}

export interface LeagueEntryDTO{
    queueType : string
    tier : string
    rank : string
    leaguePoints : number
    wins : number
    losses : number
}