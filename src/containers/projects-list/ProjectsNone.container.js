import React from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { Button } from '../../components/SpecComponents';
import {
  Container,
  ButtonSection, 
  IconContent,
  Icon,
  TextContent,
  Text,
 } from './ProjectsNone.styles';
import ICON_NEW_PROJECT from '../../assets/images/project/design_project.png'

const ProjectsNone = () => {
  const { user } = useSelector(state => state.auth);
  const history = useHistory();
  const goToNewProject = () => history.push('./projects/project');
  if (user.projects_count) return null;
  return (
    <Container>
      <IconContent>
        <Icon src={ICON_NEW_PROJECT} />
      </IconContent>
      <TextContent>
        <Text>¡Bienvenido!</Text>
        <Text>Administrar tus proyectos es muy sencillo,</Text>
        <Text>empieza creando uno.</Text> 
      </TextContent>
      <ButtonSection justify="center">
        <Button variant="primary" onClick={goToNewProject}>
          <i className="fas fa-plus" />
          &emsp;Crear nuevo
        </Button>
      </ButtonSection>
    </Container>
  );
};

export default ProjectsNone;