import { database } from './firebase-config.js';
import { ref, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { CATEGORIES, PLACES } from './data.js';

export async function migrateDataToFirebase() {
    try {
        console.log("Bắt đầu đẩy dữ liệu lên Firebase...");
        
        // Push Categories
        const catRef = ref(database, 'categories');
        await set(catRef, CATEGORIES);
        console.log("✅ Đã tải lên Danh mục.");
        
        // Convert PLACES array to an object with IDs as keys for better Realtime DB structure
        const placesObj = {};
        PLACES.forEach(place => {
            placesObj[place.id] = place;
        });
        
        const placesRef = ref(database, 'places');
        await set(placesRef, placesObj);
        console.log("✅ Đã tải lên Địa điểm.");
        
        alert("Chuyển đổi dữ liệu thành công! Vui lòng làm mới trang.");
    } catch (e) {
        console.error("Lỗi chuyển đổi dữ liệu:", e);
        alert("Lỗi: " + e.message);
    }
}

// Make it available in console
window.migrateDataToFirebase = migrateDataToFirebase;
