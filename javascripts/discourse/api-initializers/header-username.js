import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("0.8", (api) => {
  const currentUser = api.getCurrentUser();
  if (!currentUser) return;

  // 添加用户名到头像后面
  function addUsername() {
    const userButton = document.querySelector(".d-header .current-user");
    if (!userButton) return;

    // 检查是否已添加
    if (userButton.parentElement.querySelector(".header-username")) return;

    // 创建用户名元素
    const usernameSpan = document.createElement("span");
    usernameSpan.className = "header-username";
    usernameSpan.textContent = currentUser.username;

    // 插入到头像按钮后面
    userButton.insertAdjacentElement("afterend", usernameSpan);
  }

  // 页面加载后执行
  api.onPageChange(() => {
    setTimeout(addUsername, 100);
  });

  // 初始执行
  setTimeout(addUsername, 500);
});
