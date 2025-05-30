import { useState, useEffect } from "react";
import { CustomerResponse } from "@/types/customer.type";
import { getAllCustomers, deleteCustomer } from "@/api/customer.api";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit, Trash, Eye } from "lucide-react";
import { CreateCustomerModal } from "@/components/modals/create-customer-modal";
import { UpdateCustomerModal } from "@/components/modals/update-customer-modal";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function Customers() {
  const [customers, setCustomers] = useState<CustomerResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(
    null
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const data = await getAllCustomers();
      setCustomers(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching customers:", error);
      setLoading(false);
    }
  };

  const handleAddCustomer = () => {
    setIsModalOpen(true);
  };

  const handleEditCustomer = (customerId: string) => {
    setSelectedCustomerId(customerId);
    setIsUpdateModalOpen(true);
  };

  const handleDeleteCustomer = (customerId: string) => {
    setSelectedCustomerId(customerId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedCustomerId) return;

    setDeleteLoading(true);
    try {
      await deleteCustomer(selectedCustomerId);
      fetchCustomers();
      setIsDeleteDialogOpen(false);
      setSelectedCustomerId(null);
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
    setDeleteLoading(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedCustomerId(null);
  };

  const handleCustomerCreated = () => {
    // Refresh the customer list after successful creation
    fetchCustomers();
  };

  const handleCustomerUpdated = () => {
    // Refresh the customer list after successful update
    fetchCustomers();
  };

  // Define columns for customer table
  const columns: ColumnDef<CustomerResponse>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone Number",
    },
    {
      accessorKey: "address",
      header: "Address",
      cell: ({ row }) => {
        const address = row.getValue("address") as string;
        // Truncate long addresses
        return address.length > 30 ? `${address.substring(0, 30)}...` : address;
      },
    },
    {
      accessorKey: "customer_type",
      header: "Customer Type",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const customer = row.original;

        return (
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleEditCustomer(customer._id)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive"
              onClick={() => handleDeleteCustomer(customer._id)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Customers</h1>
        <Button onClick={handleAddCustomer} className="flex items-center gap-1">
          <PlusCircle size={16} />
          <span>Add Customer</span>
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading customers...</p>
        </div>
      ) : (
        <div>
          <DataTable
            columns={columns}
            data={customers || []}
            searchColumn="name"
            searchPlaceholder="Search by name..."
          />
          {customers.length === 0 && (
            <div className="text-center py-4 text-muted-foreground">
              No customers found
            </div>
          )}
        </div>
      )}

      <CreateCustomerModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleCustomerCreated}
      />

      <UpdateCustomerModal
        isOpen={isUpdateModalOpen}
        onClose={handleCloseUpdateModal}
        onSuccess={handleCustomerUpdated}
        customerId={selectedCustomerId}
      />

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              customer and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setSelectedCustomerId(null);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={deleteLoading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteLoading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
