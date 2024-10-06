import { Props, PageComponent } from '../core/Block';

export default function withRouter<P extends Props>(WrappedBlock: PageComponent<P>): PageComponent<P> {
  return class extends WrappedBlock {
    constructor(props: P) {
      super({ ...props, router: window.router });
    }
  };
}
