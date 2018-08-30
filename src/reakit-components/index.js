import { Button as BaseButton, Flex, Group, styled } from 'reakit'

export { Flex, Group }

// https://material.io/tools/color/#!/?view.left=0&view.right=0&primary.color=03A9F4&secondary.color=1976D2
export const primary = '#03a9f4'
export const primaryDark = '#007ac1'
export const primaryLight = '#67daff'
export const secondary = '#1976d2'
export const secondaryLight = '#63a4ff'
export const secondaryDark = '#004ba0'
export const highlightColor = 'lightyellow'

export const Button = styled(BaseButton)`
  // text-transform: uppercase;
  color: ${primary};
  // font-size: 14px;
  height: 2em;
`

export const FlexCenter = styled(Flex)`
  align-items: center;
`

// export const ButtonRounded = styled(Button)`
//   border-radius: 1.25em;
//   padding: 0 1.375em;
// `
//
// export const ButtonLarge = styled(Button)`
//   font-size: 22px;
// `
//
// export const ButtonPrimary = styled(Button)`
//   background-color: #fc4577;
//   border: none;
//   color: white;
// `
//
// export default () => (
//   <Grid gap={20} justifyContent="center">
//     <Button>Button</Button>
//     <ButtonLarge>Large</ButtonLarge>
//     <ButtonRounded>Rounded</ButtonRounded>
//     <ButtonPrimary>Primary</ButtonPrimary>
//     <ButtonLarge as={ButtonRounded}>Large + Rounded</ButtonLarge>
//     <ButtonRounded as={ButtonPrimary}>Rounded + Primary</ButtonRounded>
//     <ButtonLarge as={ButtonPrimary}>Large + Primary</ButtonLarge>
//     <ButtonLarge as={[ButtonRounded, ButtonPrimary]}>
//       Large + Rounded + Primary
//     </ButtonLarge>
//   </Grid>
// )
