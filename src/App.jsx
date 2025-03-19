import { Form, Row, Button, Col, Container } from "react-bootstrap";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { setDoc, doc, collection, getDocs } from "firebase/firestore";
import "./App.css";
import { useState } from "react";
import { storage, db } from "./firebaseConfig";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(
    new File([], "empty.txt", { type: "text/plain" })
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    let refFile = "";

    if (file && file.size !== 0) {
      const fileName = file.name;
      const storageRef = ref(storage, "images/" + fileName);
      await uploadBytes(storageRef, file);
      refFile = await getDownloadURL(storageRef);
    }

    const data = {
      Title: title,
      Description: description,
      File: refFile || "",
    };

    const docs = await getDocs(collection(db, "Recipes"));
    await setDoc(doc(db, "Recipes", docs.size + 1 + ""), data);

    setTitle("");
    setDescription("");
    setFile(new File([], "empty.txt", { type: "text/plain" }));
    e.target.reset();
    alert("Recipe added successfully");
  };

  return (
    <Container className="mt-5">
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default App;
