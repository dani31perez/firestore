import React, { useEffect, useState } from "react";
import {
  doc,
  collection,
  onSnapshot,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import {
  Col,
  Container,
  FloatingLabel,
  Form,
  InputGroup,
  ListGroup,
  Row,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFloppyDisk,
  faPenToSquare,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

function ListRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editRecipeId, setEditRecipeId] = useState(null);

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

  const handleEdit = (recipe) => {
    setEditDescription(recipe.Description);
    setEditTitle(recipe.Title);
    setEditRecipeId(recipe.Id);
    console.log(editRecipeId);
  };

  const handleSave = async (recipeId) => {
    try {
      const recipeRef = doc(db, "Recipes", recipeId);
      await updateDoc(recipeRef, {
        Title: editTitle,
        Description: editDescription,
      });
      setEditRecipeId(null);
    } catch (err) {
      console.error("Error updating recipe:", err);
    }
  };

  const handleCancel = () => {
    setEditRecipeId(null);
  };

  const handleDelete = async (recipeId) => {
    try {
      await deleteDoc(doc(db, "Recipes", recipeId));
    } catch (err) {
      console.error("Error deleting recipe:", err);
    }
  };

  return (
    <ListGroup className="mb-5">
      {recipes.map((recipe) => (
        <ListGroup.Item key={recipe.Id} className="border-0 mt-3">
          <Container
            className="align-items-center"
            style={{ justifyItems: "center" }}
          >
            {editRecipeId === recipe.Id ? (
              <Row className="align-items-center" style={{ width: "70vw" }}>
                <Col md={8} xs={6}>
                  <InputGroup>
                    <FloatingLabel label="Title" className="me-3">
                      <Form.Control
                        placeholder="title"
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                      />
                    </FloatingLabel>
                    <FloatingLabel label="Description">
                      <Form.Control
                        type="text"
                        placeholder="description"
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                      />
                    </FloatingLabel>
                  </InputGroup>
                </Col>
                <Col md="auto" xs="auto">
                  <FontAwesomeIcon
                    icon={faFloppyDisk}
                    className="me-3 fs-1"
                    onClick={() => handleSave(recipe.Id)}
                  />
                  <FontAwesomeIcon
                    icon={faXmark}
                    className="fs-1"
                    onClick={() => handleCancel()}
                  />
                </Col>
              </Row>
            ) : (
              <Row className="align-items-center" style={{ width: "70vw" }}>
                <Col md={8} xs={6}>
                  <h4>{recipe.Title}</h4>
                  <p className="fs-5">{recipe.Description}</p>
                  {recipe.File !== "" && (
                    <img src={recipe.File} alt={recipe.Title} />
                  )}
                </Col>
                <Col md="auto" xs="auto">
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    className="me-3 fs-1"
                    onClick={() => handleEdit(recipe)}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="fs-1"
                    onClick={() => handleDelete(recipe.Id)}
                  />
                </Col>
              </Row>
            )}
          </Container>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default ListRecipes;
