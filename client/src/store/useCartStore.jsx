import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Tạo store với middleware 'persist' để tự lưu vào LocalStorage
export const useCartStore = create(
  persist(
    (set, get) => ({
      // 1. State: Danh sách giỏ hàng
      cartItems: [],

      // 2. Action: Thêm vào giỏ
      addToCart: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.cartItems.find((item) => item.id === product.id);

          if (existingItem) {
            // Nếu có rồi -> Tăng số lượng
            return {
              cartItems: state.cartItems.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          } else {
            // Nếu chưa có -> Thêm mới (Chuẩn hóa dữ liệu luôn tại đây)
            const newItem = {
              id: product.id,
              name: product.name,
              price: Number(product.price),
              imgSrc: product.imgSrc || product.image || "img/default.jpg",
              quantity: quantity,
            };
            return { cartItems: [...state.cartItems, newItem] };
          }
        });
      },

      // 3. Action: Xóa sản phẩm
      removeFromCart: (productId) => {
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== productId),
        }));
      },

      // 4. Action: Cập nhật số lượng
      updateQuantity: (productId, amount) => {
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === productId
              ? { ...item, quantity: Math.max(1, item.quantity + amount) }
              : item
          ),
        }));
      },

      // 5. Action: Xóa sạch giỏ
      clearCart: () => set({ cartItems: [] }),

      // 6. Getter: Tính tổng tiền (Zustand không có computed tự động, nên ta viết hàm trả về)
      getCartTotal: () => {
        return get().cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getCartCount: () => {
        return get().cartItems.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage', // Tên key trong LocalStorage (tự động lưu/tải)
    }
  )
);