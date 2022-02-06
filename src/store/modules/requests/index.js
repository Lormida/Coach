import getters from './getters'
import mutations from './mutations'
import actions from './actions'

export default {
  namespaced: true,
  state() {
    return {
      requests: [
        {
          coachEmail: "max@gmail.com",
          contactEmail: "123213123123",
          contactMessage: "123",
          id: '123',
        },
        {
          coachEmail: "andrew@gmail.com",
          contactEmail: "123213",
          contactMessage: "123123dfdsfdsfsdfdfadsjfkdjfkjdfkjd;afdfhdfdja;jdafj;hadfhjahja;hadfhad;hfhd;;ajhdhdfaaaaaaaaaaaaaaaaaaaaaaaaaaaadfdjfdafjadad123123dfdsfdsfsdfdfadsjfkdjfkjdfkjd;afdfhdfdja;jdafj;hadfhjahja;hadfhad;hfhd;;ajhdhdfaaaaaaaaaaaaaaaaaaaaaaaaaaaadfdjfdafjadad123123dfdsfdsfsdfdfadsjfkdjfkjdfkjd;afdfhdfdja;jdafj;hadfhjahja;hadfhad;hfhd;;ajhdhdfaaaaaaaaaaaaaaaaaaaaaaaaaaaadfdjfdafjadad123123dfdsfdsfsdfdfadsjfkdjfkjdfkjd;afdfhdfdja;jdafj;hadfhjahja;hadfhad;hfhd;;ajhdhdfaaaaaaaaaaaaaaaaaaaaaaaaaaaadfdjfdafjadad",
          id: '345'
        }
      ]
    }
  },
  getters,
  mutations,
  actions,
}