import withSpliting from 'lib/WithSpliting'

export const About = withSpliting(() => import('./About'))
export const Home = withSpliting(() => import('./Home'))
export const Posts = withSpliting(() => import('./Posts'))
export { default as Users } from './Users'
export { default as Post } from './Post';