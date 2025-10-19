# 1️⃣ TS 是什麼？

TypeScript 是 JavaScript 的「超集」，意思是：
支援 所有 JS 功能（變數、函式、物件、陣列…）
加上型別檢查 (Type)，讓程式更安全，錯誤更容易抓
讓 IDE（VSCode）能自動提示、檢查錯誤

簡單比喻：

JS 是自由畫畫，你想畫什麼都可以；
TS 則會在畫之前，先提醒你「這裡顏色不對」

# 2️⃣ TS 基本語法
變數宣告
// 1️⃣ 自動型別
let name = "John";  // TS 自動推斷 name 是 string

// 2️⃣ 明確型別
let age: number = 25;
let isActive: boolean = true;

// 3️⃣ 陣列
let fruits: string[] = ["apple", "banana"];
let scores: number[] = [100, 90, 80];

// 4️⃣ 物件
let medicine: { name: string; price: number } = { name: "Aspirin", price: 50 };

## 函式
function greet(name: string): string {
  return `Hello, ${name}`;
}
### 縮寫為 const greet = (name: string): string => `Hello, ${name}`;

let sum = (a: number, b: number): number => a + b;

## 類別 (Class)

Angular Component 就是用 class 寫的

class Medicine {
  name: string;
  price: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }

  showInfo() {
    console.log(`${this.name} costs ${this.price}`);
  }
}

# 3️⃣ 在 Angular 裡的應用

你現在看到的 successMessage、errorMessage 就是在 Component class 裡的變數：

export class MedicinesComponent {
  successMessage: string = '';
  errorMessage: string = '';

  showSuccess(msg: string) {
    this.successMessage = msg;
  }
}


HTML 可以直接用 {{ successMessage }} 讀取

TS 裡的 this.successMessage = msg 會改變畫面顯示

🔑 重點：

HTML 只會找同一個 Component class 的變數

HTML 的結構語法（`*ngIf`、`*ngFor`）能用，依賴你 imports 了 `CommonModule` / `FormsModule`