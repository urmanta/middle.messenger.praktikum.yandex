import { StoreEvents } from "./Store";
import { Props, PageComponent } from './Block';
import isEqual from '../utils/isEqual';

type StateType = {
    [key: string]: unknown;
}

export default function connect(mapStateToProps: (state: StateType) => StateType) {
    return function(Component: PageComponent) {
        return class extends Component{
            private onChangeStoreCallback: () => void;
            constructor(props: Props) {
                const store = window.store;
                // сохраняем начальное состояние
                let state: StateType = mapStateToProps(store.getState());

                super({...props, ...state});

                this.onChangeStoreCallback = () => {

                    // при обновлении получаем новое состояние
                    const newState = mapStateToProps(store.getState());

                    // если что-то из используемых данных поменялось, обновляем компонент
                    if (!isEqual(state, newState)) {
                        this.setProps({...newState});
                    }

                    // не забываем сохранить новое состояние
                    state = newState;
                }

                // подписываемся на событие
                store.on(StoreEvents.Updated, this.onChangeStoreCallback);
            }

            componentWillUnmount() {
                super.componentWillUnmount();
                window.store.off(StoreEvents.Updated, this.onChangeStoreCallback);
            }
        }
    }
}