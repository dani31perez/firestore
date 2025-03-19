import React, { useEffect, useState } from "react";
import { doc, collection, onSnapshot, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

function ListRecipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const colRef = collection(db, "Recipes");
    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      const productsData = snapshot.docs.map((doc) => ({
        Id: doc.id,
        ...doc.data(),
      }));
      setRecipes(productsData);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (recipeId) => {
    try {
      await deleteDoc(doc(db, "Recipes", recipeId));
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  return (
    <ListGroup>
      {recipes.map((recipe) => (
        <ListGroup.Item key={recipe.Id} className="border-0 mt-3">
          <Container>
            <Row>
              <Col>
                <h4>{recipe.Title}</h4>
                <p className="fs-5">{recipe.Description}</p>
              </Col>
              <Col>
                <FontAwesomeIcon icon={faPenToSquare} className="me-5 fs-1" />
                <FontAwesomeIcon
                  icon={faTrash}
                  className="fs-1"
                  onClick={() => handleDelete(recipe.Id)}
                />
              </Col>
            </Row>
          </Container>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default ListRecipes;
