import Block from "../../core/Block";

type SearchProps = {}

type SearchChildren = {}

class Search extends Block<SearchProps, SearchChildren> {
    constructor(props: SearchProps) {
        super({
            ...props
        })
    }

    render(): string {
        return `
            <div class="search{{#if className}} {{className}}{{/if}}">
                <input
                    class="search__element" autocomplete="off" type="search"
                    title="Поиск" placeholder="Поиск" name="search" value="{{value}}"
                />
            </div>
        `
    }
}

export default Search;
