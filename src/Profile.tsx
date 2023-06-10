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


const Profile: React.FC = () => {
  const { session } = useSession();
  const [selectedAllergen, setSelectedAllergen] = useState("allergen1");

  async function handleWrite() {
    let userWebId: string = session.info.webId === undefined? "" : session.info.webId;
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
    item = addStringNoLocale(item, SCHEMA_INRUPT.name, selectedAllergen);
    myReadingList = setThing(myReadingList, item);

    await saveSolidDatasetAt(
      readingListUrl,
      myReadingList,
      { fetch: session.fetch }
    );
    
    alert('Done.');
  }

  return (
    <>
      <h1>Welcome to the Solid dietary profile editor</h1>
      <p>Select what you are allergic to</p>
      <select 
        value={selectedAllergen}
        onChange={e => setSelectedAllergen(e.target.value)}>
        <option key="a1" value="allergen1">Allergen1</option>
        <option key="a2" value="allergen2">Allergen2</option>
      </select>
      <br/>
      <br/>
      <button onClick={() => handleWrite()}>Write allergen to pod</button>
    </>
  );
};

export default Profile;