// Devcash bounty instance
export const state = () => ({
    connector: null
  });

  export const mutations = {
    setConnector(state, connector) {
      try {
        state.connector.uBCContract.removeAllListeners("created")
      } catch (e) { }
      state.connector = connector;
    }
  };
  
  export const actions = {
    setConnector(context, connector) {
      context.commit("setConnector", connector);
    }
  };
  