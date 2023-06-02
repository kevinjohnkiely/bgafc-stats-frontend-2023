export interface Season {
    _id: string;
    season: string;
    team: string;
    division: string;
    lge_apps?: number;
    lge_goals?: number;
    fai_apps?: number;
    fai_goals?: number;
    mjc_apps?: number;
    mjc_goals?: number;
    msc_apps?: number;
    msc_goals?: number;
    desc_apps?: number;
    desc_goals?: number;
    lgec_apps?: number;
    lgec_goals?: number;
    reidyc_apps?: number;
    reidyc_goals?: number;
    hoganc_apps?: number;
    hoganc_goals?: number;
    seasonTotalAppsA?: number;
    seasonTotalGoalsA?: number;
    seasonTotalAppsB?: number;
    seasonTotalGoalsB?: number;
    player?: string
}