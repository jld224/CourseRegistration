import { Paper, Col, Container, Text } from '@mantine/core';

function Navbar() {
  return (
    <Paper padding="md" shadow="xs">
      <Container>
        <Col style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text weight={500} size="xl">Course Registration</Text>
          <div>
            <a className="menu-item" href="/courses">Courses</a>
            <a className="menu-item" href="/register">Register</a>
          </div>
        </Col>
      </Container>
    </Paper>
  )
}

export default Navbar;