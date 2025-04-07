
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '../components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../components/ui/select';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner';
import { Search, Plus, Edit, Trash2, UserPlus } from 'lucide-react';
import { Customer } from '../types';

const CustomerManagement = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    membershipType: 'regular' as 'regular' | 'vip' | 'premium'
  });

  // Mock data
  useEffect(() => {
    // This would normally be fetched from an API
    const mockCustomers: Customer[] = [
      {
        id: '1',
        name: 'Nguyễn Văn A',
        phone: '0987654321',
        email: 'nguyenvana@example.com',
        address: 'Hà Nội',
        membershipType: 'vip',
        joinDate: '2022-05-15'
      },
      {
        id: '2',
        name: 'Trần Thị B',
        phone: '0123456789',
        email: 'tranthib@example.com',
        address: 'Hồ Chí Minh',
        membershipType: 'regular',
        joinDate: '2023-01-10'
      },
      {
        id: '3',
        name: 'Lê Văn C',
        phone: '0909090909',
        email: 'levanc@example.com',
        address: 'Đà Nẵng',
        membershipType: 'premium',
        joinDate: '2021-11-20'
      }
    ];
    
    setCustomers(mockCustomers);
    setFilteredCustomers(mockCustomers);
  }, []);

  // Handle search
  useEffect(() => {
    const results = customers.filter(customer => 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      (customer.email && customer.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredCustomers(results);
  }, [searchTerm, customers]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Form handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMembershipChange = (value: string) => {
    setFormData(prev => ({ 
      ...prev, 
      membershipType: value as 'regular' | 'vip' | 'premium'
    }));
  };

  // Add new customer
  const handleAddClick = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      address: '',
      membershipType: 'regular'
    });
    setIsAddDialogOpen(true);
  };

  const handleAddSubmit = () => {
    // Validate form
    if (!formData.name || !formData.phone) {
      toast.error('Vui lòng nhập tên và số điện thoại');
      return;
    }

    const newCustomer: Customer = {
      id: Date.now().toString(),
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      membershipType: formData.membershipType,
      joinDate: new Date().toISOString().split('T')[0]
    };

    setCustomers(prev => [...prev, newCustomer]);
    setIsAddDialogOpen(false);
    toast.success('Thêm khách hàng thành công');
  };

  // Edit customer
  const handleEditClick = (customer: Customer) => {
    setCurrentCustomer(customer);
    setFormData({
      name: customer.name,
      phone: customer.phone,
      email: customer.email || '',
      address: customer.address || '',
      membershipType: customer.membershipType || 'regular'
    });
    setIsEditDialogOpen(true);
  };

  const handleEditSubmit = () => {
    if (!currentCustomer) return;
    
    // Validate form
    if (!formData.name || !formData.phone) {
      toast.error('Vui lòng nhập tên và số điện thoại');
      return;
    }

    const updatedCustomers = customers.map(c => 
      c.id === currentCustomer.id 
        ? { 
            ...c, 
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            address: formData.address,
            membershipType: formData.membershipType
          } 
        : c
    );
    
    setCustomers(updatedCustomers);
    setIsEditDialogOpen(false);
    toast.success('Cập nhật khách hàng thành công');
  };

  // Delete customer
  const handleDeleteClick = (customer: Customer) => {
    setCurrentCustomer(customer);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!currentCustomer) return;
    
    const updatedCustomers = customers.filter(c => c.id !== currentCustomer.id);
    setCustomers(updatedCustomers);
    setIsDeleteDialogOpen(false);
    toast.success('Xóa khách hàng thành công');
  };

  const getMembershipBadge = (type: string) => {
    switch(type) {
      case 'vip':
        return <Badge className="bg-yellow-500">VIP</Badge>;
      case 'premium':
        return <Badge className="bg-purple-600">Premium</Badge>;
      default:
        return <Badge className="bg-green-500">Thường</Badge>;
    }
  };

  return (
    <Layout title="Quản lý khách hàng">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <CardTitle>Danh sách khách hàng</CardTitle>
              <Button onClick={handleAddClick} className="bg-vietnam-red hover:bg-vietnam-red/90">
                <UserPlus className="mr-2 h-4 w-4" />
                Thêm khách hàng
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Tìm theo tên, số điện thoại hoặc email..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Tên khách hàng</TableHead>
                    <TableHead>Số điện thoại</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Địa chỉ</TableHead>
                    <TableHead>Loại thành viên</TableHead>
                    <TableHead>Ngày đăng ký</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.length > 0 ? (
                    filteredCustomers.map(customer => (
                      <TableRow key={customer.id}>
                        <TableCell className="font-medium">{customer.id}</TableCell>
                        <TableCell>{customer.name}</TableCell>
                        <TableCell>{customer.phone}</TableCell>
                        <TableCell>{customer.email || '-'}</TableCell>
                        <TableCell>{customer.address || '-'}</TableCell>
                        <TableCell>{getMembershipBadge(customer.membershipType || 'regular')}</TableCell>
                        <TableCell>{customer.joinDate}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleEditClick(customer)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-500" onClick={() => handleDeleteClick(customer)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-4">
                        Không tìm thấy khách hàng nào
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Customer Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Thêm khách hàng mới</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Tên khách hàng <span className="text-red-500">*</span></label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Nguyễn Văn A"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">Số điện thoại <span className="text-red-500">*</span></label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="0987654321"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="email@example.com"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="address" className="text-sm font-medium">Địa chỉ</label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Địa chỉ"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="membershipType" className="text-sm font-medium">Loại thành viên</label>
              <Select value={formData.membershipType} onValueChange={handleMembershipChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn loại thành viên" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="regular">Thường</SelectItem>
                  <SelectItem value="vip">VIP</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Hủy</Button>
            <Button onClick={handleAddSubmit} className="bg-vietnam-red hover:bg-vietnam-red/90">Thêm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Customer Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa khách hàng</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label htmlFor="edit-name" className="text-sm font-medium">Tên khách hàng <span className="text-red-500">*</span></label>
              <Input
                id="edit-name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="edit-phone" className="text-sm font-medium">Số điện thoại <span className="text-red-500">*</span></label>
              <Input
                id="edit-phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="edit-email" className="text-sm font-medium">Email</label>
              <Input
                id="edit-email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="edit-address" className="text-sm font-medium">Địa chỉ</label>
              <Input
                id="edit-address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="edit-membershipType" className="text-sm font-medium">Loại thành viên</label>
              <Select value={formData.membershipType} onValueChange={handleMembershipChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn loại thành viên" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="regular">Thường</SelectItem>
                  <SelectItem value="vip">VIP</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Hủy</Button>
            <Button onClick={handleEditSubmit} className="bg-vietnam-red hover:bg-vietnam-red/90">Lưu</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Xác nhận xóa khách hàng</DialogTitle>
          </DialogHeader>
          <div className="py-3">
            <p>Bạn có chắc chắn muốn xóa khách hàng <strong>{currentCustomer?.name}</strong>?</p>
            <p className="text-sm text-gray-500 mt-2">Hành động này không thể hoàn tác.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Hủy</Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>Xóa</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default CustomerManagement;
