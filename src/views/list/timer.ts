/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-12-04 21:59:59
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-12-04 22:00:00
 * @Description:
 */
export const timerRenderAuto = () => {
  let ul = document.getElementById("content");

  // 10w 条数据
  let total = 100000;
  // 每次渲染 30 条
  let pageCount = 30;
  function loop(curTotal: number, curIndex: number) {
    if (curTotal <= 0) {
      return false;
    }
    window.requestAnimationFrame(function () {
      for (let i = 0; i < pageCount; i++) {
        let li = document.createElement("li");
        li.innerText = curIndex + i + " : " + i;
        ul?.appendChild(li);
      }
      loop(curTotal - pageCount, curIndex + pageCount);
    });
  }
  loop(total, 0);
};

export const timerRender = () => {
  let ul = document.getElementById("content");

  // 10w 条数据
  let total = 100000;
  // 每次渲染 30 条
  let pageCount = 30;
  function loop(curTotal: number, curIndex: number) {
    if (curTotal <= 0) {
      return false;
    }
    setTimeout(() => {
      //
      for (let i = 0; i < pageCount; i++) {
        let li = document.createElement("li");
        li.innerText = curIndex + i + " : " + i;
        ul?.appendChild(li);
      }
      loop(curTotal - pageCount, curIndex + pageCount);
    }, 0);
  }
  loop(total, 0);
};
