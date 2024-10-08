import Block, { Props } from '../../core/Block';
import { PageTitle } from '../page-title';
import { Button } from '../button';
import { Uploader } from '../uploader';
import { changeAvatar } from '../../services/profile';

type AvatarChangeProps = {
    onChange: (url: string) => void
}

type AvatarChangeChildren = {
    AddUserTitle: PageTitle,
    AddUserField: Uploader,
    AvatarChangeButton: Button
}

export default class AvatarChange extends Block<AvatarChangeProps, AvatarChangeChildren> {
  files: FileList | undefined;

  constructor(props: Props) {
    super(props);
  }

  init() {
    const saveChangedAvatarBind = this.saveChangedAvatar.bind(this);
    const onChangeUploaderBind = this.onChangeUploader.bind(this);

    const AddUserTitle = new PageTitle({ title: 'Загрузите файл' });
    const AddUserField = new Uploader({ name: 'chat-name', onChange: onChangeUploaderBind });
    const AvatarChangeButton = new Button({ label: 'Поменять', onClick: saveChangedAvatarBind, disabled: true });

    this.children = {
      ...this.children,
      AddUserTitle,
      AddUserField,
      AvatarChangeButton,
    };
  }

  onChangeUploader(files: FileList) {
    this.files = files;
    this.children.AvatarChangeButton.setProps({ disabled: !this.files.length });
  }

  saveChangedAvatar() {
    const formData = new FormData();
    if (this.files) {
      const file = this.files[0];
      formData.append('avatar', file);
      changeAvatar(formData).then((data) => {
        this.props.onChange(data.avatar);
        const parentNode = this.element?.parentNode as HTMLElement;
        parentNode.style.display = 'none';
      }).catch((error) => {
        throw new Error(error);
      });
    }
  }

  render(): string {
    return (
      `
                <div class="avatar-change">
                    {{{ AddUserTitle }}}
                    {{{ AddUserField }}}
                    {{{ AvatarChangeButton }}}
                </div>
            `
    );
  }
}
