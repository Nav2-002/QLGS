
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
  Store, 
  Shelf, 
  Order, 
  Customer, 
  Service,
  Inventory,
  InventoryTransaction,
  Promotion,
  Invoice,
  InvoiceDetail
} from '../types';
import { 
  stores as initialStores, 
  shelves as initialShelves,
  orders as initialOrders,
  customers as initialCustomers,
  services as initialServices,
  inventory as initialInventory,
  inventoryTransactions as initialInventoryTransactions,
  promotions as initialPromotions,
  invoices as initialInvoices,
  invoiceDetails as initialInvoiceDetails
} from '../data/mockData';

interface AppContextType {
  stores: Store[];
  shelves: Shelf[];
  orders: Order[];
  customers: Customer[];
  services: Service[];
  inventory: Inventory[];
  inventoryTransactions: InventoryTransaction[];
  promotions: Promotion[];
  invoices: Invoice[];
  invoiceDetails: InvoiceDetail[];
  
  // Các functions cho cửa hàng
  addStore: (store: Omit<Store, 'id'>) => void;
  updateStore: (id: string, updatedStore: Partial<Store>) => void;
  deleteStore: (id: string) => void;
  
  // Các functions cho kệ hàng
  addShelf: (shelf: Omit<Shelf, 'id'>) => void;
  updateShelf: (id: string, updatedShelf: Partial<Shelf>) => void;
  deleteShelf: (id: string) => void;
  
  // Các functions cho đơn hàng
  addOrder: (order: Omit<Order, 'id'>) => void;
  updateOrder: (id: string, updatedOrder: Partial<Order>) => void;
  deleteOrder: (id: string) => void;
  updateOrderShelf: (orderId: string, shelfId: string, position: string) => void;
  
  // Các functions cho khách hàng
  addCustomer: (customer: Omit<Customer, 'id'>) => void;
  updateCustomer: (id: string, updatedCustomer: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;

  // Các functions cho kho
  addInventoryItem: (item: Omit<Inventory, 'id'>) => void;
  updateInventoryItem: (id: string, updatedItem: Partial<Inventory>) => void;
  deleteInventoryItem: (id: string) => void;
  addInventoryTransaction: (transaction: Omit<InventoryTransaction, 'id'>) => void;
  
  // Các functions cho khuyến mãi
  addPromotion: (promotion: Omit<Promotion, 'id'>) => void;
  updatePromotion: (id: string, updatedPromotion: Partial<Promotion>) => void;
  deletePromotion: (id: string) => void;
  
  // Các functions cho hóa đơn
  addInvoice: (invoice: Omit<Invoice, 'id'>, details: Omit<InvoiceDetail, 'id' | 'invoiceId'>[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [stores, setStores] = useState<Store[]>(initialStores);
  const [shelves, setShelves] = useState<Shelf[]>(initialShelves);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [services, setServices] = useState<Service[]>(initialServices);
  const [inventory, setInventory] = useState<Inventory[]>(initialInventory);
  const [inventoryTransactions, setInventoryTransactions] = useState<InventoryTransaction[]>(initialInventoryTransactions);
  const [promotions, setPromotions] = useState<Promotion[]>(initialPromotions);
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [invoiceDetails, setInvoiceDetails] = useState<InvoiceDetail[]>(initialInvoiceDetails);

  // Functions cho cửa hàng
  const addStore = (store: Omit<Store, 'id'>) => {
    const newStore: Store = {
      ...store,
      id: `store${stores.length + 1}`,
    };
    setStores([...stores, newStore]);
  };

  const updateStore = (id: string, updatedStore: Partial<Store>) => {
    setStores(
      stores.map((store) =>
        store.id === id ? { ...store, ...updatedStore } : store
      )
    );
  };

  const deleteStore = (id: string) => {
    setStores(stores.filter((store) => store.id !== id));
    // Xóa luôn các kệ và đơn hàng liên quan
    setShelves(shelves.filter((shelf) => shelf.storeId !== id));
    setOrders(orders.filter((order) => order.storeId !== id));
  };

  // Functions cho kệ hàng
  const addShelf = (shelf: Omit<Shelf, 'id'>) => {
    const newShelf: Shelf = {
      ...shelf,
      id: `shelf${shelves.length + 1}`,
    };
    setShelves([...shelves, newShelf]);
  };

  const updateShelf = (id: string, updatedShelf: Partial<Shelf>) => {
    setShelves(
      shelves.map((shelf) =>
        shelf.id === id ? { ...shelf, ...updatedShelf } : shelf
      )
    );
  };

  const deleteShelf = (id: string) => {
    setShelves(shelves.filter((shelf) => shelf.id !== id));
    // Cập nhật các đơn hàng có liên quan
    setOrders(
      orders.map((order) =>
        order.shelfId === id ? { ...order, shelfId: undefined, shelfPosition: undefined } : order
      )
    );
  };

  // Functions cho đơn hàng
  const addOrder = (order: Omit<Order, 'id'>) => {
    const newOrder: Order = {
      ...order,
      id: `order${orders.length + 1}`,
    };
    setOrders([...orders, newOrder]);
  };

  const updateOrder = (id: string, updatedOrder: Partial<Order>) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, ...updatedOrder } : order
      )
    );
  };

  const deleteOrder = (id: string) => {
    setOrders(orders.filter((order) => order.id !== id));
  };

  const updateOrderShelf = (orderId: string, shelfId: string, position: string) => {
    // Cập nhật vị trí kệ cho đơn hàng
    setOrders(
      orders.map((order) =>
        order.id === orderId
          ? { ...order, shelfId, shelfPosition: position }
          : order
      )
    );

    // Cập nhật số lượng đồ hiện tại trên kệ
    const targetShelf = shelves.find((shelf) => shelf.id === shelfId);
    if (targetShelf) {
      setShelves(
        shelves.map((shelf) =>
          shelf.id === shelfId
            ? { ...shelf, currentItems: shelf.currentItems + 1 }
            : shelf
        )
      );
    }
  };

  // Functions cho khách hàng
  const addCustomer = (customer: Omit<Customer, 'id'>) => {
    const newCustomer: Customer = {
      ...customer,
      id: `customer${customers.length + 1}`,
    };
    setCustomers([...customers, newCustomer]);
  };

  const updateCustomer = (id: string, updatedCustomer: Partial<Customer>) => {
    setCustomers(
      customers.map((customer) =>
        customer.id === id ? { ...customer, ...updatedCustomer } : customer
      )
    );
  };

  const deleteCustomer = (id: string) => {
    setCustomers(customers.filter((customer) => customer.id !== id));
  };

  // Functions cho kho
  const addInventoryItem = (item: Omit<Inventory, 'id'>) => {
    const newItem: Inventory = {
      ...item,
      id: `inventory${inventory.length + 1}`,
    };
    setInventory([...inventory, newItem]);
  };

  const updateInventoryItem = (id: string, updatedItem: Partial<Inventory>) => {
    setInventory(
      inventory.map((item) =>
        item.id === id ? { ...item, ...updatedItem } : item
      )
    );
  };

  const deleteInventoryItem = (id: string) => {
    setInventory(inventory.filter((item) => item.id !== id));
  };

  const addInventoryTransaction = (transaction: Omit<InventoryTransaction, 'id'>) => {
    const newTransaction: InventoryTransaction = {
      ...transaction,
      id: `transaction${inventoryTransactions.length + 1}`,
    };
    setInventoryTransactions([...inventoryTransactions, newTransaction]);

    // Cập nhật số lượng trong kho
    const item = inventory.find((i) => i.id === transaction.inventoryId);
    if (item) {
      const newQuantity = transaction.type === 'in' 
        ? item.quantity + transaction.quantity 
        : item.quantity - transaction.quantity;
      
      // Cập nhật trạng thái dựa trên số lượng mới
      let newStatus = item.status;
      if (newQuantity <= 0) {
        newStatus = 'out_of_stock';
      } else if (newQuantity < 10) { // Giả sử ngưỡng thấp là 10
        newStatus = 'low';
      } else {
        newStatus = 'available';
      }
      
      updateInventoryItem(item.id, { 
        quantity: newQuantity,
        status: newStatus as 'available' | 'low' | 'out_of_stock',
        lastRestockedDate: transaction.type === 'in' ? transaction.date : item.lastRestockedDate
      });
    }
  };

  // Functions cho khuyến mãi
  const addPromotion = (promotion: Omit<Promotion, 'id'>) => {
    const newPromotion: Promotion = {
      ...promotion,
      id: `promotion${promotions.length + 1}`,
    };
    setPromotions([...promotions, newPromotion]);
  };

  const updatePromotion = (id: string, updatedPromotion: Partial<Promotion>) => {
    setPromotions(
      promotions.map((promotion) =>
        promotion.id === id ? { ...promotion, ...updatedPromotion } : promotion
      )
    );
  };

  const deletePromotion = (id: string) => {
    setPromotions(promotions.filter((promotion) => promotion.id !== id));
  };

  // Functions cho hóa đơn
  const addInvoice = (invoice: Omit<Invoice, 'id'>, details: Omit<InvoiceDetail, 'id' | 'invoiceId'>[]) => {
    const newInvoiceId = `invoice${invoices.length + 1}`;
    
    const newInvoice: Invoice = {
      ...invoice,
      id: newInvoiceId,
    };
    
    setInvoices([...invoices, newInvoice]);
    
    // Thêm chi tiết hóa đơn
    const newDetails: InvoiceDetail[] = details.map((detail, index) => ({
      ...detail,
      id: `detail${invoiceDetails.length + index + 1}`,
      invoiceId: newInvoiceId,
    }));
    
    setInvoiceDetails([...invoiceDetails, ...newDetails]);
    
    // Cập nhật trạng thái đơn hàng nếu có
    if (invoice.orderId) {
      updateOrder(invoice.orderId, { status: 'completed' });
    }
  };

  const value = {
    stores,
    shelves,
    orders,
    customers,
    services,
    inventory,
    inventoryTransactions,
    promotions,
    invoices,
    invoiceDetails,
    addStore,
    updateStore,
    deleteStore,
    addShelf,
    updateShelf,
    deleteShelf,
    addOrder,
    updateOrder,
    deleteOrder,
    updateOrderShelf,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    addInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
    addInventoryTransaction,
    addPromotion,
    updatePromotion,
    deletePromotion,
    addInvoice,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
