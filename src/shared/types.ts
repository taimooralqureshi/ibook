
export interface serverResponse {
  word: string;
  meanings: IMeaning[],
  phonetics: IPhonetics[]
}

export interface IMeaning {
  antonyms: string[],
  definitions: IDefinition[],
  partOfSpeech: string,
  synonyms: string[]
}

export interface IDefinition {
  definition: string,
  example: string
}

export interface IPhonetics {
  text: string
}
