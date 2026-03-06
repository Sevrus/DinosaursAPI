export type DinoText = {en: string; fr: string};

export type Dinosaur = {
    name: string;
    period: DinoText;
    diet: DinoText;
    classification: {
        kingdom: string;
        phylum: string;
        class: string;
        order: string;
        suborder: string;
        family: string;
        genus: string;
        species: string;
    };
    length_m: number;
    discovered_in: DinoText;
    description: DinoText;
}
