import { SIDEBAR_CONTEXTS } from "~/config";

export const state = () => ({
  sidebarContext: null,
  isSubmissionModalOpen: false,
  isContributeModalOpen: false
});

export const mutations = {
  setSidebarContext(state, sbContext) {
    state.sidebarContext = sbContext;
  },
  closeSubmissionModal(state) {
    state.isSubmissionModalOpen = false;
  },
  openSubmissionModal(state) {
    state.isSubmissionModalOpen = true;
  },
  closeContributeModal(state) {
    state.isContributeModalOpen = false;
  },
  openContributeModal(state) {
    state.isContributeModalOpen = true;
  }
};

export const actions = {
  setSidebarContext(context, sbContext) {
    context.commit("setSidebarContext", sbContext);
  },
  closeSubmissionModal(context) {
    context.commit("closeSubmissionModal");
  },
  openSubmissionModal(context) {
    context.commit("openSubmissionModal");
  },
  closeContributeModal(context) {
    context.commit("closeContributeModal");
  },
  openContributeModal(context) {
    context.commit("openContributeModal");
  }
};
