import { Form, Row, Button, Col, Container } from "react-bootstrap";
import "./App.css";
import { useState } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(file);
  }

  return (
    <Container className="mt-5">
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter title" onChange={(e) => setTitle(e.target.value)}/>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)}/>
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" >
          <Form.Label>Image</Form.Label>
          <Form.Control type="file" onChange={(e) => setFile(e.target.value)}/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default App;
