<template>
  <div>
    <h3>输入尺寸判断矩形1与2能否放进3中(360度的旋转角)</h3>

    <label for="width1">矩形1 宽:</label>
    <input type="number" id="width1" value="200" />
    <label for="height1">长:</label>
    <input type="number" id="height1" value="100" />
    <br />

    <label for="width2">矩形2 宽:</label>
    <input type="number" id="width2" value="100" />
    <label for="height2">长:</label>
    <input type="number" id="height2" value="200" />
    <br />

    <label for="width3">矩形3 宽:</label>
    <input type="number" id="width3" value="300" />
    <label for="height3">长:</label>
    <input type="number" id="height3" value="300" />
    <br />

    <label for="width3">精度:</label>
    <input type="number" id="jingdu" value="0.02" />
    <br />

    <button @click="checkRectangles">获取结果</button>

    <div id="tishi"></div>

    <div id="canvas"></div>
  </div>
</template>

<script setup>
function checkRectangles() {
  document.querySelector("#tishi").innerHTML = ''
  const width1 = parseFloat(document.getElementById("width1").value);
  const height1 = parseFloat(document.getElementById("height1").value);
  const width2 = parseFloat(document.getElementById("width2").value);
  const height2 = parseFloat(document.getElementById("height2").value);
  const width3 = parseFloat(document.getElementById("width3").value);
  const height3 = parseFloat(document.getElementById("height3").value);

  const result = canRectanglesFit(
    width1,
    height1,
    width2,
    height2,
    width3,
    height3
  );

  updateCanvas(width1, height1, width2, height2, width3, height3, result);
}

function canRectanglesFit(width1, height1, width2, height2, width3, height3) {
  const rect1 = { width: width1, height: height1 };
  const rect2 = { width: width2, height: height2 };
  const rect3 = { width: width3, height: height3 };

  const jingdu = parseFloat(document.getElementById("jingdu").value);
  let a = 0;

  for (let angle1 = 0; angle1 <= 360 / jingdu; angle1++) {
    for (let angle2 = 0; angle2 <= 360 / jingdu; angle2++) {
      a++;
      const boundingBox1 = getRotatedBoundingBox(rect1, angle1 * jingdu);
      const boundingBox2 = getRotatedBoundingBox(rect2, angle2 * jingdu);

      if (canFitInside(boundingBox1, boundingBox2, rect3)) {
        document.querySelector("#tishi").innerHTML =
          "可以! " +
          "矩形1旋转角: " +
          angle1 * jingdu +
          "; 矩形2旋转角: " +
          angle2 * jingdu +
          "; 计算了" +
          a +
          "次";

        return {
          boundingBox1,
          boundingBox2,
          angle1: angle1 * jingdu,
          angle2: angle2 * jingdu,
        };
      }
    }
  }

  document.querySelector("#tishi").innerHTML =
    "360度 精度为" + jingdu + "度不可以!" + "; 计算了" + a + "次";

  return false;
}

function getRotatedBoundingBox(rect, angle) {
  const radians = (angle * Math.PI) / 180;
  const cos = Math.abs(Math.cos(radians));
  const sin = Math.abs(Math.sin(radians));

  const width = rect.width * cos + rect.height * sin;
  const height = rect.width * sin + rect.height * cos;

  return { width, height };
}

function canFitInside(box1, box2, rect) {
  return (
    (box1.width + box2.width <= rect.width &&
      Math.max(box1.height, box2.height) <= rect.height) ||
    (box1.width + box2.width <= rect.height &&
      Math.max(box1.height, box2.height) <= rect.width) ||
      
    (box1.width + box2.height <= rect.width &&
      Math.max(box1.height, box2.width) <= rect.height) ||
    (box1.width + box2.height <= rect.height &&
      Math.max(box1.height, box2.width) <= rect.width) ||

    (box1.height + box2.width <= rect.width &&
      Math.max(box1.width, box2.height) <= rect.height) ||
    (box1.height + box2.width <= rect.height &&
      Math.max(box1.width, box2.height) <= rect.width)
  );
}

function updateCanvas(
  width1,
  height1,
  width2,
  height2,
  width3,
  height3,
  result
) {
  const canvas = document.getElementById("canvas");
  canvas.innerHTML = "";

  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", "1200");
  svg.setAttribute("height", "400");

  const rect3 = document.createElementNS(svgNS, "rect");
  rect3.setAttribute("x", "600");
  rect3.setAttribute("y", "0");
  rect3.setAttribute("width", width3);
  rect3.setAttribute("height", height3);
  rect3.setAttribute("fill", result ? "lightgreen" : "pink");
  svg.appendChild(rect3);

  const rect1 = document.createElementNS(svgNS, "rect");
  rect1.setAttribute("x", "600");
  rect1.setAttribute("y", "0");
  rect1.setAttribute("width", width1);
  rect1.setAttribute("height", height1);
  rect1.setAttribute("fill", "blue");
  if (result) {
    rect1.setAttribute("transform", `rotate(${result.angle1} 600 0)`);
  }
  svg.appendChild(rect1);

  const rect2 = document.createElementNS(svgNS, "rect");
  rect2.setAttribute("x", "600");
  rect2.setAttribute("y", "0");
  rect2.setAttribute("width", width2);
  rect2.setAttribute("height", height2);
  rect2.setAttribute("fill", "#33333380");
  svg.appendChild(rect2);
  if (result) {
    rect1.setAttribute("transform", `rotate(${result.angle2} 600 0)`);
  }

  canvas.appendChild(svg);
}
</script>

<style scoped lang="less">
#canvas {
  border: 1px solid #ccc;
  height: 400px;
  width: 1200px;
}
</style>
