
<template>
    <div class="container-sidebar">
      <div class="top">
        <SidebarHeader/>
        <section class="sidebar-lists">
          <SidebarMain/>
          <SidebarFavs/>
        </section>
      </div>
      <div class="bottom">
        <SidebarExtra/>
        <SidebarProfile/>
      </div>
    </div>
</template>
<style lang="scss">
  .list-title {
    text-transform: uppercase;
    padding: 4px;
    width: 100%;
    color: #868C98;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
    letter-spacing: 0.48px;
    text-transform: uppercase;
  }
  .sidebar-lists {
    display: flex;
    padding: 20px 20px 16px 20px;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    flex: 1 0 0;
    align-self: stretch;
    & > section {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 6px;
      align-self: stretch;
    }
  }
  .nav-group {
    list-style: none;
    padding: 0px;
    margin: 0px;
    width: 100%;
    position: relative;
  }
</style>
<style lang="scss" scoped>
  .container-sidebar {
    box-shadow: 1px 0px 0px 0px #E2E4E9;
    height: 100vh;
    display: flex;
    flex-wrap: wrap;
  }
  .bottom {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    align-content: flex-end;
  }
</style>