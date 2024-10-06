import Block from '../../core/Block';
import connect from '../../core/Connect';
import ChatMenuTrigger from './chat-menu-trigger';
import ChatMenuItem from './chat-menu-item';
import { Modal } from '../modal';
import { AddUser } from '../add-user';
import { DeleteUser } from '../delete-user';

type ChatMenuProps = {
    currentChat: number,
    isOpen: boolean
};

type ChatMenuChildren = {
    MenuTrigger: ChatMenuTrigger,
    AddUserMenuItem: ChatMenuItem,
    DeleteUserMenuItem: ChatMenuItem,
    AddUserModal: Modal,
    DeleteUserModal: Modal,
}

class ChatMenu extends Block<ChatMenuProps, ChatMenuChildren> {
  init() {
    const toggleMenuBind = this.toggleMenu.bind(this);
    const addUserBind = this.addUser.bind(this);
    const deleteUserBind = this.deleteUser.bind(this);
    const AddUserModal = new Modal({ ModalBody: new AddUser({}) });
    const DeleteUserModal = new Modal({ ModalBody: new DeleteUser({}) });

    const MenuTrigger = new ChatMenuTrigger({ onClick: toggleMenuBind });
    const AddUserMenuItem = new ChatMenuItem({ onClick: addUserBind, content: 'Добавить пользователя' });
    const DeleteUserMenuItem = new ChatMenuItem({ onClick: deleteUserBind, content: 'Удалить пользователя' });

    document.addEventListener('click', (event: MouseEvent) => {
      const dropdown = document.getElementById('dropdown') as HTMLElement;

      if (dropdown) {
        const target = event.target as HTMLElement;
        const isClickInside = dropdown.contains(target);

        // Если клик не внутри dropdown, скрыть dropdown
        if (!isClickInside && dropdown.classList.contains('chat-menu__dropdown-active')) {
          // dropdown.classList.remove('chat-menu__dropdown-active');
        }
      }
    });

    this.children = {
      ...this.children,
      MenuTrigger,
      AddUserMenuItem,
      DeleteUserMenuItem,
      AddUserModal,
      DeleteUserModal,
    };
  }

  toggleMenu() {
    this.setProps({ isOpen: !this.props.isOpen });
  }

  addUser() {
    this.children.AddUserModal.show();
  }

  deleteUser() {
    this.children.DeleteUserModal.show();
  }

  render(): string {
    return `
            <div>
                <div class="chat-menu">
                    {{{ MenuTrigger }}}
                    <div id="dropdown" class="chat-menu__dropdown{{#if isOpen}} chat-menu__dropdown-active{{/if}}">
                        {{{ AddUserMenuItem }}}
                        {{{ DeleteUserMenuItem }}}
                    </div>
                </div>
                {{{ AddUserModal }}}
                {{{ DeleteUserModal }}}
            </div>
        `;
  }
}

export default connect(({ currentChat }) => ({ currentChat }))(ChatMenu);
