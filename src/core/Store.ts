import EventBus from './EventBus';

export enum StoreEvents {
    Updated = 'Updated'
}

export type StateType = {
    [key: string]: unknown;
}

class Store extends EventBus {
  private static __instance: Store | null = null;

  private state: StateType = {};

  constructor(defaultState: StateType) {
    if (Store.__instance) {
      return Store.__instance;
    }
    super();

    this.state = defaultState;
    this.set(defaultState);

    Store.__instance = this;
  }

  public getState() {
    return this.state;
  }

  public set(nextState: StateType) {
    const prevState = { ...this.state };

    this.state = { ...this.state, ...nextState };

    this.emit(StoreEvents.Updated, prevState, nextState);
  }
}

export default Store;
