import ExampleStories from '../components/example.vue'

export default {
  title: 'Example',
  component: ExampleStories,
}

export const Primary = () => ({
  components: { ExampleStories },
  template: '<ExampleStories />',
})
