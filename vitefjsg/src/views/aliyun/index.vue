<template>
  <div class="number-auth-demo">
    <h3 class="title">一键登录</h3>
    <a id="J_loginPhone" class="submit-btn">点击按钮一键登录</a>
  </div>
</template>

<script setup lang="ts">
onMounted(() => {
  const Window = window as any;
  new Window.VConsole();

  var loginPhoneEle = document.getElementById("J_loginPhone") as any;
  var phoneNumberServer = new Window.PhoneNumberServer();

  function getToken() {
    phoneNumberServer.getLoginToken({
      // 成功回调
      success: function (res) {
        // 一键登录: 可发请求到服务端调用 GetPhoneWithToken API, 获取用户手机号, 完成登录
        console.log(res, "resss");
      },

      // 失败回调
      error: function (res) {
        console.log(res, "error");
      },
      // 授权页状态监听函数
      watch: function (status, data) {
        console.log(status, data, "data");
      },
      // 配置选项
      authPageOption: {
        navText: "一键登录",
        subtitle: "", // 副标题
        btnText: "立即登录",
        agreeSymbol: "、",
        showCustomView: true,
        customView: {
          element:
            '<div class="btn_box other" onclick="clickEvent()">切换其他登录方式</div>',
          style: ".btn_box.other{background: #fff; color: #f00}",
          js: "function clickEvent(){alert(666666)}",
        },
        privacyBefore: "我已阅读并同意",
        isDialog: true, // 是否是弹窗样式
        manualClose: true, // 是否手动关闭弹窗/授权页
      },
    });
  }

  function checkLogin(jwtToken, accessToken) {
    phoneNumberServer.checkLoginAvailable({
      accessToken: accessToken,
      jwtToken: jwtToken,
      success: function (res) {
        console.log("身份鉴权成功, 可唤起登录界面", res);
        getToken();
      },

      error: function (res) {
        console.log("身份鉴权失败", res);
      },
    });
  }

  loginPhoneEle.onclick = function () {
    // 调用之前先去用户服务端获取AccessToken和jwtToken
    var tokenInfo = {
      JwtToken:
        "eyJhbGciOiJSUzI1NiIsImtpZCI6IjAyMjBfcG5zX3VuaXFfa2V5In0.eyJqdGkiOiJ4YVlSSnhsclVCZGJvdER2TkNUN2hnIiwiaWF0IjoxNzA4NTcyNTI5LCJleHAiOjE3MDg1NzYxMjksIm5iZiI6MTcwODU3MjQ2OSwic3ViIjoiWU9VUl9TVUJKRUNUIiwiYXVkIjoiWU9VUl9BVURJRU5DRSIsImFsaVVpZCI6IjE3NTI1MDE0NTMyOTc2MjIifQ.MNFlShzzdS3dL7hOgAwz5YRwxeRxk7c4CyW70nOefQ5P5k4B8PRPxE0rRdxvM2s8J-BO_lcl8I4eQYmtC4sjDN6rcw2I0NqTUQHIS_RdpzndDXJ61K25POMb-pPKQwjfGZYmlCQVoQlCpIbuYDs1eTFCUgzTbclg_KppPWyOsI-KmepJG77YwuKY1gB7l98LuW05HNUiiIzdR5D9J3e6AbIil4q0PIGAmVElkSD7mSXv8EI4_Tn4dW4WyvOYpB3pjU9XBYUN1FRv5BOH0tBndpo9wGrY29Q9VHUDhhMQ3PVF0oEa1TtX7yMdoHq4Lscyqd-WMaqeLDcqqgjFksyH4Q",
      AccessToken:
        "Zyt8U732FWs/9Dik0enB79TH4n4trWMAc5VKFzc1f4DZf1re+uwJhoW2hY+bd2WotCHLk8EwoFVNhqUy1h4IoA==",
    };
    console.log(123);

    checkLogin(tokenInfo.JwtToken, tokenInfo.AccessToken);
  };
});
</script>
