import React, { useState } from 'react';

import {
  useSession,
} from "@inrupt/solid-ui-react";

import {
  addStringNoLocale,
  createSolidDataset,
  createThing,
  getPodUrlAll,
  getSolidDataset,
  getThingAll,
  removeThing,
  saveSolidDatasetAt,
  setThing,
  SolidDataset,
} from "@inrupt/solid-client";

import { SCHEMA_INRUPT } from "@inrupt/vocab-common-rdf";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Profile: React.FC = () => {
  const { session } = useSession();

  const [checkedAllergens, setCheckedAllergens] = useState(new Set<string>());

  const allergens = ["milk", "gluten", "soybeans"];

  async function handleWrite() {
    let userWebId: string = session.info.webId === undefined ? "" : session.info.webId;
    const podsUrls: String[] = await getPodUrlAll(userWebId, { fetch: session.fetch });
    const readingListUrl = `${podsUrls[0]}dietary-profile/my-profile`;
    let myReadingList: SolidDataset = setThing(createSolidDataset(), createThing());

    try {
      // Attempt to retrieve the reading list in case it already exists.
      myReadingList = await getSolidDataset(readingListUrl, { fetch: session.fetch });
      // Clear the list to override the whole list
      let items = getThingAll(myReadingList);
      items.forEach((item) => {
        myReadingList = removeThing(myReadingList, item);
      });
    } catch (error: any) {
      if (typeof error.statusCode === "number" && error.statusCode === 404) {
        // if not found, create a new SolidDataset (i.e., the reading list)
        myReadingList = createSolidDataset();
      } else {
        console.error(error.message);
      }
    }

    let item = createThing({ name: "user" });

    for (const allergen of checkedAllergens) {
      item = addStringNoLocale(item, SCHEMA_INRUPT.name, allergen);
    }

    myReadingList = setThing(myReadingList, item);

    await saveSolidDatasetAt(
      readingListUrl,
      myReadingList,
      { fetch: session.fetch }
    );
  }

  function handleAllergenClick(allergen) {
    let newAllergenSet = new Set(checkedAllergens);

    if (newAllergenSet.has(allergen)) {
      newAllergenSet.delete(allergen);
    } else {
      newAllergenSet.add(allergen);
    }

    setCheckedAllergens(newAllergenSet);
  }

  return (
    <>
      <h1>My profile</h1>
      <p>Select what you are allergic to</p>
      {allergens.map(allergen =>
        <Form.Check
          type="checkbox"
          label={allergen}
          checked={checkedAllergens.has(allergen)}
          onChange={() => handleAllergenClick(allergen)}
        />
      )}
      <Button onClick={() => handleWrite()}>Save profile</Button>
    </>
  );
};

export default Profile;