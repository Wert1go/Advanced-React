import styled from 'styled-components';
import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';

const GridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 2rem;
`;

export default function SignInPage() {
  return (
    <GridStyles>
      <SignIn />
      <SignUp />
    </GridStyles>
  );
}
