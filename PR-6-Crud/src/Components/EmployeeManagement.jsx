import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Table, Card, Alert, Badge, Dropdown } from "react-bootstrap";
import { RiDeleteBin2Fill, RiEditBoxFill } from "react-icons/ri";
import "./EmployeeManagement.css";

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState(() => {
    const savedEmployees = localStorage.getItem("employees");
    return savedEmployees ? JSON.parse(savedEmployees) : [];
  });
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    department: "",
    position: "",
    salary: "",
    status: "Active"
  });
  const [validated, setValidated] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }
    setValidated(false);

    if (editingIndex !== null) {
      const updatedEmployees = [...employees];
      updatedEmployees[editingIndex] = formData;
      setEmployees(updatedEmployees);
      setEditingIndex(null);
    } else {
      setEmployees([...employees, formData]);
    }

    setFormData({
      name: "",
      age: "",
      department: "",
      position: "",
      salary: "",
      status: "Active"
    });
  };

  const handleEdit = (index) => {
    setFormData(employees[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updatedEmployees = employees.filter((_, i) => i !== index);
    setEmployees(updatedEmployees);
  };

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(search.toLowerCase()) &&
    (roleFilter === "All" || emp.department === roleFilter)
  );

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Employee Management System</h2>
      <Row className="mb-3 align-items-center">
        <Col md={6}>
          <Form.Control  type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </Col>
        <Col md={3}>
          <Dropdown>
            <Dropdown.Toggle variant="secondary">{roleFilter}</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setRoleFilter("All")}>All</Dropdown.Item>
              <Dropdown.Item onClick={() => setRoleFilter("Admin")}>Admin</Dropdown.Item>
              <Dropdown.Item onClick={() => setRoleFilter("HR")}>HR</Dropdown.Item>
              <Dropdown.Item onClick={() => setRoleFilter("Developer")}>Developer</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Card className="p-4 shadow-sm border-3 border-info">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" value={formData.name} onChange={handleInputChange} required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Age</Form.Label>
                <Form.Control type="number" name="age" value={formData.age} onChange={handleInputChange} required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Department</Form.Label>
                <Form.Control type="text" name="department" value={formData.department} onChange={handleInputChange} required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Position</Form.Label>
                <Form.Control type="text" name="position" value={formData.position} onChange={handleInputChange} required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Salary</Form.Label>
                <Form.Control type="number" name="salary" value={formData.salary} onChange={handleInputChange} required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Control as="select" name="status" value={formData.status} onChange={handleInputChange} required>
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Offline</option>
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3 w-100">
                {editingIndex !== null ? "Update Employee" : "Add Employee"}
              </Button>
            </Form>
          </Card>
        </Col>
        <Col md={6} className="px-0">
          {employees.length === 0 ? (
            <Alert variant="info" className="text-center">No employees added yet.</Alert>
          ) : (
            <Table striped bordered hover className="mt-3 shadow-sm">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Department</th>
                  <th>Position</th>
                  <th>Salary</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((emp, index) => (
                  <tr key={index}>
                    <td>{emp.name}</td>
                    <td>{emp.age}</td>
                    <td>{emp.department}</td>
                    <td>{emp.position}</td>
                    <td>{emp.salary}</td>
                    <td>
                      <Badge bg={emp.status === "Active" ? "success" : emp.status === "Inactive" ? "warning" : "danger"}>{emp.status}</Badge>
                    </td>
                    <td>
                      <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(index)}><RiEditBoxFill /></Button>
                      <Button variant="danger" size="sm" onClick={() => handleDelete(index)}><RiDeleteBin2Fill /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default EmployeeManagement;
