import React, { useState, useEffect } from "react";
import CardStore from "./CardStore";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

function Stock() {
    const [showItemModal, setShowItemModal] = useState(false); 
    const [currentItem, setCurrentItem] = useState(null);
    const [items, setItems] = useState([]);
    const { register, handleSubmit, reset, setValue, formState: { errors }, clearErrors } = useForm();

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        const getItemsUrl = 'http://localhost:8082/api/store/getItems';

        try {
            const response = await fetch(getItemsUrl);
            const data = await response.json();
            console.log(data)

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
                throw new Error(`Error : ${response.statusText}`);
            }
    
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error creating item:', error);
        }
    };

    const updateItem = async (item) => {
        const updateItemUrl = `http://localhost:8082/api/store/updateItem/${item.id}`;
    
        try {
            const response = await fetch(updateItemUrl, {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(item), 
            });
    
            if (!response.ok) {
                throw new Error(`Error : ${response.statusText}`);
            }
    
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error creating item:', error);
        }
    };

    const deleteItem = async (id) => {
        const deleteItemUrl = `http://localhost:8082/api/store/deleteItem/${id}`;
    
        try {
            const response = await fetch(deleteItemUrl, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
    
            console.log('Item deleted successfully');
            fetchItems(); // Actualiza la lista de ítems después de eliminar uno
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const cleanModal = () => {
        reset();
        clearErrors();
    }

    const handleCreate = () => {
        cleanModal();
        setShowItemModal(true);
    }

    const handleEdit = (item) => {
        setCurrentItem(item);
        setValue("name", item.name);
        setValue("description", item.description);
        setValue("price", item.price);
        setValue("stock", item.stock);
        setShowItemModal(true);
    }

   const handleDelete = async (item) => {
        await deleteItem(item.id);
    }

    const handleClose = () => {
        setShowItemModal(false);
        reset();
    }

    const onSubmit = handleSubmit( async (data) => {
        let item = {
            "name" : data.nombre,
            "description" : data.description,
            "price" : data.price,
            "stock" : data.stock
          }

        if (currentItem) {
            item.id = currentItem.id

            try {
                await updateItem(item).then(() =>{ 
                    fetchItems();
                });
            } catch (error) {
                console.error('Error updating Item:', error);
            }
        }else{

            try{
                await saveItem(item);
            } catch(error){
                console.error('Error creating item:', error);
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

            {/* ITEM CARD */}
            <Container className="d-flex justify-content-center">
                <Row xs={1} md={2} className="g-4 justify-content-center">
                    {items.map((item, idx) => (
                        <Col key={idx} className="d-flex justify-content-center">
                            <CardStore 
                                index={idx + 1}
                                title={item.name} 
                                description={item.description} 
                                price={item.price}
                                stock={item.stock}
                                onEdit={() => handleEdit(item)}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>

            {/* ITEM MODAL */}
            <Modal show={showItemModal} onHide={handleClose} contentClassName="bg-dark text-white">
                <Modal.Header closeButton>
                    <Modal.Title>Add Item</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group controlId="name">
                            <Form.Label>Item Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Item Name"
                                {...register('name', { required: 'Item name is required' })}
                            />
                            {errors.name && <p className="text-danger">{errors.name.message}</p>}
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label>Item Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Item Description"
                                {...register('description', { required: 'Item description is required' })}
                            />
                            {errors.description && <p className="text-danger">{errors.description.message}</p>}
                        </Form.Group>

                        <Form.Group controlId="price">
                            <Form.Label>Item Price</Form.Label>
                            <Form.Control
                                type="number"
                                step="0.01" 
                                placeholder="Enter Item Price"
                                {...register('price', { required: 'Item price is required', valueAsNumber: true })}
                            />
                            {errors.price && <p className="text-danger">{errors.price.message}</p>}
                        </Form.Group>

                        <Form.Group controlId="stock">
                            <Form.Label>Items in Stock</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Items in Stock"
                                {...register('stock', { required: 'Items in stock is required' })}
                            />
                            {errors.stock && <p className="text-danger">{errors.stock.message}</p>}
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
