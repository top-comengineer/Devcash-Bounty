// Devcash bounty instance
export const state = () => ({
    connector: null
  });

  export const mutations = {
    setConnector(state, connector) {
      state.connector = connector;
    }
  };
  
  export const actions = {
    setConnector(context, connector) {
      context.commit("setConnector", connector);
    }
  };
  