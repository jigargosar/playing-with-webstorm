import { Button as BaseButton, Grid, styled } from 'reakit'
import React from 'react'

const Button = styled(BaseButton)`
  text-transform: uppercase;
  font-weight: 600;
`

const ButtonRounded = styled(Button)`
  border-radius: 1.25em;
  padding: 0 1.375em;
`

const ButtonLarge = styled(Button)`
  font-size: 22px;
`

const ButtonPrimary = styled(Button)`
  background-color: #fc4577;
  border: none;
  color: white;
`

export default () => (
  <Grid gap={20} justifyContent="center">
    <Button>Button</Button>
    <ButtonLarge>Large</ButtonLarge>
    <ButtonRounded>Rounded</ButtonRounded>
    <ButtonPrimary>Primary</ButtonPrimary>
    <ButtonLarge as={ButtonRounded}>Large + Rounded</ButtonLarge>
    <ButtonRounded as={ButtonPrimary}>Rounded + Primary</ButtonRounded>
    <ButtonLarge as={ButtonPrimary}>Large + Primary</ButtonLarge>
    <ButtonLarge as={[ButtonRounded, ButtonPrimary]}>
      Large + Rounded + Primary
    </ButtonLarge>
  </Grid>
)
