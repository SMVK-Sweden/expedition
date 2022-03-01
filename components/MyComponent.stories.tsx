import MyComponent from './MyComponent'

export default {
  title: 'MyComponent',
  component: MyComponent,
}

export const MyComponentStory = () => (
  <MyComponent
    title="en titel till min komponent"
    someText="lite text lalalalala"
  />
)
