import { Card, Button }from 'react-bootstrap';

function CardStore({ index, title, description, price, stock, onEdit, onDelete }) {
  return (
    <>
      <Card bg="dark" text="white" border="secondary" style={{ width: '18rem' }}>
        <Card.Header>{index}</Card.Header>
        <Card.Body>
          <Card.Title>Item: {title}</Card.Title>
          <Card.Text>
            <div>
              <span>Description: {description}</span><br />
              <span>Price: {price}</span><br />
              <span>Stock: {stock}</span><br />
            </div>
          </Card.Text>

          <Button variant="secondary" size="sm" className="me-2" onClick={onEdit}>Edit</Button>
          <Button variant="outline-danger" size="sm" onClick={onDelete}>Delete</Button>
        </Card.Body>
      </Card>
      <br />
    </>
  );
}

export default CardStore;