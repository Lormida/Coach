import getters from './getters.js'
import mutations from './mutations.js'
import actions from './actions.js'

export default {
  namespaced: true,
  state() {
    return {
      coaches: [
        {
          id: 'c1',
          firstName: 'Maximilian',
          lastName: 'Schwarzmüller',
          areas: ['frontend', 'backend', 'career'],
          description:
            "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
          hourlyRate: 30,
          gender: 'male',
          email: 'max@gmail.com'
        },
        {
          id: 'c2',
          firstName: 'Julie',
          lastName: 'Jones',
          areas: ['frontend', 'career'],
          description:
            'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
          hourlyRate: 30,
          gender: 'female',
          email: 'julie@gmail.com'
        },
        {
          id: 'c3',
          firstName: 'Andrew',
          lastName: 'Ananenko',
          areas: ['frontend', 'backend'],
          description:
            'I am Andrew and am not developer in a any tech company (thus far) ...',
          hourlyRate: 0,
          gender: 'male',
          email: 'andrew@gmail.com'
        }
      ]
    }
  },
  getters,
  mutations,
  actions,
}