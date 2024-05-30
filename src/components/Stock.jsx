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

    const onSubmit = () => {
        console.log('submit')
    }

    return (
        <>
            <div className='addItemBtn d-flex justify-content-center'>
                <Button onClick={() => {handleCreate()}}>Add Item</Button>
            </div>

            <Container className="d-flex justify-content-center">
                <Row xs={1} md={2} className="g-4 justify-content-center">
                    {Array.from({ length: 8 }).map((_, idx) => (
                        <Col key={idx} className="d-flex justify-content-center">
                            <CardStore title={`item ${idx + 1}`}/>
                        </Col>
                    ))}
                </Row>
            </Container>    
            
            {/*CREATE ITEM MODAL*/}
            <Modal show={showModalCreate} >
                <Modal.Header closeButton>
                    <Modal.Title>Add Item</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={handleSubmit(onSubmit)} >
                        <Form.Group controlId="itemName">
                            <Form.Label>Item Name</Form.Label>
                            <Form.Control
                            type="string"
                            placeholder="Enter Item Name"
                            {...register('itemName', { required: 'Item name is required' })}
                            />
                            {errors.itemName && <p className="text-danger">{errors.itemName.message}</p>}
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}
export default Stock;