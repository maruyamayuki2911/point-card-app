// ==== クラス ====
// decodeTextを判定するクラス
export class QrDecoder {
  constructor() {
    this.handlers = new Map();
  }

  // ハンドラ登録
  register(decodeText, handler) {
    this.handlers.set(decodeText, handler);
  }

  validate(decodeText) {
    if (this.handlers.has(decodeText)) {
      return {
        valid: true,
        code: decodeText,
        action: this.handlers.get(decodeText)
      };
    }

    return {
      valid: false,
      code: decodeText,
      action: null
    }
  }
}