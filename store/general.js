import { SIDEBAR_CONTEXTS } from '~/config'

export const state = () => ({
    sidebarContext: null
  });
  
  export const mutations = {
    setSidebarContext(state, sbContext) {
      state.sidebarContext = sbContext;
    }
  };
  
  export const actions = {
    setSidebarContext(context, sbContext) {
      context.commit("setSidebarContext", sbContext);
    }
  };
  