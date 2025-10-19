// 🧠 匯入 Angular 內建功能（模組）
// Component：讓這個檔案能變成「可重複使用的元件」
// OnInit：是一個生命週期介面，讓我們在畫面初始化時執行程式
// HttpClient：用來向 Django（或其他伺服器）發送 HTTP 請求，例如 GET / POST / PATCH / DELETE
// FormsModule：讓 [(ngModel)] 雙向資料綁定可以在 HTML 裡使用
// CommonModule：提供 *ngIf、*ngFor 等常用指令
import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



// 🧩 定義介面（類似 Django model 的「型別描述」）
// 這裡的 Medicine 代表每筆藥品的資料格式
interface Medicine {
  id: number;
  name: string;
  category: string;
  price: number; // 注意：這是價格，不是庫存
}


// 🧱 用 @Component 宣告這是一個「獨立元件」(standalone component)
@Component({
  selector: 'app-medicines',              // HTML 中的標籤名稱：<app-medicines></app-medicines>
  standalone: true,                       // ✅ Angular 19 推薦用法，不用 AppModule
  imports: [CommonModule, FormsModule],   // 匯入本元件要用的模組
  templateUrl: './medicines.component.html', // 對應的 HTML 模板
})


export class MedicinesComponent implements OnInit {
  // 🧾 藥品清單：用來存放從後端取得的所有藥品資料
  medicines: Medicine[] = [];
  // 🔍 搜尋關鍵字：配合 HTML 的輸入框，實作即時搜尋功能
  searchTerm: string = '';
  // ✏️ 被選中要編輯的藥品
  selectedMedicine: Medicine | null = null;
  // ✅ 顯示操作成功訊息（例如新增、修改、刪除成功）
  successMessage: string = '';
  // ➕ 用來新增藥品的暫存資料物件
  newMedicine: Partial<Medicine> = { name: '', category: '', price: 0 };
  // ⚠️ 額外屬性：錯誤提示與載入狀態
  errorMessage: string = '';
  loading: boolean = false;


  // 🌐 後端 API 的基本網址（這裡是 Django 伺服器的端點）
  // private apiBase = 'http://127.0.0.1:8000/api/medicines/';

  // 🧩 建構子 (constructor)
  // Angular 會在建立這個元件時自動呼叫這裡
  // HttpClient 是依賴注入（Dependency Injection）的一部分
  // constructor(private http: HttpClient) {}
  constructor() {}

  // 🔄 OnInit：畫面初始化（元件載入）時自動執行這個方法
  ngOnInit() {
    this.loadMedicines(); // 一開始載入藥品清單
  }

  // 📥 從後端載入藥品清單
  loadMedicines() {

    // 由於 github 非雲端只能用靜態的，先用一個代替
    this.medicines = [
      { id: 1, name: '阿莫西林', category: '抗生素', price: 100 },
      { id: 2, name: '布洛芬', category: '止痛', price: 50 }
    ];

    // 用 GET 請求 Django 的 API （暫時註解）
    // this.http.get<Medicine[]>(this.apiBase).subscribe({
    //   next: (data) => (this.medicines = data), // 取得資料後放進 medicines 陣列
    //   error: (err) => console.error('取得藥品資料錯誤', err), // 若發生錯誤就印出錯誤
    // });
  }


  // 🔍 篩選藥品清單（即時搜尋）
  get filteredMedicines(): Medicine[] {
    if (!this.searchTerm) return this.medicines; // 若沒輸入關鍵字，就顯示全部
    return this.medicines.filter((med) =>
      med.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }


  // ✏️ 開始編輯某筆藥品
  editMedicine(med: Medicine) {
    // 複製一份資料到 selectedMedicine（避免直接修改原陣列）
    this.selectedMedicine = { ...med };
  }


  // 💾 儲存編輯後的藥品
  saveEdit() {
    if (!this.selectedMedicine) return; // 沒有選中的就不做事

    // 🚫 防呆：名稱，唯一性
    const isDuplicate = this.medicines.some(
      (m) =>
        m.name.trim() === this.selectedMedicine!.name.trim() &&
        m.id !== this.selectedMedicine!.id
    );
    if (isDuplicate) {
      alert(`名稱「${this.selectedMedicine!.name}」已存在，請輸入不同名稱`);
      return;
    }

    // ⚡ 方法	功能	回傳類型
    // .some()	是否「至少一筆」符合條件	Boolean
    // .every()	是否「全部」都符合條件	Boolean
    // .filter()	回傳「所有符合」條件的陣列	Array
    // .find()	回傳「第一筆」符合條件的元素	Object or undefined

    // 簡易前端互動
    // 🟢 前端假資料更新
    const index = this.medicines.findIndex((m) => m.id === this.selectedMedicine!.id);
    if (index !== -1) this.medicines[index] = { ...this.selectedMedicine! };
    // ...物件 是 TypeScript/JavaScript 的展開運算子（spread operator），等同 copy，不會直接改到原本物件

    // 清空編輯狀態
    this.selectedMedicine = null;

    // // 用 PATCH 請求更新 Django 的資料
    // const url = `${this.apiBase}${this.selectedMedicine.id}/`; // 組成 PATCH 的網址
    //
    // this.http.patch<Medicine>(url, this.selectedMedicine).subscribe({
    //   next: (updated) => {
    //     // 找出更新的那筆藥品在陣列中的位置
    //     // 用新的資料覆蓋舊的
    //     // 清空編輯狀態
    //     // 顯示成功訊息（3 秒後自動消失）
    //     const index = this.medicines.findIndex((m) => m.id === updated.id);
    //     if (index !== -1) this.medicines[index] = updated;
    //     this.selectedMedicine = null;
    //     this.successMessage = '✔️ 已成功儲存修改！';
    //     setTimeout(() => (this.successMessage = ''), 3000);
    //   },
    //   error: (err) => console.error('更新失敗', err),
    // });
  }


  // 🗑️ 刪除某筆藥品
  deleteMedicine(med: Medicine) {
    if (!confirm(`確定要刪除 ${med.name} 嗎？`)) return; // 跳出確認視窗

    // 🟢 前端資料刪除
    this.medicines = this.medicines.filter((m) => m.id !== med.id);
    // (m) => { m.id !== med.id; } 除了這筆，其他都收集，之後再取代成 medicines

    // 顯示刪除成功訊息
    this.successMessage = `🗑️ 已刪除「${med.name}」`;
    setTimeout(() => (this.successMessage = ''), 3000);

    // 後端 DELETE 請求（暫時註解）
    // const url = `${this.apiBase}${med.id}/`;

    // this.http.delete(url).subscribe({
    //   next: () => {
    //     // 從陣列中移除刪除的藥品
    //     this.medicines = this.medicines.filter((m) => m.id !== med.id);

    //     // 顯示刪除成功訊息
    //     this.successMessage = `🗑️ 已刪除「${med.name}」`;
    //     setTimeout(() => (this.successMessage = ''), 3000);
    //   },
    //   error: (err) => console.error('刪除失敗', err),
    // });
  }

  // ➕ 新增藥品
  addMedicine() {
    // 檢查基本欄位
    if (!this.newMedicine.name || !this.newMedicine.category) {
      alert('名稱與類別不能為空');
      return;
    }

  // 🚫 防呆：名稱，唯一性
  const isDuplicate = this.medicines.some(
    (m) => m.name.trim() === this.newMedicine.name!.trim()
  );
  if (isDuplicate) {
    alert(`名稱「${this.newMedicine.name}」已存在，請輸入不同名稱`);
    return;
  }


    // 🟢 前端資料新增
    const newId = this.medicines.length > 0
      ? Math.max(...this.medicines.map(m => m.id)) + 1
      : 1;
    // 拆解說明：
    // this.medicines.map(m => m.id) -> 把所有藥品的 id 取出，變成陣列
    // 例如 [1, 2, 5]
    // ... 展開運算子，把陣列拆成單獨數字傳給 Math.max
    // Math.max(1, 2, 5) → 5
    // 三元運算子（ternary operator）
    // const newId = 判斷式 ? 條件為 true 的值 : 條件為 false 的值

    const created: Medicine = { id: newId, ...this.newMedicine } as Medicine;
    // 建立一個物件，把新 id 加進 newMedicine 的屬性裡
    // { id: newId, ...this.newMedicine }

    // as Medicine
    // 告訴 TypeScript：「這個物件符合 Medicine 型別」
    // 避免型別錯誤（例如 newMedicine 是 Partial<Medicine>，可能缺少某些屬性）

    this.medicines.push(created);

    // 提示訊息 > 顯示
    this.successMessage = `➕ 已新增「${created.name}」`;
    setTimeout(() => (this.successMessage = ''), 3000);

    // 輸入欄位 > 初始化
    this.newMedicine = { name: '', category: '', price: 0 };


    // 用 POST 傳送新藥品資料給 Django
    // this.http.post<Medicine>(this.apiBase, this.newMedicine).subscribe({
    //   next: (created) => {
    //     // 把新增的藥品加入 medicines 陣列中
    //     this.medicines.push(created);

    //     // 顯示提示訊息
    //     this.successMessage = `➕ 已新增「${created.name}」`;
    //     setTimeout(() => (this.successMessage = ''), 3000);

    //     // 重設輸入欄位
    //     this.newMedicine = { name: '', category: '', price: 0 };
    //   },
    //   error: (err) => console.error('新增失敗', err),
    // });
  }
}
