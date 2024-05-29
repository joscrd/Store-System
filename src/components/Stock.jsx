import CardStore from "./CardStore";
import { Container, Row, Col, Button } from "react-bootstrap";

function Stock() {



    return (
        <>
            <div className='addItemBtn d-flex justify-content-center'>
                <Button>Add Item</Button>
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
        </>
    );
}
export default Stock;