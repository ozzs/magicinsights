import { db } from "./db";

async function addSchemas() {
  await db
    .insertInto("eventSchemas")
    .values([
      {
        id: "quidditchMatch",
        schema: {
          $schema: "http://json-schema.org/draft-07/schema#",
          type: "object",
          properties: {
            houseName: {
              type: "string",
              enum: ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"],
            },
            opposingHouse: {
              type: "string",
              enum: ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"],
            },
            winOrLoss: {
              type: "string",
              enum: ["Win", "Loss"],
            },
            pointsEarned: {
              type: "integer",
              minimum: 0,
            },
          },
          required: ["houseName", "opposingHouse", "winOrLoss", "pointsEarned"],
          additionalProperties: false,
        },
      },
      {
        id: "spellCast",
        schema: {
          $schema: "http://json-schema.org/draft-07/schema#",
          type: "object",
          properties: {
            wizard: {
              type: "string",
            },
            spell: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
                level: {
                  type: "integer",
                  minimum: 1,
                },
              },
              required: ["name", "level"],
              additionalProperties: false,
            },
            successOrFailure: {
              type: "string",
              enum: ["Success", "Failure"],
            },
          },
          required: ["houseName", "spell", "successOrFailure"],
          additionalProperties: false,
        },
      },
      {
        id: "potionBrewing",
        schema: {
          $schema: "http://json-schema.org/draft-07/schema#",
          type: "object",
          properties: {
            wizard: {
              type: "string",
            },
            potion: {
              type: "object",
              properties: {
                type: {
                  type: "string",
                },
                difficulty: {
                  type: "string",
                  enum: ["Easy", "Medium", "Hard"],
                },
              },
              required: ["type", "difficulty"],
              additionalProperties: false,
            },
            brewingSuccess: {
              type: "string",
              enum: ["Perfect", "Good", "Fail"],
            },
            timeTaken: {
              type: "integer",
              minimum: 1,
            },
          },
          required: ["houseName", "potion", "brewingSuccess", "timeTaken"],
          additionalProperties: false,
        },
      },
    ])
    .execute();
}

async function addQuidditchMatch() {
  await db
    .insertInto("events")
    .values([
      {
        data: {
          houseName: "Gryffindor",
          opposingHouse: "Hufflepuff",
          winOrLoss: "Win",
          pointsEarned: 10,
        },
        eventSchemaID: "quidditchMatch",
      },
      {
        data: {
          houseName: "Hufflepuff",
          opposingHouse: "Ravenclaw",
          winOrLoss: "Loss",
          pointsEarned: 5,
        },
        eventSchemaID: "quidditchMatch",
      },
      {
        data: {
          houseName: "Ravenclaw",
          opposingHouse: "Slytherin",
          winOrLoss: "Win",
          pointsEarned: 8,
        },
        eventSchemaID: "quidditchMatch",
      },
      {
        data: {
          houseName: "Slytherin",
          opposingHouse: "Gryffindor",
          winOrLoss: "Loss",
          pointsEarned: 3,
        },
        eventSchemaID: "quidditchMatch",
      },
      {
        data: {
          houseName: "Gryffindor",
          opposingHouse: "Ravenclaw",
          winOrLoss: "Win",
          pointsEarned: 7,
        },
        eventSchemaID: "quidditchMatch",
      },
      {
        data: {
          houseName: "Hufflepuff",
          opposingHouse: "Slytherin",
          winOrLoss: "Loss",
          pointsEarned: 2,
        },
        eventSchemaID: "quidditchMatch",
      },
      {
        data: {
          houseName: "Ravenclaw",
          opposingHouse: "Gryffindor",
          winOrLoss: "Win",
          pointsEarned: 6,
        },
        eventSchemaID: "quidditchMatch",
      },
      {
        data: {
          houseName: "Slytherin",
          opposingHouse: "Hufflepuff",
          winOrLoss: "Loss",
          pointsEarned: 4,
        },
        eventSchemaID: "quidditchMatch",
      },
      {
        data: {
          houseName: "Gryffindor",
          opposingHouse: "Slytherin",
          winOrLoss: "Win",
          pointsEarned: 9,
        },
        eventSchemaID: "quidditchMatch",
      },
      {
        data: {
          houseName: "Hufflepuff",
          opposingHouse: "Gryffindor",
          winOrLoss: "Loss",
          pointsEarned: 1,
        },
        eventSchemaID: "quidditchMatch",
      },
      {
        data: {
          houseName: "Ravenclaw",
          opposingHouse: "Hufflepuff",
          winOrLoss: "Win",
          pointsEarned: 7,
        },
        eventSchemaID: "quidditchMatch",
      },
      {
        data: {
          houseName: "Slytherin",
          opposingHouse: "Ravenclaw",
          winOrLoss: "Loss",
          pointsEarned: 4,
        },
        eventSchemaID: "quidditchMatch",
      },
      {
        data: {
          houseName: "Gryffindor",
          opposingHouse: "Hufflepuff",
          winOrLoss: "Win",
          pointsEarned: 8,
        },
        eventSchemaID: "quidditchMatch",
      },
      {
        data: {
          houseName: "Hufflepuff",
          opposingHouse: "Ravenclaw",
          winOrLoss: "Loss",
          pointsEarned: 3,
        },
        eventSchemaID: "quidditchMatch",
      },
      {
        data: {
          houseName: "Ravenclaw",
          opposingHouse: "Slytherin",
          winOrLoss: "Win",
          pointsEarned: 6,
        },
        eventSchemaID: "quidditchMatch",
      },
      {
        data: {
          houseName: "Slytherin",
          opposingHouse: "Gryffindor",
          winOrLoss: "Loss",
          pointsEarned: 2,
        },
        eventSchemaID: "quidditchMatch",
      },
      {
        data: {
          houseName: "Gryffindor",
          opposingHouse: "Ravenclaw",
          winOrLoss: "Win",
          pointsEarned: 10,
        },
        eventSchemaID: "quidditchMatch",
      },
      {
        data: {
          houseName: "Hufflepuff",
          opposingHouse: "Slytherin",
          winOrLoss: "Loss",
          pointsEarned: 1,
        },
        eventSchemaID: "quidditchMatch",
      },
      {
        data: {
          houseName: "Ravenclaw",
          opposingHouse: "Gryffindor",
          winOrLoss: "Win",
          pointsEarned: 9,
        },
        eventSchemaID: "quidditchMatch",
      },
      {
        data: {
          houseName: "Slytherin",
          opposingHouse: "Hufflepuff",
          winOrLoss: "Loss",
          pointsEarned: 3,
        },
        eventSchemaID: "quidditchMatch",
      },
    ])
    .execute();
}

async function addSpellCasts() {
  await db
    .insertInto("events")
    .values([
      {
        data: {
          wizard: "Merlin",
          spell: {
            name: "Fireball",
            level: 3,
          },
          successOrFailure: "Success",
        },
        eventSchemaID: "spellCast",
      },
      {
        data: {
          wizard: "Gandalf",
          spell: {
            name: "Lightning Bolt",
            level: 5,
          },
          successOrFailure: "Failure",
        },
        eventSchemaID: "spellCast",
      },
      {
        data: {
          wizard: "Dumbledore",
          spell: {
            name: "Expelliarmus",
            level: 2,
          },
          successOrFailure: "Success",
        },
        eventSchemaID: "spellCast",
      },
      {
        data: {
          wizard: "Hermione",
          spell: {
            name: "Levitation Charm",
            level: 1,
          },
          successOrFailure: "Success",
        },
        eventSchemaID: "spellCast",
      },
      {
        data: {
          wizard: "Saruman",
          spell: {
            name: "Darkness Curse",
            level: 4,
          },
          successOrFailure: "Failure",
        },
        eventSchemaID: "spellCast",
      },
      {
        data: {
          wizard: "Voldemort",
          spell: {
            name: "Avada Kedavra",
            level: 6,
          },
          successOrFailure: "Success",
        },
        eventSchemaID: "spellCast",
      },
      {
        data: {
          wizard: "Ged",
          spell: {
            name: "Summon Earth Elemental",
            level: 3,
          },
          successOrFailure: "Success",
        },
        eventSchemaID: "spellCast",
      },
      {
        data: {
          wizard: "Raistlin",
          spell: {
            name: "Time Stop",
            level: 7,
          },
          successOrFailure: "Failure",
        },
        eventSchemaID: "spellCast",
      },
      {
        data: {
          wizard: "Elminster",
          spell: {
            name: "Wish",
            level: 9,
          },
          successOrFailure: "Success",
        },
        eventSchemaID: "spellCast",
      },
      {
        data: {
          wizard: "Gellert Grindelwald",
          spell: {
            name: "Imperius Curse",
            level: 4,
          },
          successOrFailure: "Failure",
        },
        eventSchemaID: "spellCast",
      },
      {
        data: {
          wizard: "Rand Al'Thor",
          spell: {
            name: "Balefire",
            level: 8,
          },
          successOrFailure: "Success",
        },
        eventSchemaID: "spellCast",
      },
      {
        data: {
          wizard: "Ged",
          spell: {
            name: "Summon Wind Elemental",
            level: 3,
          },
          successOrFailure: "Success",
        },
        eventSchemaID: "spellCast",
      },
      {
        data: {
          wizard: "Pug",
          spell: {
            name: "Macroburst",
            level: 5,
          },
          successOrFailure: "Failure",
        },
        eventSchemaID: "spellCast",
      },
      {
        data: {
          wizard: "Belgarath",
          spell: {
            name: "Polgara's Blessing",
            level: 2,
          },
          successOrFailure: "Success",
        },
        eventSchemaID: "spellCast",
      },
      {
        data: {
          wizard: "Sauron",
          spell: {
            name: "Ring of Power",
            level: 10,
          },
          successOrFailure: "Failure",
        },
        eventSchemaID: "spellCast",
      },
      {
        data: {
          wizard: "Gandalf",
          spell: {
            name: "Teleportation",
            level: 5,
          },
          successOrFailure: "Success",
        },
        eventSchemaID: "spellCast",
      },
      {
        data: {
          wizard: "Albus Severus Potter",
          spell: {
            name: "Patronus Charm",
            level: 1,
          },
          successOrFailure: "Success",
        },
        eventSchemaID: "spellCast",
      },
      {
        data: {
          wizard: "Kvothe",
          spell: {
            name: "Name of the Wind",
            level: 7,
          },
          successOrFailure: "Success",
        },
        eventSchemaID: "spellCast",
      },
      {
        data: {
          wizard: "Raistlin",
          spell: {
            name: "Dragon Orb",
            level: 6,
          },
          successOrFailure: "Failure",
        },
        eventSchemaID: "spellCast",
      },
      {
        data: {
          wizard: "Nynaeve",
          spell: {
            name: "Healing Weaves",
            level: 4,
          },
          successOrFailure: "Success",
        },
        eventSchemaID: "spellCast",
      },
      {
        data: {
          wizard: "Ged",
          spell: {
            name: "Summon Fire Elemental",
            level: 3,
          },
          successOrFailure: "Success",
        },
        eventSchemaID: "spellCast",
      },
    ])
    .execute();
}

async function addPotionBrewing() {
  await db
    .insertInto("events")
    .values([
      {
        data: {
          wizard: "Merlin",
          potion: {
            type: "Invisibility",
            difficulty: "Medium",
          },
          brewingSuccess: "Perfect",
          timeTaken: 5,
        },
        eventSchemaID: "potionBrewing",
      },
      {
        data: {
          wizard: "Gandalf",
          potion: {
            type: "Healing",
            difficulty: "Easy",
          },
          brewingSuccess: "Good",
          timeTaken: 3,
        },
        eventSchemaID: "potionBrewing",
      },
      {
        data: {
          wizard: "Hermione",
          potion: {
            type: "Polyjuice",
            difficulty: "Hard",
          },
          brewingSuccess: "Fail",
          timeTaken: 8,
        },
        eventSchemaID: "potionBrewing",
      },
      {
        data: {
          wizard: "Dumbledore",
          potion: {
            type: "Fire-Breathing",
            difficulty: "Medium",
          },
          brewingSuccess: "Good",
          timeTaken: 6,
        },
        eventSchemaID: "potionBrewing",
      },
      {
        data: {
          wizard: "Gandalf",
          potion: {
            type: "Lightning",
            difficulty: "Hard",
          },
          brewingSuccess: "Perfect",
          timeTaken: 4,
        },
        eventSchemaID: "potionBrewing",
      },
      {
        data: {
          wizard: "Hermione",
          potion: {
            type: "Strength",
            difficulty: "Medium",
          },
          brewingSuccess: "Good",
          timeTaken: 5,
        },
        eventSchemaID: "potionBrewing",
      },
      {
        data: {
          wizard: "Dumbledore",
          potion: {
            type: "Flying",
            difficulty: "Easy",
          },
          brewingSuccess: "Fail",
          timeTaken: 2,
        },
        eventSchemaID: "potionBrewing",
      },
      {
        data: {
          wizard: "Merlin",
          potion: {
            type: "Love",
            difficulty: "Hard",
          },
          brewingSuccess: "Perfect",
          timeTaken: 7,
        },
        eventSchemaID: "potionBrewing",
      },
      {
        data: {
          wizard: "Gandalf",
          potion: {
            type: "Healing",
            difficulty: "Medium",
          },
          brewingSuccess: "Good",
          timeTaken: 4,
        },
        eventSchemaID: "potionBrewing",
      },
      {
        data: {
          wizard: "Hermione",
          potion: {
            type: "Invisibility",
            difficulty: "Easy",
          },
          brewingSuccess: "Fail",
          timeTaken: 3,
        },
        eventSchemaID: "potionBrewing",
      },
      {
        data: {
          wizard: "Dumbledore",
          potion: {
            type: "Polyjuice",
            difficulty: "Hard",
          },
          brewingSuccess: "Perfect",
          timeTaken: 6,
        },
        eventSchemaID: "potionBrewing",
      },
      {
        data: {
          wizard: "Merlin",
          potion: {
            type: "Fire-Breathing",
            difficulty: "Medium",
          },
          brewingSuccess: "Good",
          timeTaken: 5,
        },
        eventSchemaID: "potionBrewing",
      },
      {
        data: {
          wizard: "Gandalf",
          potion: {
            type: "Lightning",
            difficulty: "Easy",
          },
          brewingSuccess: "Fail",
          timeTaken: 2,
        },
        eventSchemaID: "potionBrewing",
      },
      {
        data: {
          wizard: "Hermione",
          potion: {
            type: "Strength",
            difficulty: "Hard",
          },
          brewingSuccess: "Perfect",
          timeTaken: 8,
        },
        eventSchemaID: "potionBrewing",
      },
      {
        data: {
          wizard: "Dumbledore",
          potion: {
            type: "Flying",
            difficulty: "Medium",
          },
          brewingSuccess: "Good",
          timeTaken: 4,
        },
        eventSchemaID: "potionBrewing",
      },
      {
        data: {
          wizard: "Merlin",
          potion: {
            type: "Love",
            difficulty: "Easy",
          },
          brewingSuccess: "Fail",
          timeTaken: 3,
        },
        eventSchemaID: "potionBrewing",
      },
      {
        data: {
          wizard: "Gandalf",
          potion: {
            type: "Healing",
            difficulty: "Hard",
          },
          brewingSuccess: "Perfect",
          timeTaken: 7,
        },
        eventSchemaID: "potionBrewing",
      },
      {
        data: {
          wizard: "Hermione",
          potion: {
            type: "Invisibility",
            difficulty: "Medium",
          },
          brewingSuccess: "Good",
          timeTaken: 6,
        },
        eventSchemaID: "potionBrewing",
      },
      {
        data: {
          wizard: "Dumbledore",
          potion: {
            type: "Polyjuice",
            difficulty: "Easy",
          },
          brewingSuccess: "Fail",
          timeTaken: 2,
        },
        eventSchemaID: "potionBrewing",
      },
      {
        data: {
          wizard: "Merlin",
          potion: {
            type: "Fire-Breathing",
            difficulty: "Hard",
          },
          brewingSuccess: "Perfect",
          timeTaken: 8,
        },
        eventSchemaID: "potionBrewing",
      },
      {
        data: {
          wizard: "Gandalf",
          potion: {
            type: "Lightning",
            difficulty: "Medium",
          },
          brewingSuccess: "Good",
          timeTaken: 7,
        },
        eventSchemaID: "potionBrewing",
      },
    ])
    .execute();
}

async function main() {
  await addSchemas();
  await addQuidditchMatch();
  await addSpellCasts();
  await addPotionBrewing();
}

main().then(() => {
  console.log("Done!");
  process.exit(0);
});
