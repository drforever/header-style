import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("0.8", (api) => {
  const currentUser = api.getCurrentUser();
  if (!currentUser) return;

  // 拦截头像点击，跳转到账户设置页
  function setupAvatarRedirect() {
    const avatarButton = document.querySelector(".d-header .current-user");
    if (!avatarButton) return;

    // 检查是否已绑定
    if (avatarButton.dataset.redirectBound) return;
    avatarButton.dataset.redirectBound = "true";

    avatarButton.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      
      // 跳转到用户账户设置页
      window.location.href = `/u/${currentUser.username}/preferences/account`;
    }, true);
  }

  // 页面加载后执行
  api.onPageChange(() => {
    setTimeout(setupAvatarRedirect, 100);
  });

  // 初始执行
  setTimeout(setupAvatarRedirect, 500);
});
