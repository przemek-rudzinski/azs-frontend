export interface Match {
  _id: string;
  guestTeam: string;
  homeTeam: string;
  place: string;
  date: string;
  homeScore: number;
  guestScore: number;
  matchId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

type MatchList = Match[];
