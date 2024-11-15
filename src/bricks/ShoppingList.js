import React, { useState, useEffect, useContext }  from 'react';
import { Container, Table, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getServerUrl, now } from '../global';
import { UserContext } from '../UserContext';

const ShoppingList = () => 
{
  const [list, setList] = useState(
  {
    name: "Friday Shopping List",
    owner: "Ringo",
    members: ["John","Paul"],
    items: [
      { id:1, name: "milk", quantity: 2, unit: "bottle", solved: 0},
      { id:2, name: "cereal", quantity: 4, unit: "box", solved: 0},
      { id:3, name: "yoghurt", quantity: 4, unit: "cup", solved: 0},
      { id:4, name: "bread", quantity: 1, unit: "loaf", solved: 0},
      { id:5, name: "banana", quantity: 10, unit: "piece", solved: 0},
    ]
  }
  );

  const { selectedUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showEditItem, setShowEditItem] = useState(false);
  const [showEditMembers, setShowEditMembers] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [newName, setNewName] = useState(list.name);
  const [newItem, setNewItem] = useState({ name: '', quantity: '', unit: '' });
  const [newMember, setNewMember] = useState('');
  const [currentItemIndex, setCurrentItemIndex] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  const handleCloseEditItem = () => setShowEditItem(false);
  const handleShowEditItem = (id) => {
    var index=list.items.findIndex(item => item.id === id);
    setCurrentItemIndex(index);
    setNewItem(list.items[index]);
    setShowEditItem(true);
  };

  const handleCloseEditMembers = () => setShowEditMembers(false);
  const handleShowEditMembers = () => setShowEditMembers(true);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = (id) => {
    var index=list.items.findIndex(item => item.id === id);
    setCurrentItemIndex(index);
    setItemToDelete(list.items[index]);
    setShowDelete(true);
  };
  const handleSaveEdit = () => {
    setList({ ...list, name: newName });
    handleCloseEdit();
  };

  const handleSaveAdd = () => {
    // allocate a new id to newItem
    const maxId = list.items.reduce((max, item) => (item.id > max ? item.id : max), 0);
    newItem.id = maxId + 1;
    setList({ ...list, items: [...list.items, { ...newItem, solved: 0 }] });
    setNewItem({ name: '', quantity: '', unit: '' });
    handleCloseAdd();
  };

  const handleSaveEditItem = () => {
    const updatedItems = [...list.items];
    updatedItems[currentItemIndex] = newItem;
    setList({ ...list, items: updatedItems });
    handleCloseEditItem();
  };

  const handleDeleteItem = () => {
    const updatedItems = list.items.filter((_, i) => i !== currentItemIndex);
    setList({ ...list, items: updatedItems });
    handleCloseDelete();
  };

  const toggleSolved = (id) => {
    var index=list.items.findIndex(item => item.id === id);
    const newList = { ...list };
    newList.items[index].solved = newList.items[index].solved ? 0 : 1;
    setList(newList);
  };

  const handleLeave = () => {
    alert("I am leaving the list");
    navigate('/');
  }

  const handleAddMember = () => {
    if (newMember && !list.members.includes(newMember)) {
      setList({ ...list, members: [...list.members, newMember] });
      setNewMember('');
    }
  };

  const handleRemoveMember = (member) => {
    setList({ ...list, members: list.members.filter(m => m !== member) });
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const filteredItems = list.items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'All' || 
                          (filterStatus === 'Solved' && item.solved) || 
                          (filterStatus === 'Unresolved' && !item.solved);
    return matchesSearch && matchesFilter;
  });

  return (
    <Container>

      <Row style={{ height: '20px' }}>
      </Row>

      <Row className="fs-1">
        <Col>{list.name}   <Button variant="primary" onClick={handleShowEdit} className="ml-3">Edit</Button></Col> 
      </Row>

      <Row style={{ height: '20px' }}>
      </Row>

      <Row>
        <Col><b>Owner:</b> {list.owner} &nbsp; <b>Members:</b> {list.members.join(", ")} &nbsp;  
        {list.owner !== selectedUser && (
            <Button variant="primary" onClick={handleLeave} className="btn-sm">Leave</Button>
        )}
        {list.owner === selectedUser && (
            <Button variant="primary" onClick={handleShowEditMembers} className="btn-sm ml-2">Edit Members</Button>
        )}

        </Col>
      </Row>

      <Row style={{ height: '40px' }}>
      </Row>

      <Row className="mt-3">
        <Col></Col>
        <Col>
          <Form.Control
            type="text"
            placeholder="Search name"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Col>
        <Col></Col>
        <Col></Col>
        <Col>
          <Form.Select value={filterStatus} onChange={handleFilterChange}>
            <option value="All">All</option>
            <option value="Solved">Solved</option>
            <option value="Unresolved">Unresolved</option>
          </Form.Select>
        </Col>
        <Col></Col>
      </Row>

      <Row className="fw-bold">
        <Col></Col>
        <Col>Name</Col>
        <Col>Quantity</Col>
        <Col>Unit</Col>
        <Col>Solved</Col>
        <Col>Actions</Col>
      </Row>

      {filteredItems.map((item, index) => (
        <Row key={index} className="border-top py-2">
          <Col>{item.id}</Col>
          <Col>{item.name}</Col>
          <Col>{item.quantity}</Col>
          <Col>{item.unit}</Col>
          <Col onClick={() => toggleSolved(filteredItems.at(index).id)} style={{ cursor: 'pointer' }}>
            {item.solved ? 'Yes' : 'No'}
          </Col>
          <Col>
            <Button variant="secondary" className="btn-sm" onClick={() => handleShowEditItem(filteredItems.at(index).id)}>
              Edit
            </Button>
            &nbsp;
            <Button variant="danger" className="btn-sm ml-2" onClick={() => handleShowDelete(filteredItems.at(index).id)}>
              Delete
            </Button>
          </Col>
        </Row>
      ))}

      <Row>
        <Col>
          <Button variant="primary" onClick={handleShowAdd} className="mt-3 btn-sm">Add Item</Button>
        </Col>
        <Col/>
        <Col/>
        <Col/>
        <Col/>
        <Col/>
      </Row>


      <Modal show={showEdit} onHide={handleCloseEdit} centered>
        <Modal.Header closeButton>
          <Modal.Title>Shopping List Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formListName">
              <Form.Control
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSaveEdit}>
            OK
          </Button>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showAdd} onHide={handleCloseAdd} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formItemName">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                value={newItem.name}
                autoFocus
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formItemQuantity">
              <Form.Label>Quantity:</Form.Label>
              <Form.Control
                type="text"
                value={newItem.quantity}
                onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formItemUnit">
              <Form.Label>Unit</Form.Label>
              <Form.Control
                type="text"
                value={newItem.unit}
                onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSaveAdd}>
            OK
          </Button>
          <Button variant="secondary" onClick={handleCloseAdd}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditItem} onHide={handleCloseEditItem} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEditItemName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                autoFocus
              />
            </Form.Group>
            <Form.Group controlId="formEditItemQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="text"
                value={newItem.quantity}
                onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formEditItemUnit">
              <Form.Label>Unit</Form.Label>
              <Form.Control
                type="text"
                value={newItem.unit}
                onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSaveEditItem}>
            OK
          </Button>
          <Button variant="secondary" onClick={handleCloseEditItem}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDelete} onHide={handleCloseDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete "{itemToDelete?.name}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDeleteItem}>
            Yes
          </Button>
          <Button variant="secondary" onClick={handleCloseDelete}>
            No
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditMembers} onHide={handleCloseEditMembers} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Members</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Member</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.members.map((member, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{member}</td>
                  <td>
                    <Button variant="danger" className="btn-sm" onClick={() => handleRemoveMember(member)}>
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Form>
            <Form.Group controlId="formNewMember">
              <Form.Label>New Member</Form.Label>
              <Form.Control
                type="text"
                value={newMember}
                onChange={(e) => setNewMember(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Button variant="primary" className="mt-2" onClick={handleAddMember}>
              Add Member
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditMembers}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </Container>
  );
};

export default ShoppingList;
