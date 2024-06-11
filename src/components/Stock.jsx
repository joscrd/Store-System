import React, { useState, useEffect } from "react";
import CardStore from "./CardStore";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

function Stock() {
    const [showModalCreate, setShowModalCreate] = useState(false); 
    const [row, setRow] = useState([]);
    const [items, setItems] = useState([]);
    const { register, handleSubmit, reset, formState: { errors }, clearErrors } = useForm();

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        const getItemsUrl = 'http://localhost:8082/api/store/getItems';

        try {
            const response = await fetch(getItemsUrl);
            const data = await response.json();

            setItems(data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    }

    const saveItem = async (item) => {
        const saveItemUrl = 'http://localhost:8082/api/store/saveItem';
    
        try {
            const response = await fetch(saveItemUrl, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(item), 
            });
    
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
    
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error al guardar el ítem:', error);
        }
    };

    const cleanModal = () => {
        reset();
        clearErrors();
    }

    const handleCreate = () => {
        setRow([]);
        cleanModal();
        setShowModalCreate(true);
    }

    const handleClose = () => {
        setShowModalCreate(false);
        reset();
    }

    const onSubmit = handleSubmit( async (data) => {
        let item = {};

        if (row.id == null) {

            item = {
              "name" : data.nombre,
              "description" : data.description,
              "price" : data.price,
              "stock" : data.stock
            }
            try{
                await saveItem(item);
            } catch(error){
                console.error('Error al guardar el ítem:', error);
            }
            
          } 

        console.log('Submitted data:', data);
        handleClose();
    })

    return (
        <>
            <div className='addItemBtn d-flex justify-content-center my-4'>
                <Button variant="secondary" onClick={handleCreate} style={{ width: '200px', height: '50px' }}>
                    Add Item
                </Button>
            </div>

            <Container className="d-flex justify-content-center">
                <Row xs={1} md={2} className="g-4 justify-content-center">
                    {items.map((item, idx) => (
                        <Col key={idx} className="d-flex justify-content-center">
                            <CardStore title={item.name} description={item.description} /> {/* Ajusta esto según los datos de tu item */}
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
