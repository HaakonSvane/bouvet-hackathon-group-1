// Chat GPT made this :) 

type UrlNameObject = {
    name: string;
    url: string;
  };
  
  type VersionDetails = {
    rarity: number;
    version: UrlNameObject;
  };
  
  type HeldItems = {
    item: UrlNameObject;
    version_details: VersionDetails[];
  };
  
  type Ability = {
    is_hidden: boolean;
    slot: number;
    ability: UrlNameObject;
  };
  
  type Form = UrlNameObject;
  
  type GameIndex = {
    game_index: number;
    version: UrlNameObject;
  };
  
  type MoveLearnMethod = UrlNameObject;
  
  type VersionGroupDetails = {
    level_learned_at: number;
    version_group: UrlNameObject;
    move_learn_method: MoveLearnMethod;
  };
  
  type Move = {
    move: UrlNameObject;
    version_group_details: VersionGroupDetails[];
  };
  
  type SpriteImages = {
    back_default?: string;
    back_female?: string | null;
    back_shiny?: string;
    back_shiny_female?: string | null;
    front_default?: string;
    front_female?: string | null;
    front_shiny?: string;
    front_shiny_female?: string | null;
  };
  
  type Sprites = {
    back_default: string;
    back_female: string | null;
    back_shiny: string;
    back_shiny_female: string | null;
    front_default: string;
    front_female: string | null;
    front_shiny: string;
    front_shiny_female: string | null;
    other: Record<string, SpriteImages>;
    versions: Record<string, Record<string, SpriteImages>>;
  };
  
  export type Pokemon = {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number;
    weight: number;
    abilities: Ability[];
    forms: Form[];
    game_indices: GameIndex[];
    held_items: HeldItems[];
    location_area_encounters: string;
    moves: Move[];
    species: UrlNameObject;
    sprites: Sprites;
  };