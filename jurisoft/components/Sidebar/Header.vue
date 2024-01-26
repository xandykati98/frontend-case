<template>
    <div class="container-header">
        <section>
            <div class="container-logo-intro">
                <div class="logo">
                    <SvgIcon name="logo" height="40" width="40"/>
                </div>
                <div class="intro">
                    <h1>Jurisoft</h1>
                    <h3>Marketing Jurídico</h3>
                </div>
            </div>
            <div class="caret">
                <svg-icon name="caret-down" width="24" height="24"/>
            </div>
        </section>
        <div class="divider"></div>
    </div>
</template>
<style lang="scss" scoped>
.container-header {
    width: 100%;
    height: 88px;
    padding: 12px;
    padding-bottom: 0px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    & section {
        width: 100%;
        margin: 12px;
        display: flex;
        justify-content: space-between;
        & .container-logo-intro {
            display: flex;
            justify-content: flex-start;
            & .logo {
                margin-right: 12px;
            }
        }
        & .intro {
            display: flex;
            flex-wrap: wrap;
            align-items: flex-start;
            height: 100%;
            flex-direction: column;
        }
        & .intro h1 {
            color: $text-highlight;
            font-weight: 500;
            font-size: 14px;
            margin: unset;
            margin-bottom: 4px;
            line-height: 20px; /* 142.857% */
            letter-spacing: -0.084px;
        }
        & .intro h3 {
            color: $text-default;
            font-weight: 400;
            font-size: 12px;
            margin: unset;
            line-height: 16px;
        }
        & .caret {
            width: 24px;
            height: 24px;
            display: flex;
            justify-content: center;
            align-items: center;
            align-self: center;
            cursor: pointer;
        }
    }
}
.divider {
    border-top: 1px solid #E2E4E9;
    height: 0px;
    width: 232px;
    display: flex;
    
}
</style>