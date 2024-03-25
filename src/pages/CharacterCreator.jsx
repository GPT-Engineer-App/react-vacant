import React, { useState, useEffect } from "react";
import { Box, Heading, Select, Text, UnorderedList, ListItem, Input, Button } from "@chakra-ui/react";

const CharacterCreator = () => {
  const [races, setRaces] = useState([]);
  const [selectedRace, setSelectedRace] = useState(null);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [backgrounds, setBackgrounds] = useState([]);
  const [selectedBackground, setSelectedBackground] = useState(null);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [alignment, setAlignment] = useState("");

  useEffect(() => {
    fetch("https://www.dnd5eapi.co/api/races")
      .then((res) => res.json())
      .then((data) => setRaces(data.results));
  }, []);

  useEffect(() => {
    if (selectedRace) {
      fetch("https://www.dnd5eapi.co/api/classes")
        .then((res) => res.json())
        .then((data) => setClasses(data.results));
    }
  }, [selectedRace]);

  useEffect(() => {
    if (selectedClass) {
      fetch("https://www.dnd5eapi.co/api/backgrounds")
        .then((res) => res.json())
        .then((data) => setBackgrounds(data.results));
    }
  }, [selectedClass]);

  const createCharacter = () => {
    const character = {
      name,
      race: selectedRace.name,
      class: selectedClass.name,
      background: selectedBackground.name,
      gender,
      alignment,
    };
    console.log(character);
    alert("Character created! See console for details");
  };

  return (
    <Box>
      <Heading>Create a Character</Heading>

      <Text mt={4}>Select Race:</Text>
      <Select placeholder="Select race" onChange={(e) => setSelectedRace(races.find((r) => r.name === e.target.value))}>
        {races.map((race) => (
          <option key={race.index} value={race.name}>
            {race.name}
          </option>
        ))}
      </Select>

      {selectedRace && (
        <>
          <Text mt={4}>Racial Traits:</Text>
          <UnorderedList>
            {selectedRace.traits.map((trait) => (
              <ListItem key={trait.index}>{trait.name}</ListItem>
            ))}
          </UnorderedList>
        </>
      )}

      {selectedRace && (
        <>
          <Text mt={4}>Select Class:</Text>
          <Select placeholder="Select class" onChange={(e) => setSelectedClass(classes.find((c) => c.name === e.target.value))}>
            {classes.map((cls) => (
              <option key={cls.index} value={cls.name}>
                {cls.name}
              </option>
            ))}
          </Select>
        </>
      )}

      {selectedClass && (
        <>
          <Text mt={4}>Starting Equipment:</Text>
          <UnorderedList>
            {selectedClass.starting_equipment.map((equip, i) => (
              <ListItem key={i}>
                {equip.equipment.name} (x{equip.quantity})
              </ListItem>
            ))}
          </UnorderedList>

          <Text mt={4}>Proficiencies:</Text>
          <UnorderedList>
            {selectedClass.proficiencies.map((prof) => (
              <ListItem key={prof.index}>{prof.name}</ListItem>
            ))}
          </UnorderedList>
        </>
      )}

      {selectedClass && (
        <>
          <Text mt={4}>Select Background:</Text>
          <Select placeholder="Select background" onChange={(e) => setSelectedBackground(backgrounds.find((b) => b.name === e.target.value))}>
            {backgrounds.map((bg) => (
              <option key={bg.index} value={bg.name}>
                {bg.name}
              </option>
            ))}
          </Select>
        </>
      )}

      {selectedBackground && (
        <>
          <Text mt={4}>Background Feature:</Text>
          <Text>
            {selectedBackground.feature.name}: {selectedBackground.feature.desc}
          </Text>
        </>
      )}

      <Text mt={4}>Name:</Text>
      <Input value={name} onChange={(e) => setName(e.target.value)} />

      <Text mt={4}>Gender:</Text>
      <Input value={gender} onChange={(e) => setGender(e.target.value)} />

      <Text mt={4}>Alignment:</Text>
      <Input value={alignment} onChange={(e) => setAlignment(e.target.value)} />

      <Button colorScheme="blue" size="lg" mt={8} onClick={createCharacter}>
        Create Character
      </Button>
    </Box>
  );
};

export default CharacterCreator;
