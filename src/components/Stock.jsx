import CardStore from "./CardStore";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { useState } from "react";
import { useForm } from "react-hook-form";

function Stock() {
    const [showModalCreate, setShowModalCreate] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const handleCreate = () => {
        setShowModalCreate(true);
    }

    const handleClose = () => {
        setShowModalCreate(false);
        reset();
    }

    const onSubmit = (data) => {
        console.log('Submitted data:', data);
        handleClose();
    }

    return (
        <>
            <div className='addItemBtn d-flex justify-content-center my-4'>
                <Button variant="secondary" onClick={handleCreate} style={{ width: '200px', height: '50px' }}>
                    Add Item
                </Button>
            </div>

            <Container className="d-flex justify-content-center">
                <Row xs={1} md={2} className="g-4 justify-content-center">
                    {Array.from({ length: 8 }).map((_, idx) => (
                        <Col key={idx} className="d-flex justify-content-center">
                            <CardStore title={`item ${idx + 1}`} />
                        </Col>
                    ))}
                </Row>
            </Container>

            {/* CREATE ITEM MODAL */}
            <Modal show={showModalCreate} onHide={handleClose} contentClassName="bg-dark text-white">
                <Modal.Header closeButton>
                    <Modal.Title>Add Item</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group controlId="itemName">
                            <Form.Label>Item Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Item Name"
                                {...register('itemName', { required: 'Item name is required' })}
                            />
                            {errors.itemName && <p className="text-danger">{errors.itemName.message}</p>}
                        </Form.Group>
                        <div className="d-flex justify-content-end mt-3">
                            <Button variant="secondary" onClick={handleClose} className="me-2">
                                Close
                            </Button>
                            <Button variant="primary" type="submit">
                                Save Changes
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Stock;
