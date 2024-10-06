import Block from '../../core/Block';

type UploaderProps = {
    value?: string,
    className?: string,
    name?: string,
    onChange: (files: FileList) => void
}

class Uploader extends Block<UploaderProps, object> {
  constructor(props: UploaderProps) {
    super({
      ...props,
      events: {
        change: ((event) => {
          const target = event.target as HTMLInputElement;
          const fileLabel = document.querySelector('.uploader__button');
                    fileLabel!.textContent = target.files ? target.files[0]?.name : 'Выбрать файл на компьютере'; // Показать имя файла
                    if (target.files) {
                      props.onChange(target.files);
                    }
        }),
      },
    });
  }

  render(): string {
    return `
            <div class="uploader">
                <label for="file-uploader" class="uploader__button">
                    Выбрать файл на компьютере
                </label>
                <input
                    id="file-uploader"
                    class="uploader__element{{#if className}} {{ className }}{{/if}}"
                    type="file"
                    name={{ name }}
                    value="{{#if value}}{{ value }}{{/if}}"
                />
            </div>
        `;
  }
}

export default Uploader;
