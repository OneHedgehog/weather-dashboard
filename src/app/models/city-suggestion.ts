export interface CitySuggestion {
  AdministrativeArea: {
    ID: string;
    LocalizedName: string;
  };
  Country: {
    ID: string,
    LocalizedName: string
  };
  LocalizedName: string;
  Rank: number;
  Type: string;
  Version: string;
}
