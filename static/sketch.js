function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL); // 画面全体に3Dキャンバスを作成
}

function draw() {
  background(0); // 背景を黒に設定

  let spacing = 500; // 形状の間隔を設定（碁盤の目のマス目のサイズ）

  for (let y = -1000; y <= 1000; y += spacing) {
    for (let x = -1000; x <= 1000; x += spacing) {
      push(); // 現在の状態を保存

      translate(x, y, 0); // (x, y) 座標に移動
      stroke(255); // 枠線の色を白に設定
      noFill(); // 塗りつぶしなし

      rotateX(frameCount * 0.01); // X軸で回転
      rotateY(frameCount * 0.01); // Y軸で回転

      // 位置ごとに形状を順番に配置
      if ((int(x / spacing) + int(y / spacing)) % 3 === 0) {
        box(200); // 立方体
      } else if ((int(x / spacing) + int(y / spacing)) % 3 === 1) {
        sphere(150); // 球体
      } else {
        cone(150, 200); // 円錐
      }

      pop(); // 状態を元に戻す
    }
  }
}
