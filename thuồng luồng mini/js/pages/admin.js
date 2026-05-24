import { PLACES, CATEGORIES } from '../data.js';

export function renderAdminPage() {
    if (!window.currentUser || !window.isAdmin) {
        return `
            <div class="page-container" style="display: flex; align-items: center; justify-content: center; min-height: 70vh;">
                <div class="empty-state" style="text-align: center;">
                    <div class="empty-state__icon" style="font-size: 4rem;">🔒</div>
                    <h2 class="empty-state__title">Truy cập bị từ chối</h2>
                    <p class="empty-state__text">Bạn không có quyền truy cập trang Quản trị.</p>
                    <button class="btn btn--primary" style="margin-top: var(--space-4);" onclick="window.location.hash='#/'">Về trang chủ</button>
                </div>
            </div>
        `;
    }

    setTimeout(() => {
        window.loadAdminData();
    }, 100);

    return `
        <div class="admin-dashboard">
            <!-- Sidebar -->
            <aside class="admin-sidebar">
                <div class="admin-sidebar__header">
                    <div class="admin-user">
                        <img src="${window.currentUser.photoURL || 'https://ui-avatars.com/api/?name=Admin'}" alt="Admin" class="admin-user__avatar">
                        <div class="admin-user__info">
                            <div class="admin-user__name">${window.currentUser.displayName || 'Admin'}</div>
                            <div class="admin-user__role">Quản trị viên</div>
                        </div>
                    </div>
                </div>
                <nav class="admin-nav">
                    <button class="admin-nav__item active" onclick="window.switchAdminTab('places', this)">
                        <i data-lucide="map-pin"></i> Địa điểm
                    </button>
                    <button class="admin-nav__item" onclick="window.migrateDataToFirebase()">
                        <i data-lucide="upload-cloud"></i> Đồng bộ CSDL
                    </button>
                </nav>
            </aside>

            <!-- Main Content -->
            <main class="admin-main">
                <div class="admin-header">
                    <h1 class="admin-title" id="admin-page-title">Quản lý địa điểm</h1>
                    <button class="btn btn--primary" onclick="window.openPlaceModal()">
                        <i data-lucide="plus"></i> Thêm mới
                    </button>
                </div>

                <!-- Tab: Places -->
                <div class="admin-tab-content active" id="tab-places">
                    <div class="admin-panel">
                        <div class="admin-table-wrapper">
                            <table class="admin-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Tên địa điểm</th>
                                        <th>Danh mục</th>
                                        <th>Địa chỉ</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody id="admin-places-tbody">
                                    <tr><td colspan="5" style="text-align:center;">Đang tải dữ liệu từ máy chủ...</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>

        <!-- Modal Thêm/Sửa Địa Điểm -->
        <div class="modal" id="place-modal">
            <div class="modal__content" style="max-width: 800px;">
                <div class="modal__header">
                    <h3 class="modal__title" id="place-modal-title">Thêm địa điểm mới</h3>
                    <button class="modal__close" onclick="window.closePlaceModal()">&times;</button>
                </div>
                <div class="modal__body">
                    <form id="place-form" onsubmit="window.savePlace(event)">
                        <input type="hidden" id="place-id">
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4); margin-bottom: var(--space-4);">
                            <div class="form-group">
                                <label class="form-label">Tên địa điểm (*)</label>
                                <input type="text" id="place-name" class="form-control" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Danh mục (*)</label>
                                <select id="place-category" class="form-control" required>
                                    <option value="an-uong">Ăn uống</option>
                                    <option value="vui-choi">Vui chơi giải trí</option>
                                    <option value="du-lich">Du lịch</option>
                                    <option value="trang-phuc">Trang phục</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group" style="margin-bottom: var(--space-4);">
                            <label class="form-label">Địa chỉ (*)</label>
                            <input type="text" id="place-address" class="form-control" placeholder="Nhập địa chỉ mới nhất..." required>
                        </div>

                        <div class="form-group" style="margin-bottom: var(--space-4);">
                            <label class="form-label">Mô tả ngắn</label>
                            <textarea id="place-desc" class="form-control" rows="2"></textarea>
                        </div>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4); margin-bottom: var(--space-4);">
                            <div class="form-group">
                                <label class="form-label">Giờ mở cửa</label>
                                <input type="text" id="place-hours" class="form-control" placeholder="VD: 07:00 - 22:00">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Mức giá</label>
                                <input type="text" id="place-price" class="form-control" placeholder="VD: 30.000đ - 50.000đ">
                            </div>
                        </div>

                        <div class="form-group" style="margin-bottom: var(--space-4);">
                            <label class="form-label">Hình ảnh chính</label>
                            <div style="display: flex; gap: 10px; align-items: center;">
                                <input type="text" id="place-image" class="form-control" placeholder="Dán link ảnh (https://...)">
                                <span>HOẶC</span>
                                <label class="btn btn--outline" style="cursor: pointer; padding: 8px 12px; white-space: nowrap;">
                                    <i data-lucide="upload-cloud" style="width:16px;height:16px;"></i> Tải lên
                                    <input type="file" id="place-image-upload" accept="image/*" style="display: none;" onchange="window.uploadPlaceImage(event)">
                                </label>
                            </div>
                            <small id="upload-status" style="color: var(--color-primary); display: block; margin-top: 4px;"></small>
                        </div>

                        <div style="display: flex; justify-content: flex-end; gap: var(--space-3); margin-top: var(--space-6);">
                            <button type="button" class="btn btn--outline" onclick="window.closePlaceModal()">Hủy</button>
                            <button type="submit" class="btn btn--primary">Lưu địa điểm</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
}

window.adminPlaces = {};

window.loadAdminData = async function() {
    try {
        const { database } = await import('../firebase-config.js');
        const { ref, get } = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js");
        
        const snapshot = await get(ref(database, 'places'));
        const tbody = document.getElementById('admin-places-tbody');
        if (!tbody) return;
        
        if (snapshot.exists()) {
            window.adminPlaces = snapshot.val();
            renderAdminTable();
        } else {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">Chưa có dữ liệu. Hãy bấm "Đồng bộ CSDL".</td></tr>';
        }
    } catch (e) {
        console.error(e);
        alert("Lỗi tải dữ liệu Admin: " + e.message);
    }
};

window.renderAdminTable = function() {
    const tbody = document.getElementById('admin-places-tbody');
    if (!tbody) return;
    
    let html = '';
    const places = Object.values(window.adminPlaces);
    
    // Sort by ID or name
    places.sort((a, b) => a.id - b.id);
    
    places.forEach(place => {
        html += \`
        <tr>
            <td>\${place.id}</td>
            <td>
                <div style="font-weight: 600; color: var(--text-main);">\${place.name}</div>
            </td>
            <td><span class="badge" style="background: var(--color-primary); color: white; font-size: 0.8rem;">\${place.category}</span></td>
            <td><div style="font-size: 0.85rem; color: var(--text-muted); max-width: 300px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">\${place.address}</div></td>
            <td>
                <button class="btn btn--icon btn--sm" aria-label="Sửa" onclick="window.editPlace('\${place.id}')"><i data-lucide="edit-2"></i></button>
                <button class="btn btn--icon btn--sm" aria-label="Xóa" onclick="window.deletePlace('\${place.id}')"><i data-lucide="trash-2"></i></button>
            </td>
        </tr>
        \`;
    });
    
    tbody.innerHTML = html;
    if (window.lucide) window.lucide.createIcons();
};

window.switchAdminTab = function(tabId, btnElement) {
    document.querySelectorAll('.admin-nav__item').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');
};

window.openPlaceModal = function() {
    document.getElementById('place-form').reset();
    document.getElementById('place-id').value = '';
    document.getElementById('place-modal-title').innerText = 'Thêm địa điểm mới';
    document.getElementById('place-modal').classList.add('active');
};

window.closePlaceModal = function() {
    document.getElementById('place-modal').classList.remove('active');
};

window.editPlace = function(id) {
    const place = window.adminPlaces[id];
    if (!place) return;
    
    document.getElementById('place-id').value = place.id;
    document.getElementById('place-name').value = place.name || '';
    document.getElementById('place-category').value = place.category || 'an-uong';
    document.getElementById('place-address').value = place.address || '';
    document.getElementById('place-desc').value = place.description || '';
    document.getElementById('place-hours').value = place.openHours || '';
    document.getElementById('place-price').value = place.priceText || '';
    document.getElementById('place-image').value = (place.images && place.images[0]) ? place.images[0] : '';
    
    document.getElementById('place-modal-title').innerText = 'Chỉnh sửa địa điểm';
    document.getElementById('place-modal').classList.add('active');
};

window.savePlace = async function(e) {
    e.preventDefault();
    
    const id = document.getElementById('place-id').value || Date.now().toString(); // Use timestamp as ID for new places
    const name = document.getElementById('place-name').value;
    const category = document.getElementById('place-category').value;
    const address = document.getElementById('place-address').value;
    const description = document.getElementById('place-desc').value;
    const openHours = document.getElementById('place-hours').value;
    const priceText = document.getElementById('place-price').value;
    const image = document.getElementById('place-image').value;
    
    // Get existing place data to merge
    const existingData = window.adminPlaces[id] || { totalReviews: 0, rating: 0, reviews: [] };
    
    const placeData = {
        ...existingData,
        id: id,
        name,
        category,
        address,
        description,
        openHours,
        priceText,
        images: image ? [image] : []
    };
    
    try {
        const { database } = await import('../firebase-config.js');
        const { ref, set } = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js");
        
        await set(ref(database, 'places/' + id), placeData);
        window.showToast('Lưu địa điểm thành công!', 'success');
        window.closePlaceModal();
        window.loadAdminData(); // Reload table
    } catch (error) {
        console.error(error);
        alert('Lỗi lưu dữ liệu: ' + error.message);
    }
};

window.uploadPlaceImage = async function(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const statusEl = document.getElementById('upload-status');
    statusEl.innerText = 'Đang tải ảnh lên... Vui lòng chờ.';
    
    try {
        const { storage } = await import('../firebase-config.js');
        const { ref, uploadBytes, getDownloadURL } = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js");
        
        const storageRef = ref(storage, 'places/' + Date.now() + '_' + file.name);
        const snapshot = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(snapshot.ref);
        
        document.getElementById('place-image').value = url;
        statusEl.innerText = 'Tải ảnh thành công!';
        setTimeout(() => { statusEl.innerText = ''; }, 3000);
    } catch (error) {
        console.error(error);
        statusEl.innerText = 'Lỗi tải ảnh: ' + error.message;
        statusEl.style.color = 'var(--color-danger)';
    }
};

window.deletePlace = async function(id) {
    if (confirm('Bạn có chắc chắn muốn xóa địa điểm này không? Hành động này không thể hoàn tác.')) {
        try {
            const { database } = await import('../firebase-config.js');
            const { ref, remove } = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js");
            
            await remove(ref(database, 'places/' + id));
            window.showToast('Đã xóa địa điểm!', 'success');
            window.loadAdminData();
        } catch (error) {
            console.error(error);
            alert('Lỗi xóa dữ liệu: ' + error.message);
        }
    }
};
