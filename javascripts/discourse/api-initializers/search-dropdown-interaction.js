import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.14.0", (api) => {
  // 增强搜索框交互体验 - 微博风格的搜索体验
  api.onPageChange(() => {
    // 获取搜索输入框和容器
    const searchInput = document.getElementById("header-search-input");
    const searchDropdown = document.querySelector(".d-header .search-dropdown");
    const searchMenuContainer = document.querySelector(".search-menu-container");
    
    if (!searchInput || !searchDropdown) return;

    // 保存原始的 onDocumentPress 事件处理
    let previousListeners = new Set();

    // 1. 当输入框获得焦点时，立即展开搜索浮层
    // 这会触发原生的 SearchMenu.open() 方法
    searchInput.addEventListener("focus", () => {
      // 只是标记焦点状态，不干扰原生搜索组件
      searchDropdown.classList.add("focused");
    });

    // 2. 当输入框失去焦点时，移除焦点样式
    // 注意：原生的 SearchMenu.close() 会在合适的时机自动调用
    searchInput.addEventListener("blur", () => {
      searchDropdown.classList.remove("focused");
    });

    // 3. 改进搜索框的视觉反馈
    // 点击搜索框任何地方都能聚焦输入框（除了按钮）
    searchDropdown.addEventListener("click", (e) => {
      const isButton = e.target.closest(".btn") || 
                       e.target.closest(".search-icon") ||
                       e.target.closest(".d-icon");
      
      if (!isButton && e.target !== searchInput) {
        searchInput.focus();
      }
    });
  });
});
