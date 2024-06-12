import { Card, Button }from 'react-bootstrap';

function CardStore({ index, title, description, price, stock, onEdit }) {
  return (
    <>
      <Card bg="dark" text="white" border="secondary" style={{ width: '18rem' }}>
        <Card.Header>{index}</Card.Header>
        <Card.Body>
          <Card.Title>Item: {title}</Card.Title>
          <Card.Text>
          <div>Description: {description}</div>
          <div>Price: {price}</div>
          <div>Stock: {stock}</div>
          </Card.Text>

          <Button variant="secondary" onClick={onEdit}>Edit</Button>
        </Card.Body>
      </Card>
      <br />
    </>
  );
}

export default CardStore;