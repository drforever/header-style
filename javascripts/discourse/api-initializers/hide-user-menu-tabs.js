import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "hide-user-menu-tabs",

  initialize() {
    withPluginApi("0.11.1", (api) => {
      // 隐藏用户菜单中的特定标签页
      api.registerValueTransformer("user-menu-tabs", (tabs) => {
        // 需要隐藏的标签页 ID
        const hiddenTabIds = ["profile", "bookmarks", "other-notifications"];

        // 过滤掉需要隐藏的标签页
        return tabs.filter((tab) => !hiddenTabIds.includes(tab.id));
      });
    });
  },
};
