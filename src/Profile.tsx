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
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Profile: React.FC = () => {
  const { session } = useSession();

  const [checkedAllergens, setCheckedAllergens] = useState(new Set<string>());

  const allergens = ["Celery", "Gluten", "Crustaceans", "Eggs", "Fish", "Lupin", "Milk", "Molluscs", "Mustard", "Tree nuts", "Peanuts", "Sesame", "Soya", "Sulphites"];

  // const diets = ["vegan", "vegetarian", "low-carb", "keto", "raw"];

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
    <><Container fluid >
      <h3 className="mt-3">Select what you are allergic to</h3>
      <Row className="w-25 mt-2">
        {allergens.map(allergen =>
          <Col md={6}>
            <Form.Check
              type="checkbox"
              label={allergen}
              checked={checkedAllergens.has(allergen)}
              onChange={() => handleAllergenClick(allergen)}
            />
          </Col>
        )}
      </Row>

      {/* <h3>Select your diets</h3>
      {diets.map(diet =>
        <Form.Check
          type="checkbox"
          label={diet}
          checked={false}
          // onChange={() => handleAllergenClick(allergen)}
        />
      )} */}

      <Button className="mt-3" onClick={() => handleWrite()}>Save profile</Button>
    </Container>



    </>
  );
};

export default Profile;