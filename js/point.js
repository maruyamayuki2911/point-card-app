// ==== クラス／関数 ====
export class UserPoint {
  constructor(point) {
    this.point = point;
  }

  // ポイントを加算
  addPoint(amount) {
    this.point += amount;
  }

  // ポイントを減算
  subtractPoint(amount) {
    this.point -= amount;
  }

  // 現在のポイントを返す
  getPoint() {
    return this.point;
  }
}