// ==== 定義ファイル読み込み ====
import { UserPoint } from './point.js';


// ==== クラス／関数 ====
// 《ユーザー情報を管理するクラス》
export class User {
  constructor(id, name, point) {
    this.id = id;
    this.name = name;
    this.point = new UserPoint(point);
  }
}