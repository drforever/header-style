import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "search-box-click",

  initialize() {
    withPluginApi("0.11.1", () => {
      // 使用事件委托，绑定在 document 上，避免 DOM 重新渲染后失效
      document.addEventListener("click", handleSearchDropdownClick);

      // 使用 MutationObserver 监听 DOM 变化，自动添加 placeholder
      const observer = new MutationObserver(() => {
        ensurePlaceholder();
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });

      // 初始化
      ensurePlaceholder();
    });

    function ensurePlaceholder() {
      const searchDropdown = document.querySelector(
        ".d-header .search-dropdown"
      );
      if (
        searchDropdown &&
        !searchDropdown.querySelector(".search-placeholder-text")
      ) {
        const placeholder = document.createElement("span");
        placeholder.className = "search-placeholder-text";
        placeholder.textContent = "搜索…";
        searchDropdown.appendChild(placeholder);
      }
    }

    function handleSearchDropdownClick(e) {
      // 查找点击是否在 .search-dropdown 内
      const searchDropdown = e.target.closest(
        ".d-header .search-dropdown"
      );
      if (!searchDropdown) {
        return;
      }

      // 如果点击的就是搜索按钮或其子元素，让原生事件自然处理
      const button = searchDropdown.querySelector("#search-button");
      if (button && (e.target === button || button.contains(e.target))) {
        return;
      }

      // 点击的是搜索框的其他区域（placeholder 文本、空白区域等），触发搜索按钮
      if (button) {
        e.preventDefault();
        e.stopPropagation();
        button.click();
      }
    }
  },
};
