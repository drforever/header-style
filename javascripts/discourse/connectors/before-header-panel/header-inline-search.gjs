import Component from "@glimmer/component";
import { service } from "@ember/service";
import SearchMenu from "discourse/components/search-menu";
import icon from "discourse/helpers/d-icon";

export default class HeaderInlineSearch extends Component {
  @service search;
  @service site;
  @service router;

  get shouldDisplay() {
    return this.site.desktopView && !this.site.narrowDesktopView;
  }

  <template>
    {{#if this.shouldDisplay}}
      <div class="header-inline-search">
        <span class="header-inline-search__icon">
          {{icon "magnifying-glass"}}
        </span>
        <SearchMenu
          @location="header"
          @searchInputId="header-inline-search-input"
        />
      </div>
    {{/if}}
  </template>
}
