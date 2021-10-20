import { Store } from "pullstate";

export const loadingStore = new Store({
  loading: true,
  key: 0,
});

export const useLoadingState = () => loadingStore.useState();

export const setLoading = (loading: boolean) => {
  loadingStore.update((state) => {
    state.loading = loading;
  });
};
